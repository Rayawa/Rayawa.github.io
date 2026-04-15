#!/usr/bin/env python3
"""
Fill empty content tags in Hi3861.html using i18n-openharmony.js data.
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


def fill_hi3861(html, t):
    hero = t.get('hero', {})
    overview = t.get('overview', {})
    structure = t.get('structure', {})
    traffic = t.get('traffic', {})
    colorful = t.get('colorful', {})
    environment = t.get('environment', {})
    at = t.get('at', {})
    build = t.get('build', {})
    stack = t.get('stack', {})

    # Hero section
    html = html.replace(
        '<div class="hi-hero-badge"></div>你好，我是 <span class="gradient-text">Ray</span></h1>',
        f'<div class="hi-hero-badge">{hero.get("badge", "")}</div>{hero.get("title", "Hi3861")}</h1>'
    )
    html = html.replace(
        '<p class="hi-hero-desc"></p>',
        f'<p class="hi-hero-desc">{hero.get("desc", "")}</p>'
    )
    html = html.replace(
        '<a class="button" href="https://github.com/Rayawa/Hi3861" target="_blank" rel="noopener"></a>',
        f'<a class="button" href="https://github.com/Rayawa/Hi3861" target="_blank" rel="noopener">{hero.get("repo", "")}</a>'
    )
    html = html.replace(
        '<a class="button-outline" href="openharmony-readme.html"></a>',
        f'<a class="button-outline" href="openharmony-readme.html">{hero.get("readme", "")}</a>'
    )

    # Overview cards (4 cards)
    ov_keys = ['traffic', 'colorful', 'environment', 'at']
    for i, key in enumerate(ov_keys):
        ov = overview.get(key, {})
        old = f'''<article class="hi-overview-card">
          <div class="hi-overview-index">{f"0{i+1}"}</div>
          <h2></h2>
          <p></p>
        </article>'''
        new = f'''<article class="hi-overview-card">
          <div class="hi-overview-index">{f"0{i+1}"}</div>
          <h2>{ov.get("title", "")}</h2>
          <p>{ov.get("desc", "")}</p>
        </article>'''
        html = html.replace(old, new, 1)

    # Structure section
    html = html.replace(
        '''<section class="hi-panel">
      <div class="hi-panel-head">
        <h2></h2>
        <p></p>
      </div>
      <pre class="hi-tree"></pre>
    </section>''',
        f'''<section class="hi-panel">
      <div class="hi-panel-head">
        <h2>{structure.get("title", "")}</h2>
        <p>{structure.get("desc", "")}</p>
      </div>
      <pre class="hi-tree">{structure.get("tree", "")}</pre>
    </section>'''
    )

    # Module 1: Traffic
    html = html.replace(
        '''<section class="hi-module hi-module-traffic">
      <div class="hi-module-head">
        <span class="hi-module-index">01</span>
        <div>
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
      </div>
      <article class="hi-card hi-path-card">
        <h3></h3>
        <p></p>
      </article>
    </section>''',
        f'''<section class="hi-module hi-module-traffic">
      <div class="hi-module-head">
        <span class="hi-module-index">01</span>
        <div>
          <h2>{traffic.get("title", "")}</h2>
          <p>{traffic.get("desc", "")}</p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3>{traffic.get("hardwareTitle", "")}</h3>
          <div>{traffic.get("hardware", "")}</div>
        </article>
        <article class="hi-card">
          <h3>{traffic.get("projectTitle", "")}</h3>
          <div>{traffic.get("projects", "")}</div>
        </article>
      </div>
      <article class="hi-card hi-path-card">
        <h3>{traffic.get("pathTitle", "")}</h3>
        <p>{traffic.get("path", "")}</p>
      </article>
    </section>'''
    )

    # Module 2: Colorful
    html = html.replace(
        '''<section class="hi-module hi-module-colorful">
      <div class="hi-module-head">
        <span class="hi-module-index">02</span>
        <div>
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
      </div>
      <article class="hi-card hi-path-card">
        <h3></h3>
        <p></p>
      </article>
    </section>''',
        f'''<section class="hi-module hi-module-colorful">
      <div class="hi-module-head">
        <span class="hi-module-index">02</span>
        <div>
          <h2>{colorful.get("title", "")}</h2>
          <p>{colorful.get("desc", "")}</p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3>{colorful.get("hardwareTitle", "")}</h3>
          <div>{colorful.get("hardware", "")}</div>
        </article>
        <article class="hi-card">
          <h3>{colorful.get("projectTitle", "")}</h3>
          <div>{colorful.get("projects", "")}</div>
        </article>
      </div>
      <article class="hi-card hi-path-card">
        <h3>{colorful.get("pathTitle", "")}</h3>
        <p>{colorful.get("path", "")}</p>
      </article>
    </section>'''
    )

    # Module 3: Environment
    html = html.replace(
        '''<section class="hi-module hi-module-environment">
      <div class="hi-module-head">
        <span class="hi-module-index">03</span>
        <div>
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
      </div>
      <article class="hi-card">
        <h3></h3>
        <div></div>
      </article>
    </section>''',
        f'''<section class="hi-module hi-module-environment">
      <div class="hi-module-head">
        <span class="hi-module-index">03</span>
        <div>
          <h2>{environment.get("title", "")}</h2>
          <p>{environment.get("desc", "")}</p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3>{environment.get("hardwareTitle", "")}</h3>
          <div>{environment.get("hardware", "")}</div>
        </article>
        <article class="hi-card">
          <h3>{environment.get("projectTitle", "")}</h3>
          <div>{environment.get("projects", "")}</div>
        </article>
      </div>
      <article class="hi-card">
        <h3>{environment.get("featureTitle", "")}</h3>
        <div>{environment.get("features", "")}</div>
      </article>
    </section>'''
    )

    # Module 4: AT
    html = html.replace(
        '''<section class="hi-module hi-module-at">
      <div class="hi-module-head">
        <span class="hi-module-index">04</span>
        <div>
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
        <article class="hi-card">
          <h3></h3>
          <div></div>
        </article>
      </div>
    </section>''',
        f'''<section class="hi-module hi-module-at">
      <div class="hi-module-head">
        <span class="hi-module-index">04</span>
        <div>
          <h2>{at.get("title", "")}</h2>
          <p>{at.get("desc", "")}</p>
        </div>
      </div>
      <div class="hi-module-grid">
        <article class="hi-card">
          <h3>{at.get("projectTitle", "")}</h3>
          <div>{at.get("project", "")}</div>
        </article>
        <article class="hi-card">
          <h3>{at.get("exampleTitle", "")}</h3>
          <div>{at.get("example", "")}</div>
        </article>
      </div>
    </section>'''
    )

    # Build & Stack panel
    html = html.replace(
        '''<section class="hi-panel hi-panel-double">
      <article class="hi-card">
        <h2></h2>
        <div></div>
      </article>
      <article class="hi-card">
        <h2></h2>
        <div></div>
      </article>
    </section>''',
        f'''<section class="hi-panel hi-panel-double">
      <article class="hi-card">
        <h2>{build.get("title", "")}</h2>
        <div>{build.get("content", "")}</div>
      </article>
      <article class="hi-card">
        <h2>{stack.get("title", "")}</h2>
        <div>{stack.get("content", "")}</div>
      </article>
    </section>'''
    )

    return html


def main():
    print("=== Filling empty content in Hi3861.html ===\n")

    ohos_i18n = parse_i18n_js('static/js/i18n-openharmony.js')
    if not ohos_i18n:
        print("FATAL: Failed to parse i18n-openharmony.js")
        sys.exit(1)

    for lang in ['zh', 'en', 'fr']:
        trans = ohos_i18n.get(lang, {})
        if lang == 'zh':
            path = os.path.join(BASE, 'projects/Hi3861.html')
        elif lang == 'en':
            path = os.path.join(BASE, 'en/projects/Hi3861.html')
        else:
            path = os.path.join(BASE, 'fr/projects/Hi3861.html')

        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()

        html = fill_hi3861(html, trans)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Filled: {path}")

    print("\n=== Done! ===")


if __name__ == '__main__':
    main()
