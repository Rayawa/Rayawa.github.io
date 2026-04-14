window.SITE_I18N = {
    zh: {
        nav: { home: '首页', about: '关于我', projects: '项目', gallery: '摄影', contact: '联系' },
        navTitle: '华为应用市场看板',

        hero: {
            title: '华为应用市场看板',
            lead: {
                part1: '由',
                link: 'Harmony Gallery 项目组',
                part2: '制作。一个获取、处理、分析并展示鸿蒙应用市场所有应用与元服务数据的全栈项目。',
            },
            tagRust: '以 Rust 为基础',
            tagDatabase: '强大的数据库',
            tagPlatform: '多平台适配',
            tagAward: '开放原子大赛获奖作品',
        },

        metrics: {
            totalViews: { label: '项目总访问量' },
            todayViews: { label: '今日访问量' },
            harmonyViews: { label: '鸿蒙应用总访问量' },
            note: '* 数据统计范围从2025-11-01T 04:00:00 +00:00至今，数据自动更新失败！上次更新2026-04-14T 05:32:13 +00:00。',
        },

        access: {
            sSite: '浏览器 - S 站',
            tSite: '浏览器 - T 站',
            harmony: 'HarmonyOS（内测）',
            android: '  Android（未上线）',
            ios: '  Apple（未上线）',
        },

        details: {
            title: '详细介绍',
            desc: '以下内容聚焦项目目标、核心能力与技术架构。',
            notes: {
                title: '重要提示',
                li1: '架构限制：数据内容仅覆盖HarmonyOS 5+核心环境，不含侧载或企业定制版应用。',
                li2: '更新延迟：数据存在滞后性，同步质量受限于用户网络稳定性，项目组不保证信息的即时性。',
                li3: '免责申明：所有数据由第三方测算，不代表华为官方立场！',
                li4: '知识产权：算法原创，严禁商用。使用API对接数据库前请先与我们取得联系。',
                li5: '动态调整本项目组拥有对本统计方法论及数据口径的最终解释权，保留在不预先通知的情况下修正算法逻辑的权利。',
            },
            what: {
                title: '项目是做什么的',
                li1: '本应用是由Harmony Gallery项目组直接参与编写的鸿蒙应用。应用收集华为应用市场的公开数据，转化为直观的图表与报告。简单来说，您能在这里查看几乎所有鸿蒙应用的动态。',
                li2: '1. 数据总览与图表分析：通过榜单、饼图与折线图，直观查看应用下载量、评分趋势与市场分布。',
                li3: '2. 搜索应用与查看详情：支持按名称、评分等条件搜索排序、应用内搜索应用、分享链接搜索应用。您可查看各种应用数据与趋势图。',
                li4: '3. 数据定时自动更新：后台每30分钟同步一次数据，确保您始终获取最新数据。',
                li5: '4. 交互式操作与分享：点击图表可进行数据筛选，点击应用可进入详情页；您也可通过链接、隔空抓取或鸿蒙碰一碰便捷分享应用页面。',
                li6: '5. 投稿更新应用信息：您可通过应用市场分享与"我的"页面向应用看板投稿，协助投稿新应用或更新应用信息。',
            },
            usage: {
                title: '网页端核心功能',
                li1: '1. 数据统计：展示应用总数、元服务总数、开发者总数等关键指标的统计数据。',
                li2: '2. 下载榜：提供下载量排名前20的应用列表，以及排除华为系应用后的下载量排名。',
                li3: '3. 应用详情：点击任意应用相关图标查看应用的详细信息，包括下载量、评分、支持设备、版本信息等。',
                li4: '4. 趋势分析：展示应用下载量的变化趋势和增量趋势图表。',
                li5: '5. 应用列表：详细应用信息表格，支持搜索、排序、筛选功能。',
            },
            harmony: {
                title: '鸿蒙版本特色',
                summary: '原生能力与跨设备体验',
                li1: 'HarmonyOS智能：AI信息提取辅助，支持应用内娱应用市场分享到看板查询投稿应用。',
                li2: 'HarmonyOS互联：鸿蒙原生交互体验。支持应用接续、链接分享、碰一碰与隔空传送，便于页面的跨设备传播。。',
                li3: 'HarmonyOS美学：高级质感、气态交互、光场视效，适配最新API23沉浸式材质与半模态模糊。',
                li4: 'HarmonyOS流畅：多线程并发、无第三方库，ArkTS原生流畅。',
            },
            tech: {
                title: '技术架构',
                desc: '项目采用现代化技术栈，确保高性能、高可用性与可维护性',
                backend: {
                    title: '后端技术（Rust）',
                    summary: 'Rust 技术栈实现数据聚合、API 暴露、数据库访问和服务端能力编排',
                    items: {
                        rust: 'Rust 2024 Edition：内存安全、零成本抽象、高性能',
                        axum: 'Axum 0.8：类型安全的 Web 框架，ergonomic API 设计',
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
            },
            database_integration: {
                title: '数据库接入',
                intro: 'Harmony Gallery 项目组提供鸿蒙应用市场数据查询、统计分析等功能接口，欢迎有需要的项目与我们的数据库对接。',
                cases_title: '接入案例 · 友情链接',
                cases: {
                    case1: {
                        title: '记得订阅 App',
                        subtitle: '使用数据库获取订阅App图标。',
                    },
                    case2: {
                        title: 'HAP 资源站',
                        subtitle: '网站数据使用数据库',
                    },
                    case3: {
                        title: 'NEXT Store',
                        subtitle: '网站数据使用数据库',
                    },
                    case4: {
                        title: '小刘的站点',
                        subtitle: '网站数据使用数据库',
                    },
                    case5: {
                        title: 'Open Store',
                        subtitle: '网站数据使用数据库',
                    },
                },
                warning: {
                    title: '⚠️ 重要提示',
                    p1: '对接数据库之前需要明确告知我们，否则可能违反开源许可。',
                    p2: '使用者不得在获取信息之后在本地原样存储。',
                    p3: '友情链接内网站展示的任何内容均与鸿蒙应用看板无关。Harmony Gallery 项目组不负责维护友情链接内容。',
                },
                api_title: 'API 文档',
                api_desc: '查看完整的 API 接口文档，了解数据接入方式\n如果您有意向使用我们的数据库，请先与我们取得联系！',
                api_button: '查看 API 文档',
                contact_button: '联系我们',
            },
        },

        contact: {
            title: '联系我们',
            desc: '感谢所有为项目做出贡献的开发者与合作伙伴',
            team: {
                title: 'Harmony Gallery 项目组',
                members: {
                    shenjack: {
                        name: 'shenjack',
                        contact: '邮箱：3695888@qq.com',
                        role: '主要负责人',
                    },
                    rayawa: {
                        name: '清霁·Rayawa',
                        contact: '邮箱：rayawa.work@outlook.com',
                        role: '鸿蒙应用开发、网站制作',
                    },
                    tianxiu2b2t: {
                        name: 'tianxiu2b2t',
                        contact: '邮箱：administrator@ttb-network.top',
                        role: 'T 站网页负责人',
                    },
                    qqgroup: {
                        name: 'Harmony Gallery 官方交流群',
                        contact_label: '群号：757273833',
                        role: 'QQ 群',
                    },
                },
            },
            acknowledgments: {
                title: '致谢',
                items: {
                    huawei: '项目致谢：伤心萨摩耶、HEZI641',
                    openatom: '鸿蒙应用致谢：筱冉、音唯Artix',
                    community: '感谢华为开发者联盟技术支持',
                },
            },
            license: {
                title: '开源许可',
                name: 'GPL-3.0 License',
                desc: '本项目采用 GPL-3.0 协议开源，允许自由使用、修改与分发，但衍生作品必须采用相同协议',
            },
        },
    },

    en: {
        nav: { home: 'Home', about: 'About Me', projects: 'Projects', gallery: 'Photography', contact: 'Contact' },
        navTitle: 'HmDashboard',

        hero: {
            title: 'HmDashboard',
            lead: {
                part1: 'Crafted by the ',
                link: 'Harmony Gallery Team',
                part2: '. A full-stack project that acquires, processes, analyzes, and visualizes all app and atomic service data from the HarmonyOS app market.',
            },
            tagRust: 'Rust-Powered',
            tagDatabase: 'Powerful Database',
            tagPlatform: 'Multi-Platform Support',
            tagAward: 'OpenAtom Contest Award Winner',
        },

        metrics: {
            totalViews: { label: 'Total Project Views' },
            todayViews: { label: "Today's Views" },
            harmonyViews: { label: 'Total HarmonyOS App Views' },
            note: '* Data statistics range from 2025-11-01T 04:00:00 +00:00 to present. Auto-update failed! Last update 2026-04-14T 05:32:13 +00:00.',
        },

        access: {
            sSite: 'Browser - S Site',
            tSite: 'Browser - T Site',
            harmony: 'HarmonyOS (Beta)',
            android: 'Android (Not Live)',
            ios: 'Apple (Not Live)',
        },

        details: {
            title: 'Detailed Introduction',
            desc: 'The following content focuses on project goals, core capabilities, and technical architecture.',
            notes: {
                title: 'Important Notes',
                li1: 'Architecture Limitation: Data content only covers the HarmonyOS 5+ core environment, excluding sideloaded or enterprise-customized apps.',
                li2: 'Update Delay: Data may be lagging. Sync quality is limited by user network stability. The project team does not guarantee real-time accuracy of information.',
                li3: 'Disclaimer: All data is calculated by third parties and does not represent Huawei\'s official position!',
                li4: 'Intellectual Property: Algorithms are original. Commercial use is strictly prohibited. Please contact us before using the API to connect to the database.',
                li5: 'Dynamic Adjustment: The project team reserves the right of final interpretation of the statistical methodology and data standards, and the right to modify algorithm logic without prior notice.',
            },
            what: {
                title: 'What Does This Project Do',
                li1: 'This app is a HarmonyOS application directly developed by the Harmony Gallery team. It collects public data from the Huawei AppMarket and transforms it into intuitive charts and reports. Simply put, you can view the dynamics of almost all HarmonyOS apps here.',
                li2: '1. Data Overview & Chart Analysis: View app downloads, rating trends, and market distribution intuitively through rankings, pie charts, and line charts.',
                li3: '2. Search Apps & View Details: Support searching and sorting by name, rating, etc.; in-app search; share link search. You can view various app data and trend charts.',
                li4: '3. Scheduled Auto-Update: Data is synced every 30 minutes in the background, ensuring you always get the latest data.',
                li5: '4. Interactive Operations & Sharing: Click charts for data filtering, click apps to enter detail pages; you can also conveniently share app pages via links, air grab, or HarmonyOS tap-to-share.',
                li6: '5. Contribute & Update App Info: You can contribute to the app dashboard via AppMarket sharing and the "Me" page, helping submit new apps or update app information.',
            },
            usage: {
                title: 'Web Core Features',
                li1: '1. Data Statistics: Display statistical data for key indicators such as total number of apps, total atomic services, and total developers.',
                li2: '2. Download Rankings: Provide a list of the top 20 apps by downloads, as well as download rankings excluding Huawei apps.',
                li3: '3. App Details: Click any app-related icon to view detailed app information, including downloads, ratings, supported devices, version info, etc.',
                li4: '4. Trend Analysis: Display charts of app download change trends and incremental trends.',
                li5: '5. App List: Detailed app information table with search, sorting, and filtering capabilities.',
            },
            harmony: {
                title: 'HarmonyOS Version Highlights',
                summary: 'Native Capabilities & Cross-Device Experience',
                li1: 'HarmonyOS Intelligence: AI information extraction assistance, supports sharing from in-app AppMarket to dashboard for querying and contributing apps.',
                li2: 'HarmonyOS Connectivity: Native HarmonyOS interactive experience. Supports app continuation, link sharing, tap-to-share, and air transfer, facilitating cross-device page dissemination.',
                li3: 'HarmonyOS Aesthetics: Premium texture, fluid interactions, light field effects, adapted to the latest API23 immersive materials and half-modal blur.',
                li4: 'HarmonyOS Smoothness: Multi-threaded concurrency, no third-party libraries, native ArkTS smoothness.',
            },
            tech: {
                title: 'Technology Stack',
                desc: 'The project adopts a modern tech stack, ensuring high performance, high availability, and maintainability',
                backend: {
                    title: 'Backend (Rust)',
                    summary: 'Rust tech stack implementing data aggregation, API exposure, database access, and server-side capability orchestration',
                    items: {
                        rust: 'Rust 2024 Edition: Memory safety, zero-cost abstractions, high performance',
                        axum: 'Axum 0.8: Type-safe web framework, ergonomic API design',
                        tokio: 'Tokio 1.47: Async runtime, efficient concurrent processing',
                        sqlx: 'SQLx 0.8: Compile-time SQL checks, type-safe database operations',
                        reqwest: 'Reqwest 0.12: HTTP client, supports connection pooling and auto-retry',
                        serde: 'Serde + TOML: Serialization/deserialization, configuration management',
                        tracing: 'Tracing: Structured logging and performance tracking',
                        compression: 'Tower HTTP Compression: Brotli, Gzip, Deflate, Zstd',
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
            },
            database_integration: {
                title: 'Database Access',
                intro: 'The Harmony Gallery team provides HarmonyOS app market data query, statistical analysis, and other functional interfaces. Projects in need are welcome to integrate with our database.',
                cases_title: 'Integration Cases · Friendly Links',
                cases: {
                    case1: {
                        title: 'Remember to Subscribe App',
                        subtitle: 'Uses database to get subscribed app icons.',
                    },
                    case2: {
                        title: 'HAP Resource Station',
                        subtitle: 'Website data uses database',
                    },
                    case3: {
                        title: 'NEXT Store',
                        subtitle: 'Website data uses database',
                    },
                    case4: {
                        title: "Xiao Liu's Site",
                        subtitle: 'Website data uses database',
                    },
                    case5: {
                        title: 'Open Store',
                        subtitle: 'Website data uses database',
                    },
                },
                warning: {
                    title: '⚠️ Important Notice',
                    p1: 'You must inform us before integrating with the database, otherwise it may violate the open source license.',
                    p2: 'Users must not store obtained information locally in its original form.',
                    p3: 'Any content displayed on friendly-linked websites is unrelated to the HarmonyOS App Dashboard. The Harmony Gallery project team is not responsible for maintaining friendly link content.',
                },
                api_title: 'API Documentation',
                api_desc: 'View complete API documentation to understand data integration methods\nIf you are interested in using our database, please contact us first!',
                api_button: 'View API Docs',
                contact_button: 'Contact Us',
            },
        },

        contact: {
            title: 'Contact Us',
            desc: 'Thanks to all developers and partners who contributed to the project',
            team: {
                title: 'Harmony Gallery Team',
                members: {
                    shenjack: {
                        name: 'shenjack',
                        contact: 'Email: 3695888@qq.com',
                        role: 'Principal',
                    },
                    rayawa: {
                        name: '清霁·Rayawa',
                        contact: 'Email: rayawa.work@outlook.com',
                        role: 'HarmonyOS App Development, Website Production',
                    },
                    tianxiu2b2t: {
                        name: 'tianxiu2b2t',
                        contact: 'Email: administrator@ttb-network.top',
                        role: 'T Site Web Lead',
                    },
                    qqgroup: {
                        name: 'Harmony Gallery Official Communication Group',
                        contact_label: 'Group ID: 757273833',
                        role: 'QQ Group',
                    },
                },
            },
            acknowledgments: {
                title: 'Acknowledgments',
                items: {
                    huawei: 'Project Thanks: 伤心萨摩耶, HEZI641',
                    openatom: 'HarmonyOS App Thanks: 筱冉, 音唯Artix',
                    community: 'Thanks to Huawei Developer Alliance for technical support',
                },
            },
            license: {
                title: 'License',
                name: 'GPL-3.0 License',
                desc: 'This project is open-sourced under GPL-3.0 License, allowing free use, modification, and distribution, but derivative works must use the same license',
            },
        },
    },

    fr: {
        nav: { home: 'Accueil', about: 'À propos de moi', projects: 'Projets', gallery: 'Photographie', contact: 'Contact' },
        navTitle: 'HmDashboard',

        hero: {
            title: 'HmDashboard',
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
            totalViews: { label: 'Vues Totales du Projet' },
            todayViews: { label: "Vues du Jour" },
            harmonyViews: { label: 'Vues Totales des Apps HarmonyOS' },
            note: '* Plage de statistiques de données de 2025-11-01T 04:00:00 +00:00 à présent. Échec de la mise à jour automatique ! Dernière mise à jour 2026-04-14T 05:32:13 +00:00.',
        },

        access: {
            sSite: 'Navigateur - Site S',
            tSite: 'Navigateur - Site T',
            harmony: 'HarmonyOS (Bêta)',
            android: 'Android (Non Lancé)',
            ios: 'Apple (Non Lancé)',
        },

        details: {
            title: 'Introduction Détaillée',
            desc: 'Le contenu suivant se concentre sur les objectifs du projet, les capacités de base et l\'architecture technique.',
            notes: {
                title: 'Notes Importantes',
                li1: 'Limitation d\'Architecture : Le contenu des données ne couvre que l\'environnement principal HarmonyOS 5+, à l\'exclusion des applications chargées latéralement ou personnalisées pour les entreprises.',
                li2: 'Délai de Mise à Jour : Les données peuvent être en retard. La qualité de synchronisation est limitée par la stabilité du réseau de l\'utilisateur. L\'équipe du projet ne garantit pas l\'immédiateté des informations.',
                li3: 'Avertissement : Toutes les données sont calculées par des tiers et ne représentent pas la position officielle de Huawei !',
                li4: 'Propriété Intellectuelle : Les algorithmes sont originaux. L\'utilisation commerciale est strictement interdite. Veuillez nous contacter avant d\'utiliser l\'API pour vous connecter à la base de données.',
                li5: 'Ajustement Dynamique : L\'équipe du projet se réserve le droit d\'interprétation finale de la méthodologie statistique et des standards de données, ainsi que le droit de modifier la logique algorithmique sans préavis.',
            },
            what: {
                title: 'À quoi Sert ce Projet',
                li1: 'Cette application est une application HarmonyOS développée directement par l\'équipe Harmony Gallery. Elle collecte les données publiques du marché des applications Huawei et les transforme en graphiques et rapports intuitifs. En bref, vous pouvez consulter ici la dynamique de presque toutes les applications HarmonyOS.',
                li2: '1. Aperçu des Données & Analyse Graphique : Consultez intuitivement les téléchargements, les tendances de notation et la distribution du marché via des classements, des graphiques circulaires et des graphiques linéaires.',
                li3: '2. Rechercher des Apps & Voir les Détails : Prise en charge de la recherche et du tri par nom, notation, etc. ; recherche in-app ; recherche par lien de partage. Vous pouvez consulter diverses données d\'application et graphiques de tendance.',
                li4: '3. Mise à Jour Automatique Planifiée : Les données sont synchronisées toutes les 30 minutes en arrière-plan, vous garantissant toujours les données les plus récentes.',
                li5: '4. Opérations Interactives & Partage : Cliquez sur les graphiques pour filtrer les données, cliquez sur les applications pour accéder aux pages de détail ; vous pouvez également partager facilement les pages d\'application via des liens, la saisie en l\'air ou le tap-to-share HarmonyOS.',
                li6: '5. Contribuer & Mettre à Jour les Infos : Vous pouvez contribuer au tableau de bord des applications via le partage AppMarket et la page "Moi", en aidant à soumettre de nouvelles applications ou à mettre à jour les informations des applications.',
            },
            usage: {
                title: 'Fonctions Web Principales',
                li1: '1. Statistiques de Données : Affichage des données statistiques des indicateurs clés tels que le nombre total d\'applications, le total des services atomiques et le total des développeurs.',
                li2: '2. Classements de Téléchargement : Fournit la liste des 20 meilleures applications par téléchargements, ainsi que les classements de téléchargements hors applications Huawei.',
                li3: '3. Détails de l\'Application : Cliquez sur n\'importe quelle icône d\'application pour voir les informations détaillées, y compris les téléchargements, les évaluations, les appareils pris en charge, les informations de version, etc.',
                li4: '4. Analyse des Tendances : Affichage des graphiques de tendances d\'évolution et de tendance incrémentale des téléchargements d\'applications.',
                li5: '5. Liste des Applications : Tableau détaillé des informations d\'application avec fonctions de recherche, tri et filtrage.',
            },
            harmony: {
                title: 'Points Forts de la Version HarmonyOS',
                summary: 'Capacités Natives & Expérience Inter-Appareils',
                li1: 'Intelligence HarmonyOS : Assistance à l\'extraction d\'informations par IA, prise en charge du partage depuis l\'AppMarket in-app vers le tableau de bord pour interroger et contribuer des applications.',
                li2: 'Connectivité HarmonyOS : Expérience interactive native HarmonyOS. Prise en charge de la continuation d\'application, du partage de lien, du tap-to-share et du transfert sans fil, facilitant la diffusion inter-appareils des pages.',
                li3: 'Esthétique HarmonyOS : Texture premium, interactions fluides, effets de champ lumineux, adaptés aux matériaux immersifs API23 les plus récents et au flou semi-modal.',
                li4: 'Fluidité HarmonyOS : Concurrence multi-thread, aucune bibliothèque tierce, fluidité native ArkTS.',
            },
            tech: {
                title: 'Stack Technique',
                desc: 'Le projet adopte une stack technique moderne, garantissant haute performance, haute disponibilité et maintenabilité',
                backend: {
                    title: 'Backend (Rust)',
                    summary: 'Stack Rust implémentant l\'agrégation de données, l\'exposition API, l\'accès base de données et l\'orchestration des capacités côté serveur',
                    items: {
                        rust: 'Rust 2024 Edition : Sécurité mémoire, abstractions à coût zéro, haute performance',
                        axum: 'Axum 0.8 : Framework web typé, conception API ergonomique',
                        tokio: 'Tokio 1.47 : Runtime asynchrone, traitement concurrent efficace',
                        sqlx: 'SQLx 0.8 : Vérifications SQL à la compilation, opérations BDD typées',
                        reqwest: 'Reqwest 0.12 : Client HTTP, prise en charge du pooling de connexions et du retry automatique',
                        serde: 'Serde + TOML : Sérialisation/désérialisation, gestion configuration',
                        tracing: 'Tracing : Journalisation structurée et suivi performance',
                        compression: 'Compression Tower HTTP : Brotli, Gzip, Deflate, Zstd',
                    },
                },
                database: {
                    title: 'Base de Données (PostgreSQL)',
                    summary: 'PostgreSQL 12+ (14+ recommandé), puissante base de données relationnelle',
                    items: {
                        tables: 'Tables : app_info, app_metrics, app_rating, app_raw, substance, etc.',
                        triggers: 'Déclencheurs : Mises à jour automatiques et maintenance de cohérence',
                        indexes: 'Optimisation Index : Amélioration performance requêtes',
                        foreign_keys: 'Cascades Clés Étrangères : Garanties intégrité données',
                        json: 'Champs JSON : Support structure données flexible',
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
            },
            database_integration: {
                title: 'Accès Base de Données',
                intro: 'L\'équipe Harmony Gallery fournit des interfaces fonctionnelles de requête de données, d\'analyse statistique et autres pour le marché des applications HarmonyOS. Les projets nécessiteux sont invités à s\'intégrer à notre base de données.',
                cases_title: 'Cas d\'Intégration · Liens Amicaux',
                cases: {
                    case1: {
                        title: 'N\'oubliez pas de vous abonner à App',
                        subtitle: 'Utilise la base de données pour obtenir les icônes des apps abonnées.',
                    },
                    case2: {
                        title: 'Station de Ressources HAP',
                        subtitle: 'Les données du site utilisent la base de données',
                    },
                    case3: {
                        title: 'NEXT Store',
                        subtitle: 'Les données du site utilisent la base de données',
                    },
                    case4: {
                        title: 'Site de Xiao Liu',
                        subtitle: 'Les données du site utilisent la base de données',
                    },
                    case5: {
                        title: 'Open Store',
                        subtitle: 'Les données du site utilisent la base de données',
                    },
                },
                warning: {
                    title: '⚠️ Avis Important',
                    p1: 'Vous devez nous informer avant de vous intégrer à la base de données, sinon cela peut violer la licence open source.',
                    p2: 'Les utilisateurs ne doivent pas stocker localement les informations obtenues sous leur forme originale.',
                    p3: 'Tout contenu affiché sur les sites liés amicalement n\'a aucun rapport avec le Tableau de Bord des Applications HarmonyOS. L\'équipe du projet Harmony Gallery n\'est pas responsable de la maintenance du contenu des liens amicaux.',
                },
                api_title: 'Documentation API',
                api_desc: 'Consultez la documentation API complète pour comprendre les méthodes d\'intégration de données\nSi vous souhaitez utiliser notre base de données, veuillez d\'abord nous contacter !',
                api_button: 'Voir la Doc API',
                contact_button: 'Nous Contacter',
            },
        },

        contact: {
            title: 'Contactez-nous',
            desc: 'Merci à tous les développeurs et partenaires ayant contribué au projet',
            team: {
                title: 'Équipe Harmony Gallery',
                members: {
                    shenjack: {
                        name: 'shenjack',
                        contact: 'Email: 3695888@qq.com',
                        role: 'Responsable Principal',
                    },
                    rayawa: {
                        name: '清霁·Rayawa',
                        contact: 'Email: rayawa.work@outlook.com',
                        role: 'Développement App HarmonyOS, Production du Site',
                    },
                    tianxiu2b2t: {
                        name: 'tianxiu2b2t',
                        contact: 'Email: administrator@ttb-network.top',
                        role: 'Responsable Web Site T',
                    },
                    qqgroup: {
                        name: 'Groupe de Communication Officiel Harmony Gallery',
                        contact_label: 'ID du Groupe: 757273833',
                        role: 'Groupe QQ',
                    },
                },
            },
            acknowledgments: {
                title: 'Remerciements',
                items: {
                    huawei: 'Remerciements Projet : 伤心萨摩耶, HEZI641',
                    openatom: 'Remerciements App HarmonyOS : 筱冉, 音唯Artix',
                    community: 'Merci à l\'Alliance des Développeurs Huawei pour le support technique',
                },
            },
            license: {
                title: 'Licence',
                name: 'Licence GPL-3.0',
                desc: 'Ce projet est open-sourcé sous licence GPL-3.0, permettant utilisation, modification et distribution gratuites, mais les œuvres dérivées doivent utiliser la même licence',
            },
        },
    },
};
