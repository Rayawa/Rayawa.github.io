# 2026-10-20 内容维护记录

本轮依据公开仓库核对项目与方向，三语同步。`aboutTextBlock` 手写个人介绍、摄影、生活和联系方式保持原文；作者后续自行更新。

## 变更依据

| 来源 | 读取时的内容 blob SHA | 对应更新 |
| --- | --- | --- |
| [Rayawa](https://github.com/Rayawa/Rayawa/blob/master/README.md) | `ab2e8289919e5f2d78f1c693e6ce984fb831b752` | 首页当前专注、学习与交叉兴趣 |
| [dashboard](https://github.com/Rayawa/dashboard/blob/v3.0.0(20)/README.md) | `e0c4ff0cbcb428d69535c969d04bf9c1428388a3` | HarmonyOS 3.1.1、API 20–26、缓存与分享 |
| [dashboard_apple](https://github.com/Rayawa/dashboard_apple/blob/main/README.md) | `18c04ab1797576815c219aae430e8b5b994fed67` | Apple 3.1.0、SwiftUI 原生客户端 |
| [ComplexSweeper](https://github.com/Rayawa/ComplexSweeper/blob/main/README.md) | `1cbad38df6d60a03136ef126a9dd4cdd87b22c0a` | 统一三端仓库、两种模式、1.2.0、上游 1.3.0、外观及清旗翻开 |
| [PetSnap](https://github.com/Rayawa/PetSnap/blob/master/README.md) | `39381938e26a1b7c57ed913f3dce86b3067ef1f3` | HarmonyOS 客户端与原训练实验的区分 |
| [AstraPlusCar-HarmonyOS](https://github.com/Rayawa/AstraPlusCar-HarmonyOS/blob/master/README.md) | `98c5a1142b5ab33837433ddef1d16c254532621c` | 短段 MJPEG、3 次恢复和仍未解决的无线停顿 |
| [TextVideoGen](https://github.com/Rayawa/TextVideoGen/blob/master/README.md) | `802affc78505686221e9c12e8c04b8a5b0e074b9` | 13 阶段 Agent 工作区，独立生产 API 未实现 |
| [ElvaCos](https://github.com/Rayawa/ElvaCos/blob/master/README.md) | `cca2969bebb95731b65dcf16f8c9d8c15451c4e3` | 核对后保留 Beta、账号未验收和无云同步的现状 |
| [Loci](https://github.com/Rayawa/Loci/blob/master/README.md) | `9ec072004fab3472af96c1fe140b476ae601e2b6` | 核对后保留开发中、地图未验收和后续媒体/Trip/Track/Atlas |

Android 看板 README 目前仅有仓库标题，因此额外核对 [`app/build.gradle.kts`](https://github.com/Rayawa/dashboard_android/blob/master/app/build.gradle.kts)、[`MainActivity.kt`](https://github.com/Rayawa/dashboard_android/blob/master/app/src/main/java/top/rayawa/dashboard/android/MainActivity.kt) 与 [`DashboardApi.kt`](https://github.com/Rayawa/dashboard_android/blob/master/app/src/main/java/top/rayawa/dashboard/android/data/DashboardApi.kt)。只描述已存在的原生工程与页面，不宣称上架或全设备验收。

复扫雷版本另核对 [v1.2.0 Release](https://github.com/Rayawa/ComplexSweeper/releases/tag/v1.2.0)，移植应用版本与上游源码版本分别表述。AstraPlusCar README 前文仍写一次恢复，以末尾 2026-10-03 的三次恢复记录为准。

同时核对启智01、SmartShed、WeakSignal、安防平台、CarRent、CommChain 的公开 README；本轮未发现需要据此改写核心项目描述的确定变化。未为简略测试仓库或缺少公开说明的仓库编造作品介绍。

## 检查范围

- 全站 HTML 的本地引用按远端完整文件树及新增文件检查；本地工作副本仅下载文本文件，未下载原有图片、视频与文档附件。
- 三语页面对应关系、canonical / hreflang、页面结构、项目入口与元数据检查。
- 个人介绍与生活/联系方式区块对比维护前内容，确保未改写。
- 使用本地 Chromium 检查三语首页及四类项目页的 390 / 1440 px 布局。预览阻止外部 CDN 请求，主要验证结构与布局，不代表联网资源验收。
- 删除三语农杆菌实验页中未使用的重复 `s2-guide` 空节点，保留脚本实际访问的引导区域；全站 ID 唯一性检查通过。


最终静态检查：82 个 HTML 页面、1172 处本地引用、126 处锚点，零缺失引用及重复 ID；个人介绍、兴趣生活、摄影及联系方式原文一致。三语新增/改写项目页结构与元数据对应检查通过。30 组 Chromium 尺寸检查未发现新增横向溢出；三语首页桌面端原有溢出在维护前快照中同样存在，本轮未改动该布局。`footer.js` 语法与 `git diff --check` 通过。


## 2026-10-22 首页横向溢出修复

定位：桌面端 `.hero::before` 的负水平 inset 使首屏背景向两侧各扩展 40 px；平板规则也有 20 px 水平扩展。另有英文致谢提示在 1024 px 屏宽下超出右边界约 2 px。

修复：将两处背景的水平 inset 收回到 0，保留纵向视差范围；桌面致谢提示框改为沿星形入口右侧对齐，箭头仍指向入口。未改写个人介绍或其他内容，也未用全站隐藏溢出来遮盖问题。

验证：Chromium 检查中英法三语 × 360、390、767、768、1023、1024、1280、1440、1920 px 共 27 组布局，初始和滚动至画廊后的页面宽度均等于视口宽度；三语轮播下一张 / 上一张切换正常。全站 82 个 HTML、1172 处本地引用、126 处锚点、个人区块原文对比及 git diff --check 再次通过。外部 CDN 仍在预览中屏蔽，未据此宣称完成在线资源可用性验收。
