const supportedLocales = ['zh', 'en', 'fr'];
let locale = 'zh';

const i18n = {
    zh: {
        sending: '发送中...',
        sent: '消息发送成功！我会尽快回复您。',
        sendFailed: '发送失败，请稍后重试。',
        top: '回到顶部',
        refresh: '刷新页面',
        dotLabel: '跳转到第 {n} 张',
        nav: { home: '首页', about: '关于我', projects: '项目', gallery: '摄影', contact: '联系' },
        hero: {
            title: '你好，我是 <span class="gradient-text">Ray</span>',
            intro: '通信在读 | 鸿蒙开发者 | 跨界极客 | 影像创作者',
            core: '专注 HarmonyOS 应用开发与 Hi3861 嵌入式实践。',
            side: 'Web构建、Difficult Rocket 与 Minecraft 模组开发、生物学相关研究。',
            photo: '风景摄影与无人机航拍，用快门捕捉通信之外的频率。',
            life: "J'apprends le français，跑步骑行中，也在提瓦特、塔卫二与罗德岛的世界里切换；音游节奏在线，每天赚费沉底石头人（）。",
            tag: { core: '核心', side: '支线', photo: '摄影', life: '生活' },
            btn: { projects: '查看项目', contact: '联系我' },
            quote: 'Everything is possible by code.',
        },
        about: {
            title: '关于我',
            subtitle: '跨越学科的边界，只为连接更广阔的世界。',
            profile: '个人简介',
        },
        projects: {
            title: '我的项目',
            subtitle: '把热爱写成项目，把项目做成长期作品。',
            other: '其他项目',
        },
        gallery: {
            title: '摄影作品',
            subtitle: '以俯瞰视角重构地表纹理，用快门捕捉通信频谱之外的瞬间。',
            more: '查看更多作品',
        },
        social: {
            title: '我的链接',
            subtitle: '在公开平台持续输出，也在协作中持续成长。',
            bili: { title: 'Bilibili', desc: '摄影作品与项目更新进度' },
            github: { title: 'GitHub', desc: '代码与仓库入口' },
            xhs: { title: '小红书', desc: '我的全部摄影作品' },
        },
        contact: {
            title: '联系我',
            subtitle: '如果方向一致，我们就一起把它做成。',
            email: '电子邮件',
            website: '网站',
            qq: 'QQ',
            location: '位置',
            locationValue: '北京，中国',
        },
        form: {
            name: '姓名',
            email: '邮箱',
            message: '消息',
            namePh: '请输入您的姓名',
            emailPh: '请输入您的邮箱',
            messagePh: '请输入您的消息...',
            send: '发送消息',
        },
        footer: { quick: '快速链接', projects: '项目', copy: '&copy; 2026 Ray Chen. All rights reserved.' },
        project: {
            hmdb: { title: '华为应用市场看板', desc: '基于鸿蒙生态的数据看板项目，聚焦应用市场信息聚合、展示与分析。当前主线项目，持续更新中。', award: '开放原子大赛三等奖作品' },
            bio: { title: '生物学项目', desc: '收录我生物学方向论文与实验记录，包括PCR项目、蛋白质猜想、碳同化综述、橙色平板实验，以及农杆菌转化法网页化展示。' },
            spm: { title: 'Sweet Potato Mod', desc: '与@teddyxlandlee协作开发的Minecraft模组项目，围绕玩法拓展、内容设计与开源协作推进。' },
            dr: { title: 'Difficlut Rocket（协作开发）', desc: '与@shenjackyuanjie协作推进的项目，持续进行功能迭代与工程完善。' },
            idv: { title: '第五人格', desc: '当年和秀秀打人类排位到六节搓出来的网页，放在这里留个纪念（' },
            xiaodou: { title: '小豆英语启蒙', desc: '轻量起步、长期迭代的小豆英语启蒙项目，主打可坚持的学习节奏。' },
        },
        tag: { dataVis: '数据可视化', webApp: 'Web 应用', biology: '生物学', research: '研究', academic: '学术', gameMod: '游戏模组', openSource: '开源' },
    },
    en: {
        sending: 'Sending...',
        sent: 'Message sent successfully. I will reply soon.',
        sendFailed: 'Failed to send. Please try again later.',
        top: 'Back to top',
        refresh: 'Refresh page',
        dotLabel: 'Go to slide {n}',
        nav: { home: 'Home', about: 'About', projects: 'Projects', gallery: 'Gallery', contact: 'Contact' },
        hero: {
            title: 'Hi, I am <span class="gradient-text">Ray</span>',
            intro: 'Communication Student | HarmonyOS Builder | Cross-domain Geek | Visual Storyteller',
            core: 'Building HarmonyOS experiences while going deep on Hi3861 embedded fundamentals.',
            side: 'Shipping web projects, collaborating on Difficult Rocket and Minecraft mods, and exploring biology with code.',
            photo: 'Shooting landscapes and drone footage to capture frequencies beyond telecom.',
            life: "Learning French, running and cycling, drifting between Teyvat, Talos-II and Rhodes Island, then ending the day with rhythm games and a Golem deck grind.",
            tag: { core: 'Core', side: 'Side', photo: 'Photo', life: 'Life' },
            btn: { projects: 'View Projects', contact: 'Contact Me' },
            quote: 'Everything is possible by code.',
        },
        about: {
            title: 'About Me',
            subtitle: 'I cross disciplines to build things that are both useful and alive.',
            profile: 'Profile',
        },
        projects: {
            title: 'My Projects',
            subtitle: 'Turning curiosity into shipped work, and shipped work into lasting craft.',
            other: 'Other Projects',
        },
        gallery: {
            title: 'Gallery',
            subtitle: 'Aerial angles, grounded texture, and moments that live outside the signal band.',
            more: 'View More',
        },
        social: {
            title: 'My Links',
            subtitle: 'Public output, open collaboration, steady growth.',
            bili: { title: 'Bilibili', desc: 'Photography and project update logs' },
            github: { title: 'GitHub', desc: 'Code, repos, and ongoing work' },
            xhs: { title: 'Xiaohongshu', desc: 'Full photography collection' },
        },
        contact: {
            title: 'Contact',
            subtitle: 'If we aim in the same direction, let us build it together.',
            email: 'Email',
            website: 'Website',
            qq: 'QQ',
            location: 'Location',
            locationValue: 'Beijing, China',
        },
        form: {
            name: 'Name',
            email: 'Email',
            message: 'Message',
            namePh: 'Your name',
            emailPh: 'Your email',
            messagePh: 'Your message...',
            send: 'Send',
        },
        footer: { quick: 'Quick Links', projects: 'Projects', copy: '&copy; 2026 Ray Chen. All rights reserved.' },
        project: {
            hmdb: { title: 'HmDashboard', desc: 'A Harmony ecosystem dashboard focused on market data aggregation, insight display, and analysis.', award: 'Third Prize, OpenAtom Competition' },
            bio: { title: 'Biology Projects', desc: 'Papers and experiment records, including PCR practice, protein hypotheses, carbon assimilation review, orange-plate experiments, and Agrobacterium web demos.' },
            spm: { title: 'Sweet Potato Mod', desc: 'A Minecraft mod collaboration with @teddyxlandlee focused on gameplay expansion, content design, and open-source teamwork.' },
            dr: { title: 'Difficlut Rocket (Collaboration)', desc: 'Co-developed with @shenjackyuanjie through steady feature iteration and engineering polish.' },
            idv: { title: 'Identity V', desc: 'An Identity V web project built with friends, kept as a small but meaningful timestamp.' },
            xiaodou: { title: 'Xiaodou English Starter', desc: 'A lightweight English learning starter designed for a sustainable daily pace.' },
        },
        tag: { dataVis: 'Data Visualization', webApp: 'Web App', biology: 'Biology', research: 'Research', academic: 'Academic', gameMod: 'Game Mod', openSource: 'Open Source' },
    },
    fr: {
        sending: 'Envoi...',
        sent: 'Message envoye. Je vous repondrai bientot.',
        sendFailed: 'Echec de l envoi. Veuillez reessayer plus tard.',
        top: 'Retour en haut',
        refresh: 'Rafraichir la page',
        dotLabel: 'Aller a la diapositive {n}',
        nav: { home: 'Accueil', about: 'A propos', projects: 'Projets', gallery: 'Galerie', contact: 'Contact' },
        hero: {
            title: 'Bonjour, je suis <span class="gradient-text">Ray</span>',
            intro: 'Etudiant en communication | Createur HarmonyOS | Geek transdisciplinaire | Auteur visuel',
            core: 'Je construis des applications HarmonyOS tout en approfondissant l embarque Hi3861.',
            side: 'Je livre des projets web, je collabore sur Difficult Rocket et des mods Minecraft, et j explore la biologie par le code.',
            photo: 'Photo de paysage et drone pour capter des frequences hors du spectre telecom.',
            life: "J apprends le francais, je cours, je fais du velo, je passe de Teyvat a Rhodes Island, puis je termine en jeux de rythme et deck Golem.",
            tag: { core: 'Noyau', side: 'Pistes', photo: 'Photo', life: 'Vie' },
            btn: { projects: 'Voir les projets', contact: 'Me contacter' },
            quote: 'Everything is possible by code.',
        },
        about: {
            title: 'A propos de moi',
            subtitle: 'Je traverse les disciplines pour construire des choses utiles, sensibles et durables.',
            profile: 'Profil',
        },
        projects: {
            title: 'Mes projets',
            subtitle: 'Transformer la curiosite en projets, puis les projets en travail qui reste.',
            other: 'Autres projets',
        },
        gallery: {
            title: 'Galerie',
            subtitle: 'Angles aeriens, textures du sol, et instants hors de la bande de signal.',
            more: 'Voir plus',
        },
        social: {
            title: 'Mes liens',
            subtitle: 'Publier en public, collaborer en ouvert, progresser sans pause.',
            bili: { title: 'Bilibili', desc: 'Photos et journal de progression projet' },
            github: { title: 'GitHub', desc: 'Code, depots et chantiers en cours' },
            xhs: { title: 'Xiaohongshu', desc: 'Collection photo complete' },
        },
        contact: {
            title: 'Contact',
            subtitle: 'Si nous visons la meme direction, construisons-le ensemble.',
            email: 'Email',
            website: 'Site',
            qq: 'QQ',
            location: 'Localisation',
            locationValue: 'Pekin, Chine',
        },
        form: {
            name: 'Nom',
            email: 'Email',
            message: 'Message',
            namePh: 'Votre nom',
            emailPh: 'Votre email',
            messagePh: 'Votre message...',
            send: 'Envoyer',
        },
        footer: { quick: 'Liens rapides', projects: 'Projets', copy: '&copy; 2026 Ray Chen. Tous droits reserves.' },
        project: {
            hmdb: { title: 'HmDashboard', desc: 'Un tableau de bord de l ecosysteme Harmony, axe sur l agregation, la lecture et l analyse de donnees applicatives.', award: 'Troisieme prix, concours OpenAtom' },
            bio: { title: 'Projets de biologie', desc: 'Papiers et traces experimentales: PCR, hypotheses proteiques, revue d assimilation du carbone, orange-plate et demos web Agrobacterium.' },
            spm: { title: 'Sweet Potato Mod', desc: 'Collaboration mod Minecraft avec @teddyxlandlee, orientee gameplay, contenu et dynamique open-source.' },
            dr: { title: 'Difficlut Rocket (Collaboration)', desc: 'Co-developpe avec @shenjackyuanjie, avec iterations fonctionnelles continues et consolidation technique.' },
            idv: { title: 'Identity V', desc: 'Un site Identity V cree avec des amis, garde comme capsule de memoire.' },
            xiaodou: { title: 'Xiaodou English Starter', desc: 'Une initiation a l anglais, legere au depart et pensee pour durer au quotidien.' },
        },
        tag: { dataVis: 'Visualisation de donnees', webApp: 'Application Web', biology: 'Biologie', research: 'Recherche', academic: 'Academique', gameMod: 'Mod de jeu', openSource: 'Open Source' },
    },
};

