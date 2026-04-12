window.SITE_I18N = {
    zh: {
        nav: { home: '首页', about: '关于我', projects: '项目', gallery: '摄影', contact: '联系' },
        navTitle: '华为应用市场看板',
        pageTitle: '华为应用市场看板 | Ray Chen',
        refresh: '刷新页面',
        top: '回到顶部',

        hero: {
            title: '华为应用市场看板',
            lead: {
                part1: '由',
                link: 'Harmony Gallery 项目组',
                part2: '制作。一个获取、处理、分析并展示鸿蒙应用市场所有应用与元服务数据的全栈项目。',
            },
            tagRust: '以 Rust 为基础',
            tagDatabase: '庞大的强力的数据库',
            tagPlatform: '多平台适配',
            tagAward: '开放原子大赛获奖作品',
        },

        metrics: {
            title: '📈 实时数据统计',
            desc: '展示项目的核心数据指标，包括总浏览量、今日访问量和鸿蒙应用访问量。数据实时更新，反映项目实际使用情况。',
            totalViews: { label: '项目总浏览量' },
            todayViews: { label: '今日浏览量' },
            harmonyViews: { label: '鸿蒙应用总浏览量' },
            note: '数据字段：totalViews / todayViews / harmonyAppViews',
        },

        access: {
            title: '访问平台',
            sSite: 'S 站',
            tSite: 'T 站',
            harmony: 'HarmonyOS',
            android: 'Android',
            ios: 'Apple',
        },

        details: {
            title: '详细介绍',
            desc: '以下内容综合网页版本说明与鸿蒙版本功能文案，聚焦项目目标、核心能力与未来规划。',
            quickTitle: '快速阅读',
            quickDesc: '先看关键词，再按需展开细节，降低阅读压力。',
            quickTag1: '数据采集与可视化',
            quickTag2: '鸿蒙原生体验',
            quickTag3: '网页 + 应用双端',
            quickTag4: '多平台持续扩展',
            readHint: '阅读建议：先展开前两项，再按需要查看其余模块。',
            what: {
                title: '项目是做什么的',
                summary: '项目定位与价值',
                p1: '华为应用市场看板由 Harmony Gallery 项目组发起，目标是将分散的应用市场公开信息转化为可理解、可检索、可追踪的结构化视图。它涵盖应用总览、榜单、评分分布、下载趋势、开发者与分类分析等信息模块。',
                p2: '项目核心是"数据到洞察"的链路：从采集与清洗，到查询与筛选，再到图表与列表展示，帮助开发者与用户更快了解鸿蒙应用生态变化。',
            },
            harmony: {
                title: '鸿蒙版本特色（重点）',
                summary: '原生能力与跨设备体验',
                li1: '原生 HarmonyOS 体验：界面、动效与交互适配鸿蒙设备形态，强调流畅和低门槛浏览。',
                li2: '图表交互与详情跳转：支持点击图表快速筛选，并进一步查看应用详细数据。',
                li3: '数据定时更新：后台按周期同步数据，确保展示内容保持较高时效性。',
                li4: '投稿与查询能力：支持应用市场分享到看板、应用内投稿/查询，以及 AI 信息提取辅助。',
                li5: '多样分享方式：支持链接分享、碰一碰与隔空传送，便于跨设备传播页面。',
            },
            usage: {
                title: '网页端核心功能',
                summary: '全局视野 · 智能检索',
                li1: '数据概览：查看应用总数、元服务数量、开发者规模等关键指标，生态全貌一目了然。',
                li2: '榜单与分布分析：下载榜、评分分布、非华为应用下载榜等多维度榜单，洞察市场趋势。',
                li3: '智能应用列表：支持搜索、排序、分页浏览，开发者快速筛选，找应用从未如此简单。',
                li4: '高级搜索引擎：多条件组合（AND/OR）精确检索，丰富字段与操作符，满足专业查询需求。',
                li5: '流畅交互体验：页面刷新、快速定位、持续迭代优化，让数据浏览成为一种享受。',
            },
            notes: {
                title: '重要提示',
                summary: '透明 · 负责 · 可信赖',
                li1: '数据来源：主要采集自网络公开信息，仅供参考，不保证绝对完整性与实时一致性。',
                li2: '功能状态：部分功能仍在积极开发中，可能存在显示差异或临时调整，敬请理解。',
                li3: '官方优先：若本平台数据与官方渠道存在差异，请以官方发布信息为准。',
            },
            roadmap: {
                title: '未来发展路线',
                summary: '从双端到全平台',
                p1: '目前已实现网页版与鸿蒙版双端协同。接下来将在保持核心数据链路一致的前提下，稳步推进 Android 与 macOS 版本，构建真正完整的跨平台数据生态系统。',
            },
            support: {
                title: '技术支持与社区',
                summary: '有问题？一起来交流',
                p1: '需要技术支持或有建议想分享？欢迎加入项目交流群：',
                groupLink: '👉 点击加入 QQ 群【harmonygallery（划掉）MatePad Edge 黑子群】',
            },

            tech: {
                title: '技术架构',
                desc: '项目采用现代化技术栈，确保高性能、高可用性与可维护性',
                backend: {
                    title: '后端技术（Rust）',
                    summary: 'Rust 技术栈实现数据聚合、API 暴露、数据库访问和服务端能力编排',
                    items: {
                        rust: 'Rust 2024 Edition：内存安全、零成本抽象、高性能',
                        axum: 'Axum 0.8：类型安全的 Web 框架， ergonomic API 设计',
                        tokio: 'Tokio 1.47：异步运行时，高效并发处理',
                        sqlx: 'SQLx 0.8：编译期 SQL 检查，类型安全的数据库操作',
                        reqwest: 'Reqwest 0.12：HTTP 客户端，支持连接池与自动重试',
                        serde: 'Serde + TOML：序列化/反序列化，配置管理',
                        tracing: 'Tracing：结构化日志与性能追踪',
                        compression: 'Tower HTTP 压缩：Brotli、Gzip、Deflate、Zstd',
                    },
                },
                database: {
                    title: '数据库（PostgreSQL）',
                    summary: 'PostgreSQL 12+ 推荐 14+，强大的关系型数据库',
                    items: {
                        tables: '数据表：app_info, app_metrics, app_rating, app_raw, substance 等',
                        triggers: '触发器：自动化数据更新与一致性维护',
                        indexes: '索引优化：查询性能提升',
                        foreign_keys: '外键级联：数据完整性保障',
                        json: 'JSON 字段：灵活的数据结构支持',
                    },
                },
                frontend_harmony: {
                    title: '鸿蒙前端',
                    items: {
                        language: 'ArkTS：鸿蒙应用开发语言',
                        ui: 'ArkUI：声明式 UI 框架',
                        web: 'ArkWeb：Web 容器集成',
                        model: 'Stage Model：现代化工程模型',
                        build: 'Hvigor：构建工具链',
                    },
                },
                frontend_web: {
                    title: '网站前端',
                },
                frontend_s: {
                    title: 'S 站前端',
                    items: {
                        js: '原生 JavaScript：无框架依赖，轻量高效',
                        chart: 'Chart.js + Date-fns：数据可视化',
                        markdown: 'Markdown-it：Markdown 渲染',
                        responsive: '响应式设计：移动端适配',
                    },
                },
                frontend_t: {
                    title: 'T 站前端',
                    items: {
                        vue: 'Vue.js：渐进式前端框架',
                        responsive: '响应式设计：支持移动端适配',
                    },
                },
            },

            database: {
                title: '数据库对接',
                desc: '采用现代化数据库方案，支撑海量数据存储与高效查询',
                features: {
                    storage: '海量存储：支持百万级应用数据存储',
                    query: '高效查询：优化的索引策略，毫秒级响应',
                    sync: '实时同步：定时任务自动更新数据',
                    backup: '数据备份：多重备份机制，保障数据安全',
                },
            },

            database_integration: {
                title: '数据库接入',
                intro: '我们提供鸿蒙应用市场数据查询、统计分析等功能，欢迎有需要的项目与我们的数据库对接。',
                cases_title: '接入案例 · 友情链接',
                cases_intro: '以下网站已接入我们的数据库或建立友好合作关系',
                cases: {
                    case1: {
                        title: '记得订阅 App',
                        subtitle: '获取最新应用更新',
                    },
                    case2: {
                        title: 'HAP 资源站',
                        subtitle: '丰富的 HAP 资源库',
                    },
                    case3: {
                        title: 'NEXT Store',
                        subtitle: '下一代应用商店',
                    },
                    case4: {
                        title: '小刘的站点',
                        subtitle: '应用荟萃',
                    },
                    case5: {
                        title: 'Open Store',
                        subtitle: '开放应用生态',
                    },
                },
                api_title: 'API 文档',
                api_desc: '查看完整的 API 接口文档，了解数据接入方式',
                api_link: 'http://shenjack.top:10003/docs',
                api_button: '查看 API 文档',
                contact_button: '联系我们',
                warning: {
                    title: '⚠️ 重要提示',
                    p1: '对接数据库之前需要明确告知我们，否则可能违反开源许可。',
                    p2: '使用者不得在获取信息之后在本地原样存储。',
                    p3: '友情链接内网站展示的任何内容均与鸿蒙应用看板无关。Harmony Gallery 项目组不负责维护友情链接内容。',
                },
            },

            links: {
                title: '项目相关链接',
                desc: '快速访问项目相关资源与平台',
                items: {
                    github: 'GitHub 仓库',
                    docs: '项目文档',
                    appgallery: '华为应用市场',
                    blog: '项目博客',
                },
            },

            team: {
                title: '项目制作组',
                desc: '感谢所有为项目做出贡献的开发者与合作伙伴',
                members: {
                    shenjack: 'Shenjack - 项目发起人与核心开发',
                    raychen: 'Ray Chen - 前端开发与 UI 设计',
                    contributors: '以及所有开源贡献者',
                },
                contact: {
                    title: '联系方式',
                    qq: 'QQ 群：825946573',
                    email: '邮箱：contact@example.com',
                    github: 'GitHub：https://github.com/Harmony-Gallery',
                },
                license: {
                    title: '开源协议',
                    name: 'GPL-3.0 License',
                    desc: '本项目采用 GPL-3.0 协议开源，允许自由使用、修改与分发，但衍生作品必须采用相同协议',
                },
                acknowledgments: {
                    title: '致谢',
                    p1: '感谢华为应用市场提供数据源',
                    p2: '感谢开放原子开源基金会的支持',
                    p3: '感谢所有社区用户的反馈与建议',
                },
            },
        },
    },

    en: {
        nav: { home: 'Home', about: 'About', projects: 'Projects', gallery: 'Gallery', contact: 'Contact' },
        navTitle: 'Huawei AppGallery Dashboard',
        pageTitle: 'Huawei AppGallery Dashboard | Ray Chen',
        refresh: 'Refresh',
        top: 'Back to top',

        hero: {
            title: 'Huawei AppGallery Dashboard',
            lead: {
                part1: 'Crafted by the ',
                link: 'Harmony Gallery Team',
                part2: '. A full-stack project that acquires, processes, analyzes, and visualizes all app and atomic service data from the HarmonyOS app market.',
            },
            tagRust: 'Rust-Powered Foundation',
            tagDatabase: 'Powerful Database',
            tagPlatform: 'Multi-Platform Support',
            tagAward: 'OpenAtom Contest Award Winner',
        },

        metrics: {
            title: '📈 Real-time Statistics',
            desc: 'Displaying core project metrics including total views, daily visits, and HarmonyOS app views. Data updates in real-time to reflect actual usage.',
            totalViews: { label: 'Total Project Views' },
            todayViews: { label: 'Today Views' },
            harmonyViews: { label: 'HarmonyOS App Views' },
            note: 'Data fields: totalViews / todayViews / harmonyAppViews',
        },

        access: {
            title: 'Access Platforms',
            sSite: 'S Site',
            tSite: 'T Site',
            harmony: 'HarmonyOS',
            android: 'Android',
            ios: 'Apple',
        },

        details: {
            title: 'Deep Dive',
            desc: 'From data collection to multi-platform presentation, from tech architecture to user experience—comprehensive insights into how Harmony Gallery transforms complex data into elegant insights.',
            quickTitle: 'Quick Overview',
            quickDesc: 'Grasp key concepts first, dive deeper on demand—efficient information retrieval.',
            quickTag1: '🔍 Intelligent Data Collection & Visualization',
            quickTag2: '🚀 Smooth HarmonyOS Native Experience',
            quickTag3: '💻 Web + App Dual-Platform Synergy',
            quickTag4: '🌍 Multi-Platform Ecosystem Expansion',
            readHint: '💡 Tip: Browse first two sections, then explore based on interest',
            what: {
                title: 'Vision & Mission',
                summary: 'Making Data Valuable',
                p1: 'Huawei AppGallery Dashboard is crafted by the Harmony Gallery team, transforming fragmented app market public information into an intuitive, searchable, trackable data insight platform. Core modules include app overview, real-time rankings, rating distribution, download trends, developer profiling, and category deep-dive analysis.',
                p2: 'We focus on building a complete "data→insight" value chain: from intelligent collection & cleaning, to flexible query & filtering, to visual charts & interactive displays—helping developers and users quickly grasp the pulse of the HarmonyOS app ecosystem.',
            },
            harmony: {
                title: 'HarmonyOS App Highlights',
                summary: 'Native Performance × Elegant Experience',
                li1: '🎨 Pure HarmonyOS DNA: Deeply adapted to HarmonyOS design language—beautiful UI, fluid animations, intuitive interactions, zero learning curve immersive experience.',
                li2: '📊 Interactive Data Exploration: Click charts to filter in real-time, seamlessly jump to app details—data exploration never felt this smooth.',
                li3: '🔄 Smart Data Sync: Scheduled background updates ensure every piece of data you see stays current.',
                li4: '✍️ Easy Submission & Query: One-tap share from AppGallery to dashboard, in-app quick submission/query, AI-powered extraction makes data entry effortless.',
                li5: '📤 Multi-Mode Sharing: Link sharing, Tap to Share, air transfer—multiple ways to make cross-device collaboration more efficient.',
            },
            usage: {
                title: 'Web Core Features',
                summary: 'Global Vision · Intelligent Search',
                li1: '📈 Data Dashboard: Real-time view of app count, atomic service count, developer scale—ecosystem overview at a glance.',
                li2: '🏆 Rankings & Distribution: Download charts, rating distribution, non-Huawei download rankings—multi-dimensional insights into market trends.',
                li3: '📋 Smart App List: Search, sort, paginate, quick developer filter—finding apps has never been simpler.',
                li4: '🔎 Advanced Search Engine: Multi-condition (AND/OR) precision search with rich operators for professional query needs.',
                li5: '⚡ Fluid Interaction: Page refresh, quick positioning, continuous iteration—making data browsing a pleasure.',
            },
            submit: {
                title: 'Submission & Query System',
                summary: 'Community Powered · Ecosystem Built Together',
                p1: 'Users can easily submit new apps or updates via "Share to Dashboard from AppGallery" or in-app submission entry; query function helps quickly check current status of specific apps.',
                p2: 'Built-in intelligent text extraction engine automatically recognizes submission and query content, significantly reducing input barriers and making ecosystem maintenance more efficient and accurate.',
            },
            share: {
                title: 'Omni-Scene Sharing',
                summary: 'One-Tap Share · Seamless Transfer',
                li1: '🔗 Link Sharing: Copy share link from homepage or detail page with one tap, spread valuable data insights anytime, anywhere.',
                li2: '📱 Tap to Share: Light touch between HarmonyOS devices to share pages—technology makes sharing elegant.',
                li3: '🌬️ Air Transfer: Cross-device wireless page distribution, breaking device boundaries, letting information flow freely.',
            },
            notes: {
                title: 'Important Notes',
                summary: 'Transparent · Responsible · Trustworthy',
                li1: 'Data Source: Mainly collected from public online information, for reference only, no guarantee of absolute completeness or real-time consistency.',
                li2: 'Feature Status: Some features are still in active development, display differences or temporary adjustments may occur, thanks for understanding.',
                li3: 'Official Priority: If discrepancies exist between this platform and official channels, official information shall prevail.',
            },
            roadmap: {
                title: 'Future Roadmap',
                summary: 'From Dual-Platform to All-Platform',
                p1: 'Currently achieved web + HarmonyOS dual-platform synergy. Next, while maintaining unified core data pipeline, we will steadily advance Android and macOS versions to build a truly complete cross-platform data ecosystem.',
            },
            support: {
                title: 'Tech Support & Community',
                summary: 'Questions? Let\'s Connect',
                p1: 'Need tech support or want to share suggestions? Welcome to join our community group:',
                groupLink: '👉 Click to join QQ group [harmonygallery (crossed out) MatePad Edge anti-fans group]',
            },

            tech: {
                title: 'Technology Stack',
                desc: 'Modern tech stack ensuring high performance, availability, and maintainability',
                backend: {
                    title: 'Backend (Rust)',
                    summary: 'Rust stack handling data aggregation, API exposure, database access, and server-side orchestration',
                    items: {
                        rust: 'Rust 2024 Edition: Memory safety, zero-cost abstractions, high performance',
                        axum: 'Axum 0.8: Type-safe web framework with ergonomic API design',
                        tokio: 'Tokio 1.47: Async runtime for efficient concurrent processing',
                        sqlx: 'SQLx 0.8: Compile-time SQL checks, type-safe database operations',
                        reqwest: 'Reqwest 0.12: HTTP client with connection pooling and auto-retry',
                        serde: 'Serde + TOML: Serialization/deserialization, configuration management',
                        tracing: 'Tracing: Structured logging and performance tracking',
                        compression: 'Tower HTTP Compression: Brotli, Gzip, Deflate, Zstd support',
                    },
                },
                database: {
                    title: 'Database (PostgreSQL)',
                    summary: 'PostgreSQL 12+ (14+ recommended), powerful relational database',
                    items: {
                        tables: 'Tables: app_info, app_metrics, app_rating, app_raw, substance, etc.',
                        triggers: 'Triggers: Automated data updates and consistency maintenance',
                        indexes: 'Index Optimization: Query performance enhancement',
                        foreign_keys: 'Foreign Key Cascades: Data integrity guarantees',
                        json: 'JSON Fields: Flexible data structure support',
                    },
                },
                frontend_harmony: {
                    title: 'HarmonyOS Frontend',
                    items: {
                        language: 'ArkTS: HarmonyOS application development language',
                        ui: 'ArkUI: Declarative UI framework',
                        web: 'ArkWeb: Web container integration',
                        model: 'Stage Model: Modern engineering model',
                        build: 'Hvigor: Build toolchain',
                    },
                },
                frontend_web: {
                    title: 'Web Frontend',
                },
                frontend_s: {
                    title: 'S Site Frontend',
                    items: {
                        js: 'Native JavaScript: No framework dependencies, lightweight and efficient',
                        chart: 'Chart.js + Date-fns: Data visualization',
                        markdown: 'Markdown-it: Markdown rendering',
                        responsive: 'Responsive Design: Mobile adaptation',
                    },
                },
                frontend_t: {
                    title: 'T Site Frontend',
                    items: {
                        vue: 'Vue.js: Progressive frontend framework',
                        responsive: 'Responsive Design: Mobile adaptation',
                    },
                },
            },

            database: {
                title: 'Database Integration',
                desc: 'Modern database solution supporting massive data storage and efficient queries',
                features: {
                    storage: 'Massive Storage: Support for millions of app data entries',
                    query: 'Efficient Queries: Optimized indexing, millisecond response times',
                    sync: 'Real-time Sync: Scheduled automatic data updates',
                    backup: 'Data Backup: Multiple backup mechanisms for data security',
                },
            },

            database_integration: {
                title: 'Database Access',
                intro: 'We provide HarmonyOS app market data query, statistical analysis and other functions. Projects are welcome to integrate with our database.',
                cases_title: 'Integration Cases',
                cases: {
                    case1: {
                        title: 'Remember to Subscribe App',
                        subtitle: 'Get latest app updates',
                    },
                    case2: {
                        title: 'HAP Resource Station',
                        subtitle: 'Rich HAP resource library',
                    },
                    case3: {
                        title: 'NEXT Store',
                        subtitle: 'Next-gen app store',
                    },
                    case4: {
                        title: 'Xiao Liu\'s Site',
                        subtitle: 'App Collection',
                    },
                    case5: {
                        title: 'Open Store',
                        subtitle: 'Open app ecosystem',
                    },
                },
                api_title: 'API Documentation',
                api_desc: 'View complete API documentation to understand data integration methods',
                api_link: 'http://shenjack.top:10003/docs',
                api_button: 'View API Docs',
                contact_button: 'Contact Us',
                warning: {
                    title: '⚠️ Important Notice',
                    p1: 'You must inform us before integrating with the database, otherwise it may violate the open source license.',
                    p2: 'Users must not store obtained information locally in its original form.',
                    p3: 'Any content displayed on linked websites is not related to Harmony AppGallery Dashboard. The Harmony Gallery project team is not responsible for maintaining linked friend content.',
                },
            },

            links: {
                title: 'Project Links',
                desc: 'Quick access to project resources and platforms',
                items: {
                    github: 'GitHub Repository',
                    docs: 'Documentation',
                    appgallery: 'Huawei AppGallery',
                    blog: 'Project Blog',
                },
            },

            team: {
                title: 'Development Team',
                desc: 'Thanks to all developers and partners who contributed to the project',
                members: {
                    shenjack: 'Shenjack - Project Founder & Core Developer',
                    raychen: 'Ray Chen - Frontend Development & UI Design',
                    contributors: 'And all open source contributors',
                },
                contact: {
                    title: 'Contact Us',
                    qq: 'QQ Group: 825946573',
                    email: 'Email: contact@example.com',
                    github: 'GitHub: https://github.com/Harmony-Gallery',
                },
                license: {
                    title: 'License',
                    name: 'GPL-3.0 License',
                    desc: 'This project is open-sourced under GPL-3.0 License, allowing free use, modification, and distribution, but derivative works must use the same license',
                },
                acknowledgments: {
                    title: 'Acknowledgments',
                    p1: 'Thanks to Huawei AppGallery for providing data sources',
                    p2: 'Thanks to OpenAtom Open Source Foundation for support',
                    p3: 'Thanks to all community users for feedback and suggestions',
                },
            },
        },
    },

    fr: {
        nav: { home: 'Accueil', about: 'À propos', projects: 'Projets', gallery: 'Galerie', contact: 'Contact' },
        navTitle: 'Tableau AppGallery Huawei',
        pageTitle: 'Tableau AppGallery Huawei | Ray Chen',
        refresh: 'Rafraîchir',
        top: 'Retour en haut',

        hero: {
            title: 'Tableau AppGallery Huawei',
            lead: {
                part1: 'Créé par ',
                link: "l'équipe Harmony Gallery",
                part2: '. Un projet full-stack qui acquiert, traite, analyse et visualise toutes les données des applications et services atomiques du marché des applications HarmonyOS.',
            },
            tagRust: 'Fondation Rust',
            tagDatabase: 'Base de Données Puissante',
            tagPlatform: 'Support Multi-Plateforme',
            tagAward: 'Lauréat du Concours OpenAtom',
        },

        metrics: {
            title: 'Analyses de Données en Temps Réel',
            desc: 'Les données guident les décisions, les analyses montrent la voie. Données de démo affichées actuellement ; intégration API temps réel à venir.',
            totalViews: { label: 'Vues Totales du Projet' },
            todayViews: { label: 'Vues du Jour' },
            harmonyViews: { label: 'Vues de l\'App HarmonyOS' },
            note: '✨ Champs : totalViews / todayViews / harmonyAppViews',
        },

        access: {
            title: 'Plateformes d\'accès',
            sSite: 'Site S',
            tSite: 'Site T',
            harmony: 'HarmonyOS',
            android: 'Android',
            ios: 'Apple',
        },

        details: {
            title: 'Analyse Approfondie',
            desc: 'De la collecte de données à la présentation multi-plateforme, de l\'architecture technique à l\'expérience utilisateur—comprendre comment Harmony Gallery transforme des données complexes en analyses élégantes.',
            quickTitle: 'Aperçu Rapide',
            quickDesc: 'Saisissez d\'abord les concepts clés, approfondissez selon vos besoins.',
            quickTag1: '🔍 Collecte Intelligente & Visualisation',
            quickTag2: '🚀 Expérience Native HarmonyOS Fluide',
            quickTag3: '💻 Synergie Web + App',
            quickTag4: '🌍 Expansion Multi-Plateforme',
            readHint: '💡 Conseil : Parcourez les deux premières sections, puis explorez selon intérêt',
            what: {
                title: 'Vision & Mission',
                summary: 'Rendre les Données Utiles',
                p1: 'Le tableau AppGallery Huawei est conçu par l\'équipe Harmony Gallery, transformant des informations publiques fragmentées du marché des applications en une plateforme d\'analyses intuitive, consultable et traçable. Modules clés : vue d\'ensemble, classements temps réel, distribution des notes, tendances de téléchargement, profilage développeurs et analyse approfondie par catégorie.',
                p2: 'Nous nous concentrons sur une chaîne de valeur complète "données→analyses" : collecte et nettoyage intelligents, requêtes et filtrage flexibles, affichages visuels et interactifs—aidant développeurs et utilisateurs à saisir rapidement le pouls de l\'écosystème HarmonyOS.',
            },
            harmony: {
                title: 'Points Forts HarmonyOS',
                summary: 'Performance Native × Expérience Élégante',
                li1: '🎨 ADN Pur HarmonyOS : Adaptation profonde au langage de design HarmonyOS—interface magnifique, animations fluides, interactions intuitives, expérience immersive sans apprentissage.',
                li2: '📊 Exploration Interactive : Cliquez sur les graphiques pour filtrer en temps réel, navigation fluide vers les détails—exploration de données jamais aussi fluide.',
                li3: '🔄 Sync Intelligente : Mises à jour planifiées en arrière-plan pour des données toujours actuelles.',
                li4: '✍️ Soumission & Requête Faciles : Partage en un clic d\'AppGallery, soumission/requête rapide in-app, extraction IA pour saisie effortless.',
                li5: '📤 Partage Multi-Mode : Lien, Tap to Share, transfert sans fil—collaboration inter-appareils optimisée.',
            },
            usage: {
                title: 'Fonctions Web Principales',
                summary: 'Vision Globale · Recherche Intelligente',
                li1: '📈 Tableau de Bord : Vue temps réel des indicateurs clés—nombre d\'apps, services atomiques, développeurs.',
                li2: '🏆 Classements & Distributions : Téléchargements, notes, classements non-Huawei—analyses multidimensionnelles.',
                li3: '📋 Liste Intelligente : Recherche, tri, pagination, filtre développeur—trouver des apps simplement.',
                li4: '🔎 Recherche Avancée : Combinaisons multi-conditions (AND/OR), opérateurs riches pour requêtes pro.',
                li5: '⚡ Interaction Fluide : Rafraîchissement, positionnement rapide, itération continue—navigation plaisante.',
            },
            submit: {
                title: 'Soumission & Requête',
                summary: 'Communauté Active · Écosystème Partagé',
                p1: 'Soumettez facilement de nouvelles apps ou mises à jour via le partage AppGallery ou l\'entrée in-app ; la requête aide à vérifier rapidement le statut.',
                p2: 'Moteur d\'extraction texte IA intégré reconnaît automatiquement le contenu, réduisant la saisie manuelle et optimisant la maintenance.',
            },
            share: {
                title: 'Partage Omni-Présent',
                summary: 'Un Clic · Transfert Transparent',
                li1: '🔗 Lien : Copiez et partagez depuis n\'importe quelle page.',
                li2: '📱 Tap to Share : Transférez d\'un toucher entre appareils HarmonyOS.',
                li3: '🌬️ Transfert Sans Fil : Distribution inter-appareils, information sans frontières.',
            },
            notes: {
                title: 'Notes Importantes',
                summary: 'Transparent · Responsable · Fiable',
                li1: 'Source : Données publiques en ligne, à titre indicatif, sans garantie de complétude ou temps réel.',
                li2: 'Statut : Certaines fonctions en développement, ajustements possibles.',
                li3: 'Priorité : En cas d\'écart, les sources officielles prévalent.',
            },
            roadmap: {
                title: 'Feuille de Route',
                summary: 'Du Dual au Multi-Plateforme',
                p1: 'Synergie web + HarmonyOS déjà opérationnelle. Versions Android et macOS en progression avec pipeline de données unifié.',
            },
            support: {
                title: 'Support & Communauté',
                summary: 'Des Questions ? Connectons-Nous',
                p1: 'Besoin de support ou d\'échanger ? Rejoignez notre groupe :',
                groupLink: '👉 Cliquez pour rejoindre le groupe QQ [harmonygallery (barré) MatePad Edge anti-fans]',
            },

            tech: {
                title: 'Stack Technique',
                desc: 'Stack technique moderne assurant haute performance, disponibilité et maintenabilité',
                backend: {
                    title: 'Backend (Rust)',
                    summary: 'Stack Rust gérant agrégation de données, exposition API, accès base de données et orchestration serveur',
                    items: {
                        rust: 'Rust 2024 Edition : Sécurité mémoire, abstractions à coût zéro, haute performance',
                        axum: 'Axum 0.8 : Framework web typé avec conception API ergonomique',
                        tokio: 'Tokio 1.47 : Runtime async pour traitement concurrent efficace',
                        sqlx: 'SQLx 0.8 : Vérifications SQL à la compilation, opérations BDD typées',
                        reqwest: 'Reqwest 0.12 : Client HTTP avec pooling et retry automatique',
                        serde: 'Serde + TOML : Sérialisation/désérialisation, gestion configuration',
                        tracing: 'Tracing : Journalisation structurée et suivi performance',
                        compression: 'Compression Tower HTTP : Support Brotli, Gzip, Deflate, Zstd',
                    },
                },
                database: {
                    title: 'Base de Données (PostgreSQL)',
                    summary: 'PostgreSQL 12+ (14+ recommandé), puissante base de données relationnelle',
                    items: {
                        tables: 'Tables : app_info, app_metrics, app_rating, app_raw, substance, etc.',
                        triggers: 'Déclencheurs : Mises à jour automatiques et maintenance cohérence',
                        indexes: 'Optimisation Index : Amélioration performance requêtes',
                        foreign_keys: 'Cascades Clés Étrangères : Garanties intégrité données',
                        json: 'Champs JSON : Support structure données flexible',
                    },
                },
                frontend_harmony: {
                    title: 'Frontend HarmonyOS',
                    items: {
                        language: 'ArkTS : Langage développement applications HarmonyOS',
                        ui: 'ArkUI : Framework UI déclaratif',
                        web: 'ArkWeb : Intégration conteneur Web',
                        model: 'Stage Model : Modèle ingénierie moderne',
                        build: 'Hvigor : Chaîne outils build',
                    },
                },
                frontend_web: {
                    title: 'Frontend Web',
                },
                frontend_s: {
                    title: 'Frontend Site S',
                    items: {
                        js: 'JavaScript Natif : Sans dépendances framework, léger et efficace',
                        chart: 'Chart.js + Date-fns : Visualisation données',
                        markdown: 'Markdown-it : Rendu Markdown',
                        responsive: 'Design Responsive : Adaptation mobile',
                    },
                },
                frontend_t: {
                    title: 'Frontend Site T',
                    items: {
                        vue: 'Vue.js : Framework frontend progressif',
                        responsive: 'Design Responsive : Adaptation mobile',
                    },
                },
            },

            database: {
                title: 'Intégration Base de Données',
                desc: 'Solution de base de données moderne pour stockage massif et requêtes efficaces',
                features: {
                    storage: 'Stockage Massif : Support de millions d\'entrées d\'applications',
                    query: 'Requêtes Efficaces : Indexation optimisée, réponse en millisecondes',
                    sync: 'Sync Temps Réel : Mises à jour automatiques planifiées',
                    backup: 'Sauvegarde : Multiples mécanismes pour la sécurité des données',
                },
            },

            database_integration: {
                title: 'Accès Base de Données',
                intro: 'Nous fournissons des fonctions de requête, analyse statistique et autres pour le marché des applications HarmonyOS. Les projets sont bienvenus pour s\'intégrer à notre base de données.',
                cases_title: 'Cas d\'Intégration',
                cases: {
                    case1: {
                        title: 'N\'oubliez pas de vous abonner à App',
                        subtitle: 'Recevez les dernières mises à jour',
                    },
                    case2: {
                        title: 'Station de Ressources HAP',
                        subtitle: 'Bibliothèque de ressources HAP',
                    },
                    case3: {
                        title: 'NEXT Store',
                        subtitle: 'Magasin d\'applications nouvelle génération',
                    },
                    case4: {
                        title: 'Site de Xiao Liu',
                        subtitle: 'Collection d\'applications',
                    },
                    case5: {
                        title: 'Open Store',
                        subtitle: 'Écosystème d\'applications ouvert',
                    },
                },
                api_title: 'Documentation API',
                api_desc: 'Consultez la documentation API complète pour comprendre les méthodes d\'intégration',
                api_link: 'http://shenjack.top:10003/docs',
                api_button: 'Voir API',
                contact_button: 'Nous Contacter',
                warning: {
                    title: '⚠️ Avis Important',
                    p1: 'Vous devez nous informer avant d\'intégrer la base de données, sinon cela peut violer la licence open source.',
                    p2: 'Les utilisateurs ne doivent pas stocker localement les informations obtenues sous leur forme originale.',
                    p3: 'Tout contenu affiché sur les sites liés n\'a aucun rapport avec Harmony AppGallery Dashboard. L\'équipe du projet Harmony Gallery n\'est pas responsable du maintien du contenu des sites amis liés.',
                },
            },

            links: {
                title: 'Liens du Projet',
                desc: 'Accès rapide aux ressources et plateformes du projet',
                items: {
                    github: 'Dépôt GitHub',
                    docs: 'Documentation',
                    appgallery: 'Huawei AppGallery',
                    blog: 'Blog du Projet',
                },
            },

            team: {
                title: 'Équipe de Développement',
                desc: 'Merci à tous les développeurs et partenaires ayant contribué au projet',
                members: {
                    shenjack: 'Shenjack - Fondateur & Développeur Principal',
                    raychen: 'Ray Chen - Développement Frontend & Design UI',
                    contributors: 'Et tous les contributeurs open source',
                },
                contact: {
                    title: 'Contactez-nous',
                    qq: 'Groupe QQ : 825946573',
                    email: 'Email : contact@example.com',
                    github: 'GitHub : https://github.com/Harmony-Gallery',
                },
                license: {
                    title: 'Licence',
                    name: 'Licence GPL-3.0',
                    desc: 'Ce projet est open-sourcé sous licence GPL-3.0, permettant utilisation, modification et distribution gratuites, mais les œuvres dérivées doivent utiliser la même licence',
                },
                acknowledgments: {
                    title: 'Remerciements',
                    p1: 'Merci à Huawei AppGallery pour les sources de données',
                    p2: 'Merci à la Fondation OpenAtom Open Source pour le soutien',
                    p3: 'Merci à tous les utilisateurs de la communauté pour leurs retours',
                },
            },
        },
    },
};
