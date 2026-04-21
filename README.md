# Rayawa.github.io - 个人作品集网站

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Last Commit](https://img.shields.io/github/last-commit/Rayawa/Rayawa.github.io)
![多语言](https://img.shields.io/badge/多语言-中文|英文|法文-blue)
![响应式](https://img.shields.io/badge/响应式-网页优先-green)

## 🌐 项目简介

这是一个基于GitHub Pages部署的个人作品集网站，展示Ray Chen（Rayawa）的技术项目、个人作品和简介。网站采用现代化的多语言架构，支持中文、英文、法文三种语言，具有响应式设计和优雅的用户界面。

**在线访问：** [https://rayawa.github.io](https://rayawa.github.io)  
**主域名：** [https://rayawa.top](https://rayawa.top)

## 🚀 功能特性

### 🌍 多语言架构
- **中文版本** (`index.html`) - 主目录，默认语言
- **英文版本** (`en/index.html`) - 独立英文目录
- **法文版本** (`fr/index.html`) - 独立法文目录
- **静态化翻译** - 取消动态i18n，直接填入文本，提升性能

### 📱 响应式设计
- 移动端优先的设计理念
- 自适应各种屏幕尺寸（手机、平板、桌面）
- 触摸友好的交互界面
- 优化的加载性能

### 🎨 视觉特色
- 现代化的卡片式布局
- 优雅的过渡动画和微交互
- 暗色主题设计，护眼舒适
- 统一的视觉语言和设计系统

### 📊 内容模块
1. **个人简介** - 基本信息、技能和经历
2. **项目展示** - 技术项目、开源贡献
3. **生活分享** - 书籍、音乐等个人兴趣
4. **仪表板** - 数据展示和统计
5. **联系方式** - 社交链接和联系表单

## 📁 最新项目结构

```
Rayawa.github.io/
├── index.html              # 中文主页（主目录）
├── dashboard.html          # 仪表板页面
├── thanks.html             # 感谢页面
├── 404.html                # 404错误页面
├── README.md               # 项目说明文档
├── favicon.ico             # 网站图标
├── ray.jpg                 # 个人头像
│
├── en/                     # 英文版本目录
│   ├── index.html          # 英文主页
│   ├── dashboard.html      # 英文仪表板
│   ├── thanks.html         # 英文感谢页面
│   ├── life/               # 英文生活页面
│   │   ├── books.html      # 英文书籍页面
│   │   └── piano.html      # 英文钢琴页面
│   └── projects/           # 英文项目页面
│       ├── Hi3861.html              # Hi3861项目
│       ├── Hi3861-readme.html       # Hi3861说明
│       ├── biology.html             # 生物项目
│       ├── gene.html                # 基因项目
│       ├── idv.html                 # IDV项目
│       ├── ncut_papers.html         # 论文项目
│       ├── signal.html              # 信号项目
│       ├── spm.html                 # SPM项目
│       ├── xxh.html                 # XXH项目
│       └── xxh_test.html            # XXH测试
│
├── fr/                     # 法文版本目录
│   ├── index.html          # 法文主页
│   ├── dashboard.html      # 法文仪表板
│   ├── thanks.html         # 法文感谢页面
│   ├── life/               # 法文生活页面
│   │   ├── books.html      # 法文书籍页面
│   │   └── piano.html      # 法文钢琴页面
│   └── projects/           # 法文项目页面
│       ├── Hi3861.html              # Hi3861项目
│       ├── Hi3861-readme.html       # Hi3861说明
│       ├── biology.html             # 生物项目
│       ├── gene.html                # 基因项目
│       ├── idv.html                 # IDV项目
│       ├── ncut_papers.html         # 论文项目
│       ├── signal.html              # 信号项目
│       ├── spm.html                 # SPM项目
│       ├── xxh.html                 # XXH项目
│       └── xxh_test.html            # XXH测试
│
├── life/                   # 中文生活页面
│   ├── books.html          # 书籍页面
│   └── piano.html          # 钢琴页面
│
├── projects/               # 中文项目页面
│   ├── Hi3861.html              # Hi3861项目
│   ├── Hi3861-readme.html       # Hi3861说明
│   ├── biology.html             # 生物项目
│   ├── gene.html                # 基因项目
│   ├── idv.html                 # IDV项目
│   ├── ncut_papers.html         # 论文项目
│   ├── signal.html              # 信号项目
│   ├── spm.html                 # SPM项目
│   ├── xxh.html                 # XXH项目
│   └── xxh_test.html            # XXH测试
│
└── static/                 # 静态资源（公共组件）
    ├── css/                # 样式文件
    │   ├── common.css           # 通用样式
    │   ├── index.css            # 主页样式
    │   ├── dashboard.css        # 仪表板样式
    │   ├── 404.css              # 404页面样式
    │   ├── subpage.css          # 子页面通用样式
    │   ├── markdown-page.css    # Markdown页面样式
    │   ├── gene.css             # 基因项目样式
    │   ├── hi3861.css           # Hi3861项目样式
    │   ├── hi3861-readme.css    # Hi3861说明样式
    │   ├── signal.css           # 信号项目样式
    │   ├── spm.css              # SPM项目样式
    │   ├── xxh.css              # XXH项目样式
    │   ├── books.css            # 书籍页面样式
    │   ├── piano.css            # 钢琴页面样式
    │   └── drawing.css          # 绘图页面样式
    │
    ├── js/                 # JavaScript文件
    │   ├── common.js            # 通用脚本
    │   ├── index.js             # 主页脚本
    │   ├── navbar.js            # 导航栏脚本
    │   ├── gene.js              # 基因项目脚本
    │   └── xxh.js               # XXH项目脚本
    │
    └── resources/          # 资源文件
        ├── idv/            # IDV项目资源
        │   └── idv.html         # IDV页面
        └── bio/            # 生物项目资源
            └── agrobacterium/   # 农杆菌资源
                └── agrobacterium.html  # 农杆菌页面
```

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **架构**: 多语言静态化架构，取消动态i18n
- **组件**: 公共组件提取，提高代码复用性
- **部署**: GitHub Pages 自动部署
- **图标**: SVG矢量图标，优化加载性能
- **字体**: 系统默认字体栈，减少外部依赖
- **动画**: CSS3动画和过渡效果，提升用户体验
- **工具**: 自动化脚本处理多语言内容

## 🚦 快速开始

### 本地开发
1. 克隆仓库：
   ```bash
   git clone https://github.com/Rayawa/Rayawa.github.io.git
   cd Rayawa.github.io
   ```

2. 本地预览：
   - 使用Python的SimpleHTTPServer：
     ```bash
     python3 -m http.server 8000
     ```
   - 或使用Node.js的http-server：
     ```bash
     npx http-server -p 8000
     ```
   - 或直接使用浏览器打开 `index.html`（部分功能可能需要HTTP服务器）

3. 访问 `http://localhost:8000` 查看网站

### 部署
网站通过GitHub Pages自动部署：
- 推送到 `main` 或 `master` 分支
- GitHub Pages自动构建和部署
- 访问 https://rayawa.github.io
- 自定义域名：https://rayawa.top

## 📝 内容更新

### 添加新页面
1. 在对应语言目录创建新的HTML文件
   - 中文页面：主目录或对应子目录
   - 英文页面：`en/` 目录下
   - 法文页面：`fr/` 目录下

2. 更新导航栏链接（如果需要）
   - 编辑 `static/components/navbar.html` 文件
   - 确保多语言版本链接正确

3. 添加页面特定样式（如果需要）
   - 在 `static/css/` 目录下创建新的CSS文件
   - 在HTML文件中引用正确的路径

### 更新多语言内容
由于采用静态化多语言架构，需要分别更新：
- 中文内容：编辑主目录下的对应文件
- 英文内容：编辑 `en/` 目录下的对应文件
- 法文内容：编辑 `fr/` 目录下的对应文件

### 添加静态资源
1. 公共资源：添加到 `static/` 目录下对应子目录
2. 页面特定资源：可考虑移动到对应页面目录（未来优化方向）
3. 图片资源：优化压缩后添加到 `static/resources/` 目录

## 🌟 架构亮点

### 1. 现代化多语言架构
- **静态化翻译**: 取消动态i18n，直接填入文本，提升加载速度
- **目录分离**: 每种语言独立目录，结构清晰，易于维护
- **路径优化**: 智能相对路径处理，确保跨语言链接正确

### 2. 组件化设计
- **公共导航栏**: 提取到 `static/components/navbar.html`，统一维护
- **样式模块化**: CSS按功能模块划分，提高复用性
- **脚本组织**: JavaScript按页面功能分离，避免代码臃肿

### 3. 性能优化
- **静态资源优化**: CSS和JS文件压缩和合并
- **懒加载策略**: 图片和内容按需加载
- **最小化请求**: 减少HTTP请求数量，提升页面速度
- **编码规范**: UTF-8编码，确保多语言显示正确

### 4. 可维护性
- **清晰目录结构**: 按语言和功能组织文件
- **自动化脚本**: 提供重构和修复脚本，简化维护
- **文档完善**: 详细的README和项目说明
- **版本控制**: 完整的Git历史记录

### 5. 可访问性
- **语义化HTML**: 使用正确的HTML5标签
- **ARIA支持**: 增强屏幕阅读器兼容性
- **键盘导航**: 支持完整的键盘操作
- **响应式设计**: 适配各种设备和屏幕尺寸

## 🔧 重构特性

### 已完成的重构工作
1. **i18n静态化**: 将动态翻译内容直接填入HTML，取消i18n.js依赖
2. **目录重组**: 创建 `en/` 和 `fr/` 独立语言目录
3. **路径修复**: 自动修复所有静态资源和链接的相对路径
4. **组件提取**: 公共导航栏提取到 `static/components/`
5. **HTML清理**: 修复HTML标签和结构问题

### 待优化的方向
1. **资源位置优化**: 将页面特定的JS/CSS移动到对应页面目录
2. **构建流程**: 添加自动化构建和部署脚本
3. **性能监控**: 集成性能分析和优化工具
4. **测试覆盖**: 添加自动化测试确保多语言版本一致性

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目：

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 贡献注意事项
- **多语言同步**: 修改功能时需同步更新所有语言版本
- **路径处理**: 注意相对路径在不同目录下的正确性
- **组件更新**: 修改公共组件时需测试所有使用页面
- **编码规范**: 使用UTF-8编码，确保多语言兼容

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- **GitHub**: [@Rayawa](https://github.com/Rayawa)
- **网站**: [https://rayawa.top](https://rayawa.top)
- **邮箱**: 通过GitHub Profile联系
- **项目主页**: [https://rayawa.github.io](https://rayawa.github.io)

---

**最后更新**: 2026年4月21日  
**维护者**: Ray Chen (Rayawa)  
**架构版本**: v2.0 (多语言静态化重构版)  
**技术栈**: HTML5, CSS3, JavaScript, GitHub Pages