function getI18nValue(path, lang = locale) {
    return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), i18n[lang]);
}

function getCurrentText(path, fallback = '') {
    const value = getI18nValue(path);
    return value == null ? fallback : value;
}

let t = i18n.zh;
let galleryA11yUpdater = null;
const floatingTools = { refreshBtn: null, topBtn: null };
const langToHtmlLang = { zh: 'zh-CN', en: 'en', fr: 'fr' };
const localeHtmlMap = { en: 'index_en.html', fr: 'index_fr.html' };
const localeFragmentsCache = {};
let localeFragmentToken = 0;

const aboutBlocks = {
    about: null,
    status: null,
    capability: null,
    zhSnapshot: null,
};

function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function collectLayoutLocks() {
    const selectors = [
        '.hero-content',
        '#about .about-content',
        '#projects .projects-grid',
        '#projects .other-projects .projects-grid',
        '#social .social-grid',
        '#contact .contact-content',
    ];

    return selectors
        .map((selector) => document.querySelector(selector))
        .filter(Boolean)
        .map((el) => ({
            el,
            from: el.offsetHeight,
        }));
}

function beginLayoutLock(locks) {
    locks.forEach((item) => {
        const { el, from } = item;
        el.style.height = `${from}px`;
        el.style.minHeight = `${from}px`;
        el.style.overflow = 'hidden';
        el.style.transition = 'height 620ms cubic-bezier(0.2, 0.8, 0.2, 1), min-height 620ms cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
}

function endLayoutLock(locks) {
    locks.forEach((item) => {
        const { el } = item;
        el.style.height = '';
        el.style.minHeight = '';
        el.style.overflow = '';
        el.style.transition = '';
    });
}

async function stabilizeLayoutDuring(task) {
    const locks = collectLayoutLocks();
    if (!locks.length) {
        await task();
        return;
    }

    beginLayoutLock(locks);
    await task();

    await new Promise((resolve) => {
        window.requestAnimationFrame(() => {
            locks.forEach((item) => {
                item.to = item.el.scrollHeight;
                item.el.style.height = `${item.to}px`;
                item.el.style.minHeight = `${item.to}px`;
            });
            resolve();
        });
    });

    await sleep(680);
    endLayoutLock(locks);
}

function detectInitialLocale() {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (fromQuery && supportedLocales.includes(fromQuery)) return fromQuery;
    const fromStorage = window.localStorage.getItem('site_lang');
    if (fromStorage && supportedLocales.includes(fromStorage)) return fromStorage;
    const fromDoc = (document.documentElement.lang || '').toLowerCase();
    if (fromDoc.startsWith('en')) return 'en';
    if (fromDoc.startsWith('fr')) return 'fr';
    return 'zh';
}

function applyLanguageButtons() {
    document.querySelectorAll('.lang-btn[data-lang]').forEach((btn) => {
        const isActive = btn.dataset.lang === locale;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function applyTextNodes() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = getCurrentText(key, el.textContent || '');
        el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        const value = getCurrentText(key, el.innerHTML);
        el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = getCurrentText(key, el.getAttribute('placeholder') || '');
        el.setAttribute('placeholder', value);
    });

    const quote = document.querySelector('.avatar-quote');
    if (quote) quote.textContent = getCurrentText('hero.quote', quote.textContent || '');
}

function initLocaleBlockSnapshots() {
    aboutBlocks.about = document.getElementById('aboutTextBlock');
    aboutBlocks.status = document.getElementById('statusCardBlock');
    aboutBlocks.capability = document.getElementById('capabilityCardBlock');
    if (!aboutBlocks.about || !aboutBlocks.status || !aboutBlocks.capability) return;
    aboutBlocks.zhSnapshot = {
        about: aboutBlocks.about.innerHTML,
        status: aboutBlocks.status.innerHTML,
        capability: aboutBlocks.capability.innerHTML,
    };
}

async function loadLocaleFragments(lang) {
    if (!localeHtmlMap[lang]) return null;
    if (localeFragmentsCache[lang]) return localeFragmentsCache[lang];

    const res = await fetch(localeHtmlMap[lang], { cache: 'force-cache' });
    if (!res.ok) throw new Error(`failed to load locale source ${lang}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const about = doc.querySelector('#about .about-text');
    const status = doc.querySelector('#about .status-card');
    const capability = doc.querySelector('#about .side-card');
    if (!about || !status || !capability) return null;

    const fragments = {
        about: about.innerHTML,
        status: status.innerHTML,
        capability: capability.innerHTML,
    };
    localeFragmentsCache[lang] = fragments;
    return fragments;
}

async function applyLocaleBlocks(lang) {
    if (!aboutBlocks.about || !aboutBlocks.status || !aboutBlocks.capability || !aboutBlocks.zhSnapshot) return;
    const currentToken = ++localeFragmentToken;

    if (lang === 'zh') {
        aboutBlocks.about.innerHTML = aboutBlocks.zhSnapshot.about;
        aboutBlocks.status.innerHTML = aboutBlocks.zhSnapshot.status;
        aboutBlocks.capability.innerHTML = aboutBlocks.zhSnapshot.capability;
        hydrateRevealItems();
        return;
    }

    try {
        const fragments = await loadLocaleFragments(lang);
        if (!fragments || currentToken !== localeFragmentToken) return;
        aboutBlocks.about.innerHTML = fragments.about;
        aboutBlocks.status.innerHTML = fragments.status;
        aboutBlocks.capability.innerHTML = fragments.capability;
        hydrateRevealItems();
    } catch (err) {
        console.warn('locale fragment load failed', err);
    }
}

function hydrateRevealItems() {
    const targets = document.querySelectorAll([
        '.projects .project-card',
        '.social .social-card',
        '.contact .contact-item',
        '.contact .contact-form',
        '.gallery .gallery-carousel',
        '.about .glass-card',
        '.about .about-text > h3',
        '.about .about-text > p',
    ].join(','));

    let index = 0;
    targets.forEach((el) => {
        if (!el.classList.contains('reveal-item')) {
            el.classList.add('reveal-item');
        }
        const delay = 90 + (index % 8) * 70;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        index += 1;
    });
}

async function setLocale(nextLocale, { persist = true } = {}) {
    if (!supportedLocales.includes(nextLocale)) return;
    locale = nextLocale;
    t = i18n[locale];
    document.documentElement.lang = langToHtmlLang[locale] || 'zh-CN';

    applyTextNodes();
    await applyLocaleBlocks(locale);
    applyLanguageButtons();
    if (typeof galleryA11yUpdater === 'function') galleryA11yUpdater();
    if (floatingTools.refreshBtn && floatingTools.topBtn) {
        floatingTools.refreshBtn.setAttribute('aria-label', t.refresh);
        floatingTools.refreshBtn.setAttribute('title', t.refresh);
        floatingTools.topBtn.setAttribute('aria-label', t.top);
        floatingTools.topBtn.setAttribute('title', t.top);
    }
    if (persist) window.localStorage.setItem('site_lang', locale);
}

function getLanguageFadeTargets() {
    return Array.from(document.querySelectorAll([
        '.navbar',
        '.nav-container',
        '.nav-links',
        '.language-switch',
        '.hero-content',
        '.section-header',
        '.about-content',
        '.projects-grid',
        '.other-projects',
        '.gallery-carousel',
        '.gallery-more',
        '.social-grid',
        '.contact-content',
        '.footer-content',
        '.copyright',
        '.fab-tools',
    ].join(',')));
}

async function runLanguageTextTransition(changeAction) {
    const targets = getLanguageFadeTargets();
    targets.forEach((el) => el.classList.add('lang-fade-target', 'is-leaving'));
    await sleep(420);
    await changeAction();
    targets.forEach((el) => el.classList.remove('is-leaving'));
    targets.forEach((el) => el.classList.add('is-entering'));
    await sleep(720);
    targets.forEach((el) => el.classList.remove('lang-fade-target', 'is-entering'));
}

function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn[data-lang]').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const nextLocale = btn.dataset.lang;
            if (!nextLocale || nextLocale === locale) return;
            await runLanguageTextTransition(async () => {
                await stabilizeLayoutDuring(async () => {
                    await setLocale(nextLocale);
                });
            });
        });
    });
}

function initParticles() {
    if (typeof particlesJS !== 'function') return;
    particlesJS('particles-js', {
        particles: {
            number: { value: 96, density: { enable: true, value_area: 800 } },
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.2,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
            },
            modes: {
                grab: {
                    distance: 210,
                    line_linked: {
                        opacity: 0.45,
                    },
                },
            },
        },
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initSmoothScroll() {
    const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    function smoothScrollTo(targetTop, duration = 620) {
        const startTop = window.scrollY || window.pageYOffset;
        const delta = targetTop - startTop;
        if (Math.abs(delta) < 2) return;

        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            window.scrollTo(0, startTop + delta * eased);
            if (progress < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            smoothScrollTo(targetElement.offsetTop - 80);
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const URL_INTIMATE = "https://formspree.io/f/mnjorrro"; // 亲密地址
    const URL_GENERAL = "https://formspree.io/f/mqegjjgr";  // 一般人地址 

    const SECRET_CODE = "#sweet"; 

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : "发送";
        
        const nameValue = document.getElementById('name')?.value || '';
        const emailValue = document.getElementById('email')?.value || '';
        const messageValue = document.getElementById('message')?.value || '';
        
        const isIntimate = messageValue.toLowerCase().includes(SECRET_CODE.toLowerCase());
        const displayName = nameValue.trim() || "匿名用户";

        const targetUrl = isIntimate ? URL_INTIMATE : URL_GENERAL;
        const subject = isIntimate 
            ? `【rayawa.top】💗${displayName} 发来了一条带暗号的消息 ✨` 
            : `【rayawa.top】收到来自 ${displayName} 的网页留言`;

        console.log(`[Contact] 正在通过 ${isIntimate ? '加密' : '标准'} 通道发送...`);
        console.log(`[Contact] 目标 Endpoint: ${targetUrl}`);

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> 发送中...';
        }

        const payload = {
            name: displayName,
            email: emailValue,
            message: messageValue,
            _subject: subject
        };

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                if (isIntimate) {
                    alert(`💗 暗号认证成功！${displayName}，你的私信已投递至亲密邮箱✨`);
                } else {
                    alert(`消息已送达！感谢你的留言，${displayName}。`);
                }
                form.reset();
            } else {
                throw new Error('Response error');
            }
        } catch (err) {
            console.error('[Contact Error] 发送过程中出错:', err);
            alert("发送失败，请检查网络连接或稍后再试。");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-open');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-open');
        }
    });
}

function initGalleryCarousel() {
    const carousel = document.getElementById('galleryCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.gallery-slide'));
    const prevBtn = carousel.querySelector('.gallery-nav.prev');
    const nextBtn = carousel.querySelector('.gallery-nav.next');
    const dotsWrap = carousel.querySelector('#galleryDots');
    if (!slides.length || !prevBtn || !nextBtn || !dotsWrap) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const slideImages = slides
        .map((slide) => slide.querySelector('img'))
        .filter(Boolean);

    let current = 0;
    let timer = null;

    const dots = slides.map((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
        dot.dataset.index = String(idx + 1);
        dot.setAttribute('aria-label', t.dotLabel.replace('{n}', String(idx + 1)));
        dot.addEventListener('click', () => {
            goTo(idx);
            restart();
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    galleryA11yUpdater = () => {
        dots.forEach((dot) => {
            const idx = dot.dataset.index || '1';
            dot.setAttribute('aria-label', t.dotLabel.replace('{n}', idx));
        });
        prevBtn.setAttribute('aria-label', locale === 'zh' ? '上一张' : locale === 'fr' ? 'Precedent' : 'Previous');
        nextBtn.setAttribute('aria-label', locale === 'zh' ? '下一张' : locale === 'fr' ? 'Suivant' : 'Next');
    };
    galleryA11yUpdater();

    function ensureImageReady(index) {
        const img = slideImages[(index + slideImages.length) % slideImages.length];
        if (!img) return;
        img.loading = 'eager';
        if (typeof img.decode === 'function') {
            img.decode().catch(() => {});
        }
    }

    if (isMobile) {
        slideImages.forEach((img, idx) => {
            img.loading = 'eager';
            if (idx < 2) img.fetchPriority = 'high';
        });
    } else {
        ensureImageReady(0);
        ensureImageReady(1);
    }

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        ensureImageReady(current + 1);
        ensureImageReady(current - 1);
    }

    function next() {
        goTo(current + 1);
    }

    function prev() {
        goTo(current - 1);
    }

    function start() {
        timer = window.setInterval(next, 4200);
    }

    function stop() {
        if (!timer) return;
        window.clearInterval(timer);
        timer = null;
    }

    function restart() {
        stop();
        start();
    }

    nextBtn.addEventListener('click', () => {
        next();
        restart();
    });
    prevBtn.addEventListener('click', () => {
        prev();
        restart();
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    start();
}

function initPageLoadAnimation() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const introTargets = document.querySelectorAll([
        '.navbar',
        '.hero',
        '.about',
        '.projects',
        '.gallery',
        '.social',
        '.contact',
        '.footer',
        '.fab-tools',
    ].join(','));

    if (isMobile) {
        document.body.classList.add('intro-ready', 'app-entered');
        return;
    }

    introTargets.forEach((el, idx) => {
        el.classList.add('intro-block');
        const delay = 80 + idx * 120;
        el.style.setProperty('--intro-delay', `${delay}ms`);
    });

    let introDone = false;
    function finishIntro() {
        if (introDone) return;
        introDone = true;
        document.body.classList.add('intro-ready');
        window.setTimeout(() => {
            document.body.classList.add('app-entered');
        }, 980);
    }

    window.addEventListener('load', () => {
        window.requestAnimationFrame(() => {
            finishIntro();
        });
    });

    window.addEventListener('pageshow', () => {
        finishIntro();
    });

    window.setTimeout(() => {
        finishIntro();
    }, 1800);
}

function initSectionReveal() {
    const sections = Array.from(document.querySelectorAll('.reveal-section'));
    if (!sections.length) return;

    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('is-visible');

    function revealSection(section) {
        if (!section || section.classList.contains('is-visible')) return;
        section.classList.add('is-visible');
    }

    function revealVisibleSectionsNow() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        const earlyOffset = 20;
        sections.forEach((section) => {
            if (section.classList.contains('is-visible')) return;
            const rect = section.getBoundingClientRect();
            const isVisibleNow = rect.top <= viewportHeight + earlyOffset && rect.bottom >= -earlyOffset;
            if (isVisibleNow) revealSection(section);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealSection(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.16, rootMargin: '0px 0px 20px 0px' });

    sections.forEach((section) => observer.observe(section));
    revealVisibleSectionsNow();

    const scheduleRevealCheck = () => {
        window.requestAnimationFrame(() => {
            revealVisibleSectionsNow();
        });
    };

    window.addEventListener('load', scheduleRevealCheck, { once: true });
    window.addEventListener('pageshow', scheduleRevealCheck);
    window.addEventListener('resize', scheduleRevealCheck, { passive: true });
    window.setTimeout(revealVisibleSectionsNow, 180);
}

function initPageLeaveTransitions() {
    document.querySelectorAll('a[href]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            if (e.defaultPrevented) return;
            const href = anchor.getAttribute('href') || '';
            if (!href || href.startsWith('#')) return;
            if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

            const destination = new URL(anchor.href, window.location.href);
            if (destination.origin !== window.location.origin) return;

            e.preventDefault();
            document.body.classList.add('page-leaving');
            window.setTimeout(() => {
                window.location.href = destination.href;
            }, 280);
        });
    });
}

function initParticlePointerFollow() {
    const layer = document.getElementById('particles-js');
    if (!layer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const maxOffset = 26;

    function updateTarget(clientX, clientY) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetX = ((clientX - cx) / cx) * maxOffset;
        targetY = ((clientY - cy) / cy) * maxOffset;
    }

    function animate() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        layer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        window.requestAnimationFrame(animate);
    }

    window.addEventListener('pointermove', (e) => {
        updateTarget(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        const touch = e.touches && e.touches[0];
        if (!touch) return;
        updateTarget(touch.clientX, touch.clientY);
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
    });

    window.addEventListener('touchend', () => {
        targetX = 0;
        targetY = 0;
    }, { passive: true });

    animate();
}

function initParticleMagnetEffect() {
    const maxRetry = 30;
    let retry = 0;

    function boot() {
        if (!window.pJSDom || !window.pJSDom.length) return false;
        const instance = window.pJSDom[0] && window.pJSDom[0].pJS;
        if (!instance || !instance.particles || !instance.particles.array || !instance.canvas || !instance.canvas.el) {
            return false;
        }

        const particles = instance.particles.array;
        const canvasEl = instance.canvas.el;
        const pointer = { x: 0, y: 0, active: false };
        const radius = 236;
        const strength = 0.00126;
        const damping = 0.988;
        const maxSpeed = 4.25;
        const sparseRadius = 96;
        const sparseThreshold = 1;
        const minParticles = 58;
        let magneticPower = 0;
        let frame = 0;

        function getOpacityValue(particle) {
            if (particle && particle.opacity && typeof particle.opacity.value === 'number') return particle.opacity.value;
            if (particle && typeof particle.opacity === 'number') return particle.opacity;
            return 0.5;
        }

        function setOpacityValue(particle, value) {
            const next = Math.max(0, Math.min(1, value));
            if (particle && particle.opacity && typeof particle.opacity.value === 'number') {
                particle.opacity.value = next;
                return;
            }
            if (particle) particle.opacity = next;
        }

        function spawnParticleAt(x, y) {
            if (!instance.fn || !instance.fn.modes || typeof instance.fn.modes.pushParticles !== 'function') return;
            instance.fn.modes.pushParticles(1, { pos_x: x, pos_y: y });

            const p = particles[particles.length - 1];
            if (!p) return;
            p.__generated = true;
            p.__fadeIn = true;
            p.__ttl = 520 + Math.floor(Math.random() * 520);
            p.__fadeOut = false;
            p.vx = (Math.random() - 0.5) * 0.8;
            p.vy = (Math.random() - 0.5) * 0.8;
            setOpacityValue(p, 0.04);
        }

        function countParticlesNear(x, y, r) {
            let count = 0;
            const rSq = r * r;
            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i];
                const dx = p.x - x;
                const dy = p.y - y;
                if (dx * dx + dy * dy <= rSq) count += 1;
            }
            return count;
        }

        function maintainSparseRegions() {
            const width = instance.canvas.w || canvasEl.width || window.innerWidth;
            const height = instance.canvas.h || canvasEl.height || window.innerHeight;
            for (let i = 0; i < 2; i += 1) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                if (countParticlesNear(x, y, sparseRadius) <= sparseThreshold) {
                    spawnParticleAt(x, y);
                }
            }

            if (particles.length > minParticles && Math.random() < 0.1) {
                const idx = Math.floor(Math.random() * particles.length);
                const p = particles[idx];
                if (p && !p.__fadeOut && !p.__fadeIn) {
                    p.__fadeOut = true;
                }
            }
        }

        function setPointer(clientX, clientY) {
            const rect = canvasEl.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return;
            if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
                pointer.active = false;
                return;
            }

            const pxWidth = instance.canvas.w || canvasEl.width || rect.width;
            const pxHeight = instance.canvas.h || canvasEl.height || rect.height;
            const scaleX = pxWidth / rect.width;
            const scaleY = pxHeight / rect.height;
            pointer.x = (clientX - rect.left) * scaleX;
            pointer.y = (clientY - rect.top) * scaleY;
            pointer.active = true;
        }

        window.addEventListener('pointermove', (e) => {
            setPointer(e.clientX, e.clientY);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            const touch = e.touches && e.touches[0];
            if (!touch) return;
            setPointer(touch.clientX, touch.clientY);
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            pointer.active = false;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            pointer.active = false;
        }, { passive: true });

        function tick() {
            frame += 1;
            magneticPower += pointer.active
                ? (1 - magneticPower) * 0.14
                : (0 - magneticPower) * 0.012;

            if (magneticPower > 0.001 && particles.length) {
                for (let i = 0; i < particles.length; i += 1) {
                    const p = particles[i];
                    const dx = pointer.x - p.x;
                    const dy = pointer.y - p.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq <= 1) continue;

                    const dist = Math.sqrt(distSq);
                    if (dist > radius) continue;

                    const normalized = 1 - dist / radius;
                    const pull = normalized * normalized * strength * magneticPower;
                    p.vx += dx * pull;
                    p.vy += dy * pull;

                    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    if (speed > maxSpeed) {
                        const scale = maxSpeed / speed;
                        p.vx *= scale;
                        p.vy *= scale;
                    }
                }
            }

            for (let i = particles.length - 1; i >= 0; i -= 1) {
                const p = particles[i];
                if (typeof p.vx !== 'number') p.vx = 0;
                if (typeof p.vy !== 'number') p.vy = 0;
                p.vx *= damping;
                p.vy *= damping;

                if (p.__generated && typeof p.__ttl === 'number') {
                    p.__ttl -= 1;
                    if (p.__ttl <= 0) p.__fadeOut = true;
                }

                if (p.__fadeIn) {
                    const next = getOpacityValue(p) + 0.011;
                    setOpacityValue(p, next);
                    if (next >= 0.5) p.__fadeIn = false;
                }

                if (p.__fadeOut) {
                    const next = getOpacityValue(p) - 0.004;
                    if (next <= 0.008) {
                        particles.splice(i, 1);
                        continue;
                    }
                    setOpacityValue(p, next);
                }
            }

            if (frame % 12 === 0) {
                maintainSparseRegions();
            }

            window.requestAnimationFrame(tick);
        }

        tick();
        return true;
    }

    if (boot()) return;

    const timer = window.setInterval(() => {
        retry += 1;
        if (boot() || retry >= maxRetry) {
            window.clearInterval(timer);
        }
    }, 120);
}

function initFloatingTools() {
    const wrapper = document.createElement('div');
    wrapper.className = 'fab-tools';

    const refreshBtn = document.createElement('button');
    refreshBtn.type = 'button';
    refreshBtn.className = 'fab-tool';
    refreshBtn.setAttribute('aria-label', t.refresh);
    refreshBtn.setAttribute('title', t.refresh);
    refreshBtn.innerHTML = '<i class="fas fa-rotate-right"></i>';
    refreshBtn.addEventListener('click', () => {
        const fadeTargets = getLanguageFadeTargets();
        fadeTargets.forEach((el) => el.classList.add('lang-fade-target', 'is-leaving'));
        window.setTimeout(() => {
            window.location.reload();
        }, 460);
    });

    const topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'fab-tool fab-top is-hidden';
    topBtn.setAttribute('aria-label', t.top);
    topBtn.setAttribute('title', t.top);
    topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    topBtn.addEventListener('click', () => {
        const startTop = window.scrollY || window.pageYOffset;
        const startTime = performance.now();
        const duration = 560;
        const easeOut = (x) => 1 - Math.pow(1 - x, 3);
        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            window.scrollTo(0, startTop * (1 - easeOut(progress)));
            if (progress < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    });

    wrapper.appendChild(refreshBtn);
    wrapper.appendChild(topBtn);
    document.body.appendChild(wrapper);
    floatingTools.refreshBtn = refreshBtn;
    floatingTools.topBtn = topBtn;

    const toggleTop = () => {
        const show = window.scrollY > 260;
        topBtn.classList.toggle('is-hidden', !show);
    };

    window.addEventListener('scroll', toggleTop, { passive: true });
    toggleTop();
}

function initHeroStarInteraction() {
    const star = document.getElementById('heroStar');
    const quote = document.querySelector('.avatar-quote');
    if (!star || !quote) return;

    let visible = true;

    function syncState() {
        quote.classList.toggle('is-hidden', !visible);
        star.classList.toggle('is-active', visible);
    }

    function toggle() {
        visible = !visible;
        syncState();
    }

    star.addEventListener('click', toggle);
    star.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });

    syncState();
}

function initAwardLinks() {
    const awardLinks = document.querySelectorAll('.award-link[data-award-url]');
    if (!awardLinks.length) return;

    function openAward(url) {
        if (!url) return;
        window.open(url, '_blank', 'noopener');
    }

    awardLinks.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openAward(el.dataset.awardUrl);
        });

        el.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            e.stopPropagation();
            openAward(el.dataset.awardUrl);
        });
    });
}

locale = detectInitialLocale();
t = i18n[locale] || i18n.zh;

initLocaleBlockSnapshots();
initLanguageSwitcher();
setLocale(locale, { persist: false });
hydrateRevealItems();
initParticles();
initNavbarScroll();
initSmoothScroll();
initContactForm();
initMobileMenu();
initGalleryCarousel();
initPageLoadAnimation();
initSectionReveal();
initPageLeaveTransitions();
initParticlePointerFollow();
initParticleMagnetEffect();
initHeroStarInteraction();
initAwardLinks();
initFloatingTools();
