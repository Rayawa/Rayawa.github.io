#!/usr/bin/env python3
"""
Convert i18n-based HTML pages to static per-language HTML pages.
- Chinese (zh): root directory
- English (en): en/ subdirectory
- French (fr): fr/ subdirectory

Language switch: ALWAYS navigates to the language root page.
  zh -> /  |  en -> /en/  |  fr -> /fr/
"""

import os, re, json, subprocess, sys

BASE = '/Users/raychen/Develop/Web/Rayawa.github.io'


def parse_i18n_js(rel_path, var_name='SITE_I18N'):
    abs_path = os.path.abspath(os.path.join(BASE, rel_path))
    if not os.path.exists(abs_path):
        print(f"  WARNING: {rel_path} not found, skipping")
        return None
    node_script = (
        "const vm = require('vm');\n"
        "const fs = require('fs');\n"
        f"const code = fs.readFileSync('{abs_path}', 'utf8');\n"
        "const sb = { window: {} };\n"
        "vm.createContext(sb);\n"
        "vm.runInContext(code, sb);\n"
        f"console.log(JSON.stringify(sb.window.{var_name}));\n"
    )
    result = subprocess.run(['node', '-e', node_script], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ERROR parsing {rel_path}:", result.stderr, file=sys.stderr)
        return None
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as e:
        print(f"  ERROR parsing JSON from {rel_path}:", e, file=sys.stderr)
        return None


def flatten(d, prefix=''):
    out = {}
    if not isinstance(d, dict):
        return out
    for k, v in d.items():
        key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            out.update(flatten(v, key))
        elif isinstance(v, list):
            for i, item in enumerate(v):
                out[f"{key}.{i}"] = str(item) if item is not None else ''
        else:
            out[key] = str(v) if v is not None else ''
    return out


def process_html(html, trans, footer_trans, lang, orig_depth):
    ft = flatten(trans)

    # 1. data-i18n-placeholder -> placeholder
    def repl_placeholder(m):
        tag = m.group(0)
        key = m.group(1)
        val = ft.get(key, '')
        escaped = val.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;')
        return tag.replace(f'data-i18n-placeholder="{key}"', f'placeholder="{escaped}"')
    html = re.sub(r'<[^>]*data-i18n-placeholder="([^"]+)"[^>]*>', repl_placeholder, html)

    # 2. data-i18n-html with <!-- i18n: --> comment
    def repl_i18n_html_comment(m):
        pre, key, post, close = m.group(1), m.group(2), m.group(3), m.group(4)
        val = ft.get(key, '')
        return f"{pre}{post}{val}{close}"
    html = re.sub(
        r'(<[^>]*?)data-i18n-html="([^"]+)"([^>]*>)\s*<!-- i18n: .*?-->\s*(</[^>]+>)',
        repl_i18n_html_comment, html, flags=re.DOTALL
    )

    # 3. data-i18n-html WITHOUT comment (empty content)
    def repl_i18n_html_empty(m):
        pre, key, post, close = m.group(1), m.group(2), m.group(3), m.group(4)
        val = ft.get(key, '')
        return f"{pre}{post}{val}{close}"
    html = re.sub(
        r'(<[^>]*?)data-i18n-html="([^"]+)"([^>]*>)\s*(</[^>]+>)',
        repl_i18n_html_empty, html, flags=re.DOTALL
    )

    # 4. data-i18n with <!-- i18n: --> comment
    def repl_i18n_comment(m):
        pre, key, post, close = m.group(1), m.group(2), m.group(3), m.group(4)
        val = ft.get(key, '')
        return f"{pre}{post}{val}{close}"
    html = re.sub(
        r'(<[^>]*?)data-i18n="([^"]+)"([^>]*>)\s*<!-- i18n: .*?-->\s*(</[^>]+>)',
        repl_i18n_comment, html, flags=re.DOTALL
    )

    # 5. data-i18n WITHOUT comment (empty content)
    def repl_i18n_empty(m):
        pre, key, post, close = m.group(1), m.group(2), m.group(3), m.group(4)
        val = ft.get(key, '')
        return f"{pre}{post}{val}{close}"
    html = re.sub(
        r'(<[^>]*?)data-i18n="([^"]+)"([^>]*>)\s*(</[^>]+>)',
        repl_i18n_empty, html, flags=re.DOTALL
    )

    # 6. data-i18n-tooltip -> data-tooltip
    def repl_tooltip(m):
        tag = m.group(0)
        key = m.group(1)
        val = ft.get(key, '')
        return tag.replace(f'data-i18n-tooltip="{key}"', f'data-tooltip="{val}"')
    html = re.sub(r'<[^>]*data-i18n-tooltip="([^"]+)"[^>]*>', repl_tooltip, html)

    # 7. Clean up remaining i18n attributes
    html = re.sub(r'\s+data-i18n="[^"]*"', '', html)
    html = re.sub(r'\s+data-i18n-html="[^"]*"', '', html)
    html = re.sub(r'\s+data-i18n-placeholder="[^"]*"', '', html)
    html = re.sub(r'\s+data-i18n-tooltip="[^"]*"', '', html)

    # 8. Remove remaining i18n comments
    html = re.sub(r'\s*<!-- i18n: .*?-->\s*', '', html)

    # 9. Remove i18n script tags
    i18n_scripts = [
        'i18n.js', 'i18n-footer.js', 'i18n-dashboard.js', 'i18n-bio.js',
        'i18n-openharmony.js', 'i18n-spm.js', 'i18n-gene.js', 'i18n-idv.js',
        'i18n-xxh.js', 'i18n-thanks.js', 'i18n-404.js'
    ]
    for script_name in i18n_scripts:
        for pfx in ['', '../', '../../']:
            pattern = f'<script src="{pfx}static/js/{script_name}"></script>'
            html = html.replace(pattern, '')

    # 10. Remove any existing inline SITE_I18N/FOOTER_I18N scripts (prevent duplicates)
    html = re.sub(r'<script>window\.SITE_I18N=.*?</script>', '', html, flags=re.DOTALL)

    # 11. Update page title
    if 'pageTitle' in ft:
        html = re.sub(r'<title>[^<]*</title>', f'<title>{ft["pageTitle"]}</title>', html)

    # 12. Update html lang attribute
    lang_map = {'zh': 'zh-CN', 'en': 'en', 'fr': 'fr'}
    html = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang_map.get(lang, lang)}">', html)

    # 13. Add inline SITE_I18N + FOOTER_I18N for JS functionality
    minimal_i18n = {}
    for key in ['refresh', 'top', 'dotLabel', 'sending', 'sent', 'sendFailed', 'pageTitle',
                'nav.home', 'nav.about', 'nav.projects', 'nav.gallery', 'nav.contact']:
        if key in ft:
            minimal_i18n[key] = ft[key]

    minimal_footer_data = {}
    if footer_trans and lang in footer_trans:
        minimal_footer_data = footer_trans[lang]

    all_langs_i18n = {l: (minimal_i18n if l == lang else {}) for l in ['zh', 'en', 'fr']}
    all_langs_footer = {l: (minimal_footer_data if l == lang else {}) for l in ['zh', 'en', 'fr']}

    inline_script = (
        f'<script>window.SITE_I18N={json.dumps(all_langs_i18n, ensure_ascii=False)};'
        f'window.FOOTER_I18N={json.dumps(all_langs_footer, ensure_ascii=False)};'
        f'(function(){{var l=document.documentElement.lang||"zh-CN";'
        f'var lc=l.startsWith("en")?"en":l.startsWith("fr")?"fr":"zh";'
        f'localStorage.setItem("rayawa_locale",lc);}})();'
        f'</script>'
    )

    particles_script = '<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>'
    if particles_script in html:
        html = html.replace(particles_script, inline_script + '\n    ' + particles_script)
    else:
        first_script = re.search(r'<script', html)
        if first_script:
            pos = first_script.start()
            html = html[:pos] + inline_script + '\n    ' + html[pos:]

    # 14. Language switch: ALWAYS navigate to language root
    # zh -> /  |  en -> /en/  |  fr -> /fr/
    def make_repl(href):
        def repl(m):
            content = m.group(1)
            return f'<a href="{href}" class="lang-btn">{content}</a>'
        return repl

    html = re.sub(
        r'<button[^>]*class="lang-btn"[^>]*data-lang="zh"[^>]*>(.*?)</button>',
        make_repl('/'), html, flags=re.DOTALL
    )
    html = re.sub(
        r'<button[^>]*class="lang-btn"[^>]*data-lang="en"[^>]*>(.*?)</button>',
        make_repl('/en/'), html, flags=re.DOTALL
    )
    html = re.sub(
        r'<button[^>]*class="lang-btn"[^>]*data-lang="fr"[^>]*>(.*?)</button>',
        make_repl('/fr/'), html, flags=re.DOTALL
    )

    # 15. Fix paths for en/ and fr/ subdirectory versions
    if lang in ('en', 'fr'):
        if orig_depth == 0:
            html = re.sub(r'(href|src)="static/', f'\\1="../static/', html)
            html = html.replace('src="ray.jpg"', 'src="../ray.jpg"')
        elif orig_depth == 1:
            html = html.replace('href="../static/', 'href="../../static/')
            html = html.replace('src="../static/', 'src="../../static/')
            html = html.replace('src="../static/', 'src="../../static/')

    return html


