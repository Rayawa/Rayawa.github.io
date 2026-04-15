#!/usr/bin/env python3
"""
Add particles.js background and animation support to subpages that are missing it.
Also ensures all en/fr versions have the same treatment.
"""

import os, re, sys

BASE = '/Users/raychen/Develop/Web/Rayawa.github.io'

# Pages that need particles.min.js script added
PAGES_MISSING_PARTICLES_SCRIPT = [
    'projects/xxh_test.html',
    'projects/Hi3861.html',
    'projects/biology.html',
    'projects/2025class5.html',
    'projects/ncut_papers.html',
    'projects/whn.html',
    'projects/hlm.html',
    'projects/Hi3861-readme.html',
]

# Pages that need particles-js div added
PAGES_MISSING_PARTICLES_DIV = [
    'projects/verify.html',
    'projects/gene.html',
    'projects/idv.html',
]

# All directories to process (root, en, fr)
DIRS = ['', 'en/', 'fr/']


def add_particles_script(html):
    if 'particles.min.js' in html:
        return html

    footer_js_pattern = '<script src="'
    last_script = html.rfind(footer_js_pattern, 0, html.find('footer.js') if 'footer.js' in html else len(html))
    
    if last_script == -1:
        last_script = html.rfind('<script')
    
    depth = 0
    if '../static/js/' in html:
        if '../../static/js/' in html:
            pfx = '../../'
        else:
            pfx = '../'
    else:
        pfx = ''

    particles_script = f'<script src="{pfx}static/js/particles.min.js"></script>\n    '
    
    # Insert before the first script tag that loads local JS
    common_js_pos = html.find(f'{pfx}static/js/common.js')
    if common_js_pos == -1:
        common_js_pos = html.find('static/js/common.js')
    
    if common_js_pos != -1:
        script_start = html.rfind('<script', 0, common_js_pos)
        if script_start != -1:
            html = html[:script_start] + particles_script + html[script_start:]
            return html

    # Fallback: insert before </body>
    body_end = html.rfind('</body>')
    if body_end != -1:
        html = html[:body_end] + '    ' + particles_script + '\n' + html[body_end:]
    
    return html


def add_particles_div(html):
    if 'id="particles-js"' in html:
        return html

    # Add after <body> tag, before the navbar
    body_pos = html.find('<body')
    if body_pos == -1:
        return html
    
    body_close = html.find('>', body_pos)
    if body_close == -1:
        return html
    
    insert_pos = body_close + 1
    particles_div = '\n  <div id="particles-js"></div>'
    html = html[:insert_pos] + particles_div + html[insert_pos:]
    
    return html


def add_subpage_css_class(html):
    if 'class="page' in html or 'class="page"' in html:
        return html
    
    # Find main content wrapper and add page class
    main_tag = html.find('<main')
    if main_tag != -1:
        main_close = html.find('>', main_tag)
        if 'class=' in html[main_tag:main_close]:
            html = html[:main_tag] + html[main_tag:main_close].replace('class="', 'class="page ') + html[main_close:]
        else:
            html = html[:main_close] + ' class="page"' + html[main_close:]
    
    return html


def main():
    print("=== Adding particles and animations to subpages ===\n")
    
    all_pages = set()
    
    # Add pages missing particles script
    for page_rel in PAGES_MISSING_PARTICLES_SCRIPT:
        for dir_prefix in DIRS:
            all_pages.add(dir_prefix + page_rel)
    
    # Add pages missing particles div
    for page_rel in PAGES_MISSING_PARTICLES_DIV:
        for dir_prefix in DIRS:
            all_pages.add(dir_prefix + page_rel)
    
    # Also check thanks.html and 404.html
    for extra in ['thanks.html', '404.html']:
        for dir_prefix in DIRS:
            all_pages.add(dir_prefix + extra)
    
    fixed_count = 0
    
    for rel_path in sorted(all_pages):
        fpath = os.path.join(BASE, rel_path)
        if not os.path.exists(fpath):
            continue
        
        with open(fpath, 'r', encoding='utf-8') as f:
            html = f.read()
        
        original = html
        
        # Add particles-js div if missing
        html = add_particles_div(html)
        
        # Add particles.min.js script if missing
        html = add_particles_script(html)
        
        if html != original:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(html)
            fixed_count += 1
            print(f"  Fixed: {rel_path}")
        else:
            pass  # Already has everything
    
    print(f"\n  Total files fixed: {fixed_count}")
    
    # Now check ALL project pages for particles-js div
    print("\n--- Verifying all pages have particles-js ---")
    missing = []
    for dir_prefix in DIRS:
        projects_dir = os.path.join(BASE, dir_prefix, 'projects') if dir_prefix else os.path.join(BASE, 'projects')
        if not os.path.exists(projects_dir):
            continue
        for fname in sorted(os.listdir(projects_dir)):
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(projects_dir, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            rel = os.path.relpath(fpath, BASE)
            has_div = 'id="particles-js"' in content
            has_script = 'particles.min.js' in content or 'particles.js' in content
            if not has_div or not has_script:
                missing.append(f"{rel}: div={has_div}, script={has_script}")
    
    if missing:
        print("  Still missing:")
        for m in missing:
            print(f"    {m}")
    else:
        print("  All pages have particles-js div and script!")
    
    # Check thanks.html and 404.html
    for dir_prefix in DIRS:
        for page in ['thanks.html', '404.html']:
            fpath = os.path.join(BASE, dir_prefix, page) if dir_prefix else os.path.join(BASE, page)
            if not os.path.exists(fpath):
                continue
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            rel = os.path.relpath(fpath, BASE)
            has_div = 'id="particles-js"' in content
            has_script = 'particles.min.js' in content or 'particles.js' in content
            if not has_div or not has_script:
                print(f"  Missing in {rel}: div={has_div}, script={has_script}")
    
    print("\n=== Done! ===")


if __name__ == '__main__':
    main()
