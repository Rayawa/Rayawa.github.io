#!/usr/bin/env python3
"""
Fill empty content tags in biology.html and Hi3861.html using i18n data.
These pages were created with empty tags and no data-i18n attributes.
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


def fill_biology(html, trans):
    t = trans
    
    html = html.replace('<h1></h1>\n      <p></p>\n    </section>',
                        f'<h1>{t.get("title", "")}</h1>\n      <p>{t.get("desc", "")}</p>\n    </section>', 1)
    
    pcr_title = t.get("pcrLab", {}).get("title", "")
    pcr_subtitle = t.get("pcrLab", {}).get("subtitle", "").replace("\n", "<br>")
    html = html.replace(
        '<section class="pcr-lab">\n      <div class="section-header">\n        <h2></h2>\n        <p></p>\n      </div>',
        f'<section class="pcr-lab">\n      <div class="section-header">\n        <h2>{pcr_title}</h2>\n        <p>{pcr_subtitle}</p>\n      </div>', 1)
    
    pcr_caption = t.get("pcrResult", {}).get("caption", "").replace("\n", "<br>")
    html = html.replace('<div class="gel-caption"></div>',
                        f'<div class="gel-caption">{pcr_caption}</div>', 1)
    
    design_title = t.get("pcrDesign", {}).get("title", "")
    design_desc = t.get("pcrDesign", {}).get("desc", "")
    html = html.replace(
        '<div class="doc-content">\n              <h3></h3>\n              <p></p>\n              <div class="single-action">\n                <a class="button button-outline"',
        f'<div class="doc-content">\n              <h3>{design_title}</h3>\n              <p>{design_desc}</p>\n              <div class="single-action">\n                <a class="button button-outline"', 1)
    
    report_title = t.get("pcrReport", {}).get("title", "")
    report_desc = t.get("pcrReport", {}).get("desc", "")
    html = html.replace(
        '<div class="doc-content">\n              <h3></h3>\n              <p></p>\n              <div class="single-action">\n                <a class="button"',
        f'<div class="doc-content">\n              <h3>{report_title}</h3>\n              <p>{report_desc}</p>\n              <div class="single-action">\n                <a class="button"', 1)
    
    thesis_title = t.get("thesis", {}).get("title", "")
    thesis_subtitle = t.get("thesis", {}).get("subtitle", "")
    html = html.replace(
        '<section class="thesis-archive">\n      <div class="section-header">\n        <h2></h2>\n        <p></p>\n      </div>',
        f'<section class="thesis-archive">\n      <div class="section-header">\n        <h2>{thesis_title}</h2>\n        <p>{thesis_subtitle}</p>\n      </div>', 1)
    
    published = t.get("thesis", {}).get("published", "")
    html = html.replace('<span class="thesis-badge"></span>\n              <span class="thesis-date">2024.6.23</span>',
                        f'<span class="thesis-badge">{published}</span>\n              <span class="thesis-date">2024.6.23</span>', 1)
    
    prion_title = t.get("thesisPrion", {}).get("title", "")
    prion_abstract = t.get("thesisPrion", {}).get("abstract", "")
    html = html.replace(
        '<span class="thesis-badge"></span>\n              <span class="thesis-date">2024.6.8</span>\n            </div>\n            <h3></h3>\n            <p class="thesis-abstract"></p>',
        f'<span class="thesis-badge">{t.get("thesis", {}).get("draft", "")}</span>\n              <span class="thesis-date">2024.6.8</span>\n            </div>\n            <h3>{prion_title}</h3>\n            <p class="thesis-abstract">{prion_abstract}</p>', 1)
    
    c3_title = t.get("thesisC3", {}).get("title", "")
    c3_abstract = t.get("thesisC3", {}).get("abstract", "")
    html = html.replace(
        '<span class="thesis-badge"></span>\n              <span class="thesis-date">2024.6.8</span>\n            </div>\n            <h3></h3>\n            <p class="thesis-abstract"></p>',
        f'<span class="thesis-badge">{t.get("thesis", {}).get("draft", "")}</span>\n              <span class="thesis-date">2024.6.8</span>\n            </div>\n            <h3>{c3_title}</h3>\n            <p class="thesis-abstract">{c3_abstract}</p>', 1)
    
    sacch_title = t.get("thesisSaccharomyces", {}).get("title", "")
    sacch_abstract = t.get("thesisSaccharomyces", {}).get("abstract", "")
    html = html.replace(
        '<span class="thesis-badge"></span>\n              <span class="thesis-date">2026.03.08</span>\n            </div>\n            <h3></h3>\n            <p class="thesis-abstract"></p>',
        f'<span class="thesis-badge">{t.get("thesis", {}).get("draft", "")}</span>\n              <span class="thesis-date">2026.03.08</span>\n            </div>\n            <h3>{sacch_title}</h3>\n            <p class="thesis-abstract">{sacch_abstract}</p>', 1)
    
    inter_title = t.get("interactive", {}).get("title", "")
    inter_desc = t.get("interactive", {}).get("desc", "")
    inter_btn = t.get("interactive", {}).get("button", "")
    html = html.replace(
        '<h1></h1>\n          <p class="interactive-desc"></p>\n          <a class="button button-large" href="gene.html"></a>',
        f'<h1>{inter_title}</h1>\n          <p class="interactive-desc">{inter_desc}</p>\n          <a class="button button-large" href="gene.html">{inter_btn}</a>', 1)
    
    return html


def main():
    print("=== Filling empty content in biology.html ===\n")
    
    bio_i18n = parse_i18n_js('static/js/i18n-bio.js')
    if not bio_i18n:
        print("FATAL: Failed to parse i18n-bio.js")
        sys.exit(1)
    
    for lang in ['zh', 'en', 'fr']:
        trans = bio_i18n.get(lang, {})
        if lang == 'zh':
            path = os.path.join(BASE, 'projects/biology.html')
        elif lang == 'en':
            path = os.path.join(BASE, 'en/projects/biology.html')
        else:
            path = os.path.join(BASE, 'fr/projects/biology.html')
        
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        html = fill_biology(html, trans)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Filled: {path}")
    
    print("\n=== Done! ===")


if __name__ == '__main__':
    main()