def main():
    print("=== Converting i18n pages to static per-language pages ===\n")

    print("Parsing i18n.js...")
    main_i18n = parse_i18n_js('static/js/i18n.js')
    if not main_i18n:
        print("FATAL: Failed to parse i18n.js")
        sys.exit(1)

    print("Parsing i18n-footer.js...")
    footer_i18n = parse_i18n_js('static/js/i18n-footer.js', 'FOOTER_I18N')
    if not footer_i18n:
        print("WARNING: Failed to parse i18n-footer.js, using empty data")
        footer_i18n = {}

    # Pages with their own i18n files
    pages_with_i18n = {
        'index.html': ('static/js/i18n.js', 0),
        'thanks.html': ('static/js/i18n-thanks.js', 0),
        '404.html': ('static/js/i18n-404.js', 0),
        'projects/spm.html': ('static/js/i18n-spm.js', 1),
        'projects/bio.html': ('static/js/i18n-bio.js', 1),
        'projects/biology.html': ('static/js/i18n-bio.js', 1),
        'projects/dashboard.html': ('static/js/i18n-dashboard.js', 1),
        'projects/openharmony.html': ('static/js/i18n-openharmony.js', 1),
        'projects/Hi3861.html': ('static/js/i18n-openharmony.js', 1),
        'projects/Hi3861-readme.html': ('static/js/i18n-openharmony.js', 1),
        'projects/gene.html': ('static/js/i18n-gene.js', 1),
        'projects/idv.html': ('static/js/i18n-idv.js', 1),
        'projects/xxh.html': ('static/js/i18n-xxh.js', 1),
    }

    # Pages without i18n files (static content, just need path fix + language switch)
    pages_without_i18n = [
        'projects/hlm.html',
        'projects/whn.html',
        'projects/ncut_papers.html',
        'projects/2025class5.html',
        'projects/verify.html',
        'projects/xxh_test.html',
        'projects/openharmony-readme.html',
    ]

    # Process pages WITH i18n
    for page_rel, (i18n_rel, depth) in pages_with_i18n.items():
        print(f"\n--- Processing {page_rel} (i18n: {i18n_rel}) ---")
        page_path = os.path.join(BASE, page_rel)
        if not os.path.exists(page_path):
            print(f"  Skipping (not found): {page_path}")
            continue

        i18n_data = parse_i18n_js(i18n_rel)
        if not i18n_data:
            print(f"  Skipping (i18n parse failed): {i18n_rel}")
            continue

        with open(page_path, 'r', encoding='utf-8') as f:
            orig_html = f.read()

        for lang in ['zh', 'en', 'fr']:
            trans = i18n_data.get(lang, {})
            if lang == 'zh':
                out_path = os.path.join(BASE, page_rel)
            elif lang == 'en':
                out_path = os.path.join(BASE, 'en', page_rel)
            else:
                out_path = os.path.join(BASE, 'fr', page_rel)

            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            result = process_html(orig_html, trans, footer_i18n, lang, orig_depth=depth)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(result)
            print(f"  Written: {out_path}")

    # Process pages WITHOUT i18n (just copy with path fix + language switch + inline i18n data)
    for page_rel in pages_without_i18n:
        print(f"\n--- Processing {page_rel} (no i18n, static) ---")
        page_path = os.path.join(BASE, page_rel)
        if not os.path.exists(page_path):
            print(f"  Skipping (not found): {page_path}")
            continue

        with open(page_path, 'r', encoding='utf-8') as f:
            orig_html = f.read()

        depth = 1  # all in projects/
        for lang in ['zh', 'en', 'fr']:
            trans = main_i18n.get(lang, {})
            if lang == 'zh':
                out_path = os.path.join(BASE, page_rel)
            elif lang == 'en':
                out_path = os.path.join(BASE, 'en', page_rel)
            else:
                out_path = os.path.join(BASE, 'fr', page_rel)

            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            result = process_html(orig_html, trans, footer_i18n, lang, orig_depth=depth)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(result)
            print(f"  Written: {out_path}")

    print("\n=== Done! ===")


if __name__ == '__main__':
    main()
