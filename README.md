# Rayawa.github.io - 个人作品集网站

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Last Commit](https://img.shields.io/github/last-commit/Rayawa/Rayawa.github.io)
![多语言](https://img.shields.io/badge/多语言-中文|英文|法文-blue)
![响应式](https://img.shields.io/badge/响应式-网页优先-green)
![纯静态](https://img.shields.io/badge/构建-零依赖静态站点-orange)

## 🌐 项目简介

这是一个基于 GitHub Pages 部署的个人作品集网站，展示 Ray Chen（Rayawa）的技术项目、个人作品和简介。网站采用现代化的多语言架构，支持中文、英文、法文三种语言，具有响应式设计和优雅的用户界面。

**在线访问：** [https://rayawa.github.io](https://rayawa.github.io)
**主域名：** [https://rayawa.top](https://rayawa.top)

> 站点为**零构建纯静态站点**：仓库根目录即发布目录，直接推送到 `master` 分支即由 GitHub Actions 自动发布，无需本地打包。

## 🚀 功能特性

### 🌍 多语言架构
- **中文版本** (`index.html`) - 站点根目录，默认语言
- **英文版本** (`en/index.html`) - 独立英文目录，完整镜像站点结构
- **法文版本** (`fr/index.html`) - 独立法文目录，完整镜像站点结构
- **静态化翻译** - 取消运行时动态 i18n 渲染，文本直接写入 HTML，首屏无需等待字典加载
- **搜索引擎友好** - 每个页面内嵌 `canonical` 与 `hreflang`（`zh-CN` / `en` / `fr` / `x-default`）互指链接

### 📱 响应式设计
- 移动端优先的设计理念
- 自适应各种屏幕尺寸（手机、平板、桌面）
- 触摸友好的交互界面，移动端精简粒子等重特效
- 优化的加载性能

### 🎨 视觉特色
- 首页加载动画：品牌字标打字 + SVG 进度环 + 百分比提示
- 玻璃拟态卡片（`glass-card`）与滚动渐进揭示动画（`reveal`）
- 悬浮工具按钮：回到顶部（带滚动进度环）与页面刷新
- 卡片式项目布局与统一的标签体系
- 暗色主题设计，护眼舒适
- 页面切换淡入/淡出转场，语言切换带渐变过渡

### 📊 内容模块
1. **个人简介** - 基本信息、当前专注、技术栈与领域、部分成就
2. **项目展示** - 主要项目卡片 + 次要项目迷你卡片，部分外链至独立站点
3. **摄影与生活** - 相册长廊、钢琴、书单、绘画等个人兴趣
4. **联系方式** - GitHub / 小红书 / B站等社交链接
5. **致谢页** (`thanks.html`) 与 **404 页** (`404.html`)

### 🔍 SEO 与分享
- `canonical` + `hreflang` 多语言互指
- Open Graph 与 Twitter Card 元数据（使用 `ray.jpg` 作为分享图）
- 首页对重点项目页做 `<link rel="prefetch">` 预取，加快点击跳转

## 📁 项目结构

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
│   └── projects/               # 英文项目页（19 个，与中文版一一对应）
│
├── fr/                         # 法文版本目录（结构与英文版一致）
│   ├── index.html
│   ├── thanks.html
│   ├── life/
│   │   ├── books.html
│   │   └── piano.html
│   └── projects/               # 法文项目页（19 个）
│
├── life/                       # 中文生活页面
│   ├── books.html              # 书单页面
│   └── piano.html              # 钢琴页面
│
├── projects/                   # 中文项目页面（19 个）
│   ├── QiZhi01.html            # 启智01 · 昇腾AI全栈
│   ├── AstraPlusCar.html       # AstraPlusCar · 智能小车
│   ├── Biology.html            # 生物学项目
│   ├── gene.html               # 基因工程：农杆菌转化法交互实验室
│   ├── Hi3861.html             # Hi3861 嵌入式开发
│   ├── Hi3861-readme.html      # Hi3861 项目说明（渲染 OpenHarmony README）
│   ├── idv.html                # 第五人格，启动！
│   ├── SchoolPapers.html       # 学校论文
│   ├── RockPaperScissors.html  # 石头剪刀布检测
│   ├── WeekSignal.html         # 基于光杠杆放大的微弱电信号测量系统
│   ├── SmartShed.html          # 智慧大棚 SmartShed
│   ├── SPM.html                # Sweet Potato Mod
│   ├── VideoTextGen.html       # VideoTextGen 本地视频生产工作区
│   ├── PetSnap.html            # 基于 MindSpore 的猫狗识别
│   ├── CarRent.html            # 基于链表的汽车租赁管理系统
│   ├── CommChain.html          # 基于 C# 的数字通信系统模拟器
│   ├── GaokaoQuery.html        # 高考成绩便捷查询工具
│   ├── xxh.html                # XXH 情感契合度测试
│   └── YoloSecurityPlatform.html  # 智能安防远程监控平台
│
└── static/                     # 静态资源（公共组件）
    ├── css/                    # 样式文件（20 个）
    │   ├── common.css              # 通用样式（导航、页脚、粒子背景、页面转场等）
    │   ├── subpage.css             # 子页面通用样式
    │   ├── project-layout.css      # 项目页共用版式（速览/导览/分类标签）
    │   ├── project-showcase.css    # ps-* 展示型项目页样式
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
        ├── bio/                      # 生物学图片与论文 PDF
        ├── dashboard/                # 看板应用图标
        ├── main_page/                # 首页卡片配图
        │   └── gallery/              # 摄影长廊照片
        ├── openharmony/              # Hi3861 项目文档（README.md / PDF / PPTX）
        ├── piano/                    # 钢琴曲谱图片
        ├── rps/                      # 石头剪刀布演示 GIF
        ├── signal/                   # 信号项目资料（.ino / .fzz / 原理图 / 报告）
        └── spm/                      # Sweet Potato Mod 素材
```

> 站点共 **58 个 HTML 页面**（中文 20 + 英文 19 + 法文 19）。

## 🛠️ 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)，无框架、无构建步骤
- **架构**：多语言静态化架构，取消运行时动态 i18n
- **公共组件**：导航栏与页脚由脚本注入，全站单一来源维护
- **图标**：Font Awesome 6.4.0（CDN）+ 内联 SVG
- **字体**：Google Fonts（Inter / JetBrains Mono），带系统字体回退
- **动效**：CSS3 过渡与动画、particles.js 粒子背景
- **交互增强**：`marked` 渲染 Markdown、图片灯箱、交互式实验模拟
- **部署**：GitHub Actions + GitHub Pages 自动构建发布

## 🚦 快速开始

### 本地开发
1. 克隆仓库：
   ```bash
   git clone https://github.com/Rayawa/Rayawa.github.io.git
   cd Rayawa.github.io
   ```

2. 本地预览（**推荐用 HTTP 服务器**，`common.js` 等使用绝对路径 `/static/...`，
   且 `hi3861-readme.js` 通过 `fetch` 读取 Markdown，`file://` 协议下会失败）：
   ```bash
   python3 -m http.server 8000
   # 或
   npx http-server -p 8000
   ```

3. 访问 `http://localhost:8000` 查看网站

### 部署
网站通过 GitHub Actions 自动部署，工作流见 `.github/workflows/jekyll-gh-pages.yml`：
- 推送到 `master` 分支即触发构建
- 也可在 Actions 标签页手动触发（`workflow_dispatch`）
- 构建产物经 `actions/upload-pages-artifact` 上传并由 `actions/deploy-pages` 发布
- 访问 https://rayawa.github.io ，自定义域名：https://rayawa.top

## 📝 内容更新

### 添加新页面
1. 在对应语言目录创建新的 HTML 文件
   - 中文页面：根目录或对应子目录（`projects/`、`life/`）
   - 英文页面：`en/` 目录下
   - 法文页面：`fr/` 目录下

2. 引入公共导航栏与页脚（**不再有独立的组件 HTML 文件**）：
   ```html
   <div id="site-navbar"></div>
   <script src="/static/js/navbar.js"></script>
   ...
   <div id="site-footer"></div>
   <script src="/static/js/footer.js"></script>
   ```
   `navbar.js` / `footer.js` 会根据 `document.documentElement.lang` 与当前路径自动
   计算语言前缀和相对层级，无需手工维护链接。

3. 补全 SEO 头部（`canonical` + 三条 `hreflang`），与同类的项目页保持一致。

4. 添加页面特定样式（如果需要）
   - 在 `static/css/` 目录下创建新的 CSS 文件
   - 在 HTML 文件中引用正确的路径

5. **项目页不套统一模板，按项目性质选介绍方式**，三种语言分别撰写：
   - **工程系统 / demo 类**（如 `SmartShed`、`AstraPlusCar`、`ascend310`）访客需要背景才能看懂，
     用 `project-brief`（速览）+ `project-guide`（用途与使用）做导览。
   - **作品 / 档案类**（如 `biology`、`ncut_papers`、`signal`）内容本身自足，
     直接用 hero 一句话点明 + 分主题章节，不加速览框。
   - **成品即页面类**（如 `gene`、`idv`、`xxh`）打开就要能用，
     只在 hero 说清是什么，技术说明收到页面下方，**不加速览框**。
   - 判断依据是：访客打开这页，光看内容能不能明白这是什么。
   首页项目卡片同样应概括实际功能。未公开的项目资料标明状态，不使用占位文案或臆测成果。

### 更新多语言内容
由于采用静态化多语言架构，需要分别更新：
- 中文内容：编辑根目录下的对应文件
- 英文内容：编辑 `en/` 目录下的对应文件
- 法文内容：编辑 `fr/` 目录下的对应文件

### 添加静态资源
1. 公共资源：添加到 `static/` 目录下对应子目录
2. 项目专属素材：按项目放入 `static/resources/<project>/`
3. 图片资源：优化压缩后添加，路径统一使用 `/static/resources/...`

## 🌟 架构亮点

### 1. 现代化多语言架构
- **静态化翻译**：取消动态 i18n，直接填入文本，提升加载速度
- **目录分离**：每种语言独立目录，结构一一镜像，易于维护
- **路径自愈**：导航栏与页脚脚本自动推导相对层级，跨语言链接不再易错
- **SEO 对齐**：三语版本通过 `hreflang` 互相声明，避免重复内容降权

### 2. 组件化设计
- **公共导航栏**：`static/js/navbar.js` 统一注入，含语言切换与移动端菜单
- **公共页脚**：`static/js/footer.js` 统一注入，三语文案集中维护
- **样式模块化**：`common.css` / `subpage.css` 提供基础层，各页面样式独立成文件
- **脚本组织**：JavaScript 按页面功能分离，避免代码臃肿

### 3. 性能优化
- **零本地构建**：无打包、无编译步骤，推送即发布；Pages 侧仅执行静态托管构建
- **资源预取**：首页对重点项目页使用 `<link rel="prefetch">`
- **按需加载**：灯箱、Markdown 渲染等重逻辑仅在对应页面引入
- **移动端适配**：小屏下自动降低粒子数量等特效开销
- **编码规范**：UTF-8 编码，确保多语言显示正确

### 4. 可维护性
- **清晰目录结构**：按语言和功能组织文件
- **单一数据源**：导航、页脚、语言列表仅在一处定义
- **文档完善**：详细 README 与各项目说明
- **版本控制**：完整的 Git 历史记录

### 5. 可访问性
- **语义化 HTML**：使用正确的 HTML5 标签
- **ARIA 支持**：灯箱等交互组件带 `role="dialog"`，增强屏幕阅读器兼容性
- **键盘导航**：支持方向键、ESC 等完整键盘操作
- **响应式设计**：适配各种设备和屏幕尺寸

## 🔧 重构历程

### 已完成的重构工作
1. **i18n 静态化**：将动态翻译内容直接填入 HTML，取消 i18n.js 依赖
2. **目录重组**：创建 `en/` 和 `fr/` 独立语言目录
3. **路径修复**：自动修复所有静态资源和链接的相对路径
4. **组件收敛**：导航栏与页脚由独立 HTML 片段改为脚本注入，消除多份副本
5. **HTML 清理**：修复 HTML 标签和结构问题
6. **看板外置**：华为应用市场看板迁移至独立站点 `dashboard.rayawa.top`，主站仅保留入口
7. **新增项目页**：扩充 SmartShed（智慧大棚）、RockPaperSissors（石头剪刀布检测）、ascend310（昇腾 AI 全栈）
8. **信号项目改版**：补充原理图、接线图、灯箱浏览与项目文档资源

### 待优化的方向
1. **资源位置优化**：将页面特定的 JS/CSS 移动到对应页面目录
2. **构建流程**：引入构建与压缩环节（当前为无本地构建、推送直发）
3. **性能监控**：集成性能分析和优化工具
4. **测试覆盖**：添加自动化测试，校验三语版本结构与链接一致性
5. **图片格式**：将首页与相册中的大图转换为 WebP/AVIF，进一步压缩体积

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献注意事项
- **多语言同步**：修改功能时需同步更新所有语言版本
- **路径处理**：注意相对路径在不同目录下的正确性
- **组件更新**：修改 `navbar.js` / `footer.js` 时需测试所有使用页面
- **编码规范**：使用 UTF-8 编码，确保多语言兼容
- **本地验证**：提交前用 `python3 -m http.server` 实际浏览受影响页面

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 联系方式

- **GitHub**：[@Rayawa](https://github.com/Rayawa)
- **网站**：[https://rayawa.top](https://rayawa.top)
- **邮箱**：通过 GitHub Profile 联系
- **项目主页**：[https://rayawa.github.io](https://rayawa.github.io)

---

**最后更新**：2026年9月15日
**维护者**：Ray Chen (Rayawa)
**架构版本**：v3.0（多语言静态化 · 脚本注入组件版）
**技术栈**：HTML5, CSS3, JavaScript, GitHub Pages
