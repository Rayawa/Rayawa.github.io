#!/usr/bin/env python3
"""
Fix remaining issues:
1. Nav text in en/fr files that don't have data-i18n attributes
2. fetch() path errors in en/fr readme files
3. xxh.html i18n placeholders
"""

import os, re, json, subprocess, sys

BASE = '/Users/raychen/Develop/Web/Rayawa.github.io'

NAV_ZH = ['首页', '关于我', '项目', '摄影', '联系']
NAV_EN = ['Home', 'About Me', 'Projects', 'Photography', 'Contact']
NAV_FR = ['Accueil', 'À propos de moi', 'Projets', 'Photographie', 'Contact']

NAV_MAP = {
    '首页': {'en': 'Home', 'fr': 'Accueil'},
    '关于我': {'en': 'About Me', 'fr': 'À propos de moi'},
    '项目': {'en': 'Projects', 'fr': 'Projets'},
    '摄影': {'en': 'Photography', 'fr': 'Photographie'},
    '联系': {'en': 'Contact', 'fr': 'Contact'},
    'Hi3861 页面': {'en': 'Hi3861 Page', 'fr': 'Page Hi3861'},
}

OTHER_TEXT_MAP = {
    '返回首页': {'en': 'Back to Home', 'fr': "Retour à l'accueil"},
    '刷新页面': {'en': 'Refresh', 'fr': 'Rafraîchir'},
    '回到顶部': {'en': 'Back to top', 'fr': 'Retour en haut'},
    '提交验证': {'en': 'Submit', 'fr': 'Soumettre'},
    '清空答案': {'en': 'Clear', 'fr': 'Effacer'},
    '查看项目': {'en': 'View Project', 'fr': 'Voir le projet'},
    '查看其他项目': {'en': 'View Other Projects', 'fr': 'Voir d\'autres projets'},
    '查看详情': {'en': 'View Details', 'fr': 'Voir les détails'},
    '查看论文': {'en': 'View Paper', 'fr': 'Voir l\'article'},
    '查看草稿': {'en': 'View Draft', 'fr': 'Voir le brouillon'},
    '阅读论文': {'en': 'Read Paper', 'fr': 'Lire l\'article'},
    '实验设计': {'en': 'Experiment Design', 'fr': 'Conception expérimentale'},
    '实验报告': {'en': 'Lab Report', 'fr': 'Rapport de laboratoire'},
    '进入 GitHub 仓库': {'en': 'Open GitHub Repository', 'fr': 'Ouvrir le dépôt GitHub'},
    '查看 README': {'en': 'Open README', 'fr': 'Ouvrir le README'},
}


def fix_nav_text(html, lang):
    if lang not in ('en', 'fr'):
        return html

    for zh_text, translations in NAV_MAP.items():
        en_text = translations.get('en', zh_text)
        fr_text = translations.get('fr', zh_text)
        target = translations[lang]
        html = html.replace(f'>{zh_text}</a>', f'>{target}</a>', 1)
        html = html.replace(f'>{zh_text}</a>', f'>{target}</a>', 1)
        html = html.replace(f'>{zh_text}</a>', f'>{target}</a>', 1)

    for zh_text, translations in OTHER_TEXT_MAP.items():
        target = translations.get(lang, zh_text)
        html = html.replace(zh_text, target)

    return html


def fix_fetch_paths(html, lang):
    if lang not in ('en', 'fr'):
        return html
    html = html.replace("fetch('../static/resources/", "fetch('../../static/resources/")
    return html


def main():
    print("=== Fixing remaining issues ===\n")

    # Fix nav text in en/ and fr/ files
    files_to_fix_nav = [
        'projects/Hi3861.html',
        'projects/biology.html',
        'projects/openharmony-readme.html',
        'projects/xxh_test.html',
        'projects/2025class5.html',
        'projects/ncut_papers.html',
        'projects/whn.html',
        'projects/hlm.html',
        'projects/Hi3861-readme.html',
        'projects/verify.html',
    ]

    for lang in ['en', 'fr']:
        for page_rel in files_to_fix_nav:
            if lang == 'en':
                path = os.path.join(BASE, 'en', page_rel)
            else:
                path = os.path.join(BASE, 'fr', page_rel)

            if not os.path.exists(path):
                continue

            with open(path, 'r', encoding='utf-8') as f:
                html = f.read()

            html = fix_nav_text(html, lang)

            with open(path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"  Fixed nav text: {path}")

    # Fix fetch() paths in readme files
    readme_files = [
        'en/projects/openharmony-readme.html',
        'en/projects/Hi3861-readme.html',
        'fr/projects/openharmony-readme.html',
        'fr/projects/Hi3861-readme.html',
    ]

    for rel_path in readme_files:
        path = os.path.join(BASE, rel_path)
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
        html = fix_fetch_paths(html, 'en')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Fixed fetch paths: {path}")

    # Fix xxh.html i18n placeholders
    print("\n--- Fixing xxh.html ---")
    xxh_i18n = None
    abs_path = os.path.join(BASE, 'static/js/i18n-xxh.js')
    node_script = (
        "const vm = require('vm');\n"
        "const fs = require('fs');\n"
        f"const code = fs.readFileSync('{abs_path}', 'utf8');\n"
        "const sb = { window: {} };\n"
        "vm.createContext(sb);\n"
        "vm.runInContext(code, sb);\n"
        "console.log(JSON.stringify(sb.window.SITE_I18N));\n"
    )
    result = subprocess.run(['node', '-e', node_script], capture_output=True, text=True)
    if result.returncode == 0:
        try:
            xxh_i18n = json.loads(result.stdout)
        except:
            pass

    if xxh_i18n:
        for lang in ['zh', 'en', 'fr']:
            if lang == 'zh':
                path = os.path.join(BASE, 'projects/xxh.html')
            elif lang == 'en':
                path = os.path.join(BASE, 'en/projects/xxh.html')
            else:
                path = os.path.join(BASE, 'fr/projects/xxh.html')

            if not os.path.exists(path):
                continue

            with open(path, 'r', encoding='utf-8') as f:
                html = f.read()

            trans = xxh_i18n.get(lang, {})
            ft = {}
            def flatten(d, prefix=''):
                out = {}
                if not isinstance(d, dict):
                    return out
                for k, v in d.items():
                    key = f"{prefix}.{k}" if prefix else k
                    if isinstance(v, dict):
                        out.update(flatten(v, key))
                    else:
                        out[key] = str(v) if v is not None else ''
                return out
            ft = flatten(trans)

            # Remove remaining i18n comments
            html = re.sub(r'\s*<!-- i18n[^>]*-->\s*', '', html)

            # Fix nav text
            if lang in ('en', 'fr'):
                html = fix_nav_text(html, lang)

            with open(path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"  Fixed xxh.html: {path}")

    print("\n=== Done! ===")


if __name__ == '__main__':
    main()
