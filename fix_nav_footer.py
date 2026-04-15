#!/usr/bin/env python3
"""
Fix remaining issues:
1. xxh_test.html - include full xxh i18n data in inline SITE_I18N
2. Nav links in en/fr pages - link to same-language index
3. footer.js - detect language and adjust paths
"""

import os, re, json, subprocess, sys

BASE = '/Users/raychen/Develop/Web/Rayawa.github.io'


def parse_i18n_js(rel_path, var_name='SITE_I18N'):
    abs_path = os.path.abspath(os.path.join(BASE, rel_path))
    if not os.path.exists(abs_path):
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
        return None
    try:
        return json.loads(result.stdout)
    except:
        return None


def fix_xxh_inline_i18n(html, xxh_i18n, footer_i18n, lang):
    all_langs_i18n = {}
    all_langs_footer = {}
    for l in ['zh', 'en', 'fr']:
        all_langs_i18n[l] = xxh_i18n.get(l, {}) if l == lang else {}
        all_langs_footer[l] = footer_i18n.get(l, {}) if l == lang else {}

    inline_script = (
        f'<script>window.SITE_I18N={json.dumps(all_langs_i18n, ensure_ascii=False)};'
        f'window.FOOTER_I18N={json.dumps(all_langs_footer, ensure_ascii=False)};'
        f'(function(){{var l=document.documentElement.lang||"zh-CN";'
        f'var lc=l.startsWith("en")?"en":l.startsWith("fr")?"fr":"zh";'
        f'localStorage.setItem("rayawa_locale",lc);}})();'
        f'</script>'
    )

    html = re.sub(r'<script>window\.SITE_I18N=.*?</script>', '', html, flags=re.DOTALL)

    first_script = re.search(r'<script', html)
    if first_script:
        pos = first_script.start()
        html = html[:pos] + inline_script + '\n    ' + html[pos:]

    return html


def fix_nav_links(html, lang, depth):
    if lang == 'zh':
        return html

    if lang == 'en':
        if depth == 0:
            home_href = '../'
        else:
            home_href = '../../'
    else:
        if depth == 0:
            home_href = '../'
        else:
            home_href = '../../'

    html = html.replace('<a href="#" class="logo">', f'<a href="{home_href}" class="logo">')

    nav_map = {
        'en': ['Home', 'About Me', 'Projects', 'Photography', 'Contact'],
        'fr': ['Accueil', 'À propos de moi', 'Projets', 'Photographie', 'Contact'],
    }
    nav_hrefs = ['#', '#about', '#projects', '#gallery', '#contact']

    nav_texts = nav_map.get(lang, [])
    for i, (text, href) in enumerate(zip(nav_texts, nav_hrefs)):
        if i == 0:
            link_href = home_href
        else:
            link_href = home_href + href
        old = f'<a href="{href}">{text}</a>'
        new = f'<a href="{link_href}">{text}</a>'
        html = html.replace(old, new, 1)

    return html


def main():
    print("=== Fixing xxh_test.html, nav links, and footer ===\n")

    xxh_i18n = parse_i18n_js('static/js/i18n-xxh.js')
    if not xxh_i18n:
        print("FATAL: Failed to parse i18n-xxh.js")
        sys.exit(1)

    footer_i18n = parse_i18n_js('static/js/i18n-footer.js', 'FOOTER_I18N')
    if not footer_i18n:
        footer_i18n = {}

    # Fix xxh_test.html for all languages
    for lang in ['zh', 'en', 'fr']:
        if lang == 'zh':
            path = os.path.join(BASE, 'projects/xxh_test.html')
            depth = 1
        elif lang == 'en':
            path = os.path.join(BASE, 'en/projects/xxh_test.html')
            depth = 2
        else:
            path = os.path.join(BASE, 'fr/projects/xxh_test.html')
            depth = 2

        if not os.path.exists(path):
            continue

        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()

        html = fix_xxh_inline_i18n(html, xxh_i18n, footer_i18n, lang)
        html = fix_nav_links(html, lang, depth)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Fixed xxh_test.html: {path}")

    # Fix nav links in ALL en/fr HTML files
    print("\n--- Fixing nav links in all en/fr files ---")
    for root, dirs, files in os.walk(BASE):
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(root, fname)
            rel = os.path.relpath(fpath, BASE)

            if rel.startswith('en/') or rel.startswith('fr/'):
                lang = 'en' if rel.startswith('en/') else 'fr'
                depth = rel.count('/') - 1

                if 'xxh_test.html' in rel:
                    continue

                with open(fpath, 'r', encoding='utf-8') as f:
                    html = f.read()

                original = html
                html = fix_nav_links(html, lang, depth)

                if html != original:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(html)
                    print(f"  Fixed nav: {rel}")

    # Fix footer.js to detect language and adjust paths
    print("\n--- Fixing footer.js ---")
    footer_js_path = os.path.join(BASE, 'static/js/footer.js')
    with open(footer_js_path, 'r', encoding='utf-8') as f:
        footer_js = f.read()

    old_prefix_logic = """    var isHomepage = document.body.classList.contains('is-homepage');
    var path = window.location.pathname;
    var depth = path.split('/').length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    if (path.endsWith('/') || path.endsWith('index.html')) {
        prefix = prefix.replace('../', '');
    }"""

    new_prefix_logic = """    var isHomepage = document.body.classList.contains('is-homepage');
    var path = window.location.pathname;
    var htmlLang = document.documentElement.lang || 'zh-CN';
    var langDir = htmlLang.startsWith('en') ? 'en' : htmlLang.startsWith('fr') ? 'fr' : '';
    var depth = path.split('/').length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    if (path.endsWith('/') || path.endsWith('index.html')) {
        prefix = prefix.replace('../', '');
    }
    if (langDir) {
        var langPrefix = '';
        for (var j = 0; j < depth; j++) langPrefix += '../';
        prefix = langPrefix + langDir + '/';
    }"""

    if old_prefix_logic in footer_js:
        footer_js = footer_js.replace(old_prefix_logic, new_prefix_logic)
        with open(footer_js_path, 'w', encoding='utf-8') as f:
            f.write(footer_js)
        print("  Fixed footer.js: language-aware path prefix")
    else:
        print("  WARNING: footer.js prefix logic not found, manual fix needed")

    print("\n=== Done! ===")


if __name__ == '__main__':
    main()
