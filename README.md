# Rayawa.github.io - Personal Portfolio Website

English | [简体中文](README_zh.md)


![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Last Commit](https://img.shields.io/github/last-commit/Rayawa/Rayawa.github.io)
![Multilingual](https://img.shields.io/badge/Languages-Chinese%20%7C%20English%20%7C%20French-blue)
![Responsive](https://img.shields.io/badge/Responsive-Web%20first-green)
![Static](https://img.shields.io/badge/Build-Zero%20dependency%20static%20site-orange)

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
├── index.html                  # Chinese home (default language, site root)
├── thanks.html                 # Acknowledgments
├── 404.html                    # 404 error page
├── favicon.ico                 # Site icon
├── ray.jpg                     # Portrait / social sharing image (OG Image)
├── README.md                   # Project documentation
│
├── .github/
│   └── workflows/
│       └── jekyll-gh-pages.yml # GitHub Pages automatic build and deployment workflow
│
├── en/                         # English version (mirrors the root structure)
│   ├── index.html              # English home
│   ├── thanks.html             # English acknowledgments
│   ├── life/
│   │   ├── books.html          # English reading list
│   │   └── piano.html          # English piano page
│   └── projects/               # English project pages (23, matching Chinese pages)
│
├── fr/                         # French version (same structure as English)
│   ├── index.html
│   ├── thanks.html
│   ├── life/
│   │   ├── books.html
│   │   └── piano.html
│   └── projects/               # French project pages (23)
│
├── life/                       # Chinese life pages
│   ├── books.html              # Reading list
│   └── piano.html              # Piano page
│
├── projects/                   # Chinese project pages (23)
│   ├── Dashboard.html          # Overview of three Dashboard clients
│   ├── QiZhi01.html            # QiZhi 01 · Ascend AI full stack
│   ├── AstraPlusCar.html       # AstraPlusCar · Smart vehicle
│   ├── ElvaCos.html            # ElvaCos · Offline personal management for cosplayers
│   ├── ComplexSweeper.html     # ComplexSweeper · Native ports for three platforms
│   ├── Loci.html               # Local place memories (in development)
│   ├── Biology.html            # Biology projects
│   ├── gene.html               # Genetic engineering: interactive Agrobacterium transformation lab
│   ├── Hi3861.html             # Hi3861 embedded development
│   ├── Hi3861-readme.html      # Hi3861 documentation (renders OpenHarmony README)
│   ├── idv.html                # Identity V launcher
│   ├── SchoolPapers.html       # School papers
│   ├── RockPaperScissors.html  # Rock-paper-scissors detection
│   ├── WeakSignal.html         # Weak electrical signal measurement using optical-lever amplification
│   ├── SmartShed.html          # SmartShed smart greenhouse
│   ├── SPM.html                # Sweet Potato Mod
│   ├── TextVideoGen.html       # TextVideoGen local video production workspace
│   ├── PetSnap.html            # MindSpore-based cat/dog recognition
│   ├── CarRent.html            # Linked-list car rental management
│   ├── CommChain.html          # C# digital communication simulator
│   ├── GaokaoQuery.html        # Gaokao result query tool
│   ├── xxh.html                # XXH emotional compatibility test
│   └── YoloSecurityPlatform.html  # Intelligent security remote monitoring platform
│
├── docs/                       # Content maintenance records
│   └── maintenance-2026-10-20.md
│
└── static/                     # Static assets (shared components)
    ├── css/                    # Stylesheets (21)
    │   ├── common.css              # Shared styles (navigation, footer, particles, transitions, etc.)
    │   ├── subpage.css             # Shared subpage styles
    │   ├── project-layout.css      # Shared project layouts (brief/guide/category tags)
    │   ├── project-showcase.css    # ps-* showcase project styles
    │   ├── app-projects.css        # ElvaCos, Loci, and ComplexSweeper showcase styles
    │   ├── markdown-page.css       # Markdown rendering page styles
    │   ├── index.css               # Home styles
    │   ├── 404.css                 # 404 page styles
    │   ├── ascend310.css           # Ascend project styles
    │   ├── astracar.css            # AstraPlusCar project styles
    │   ├── gene.css                # Genetic engineering project styles
    │   ├── hi3861.css              # Hi3861 project styles
    │   ├── hi3861-readme.css       # Hi3861 documentation page styles
    │   ├── rockpaperscissors.css   # Rock-paper-scissors project styles
    │   ├── signal.css              # Weak electrical signal project styles
    │   ├── smartshed.css           # Smart greenhouse project styles
    │   ├── spm.css                 # Sweet Potato Mod styles
    │   ├── xxh.css                 # XXH test styles
    │   ├── books.css               # Reading list styles
    │   ├── piano.css               # Piano page styles
    │   └── drawing.css             # Drawing theme styles (reserved, not referenced yet)
    │
    ├── js/                     # JavaScript files (8)
    │   ├── common.js               # Shared scripts (particles, floating tools, transitions, scroll reveal)
    │   ├── navbar.js               # Navigation injection with language switching
    │   ├── footer.js               # Footer injection
    │   ├── index.js                # Home script (loading, gallery carousel, contact form, parallax)
    │   ├── gene.js                 # Genetic engineering interactive lab logic
    │   ├── xxh.js                  # XXH test logic
    │   ├── signal-lightbox.js      # Signal project lightbox (keyboard/previous/next)
    │   └── hi3861-readme.js        # Fetch and render the OpenHarmony README.md
    │
    └── resources/              # Resource files
        ├── cn.svg / uk.svg / fr.svg  # Language-switch flag icons
        ├── xxh.py                    # XXH supporting script
        ├── apps/                     # ElvaCos app screenshots
        ├── bio/                      # Biology images and paper PDFs
        ├── dashboard/                # Dashboard app icon
        ├── main_page/                # Home card images (including generated ElvaCos, Loci, ComplexSweeper illustrations)
        │   └── gallery/              # Photography gallery
        ├── openharmony/              # Hi3861 project documents (README.md / PDF / PPTX)
        ├── piano/                    # Piano sheet-music images
        ├── rps/                      # Rock-paper-scissors demo GIFs
        ├── signal/                   # Signal project materials (.ino / .fzz / schematics / report)
        └── spm/                      # Sweet Potato Mod assets
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
   # Or
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
