# Rayawa.github.io - Personal Portfolio Website

English | [简体中文](README_zh.md)


![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Last Commit](https://img.shields.io/github/last-commit/Rayawa/Rayawa.github.io)
![Multilingual](https://img.shields.io/badge/多语言-中文|英文|法文-blue)
![Responsive](https://img.shields.io/badge/响应式-网页优先-green)
![Static](https://img.shields.io/badge/构建-零依赖静态站点-orange)

## 🌐 Project overview

A personal portfolio website deployed on GitHub Pages, presenting technical projects, creative work, and an introduction. Its multilingual architecture supports Chinese, English, and French, with responsive layouts and a polished user interface.

**Live site:** [https://rayawa.github.io](https://rayawa.github.io)
**Primary domain:** [https://rayawa.top](https://rayawa.top)

> This is a **static site with no local build step**. The repository root is the publishing directory; pushing to `master` triggers automatic GitHub Actions deployment without local packaging.

## 🚀 Features

### 🌍 Multilingual architecture
- **Chinese** (`index.html`): Site root and default language
- **English** (`en/index.html`): Separate English directory mirroring the full site structure
- **French** (`fr/index.html`): Separate French directory mirroring the full site structure
- **Static translations**: Runtime i18n rendering is removed; text is written directly in HTML, so the first screen does not wait for a dictionary to load
- **Search-engine support**: Each page embeds reciprocal `canonical` and `hreflang` links (`zh-CN` / `en` / `fr` / `x-default`)

### 📱 Responsive design
- Mobile-first design
- Adapts to phones, tablets, and desktops
- Touch-friendly interactions, with reduced particle and other heavy effects on mobile
- Optimized loading performance

### 🎨 Visual features
- Home loading animation: Brand wordmark typing, SVG progress ring, and percentage indicator
- Glassmorphism cards (`glass-card`) and progressive scroll reveal animations (`reveal`)
- Floating utility buttons: Back to top with a scroll progress ring, and page refresh
- Card-based project layouts and consistent tags
- Dark theme for comfortable viewing
- Page fade-in/fade-out transitions and gradual language-switch transitions

### 📊 Content modules
1. **Introduction**: Basic information, current focus, technologies and fields, and selected achievements
2. **Projects**: Primary project cards and secondary mini-cards, some linking to standalone sites. Primary projects are dashboard, AstraPlusCar, ElvaCos, WeakSignal, QiZhi01, ComplexSweeper, SmartShed, and Loci, followed by TextVideoGen, biology, SPM, Rock Paper Scissors, campus security, and Difficult Rocket.
3. **Photography and life**: Photo gallery, piano, reading list, drawing, and other interests
4. **Contact**: Social links including GitHub, Xiaohongshu, and Bilibili
5. **Acknowledgments page** (`thanks.html`) and **404 page** (`404.html`)

### 🔍 SEO and sharing
- Reciprocal multilingual `canonical` and `hreflang` links
- Open Graph and Twitter Card metadata, with `ray.jpg` as the sharing image
- Home page `<link rel="prefetch">` hints for key project pages to accelerate navigation

## 📁 Project structure

```
Rayawa.github.io/
├── index.html                  # 中文主页（默认语言，站点根）
├── thanks.html                 # 致谢页面
├── 404.html                    # 404 错误页面
├── favicon.ico                 # 站点图标
├── ray.jpg                     # 头像 / 社交分享图（OG Image）
├── README.md                   # 项目说明文档
│
├── .github/
│   └── workflows/
│       └── jekyll-gh-pages.yml # GitHub Pages 自动构建与部署工作流
│
├── en/                         # 英文版本目录（结构镜像根目录）
│   ├── index.html              # 英文主页
│   ├── thanks.html             # 英文致谢页面
│   ├── life/
│   │   ├── books.html          # 英文书单页面
│   │   └── piano.html          # 英文钢琴页面
│   └── projects/               # 英文项目页（23 个，与中文版一一对应）
│
├── fr/                         # 法文版本目录（结构与英文版一致）
│   ├── index.html
│   ├── thanks.html
│   ├── life/
│   │   ├── books.html
│   │   └── piano.html
│   └── projects/               # 法文项目页（23 个）
│
├── life/                       # 中文生活页面
│   ├── books.html              # 书单页面
│   └── piano.html              # 钢琴页面
│
├── projects/                   # 中文项目页面（23 个）
│   ├── Dashboard.html          # 看板三端客户端概览
│   ├── QiZhi01.html            # 启智01 · 昇腾AI全栈
│   ├── AstraPlusCar.html       # AstraPlusCar · 智能小车
│   ├── ElvaCos.html            # 绮秀 · Coser 离线个人管理
│   ├── ComplexSweeper.html     # 复扫雷 · 三个平台的原生移植
│   ├── Loci.html               # 本地地点记忆（开发中）
│   ├── Biology.html            # 生物学项目
│   ├── gene.html               # 基因工程：农杆菌转化法交互实验室
│   ├── Hi3861.html             # Hi3861 嵌入式开发
│   ├── Hi3861-readme.html      # Hi3861 项目说明（渲染 OpenHarmony README）
│   ├── idv.html                # 第五人格，启动！
│   ├── SchoolPapers.html       # 学校论文
│   ├── RockPaperScissors.html  # 石头剪刀布检测
│   ├── WeakSignal.html         # 基于光杠杆放大的微弱电信号测量系统
│   ├── SmartShed.html          # 智慧大棚 SmartShed
│   ├── SPM.html                # Sweet Potato Mod
│   ├── TextVideoGen.html       # TextVideoGen 本地视频生产工作区
│   ├── PetSnap.html            # 基于 MindSpore 的猫狗识别
│   ├── CarRent.html            # 基于链表的汽车租赁管理系统
│   ├── CommChain.html          # 基于 C# 的数字通信系统模拟器
│   ├── GaokaoQuery.html        # 高考成绩便捷查询工具
│   ├── xxh.html                # XXH 情感契合度测试
│   └── YoloSecurityPlatform.html  # 智能安防远程监控平台
│
├── docs/                       # 内容维护记录
│   └── maintenance-2026-10-20.md
│
└── static/                     # 静态资源（公共组件）
    ├── css/                    # 样式文件（21 个）
    │   ├── common.css              # 通用样式（导航、页脚、粒子背景、页面转场等）
    │   ├── subpage.css             # 子页面通用样式
    │   ├── project-layout.css      # 项目页共用版式（速览/导览/分类标签）
    │   ├── project-showcase.css    # ps-* 展示型项目页样式
    │   ├── app-projects.css        # 绮秀、Loci 与复扫雷展示样式
    │   ├── markdown-page.css       # Markdown 渲染页样式
    │   ├── index.css               # 主页样式
    │   ├── 404.css                 # 404 页面样式
    │   ├── ascend310.css           # 昇腾项目样式
    │   ├── astracar.css            # AstraPlusCar 项目样式
    │   ├── gene.css                # 基因工程项目样式
    │   ├── hi3861.css              # Hi3861 项目样式
    │   ├── hi3861-readme.css       # Hi3861 说明页样式
    │   ├── rockpaperscissors.css   # 石头剪刀布项目样式
    │   ├── signal.css              # 微弱电信号项目样式
    │   ├── smartshed.css           # 智慧大棚项目样式
    │   ├── spm.css                 # Sweet Potato Mod 样式
    │   ├── xxh.css                 # XXH 测试样式
    │   ├── books.css               # 书单页面样式
    │   ├── piano.css               # 钢琴页面样式
    │   └── drawing.css             # 绘画主题样式（暂未被页面引用，预留）
    │
    ├── js/                     # JavaScript 文件（8 个）
    │   ├── common.js               # 通用脚本（粒子背景、悬浮工具、页面转场与滚动揭示）
    │   ├── navbar.js               # 导航栏动态注入（含多语言切换）
    │   ├── footer.js               # 页脚动态注入
    │   ├── index.js                # 主页脚本（加载动画、画廊轮播、联系表单、视差）
    │   ├── gene.js                 # 基因工程交互实验室逻辑
    │   ├── xxh.js                  # XXH 测试逻辑
    │   ├── signal-lightbox.js      # 信号项目图片灯箱（键盘/前后切换）
    │   └── hi3861-readme.js        # 拉取并渲染 OpenHarmony README.md
    │
    └── resources/              # 资源文件
        ├── cn.svg / uk.svg / fr.svg  # 语言切换旗帜图标
        ├── xxh.py                    # XXH 项目配套脚本
        ├── apps/                     # 绮秀应用界面截图
        ├── bio/                      # 生物学图片与论文 PDF
        ├── dashboard/                # 看板应用图标
        ├── main_page/                # 首页卡片配图（含绮秀、Loci、复扫雷生成插画）
        │   └── gallery/              # 摄影长廊照片
        ├── openharmony/              # Hi3861 项目文档（README.md / PDF / PPTX）
        ├── piano/                    # 钢琴曲谱图片
        ├── rps/                      # 石头剪刀布演示 GIF
        ├── signal/                   # 信号项目资料（.ino / .fzz / 原理图 / 报告）
        └── spm/                      # Sweet Potato Mod 素材
```

> The site has **82 HTML pages** (28 Chinese + 27 English + 27 French), including 23 project pages per language.

## 🛠️ Technology stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), without frameworks or build steps
- **Architecture**: Static multilingual architecture without runtime dynamic i18n
- **Shared components**: Script-injected navigation and footer, maintained from one source across the site
- **Icons**: Font Awesome 6.4.0 (CDN) and inline SVG
- **Fonts**: Google Fonts (Inter / JetBrains Mono), with system fallbacks
- **Animation**: CSS3 transitions and animations, particles.js backgrounds
- **Interactions**: Markdown rendering through `marked`, image lightboxes, and interactive experiment simulations
- **Deployment**: Automatic GitHub Actions + GitHub Pages build and publication

## 🚦 Quick start

### Local development
1. Clone the repository:
   ```bash
   git clone https://github.com/Rayawa/Rayawa.github.io.git
   cd Rayawa.github.io
   ```

2. Preview locally (**an HTTP server is recommended**: `common.js` and other files use absolute `/static/...` paths,
   and `hi3861-readme.js` reads Markdown through `fetch`, which fails under `file://`):
   ```bash
   python3 -m http.server 8000
   # 或
   npx http-server -p 8000
   ```

3. Visit `http://localhost:8000` to view the site.

### Deployment
GitHub Actions deploys the site automatically. See `.github/workflows/jekyll-gh-pages.yml`:
- Pushes to `master` trigger a build.
- The workflow can also be started manually from the Actions tab (`workflow_dispatch`).
- Build outputs are uploaded through `actions/upload-pages-artifact` and published by `actions/deploy-pages`.
- Visit https://rayawa.github.io ; custom domain: https://rayawa.top

## 📝 Updating content

### Add a page
1. Create an HTML file in the corresponding language directory.
   - Chinese: Root or the appropriate subdirectory (`projects/`, `life/`)
   - English: Under `en/`
   - French: Under `fr/`

2. Include the shared navigation and footer (**there are no separate component HTML files anymore**):
   ```html
   <div id="site-navbar"></div>
   <script src="/static/js/navbar.js"></script>
   ...
   <div id="site-footer"></div>
   <script src="/static/js/footer.js"></script>
   ```
   `navbar.js` / `footer.js` automatically derive the language prefix and relative hierarchy from `document.documentElement.lang`
   and the current path, so links do not need manual maintenance.

3. Complete the SEO head (`canonical` and three `hreflang` entries), matching similar project pages.

4. Add page-specific styles if needed.
   - Create a CSS file in `static/css/`.
   - Reference the correct path in HTML.

5. **Choose how to introduce each project according to its nature, rather than using one template**, writing each language separately:
   - **Engineering systems / demos** (such as `SmartShed`, `AstraPlusCar`, `ascend310`) need background for visitors to understand them;
     provide an overview through `project-brief` and a purpose/usage guide through `project-guide`.
   - **Works / archives** (such as `biology`, `ncut_papers`, `signal`) have self-contained content;
     use a one-sentence hero introduction and topic-based sections, without an overview box.
   - **Pages that are the finished product** (such as `gene`, `idv`, `xxh`) should be usable immediately;
     explain what they are in the hero, move technical details below, and **omit the overview box**.
   - The criterion is whether visitors can understand what the page is from its content alone.
   Home project cards should likewise describe actual functionality. Mark the status of unpublished project materials without placeholders or speculative achievements.

### Update multilingual content
The static multilingual architecture requires separate updates:
- Chinese: Edit the corresponding root files.
- English: Edit corresponding files under `en/`.
- French: Edit corresponding files under `fr/`.

### Add static assets
1. Shared assets: Add to the appropriate subdirectory in `static/`.
2. Project assets: Organize by project under `static/resources/<project>/`.
3. Images: Optimize and compress first, consistently using `/static/resources/...` paths.

## 🌟 Architecture highlights

### 1. Multilingual architecture
- **Static translations**: Replace dynamic i18n with directly embedded text to improve loading speed.
- **Separate directories**: Each language has its own mirrored directory structure for easier maintenance.
- **Automatic paths**: Navigation and footer scripts derive relative hierarchy automatically, reducing cross-language link errors.
- **SEO alignment**: Three language versions declare one another through `hreflang` to avoid duplicate-content penalties.

### 2. Component design
- **Shared navigation**: Injected by `static/js/navbar.js`, including language switching and mobile menus.
- **Shared footer**: Injected by `static/js/footer.js`, with all three languages maintained centrally.
- **Modular styles**: `common.css` / `subpage.css` provide the base layer, while each page has its own stylesheet.
- **Script organization**: JavaScript is separated by page function to avoid bloated code.

### 3. Performance optimization
- **No local build**: No bundling or compilation; pushes publish directly, while Pages only performs the static hosting build.
- **Prefetching**: Home uses `<link rel="prefetch">` for key project pages.
- **On-demand loading**: Heavy logic such as lightboxes and Markdown rendering loads only on relevant pages.
- **Mobile adaptation**: Small screens automatically reduce particle counts and other effects.
- **Encoding**: UTF-8 ensures correct multilingual display.

### 4. Maintainability
- **Clear directories**: Files organized by language and function.
- **Single data source**: Navigation, footer, and language lists each have one definition.
- **Documentation**: Detailed README and individual project descriptions.
- **Version control**: Complete Git history.

### 5. Accessibility
- **Semantic HTML**: Appropriate HTML5 elements.
- **ARIA support**: Interactive components such as lightboxes use `role="dialog"` to improve screen-reader compatibility.
- **Keyboard navigation**: Full keyboard operations, including arrow keys and ESC.
- **Responsive design**: Adapts to different devices and screen sizes.

## 🔧 Refactoring history

### Completed refactoring
1. **Static i18n**: Embedded translated text directly in HTML and removed the i18n.js dependency.
2. **Directory reorganization**: Created separate `en/` and `fr/` language directories.
3. **Path fixes**: Automatically repaired relative paths for all static assets and links.
4. **Component consolidation**: Replaced separate HTML fragments for navigation and footer with script injection, eliminating duplicates.
5. **HTML cleanup**: Fixed HTML tags and structural issues.
6. **Separate dashboard site**: Moved the Huawei AppGallery dashboard to `dashboard.rayawa.top`, retaining a project overview and direct entry on the main site.
7. **New project pages**: Added SmartShed (smart greenhouse), RockPaperSissors (rock-paper-scissors detection), and ascend310 (Ascend AI full stack).
8. **Signal project update**: Added schematics, wiring diagrams, lightbox browsing, and project documents.

### Planned improvements
1. **Asset locations**: Move page-specific JS/CSS into the corresponding page directories.
2. **Build workflow**: Introduce building and compression (currently there is no local build; pushes publish directly).
3. **Performance monitoring**: Integrate analysis and optimization tools.
4. **Test coverage**: Add automated tests to verify structural and link consistency across the three languages.
5. **Image formats**: Convert large home and gallery images to WebP/AVIF for further size reduction.

## 🤝 Contributing

Issues and pull requests are welcome:

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

### Contribution notes
- **Language synchronization**: Update all language versions when changing functionality.
- **Paths**: Check that relative paths work from different directories.
- **Components**: Test all pages using `navbar.js` / `footer.js` when changing them.
- **Encoding**: Use UTF-8 for multilingual compatibility.
- **Local verification**: Browse affected pages through `python3 -m http.server` before committing.

## 📄 License

This project uses the MIT License.


---

**Last updated**: October 20, 2026
**Architecture version**: v3.0 (static multilingual content · script-injected components)
**Technology stack**: HTML5, CSS3, JavaScript, GitHub Pages


## 2026-10-20 content maintenance

The current focus and technical fields on all three home pages now reflect public projects, retaining the handwritten introduction. Added
`projects/Dashboard.html` and its English/French versions to introduce the HarmonyOS, Apple, and Android
native clients. The home dashboard card links to this overview, which retains direct links to the product site and all three clients' source repositories.
ComplexSweeper now reflects the unified repository, two modes, and the 1.2.0 scope; PetSnap reflects the current HarmonyOS
client; AstraPlusCar reflects short video segments and three recovery attempts while retaining the limitations on wireless stability and physical-vehicle validation.
Loci and ElvaCos retain their development / Beta status after verification.

For supporting evidence and unfinished capabilities, see the [maintenance record](docs/maintenance-2026-10-20.md).
