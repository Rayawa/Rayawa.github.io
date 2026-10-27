# Rayawa.github.io

[English](README.md) | 简体中文

展示应用、嵌入式系统与研究项目的多语言静态目录。

## 项目概述

网站组织项目介绍、技术页面与公共静态资源，中、英、法文页面使用独立目录。项目首页聚焦技术内容，移除个人经历、肖像、同学信息与个人联系方式。

## 技术栈与依赖

HTML、CSS、JavaScript，通过 GitHub Pages 部署。页面使用外部字体/图标及部分媒体资源；静态服务器即可运行，无需 JavaScript 包构建。

## 文件结构

- `index.html` — 默认项目目录
- `en/` — 英文页面
- `fr/` — 法文页面
- `projects/` — 项目详情
- `static/css/` — 公共样式
- `static/js/` — 导航、页脚与交互
- `static/resources/` — 项目素材

## 快速上手

在仓库根目录启动静态服务器：

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000/`，无需前端编译。外部托管资源需要网络。

修改时同步维护对应语言页面，并检查资源相对路径。共享导航与页脚代码位于 `static/js/`。
