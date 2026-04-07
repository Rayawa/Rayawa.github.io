# Rayawa.github.io - 个人作品集网站

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Last Commit](https://img.shields.io/github/last-commit/Rayawa/Rayawa.github.io)

## 🌐 项目简介

这是一个基于GitHub Pages部署的个人作品集网站，展示Ray Chen（Rayawa）的技术项目、摄影作品和个人简介。网站支持多语言（中文、英文、法文），采用响应式设计，适配各种设备。

**在线访问：** [https://rayawa.github.io](https://rayawa.github.io)  
**主域名：** [https://rayawa.top](https://rayawa.top)

## 🚀 功能特性

### 🌍 多语言支持
- **中文** (`index.html`) - 默认语言
- **英文** (`index_en.html`) - 国际访问
- **法文** (`index_fr.html`) - 法语支持

### 📱 响应式设计
- 移动端优先的设计理念
- 自适应各种屏幕尺寸
- 触摸友好的交互界面

### 🎨 视觉特色
- 动态背景效果（orb动画）
- 现代化的卡片式布局
- 优雅的过渡动画
- 暗色主题设计

### 📊 内容模块
1. **个人简介** - 基本信息和技术方向
2. **项目展示** - 技术项目和作品集
3. **摄影画廊** - 摄影作品展示
4. **社交链接** - 联系方式和个人主页

## 📁 项目结构

```
Rayawa.github.io/
├── index.html          # 中文主页
├── index_en.html       # 英文主页
├── index_fr.html       # 法文主页
├── README.md           # 项目说明文档
├── favicon.ico         # 网站图标
├── ray.jpg             # 个人头像
├── gallery/            # 摄影作品
│   └── index.html      # 画廊页面
├── projects/           # 项目展示
│   ├── bio-project.html      # 生物项目
│   ├── gene.html             # 基因项目
│   ├── harmony-dashboard.html # Harmony仪表板
│   ├── idv.html              # IDV项目
│   └── sweet-potato-mod.html # 红薯项目
└── static/             # 静态资源
    ├── css/            # 样式文件
    │   ├── stylesheet.css    # 主样式
    │   └── print.css         # 打印样式
    ├── js/             # JavaScript文件
    │   └── mobile-enhancements.js # 移动端增强
    ├── images/         # 图片资源
    │   ├── cn.svg      # 中国国旗
    │   ├── uk.svg      # 英国国旗
    │   └── fr.svg      # 法国国旗
    └── gallery/        # 画廊资源
```

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **部署**: GitHub Pages
- **图标**: SVG矢量图标
- **字体**: 系统默认字体栈
- **动画**: CSS3动画和过渡效果

## 🚦 快速开始

### 本地开发
1. 克隆仓库：
   ```bash
   git clone https://github.com/Rayawa/Rayawa.github.io.git
   cd Rayawa.github.io
   ```

2. 本地预览：
   - 使用任何HTTP服务器（如Python的SimpleHTTPServer）：
     ```bash
     python3 -m http.server 8000
     ```
   - 或直接使用浏览器打开 `index.html`

3. 访问 `http://localhost:8000` 查看网站

### 部署
网站通过GitHub Pages自动部署：
- 推送到 `master` 分支
- GitHub Pages自动构建和部署
- 访问 https://rayawa.github.io

## 📝 内容更新

### 添加新项目
1. 在 `projects/` 目录创建新的HTML文件
2. 在主页面 (`index.html`) 中添加项目链接
3. 更新其他语言版本页面

### 更新个人信息
编辑对应语言的主页文件：
- `index.html` - 中文信息
- `index_en.html` - 英文信息  
- `index_fr.html` - 法文信息

### 添加摄影作品
1. 将图片添加到 `static/gallery/` 目录
2. 更新 `gallery/index.html` 文件

## 🌟 项目亮点

### 1. 多设备适配
- 完善的移动端体验
- 平板和桌面端优化
- 打印样式支持

### 2. 性能优化
- 静态资源优化
- 懒加载图片
- 最小化HTTP请求

### 3. 可访问性
- 语义化HTML结构
- ARIA标签支持
- 键盘导航友好

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目：

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- **GitHub**: [@Rayawa](https://github.com/Rayawa)
- **网站**: [https://rayawa.top](https://rayawa.top)
- **邮箱**: 通过GitHub Profile联系

---

**最后更新**: 2025年4月7日  
**维护者**: Ray Chen (Rayawa)