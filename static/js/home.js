const supportedLocales = ['zh', 'en', 'fr'];
let locale = 'zh';

const i18n = window.SITE_I18N || { zh: {}, en: {}, fr: {} };

function getI18nValue(path, lang = locale) {
    return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), i18n[lang]);
}

function getCurrentText(path, fallback = '') {
    const value = getI18nValue(path);
    return value == null ? fallback : value;
}

let t = i18n.zh || {};
let galleryA11yUpdater = null;
const floatingTools = { refreshBtn: null, topBtn: null };
const langToHtmlLang = { zh: 'zh-CN', en: 'en', fr: 'fr' };

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

function applyLocaleBlocks(lang) {
    if (!aboutBlocks.about || !aboutBlocks.status || !aboutBlocks.capability || !aboutBlocks.zhSnapshot) return;

    if (lang === 'zh') {
        aboutBlocks.about.innerHTML = aboutBlocks.zhSnapshot.about;
        aboutBlocks.status.innerHTML = aboutBlocks.zhSnapshot.status;
        aboutBlocks.capability.innerHTML = aboutBlocks.zhSnapshot.capability;
    } else {
        const html = i18n[lang] && i18n[lang].aboutHtml;
        if (!html) {
            console.warn(`Language ${lang} not supported for about blocks, falling back to Chinese`);
            aboutBlocks.about.innerHTML = aboutBlocks.zhSnapshot.about;
            aboutBlocks.status.innerHTML = aboutBlocks.zhSnapshot.status;
            aboutBlocks.capability.innerHTML = aboutBlocks.zhSnapshot.capability;
        } else {
            aboutBlocks.about.innerHTML = html.aboutText || aboutBlocks.zhSnapshot.about;
            aboutBlocks.status.innerHTML = html.statusCard || aboutBlocks.zhSnapshot.status;
            aboutBlocks.capability.innerHTML = html.capabilityCard || aboutBlocks.zhSnapshot.capability;
        }
    }
    hydrateRevealItems();
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
    applyLocaleBlocks(locale);
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
    }, { passive: true });
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            const isMobile = window.matchMedia('(max-width: 900px)').matches;
            if (isMobile) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.dispatchEvent(new CustomEvent('snapToSection', {
                    detail: { id: targetId.replace('#', '') }
                }));
            }
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

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-open');
    });

    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navLinks.classList.remove('mobile-open');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
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
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
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
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    const introTargets = document.querySelectorAll([
        '.navbar',
        '.hero',
        '.about',
        '.projects',
        '.gallery',
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

    window.addEventListener('loadingScreenDone', () => {
        window.requestAnimationFrame(() => {
            finishIntro();
        });
    });

    window.addEventListener('pageshow', () => {
        finishIntro();
    });

    window.setTimeout(() => {
        finishIntro();
    }, 6000);
}

function initLoadingScreen() {
    const screen = document.getElementById('loadingScreen');
    const bar = document.getElementById('loadingBar');
    const percent = document.getElementById('loadingPercent');
    if (!screen || !bar || !percent) {
        window.dispatchEvent(new CustomEvent('loadingScreenDone'));
        return;
    }

    document.body.classList.add('is-loading');

    let progress = 0;
    let done = false;

    function setProgress(value) {
        if (done) return;
        progress = Math.min(value, 100);
        bar.style.width = `${progress}%`;
        percent.textContent = Math.floor(progress);
    }

    function finish() {
        if (done) return;
        done = true;
        setProgress(100);
        window.setTimeout(() => {
            screen.classList.add('is-done');
            document.body.classList.remove('is-loading');
            window.setTimeout(() => {
                window.dispatchEvent(new CustomEvent('loadingScreenDone'));
            }, 900);
        }, 400);
    }

    const simulatedSteps = [
        { target: 15, delay: 100 },
        { target: 30, delay: 300 },
        { target: 50, delay: 500 },
        { target: 68, delay: 800 },
        { target: 82, delay: 1200 },
        { target: 92, delay: 1600 },
    ];

    simulatedSteps.forEach((step) => {
        window.setTimeout(() => setProgress(step.target), step.delay);
    });

    window.addEventListener('load', () => {
        window.setTimeout(finish, 600);
    });

    window.setTimeout(finish, 4000);
}

function initSidebarNav() {
    const sidebar = document.getElementById('sidebarNav');
    if (!sidebar) return;

    const dots = Array.from(sidebar.querySelectorAll('.sidebar-dot'));
    const sectionIds = ['home', 'about', 'projects', 'gallery', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    function updateActiveDot() {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let activeIndex = 0;

        sections.forEach((section, idx) => {
            if (scrollY >= section.offsetTop) {
                activeIndex = idx;
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            const isMobile = window.matchMedia('(max-width: 900px)').matches;
            if (isMobile) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.dispatchEvent(new CustomEvent('snapToSection', {
                    detail: { id: targetId.replace('#', '') }
                }));
            }
        });
    });

    window.addEventListener('scroll', updateActiveDot, { passive: true });
    window.addEventListener('resize', updateActiveDot, { passive: true });
    updateActiveDot();
}

function initFullPageScroll() {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) return;

    const sectionIds = ['home', 'about', 'projects', 'gallery', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    document.documentElement.style.scrollSnapType = 'none';

    let currentIndex = 0;
    let isAnimating = false;
    const animDuration = 650;
    const switchThreshold = 80;

    function getCurrentIndex() {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let idx = 0;
        sections.forEach((section, i) => {
            if (scrollY >= section.offsetTop) idx = i;
        });
        return idx;
    }

    function isAtLastSection() {
        return currentIndex >= sections.length - 1;
    }

    function isScrolledPastLastSection() {
        const last = sections[sections.length - 1];
        return last && window.scrollY > last.offsetTop + 10;
    }

    function snapToSection(index, instant) {
        if (index < 0 || index >= sections.length) return;
        if (isAnimating && !instant) return;

        currentIndex = index;
        isAnimating = true;

        const targetSection = sections[index];
        targetSection.scrollTop = 0;

        const targetTop = targetSection.offsetTop;

        if (instant) {
            window.scrollTo(0, targetTop);
            isAnimating = false;
            return;
        }

        const startTop = window.scrollY;
        const delta = targetTop - startTop;
        if (Math.abs(delta) < 2) {
            isAnimating = false;
            return;
        }

        window.dispatchEvent(new CustomEvent('sectionEnter', {
            detail: { id: sectionIds[index] }
        }));

        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / animDuration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, startTop + delta * eased);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                window.setTimeout(() => {
                    isAnimating = false;
                }, 80);
            }
        }
        window.requestAnimationFrame(step);
    }

    function canScrollInternally(el, delta) {
        if (el.scrollHeight <= el.clientHeight + 2) return false;
        const atTop = el.scrollTop <= 1;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
        if (delta > 0 && !atBottom) return true;
        if (delta < 0 && !atTop) return true;
        return false;
    }

    window.addEventListener('wheel', (e) => {
        if (document.body.classList.contains('is-loading')) return;

        if (isScrolledPastLastSection() && e.deltaY > 0) {
            return;
        }

        if (isScrolledPastLastSection() && e.deltaY < 0) {
            const last = sections[sections.length - 1];
            if (window.scrollY > last.offsetTop + 50) {
                return;
            }
        }

        if (isAnimating) {
            e.preventDefault();
            return;
        }

        const targetSection = e.target.closest('section');
        if (targetSection && canScrollInternally(targetSection, e.deltaY)) {
            return;
        }

        e.preventDefault();

        const absDelta = Math.abs(e.deltaY);
        if (absDelta < switchThreshold) {
            return;
        }

        if (e.deltaY > 0) {
            if (isAtLastSection()) {
                return;
            }
            snapToSection(currentIndex + 1);
        } else {
            snapToSection(currentIndex - 1);
        }
    }, { passive: false });

    let touchStartY = 0;
    let touchStartTime = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        if (isScrolledPastLastSection()) return;
        const delta = touchStartY - e.changedTouches[0].clientY;
        const elapsed = Date.now() - touchStartTime;
        const velocity = Math.abs(delta) / (elapsed || 1);
        if (Math.abs(delta) < 50 && velocity < 0.4) return;
        if (delta > 0) {
            if (isAtLastSection()) return;
            snapToSection(currentIndex + 1);
        } else {
            snapToSection(currentIndex - 1);
        }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                if (isAtLastSection()) return;
                e.preventDefault();
                snapToSection(currentIndex + 1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                snapToSection(currentIndex - 1);
                break;
            case 'Home':
                e.preventDefault();
                snapToSection(0);
                break;
            case 'End':
                e.preventDefault();
                snapToSection(sections.length - 1);
                break;
        }
    });

    window.addEventListener('scroll', () => {
        if (!isAnimating) {
            currentIndex = getCurrentIndex();
        }
    }, { passive: true });

    window.addEventListener('snapToSection', (e) => {
        const id = e.detail && e.detail.id;
        if (!id) return;
        const idx = sectionIds.indexOf(id);
        if (idx === -1) return;
        snapToSection(idx);
    });

    currentIndex = getCurrentIndex();
}

function initSectionReveal() {
    const sections = Array.from(document.querySelectorAll('.reveal-section'));
    if (!sections.length) return;

    let currentVisibleIndex = -1;
    let skipScrollCheck = false;

    function revealSection(section) {
        if (!section) return;
        section.classList.remove('is-visible');
        void section.offsetHeight;
        section.classList.add('is-visible');
    }

    function hideSection(section) {
        if (!section) return;
        section.classList.remove('is-visible');
    }

    function checkVisibleSection() {
        if (skipScrollCheck) return;
        const scrollY = window.scrollY + window.innerHeight / 2;
        let newVisibleIndex = -1;

        sections.forEach((section, idx) => {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                newVisibleIndex = idx;
            }
        });

        if (newVisibleIndex !== currentVisibleIndex) {
            if (currentVisibleIndex >= 0 && currentVisibleIndex < sections.length) {
                hideSection(sections[currentVisibleIndex]);
            }
            currentVisibleIndex = newVisibleIndex;
            if (currentVisibleIndex >= 0) {
                revealSection(sections[currentVisibleIndex]);
            }
        }
    }

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(checkVisibleSection);
    }, { passive: true });

    window.addEventListener('sectionEnter', (e) => {
        const id = e.detail && e.detail.id;
        if (!id) return;
        const section = document.getElementById(id);
        if (section) {
            skipScrollCheck = true;
            const idx = sections.indexOf(section);
            if (idx >= 0 && idx !== currentVisibleIndex) {
                if (currentVisibleIndex >= 0 && currentVisibleIndex < sections.length) {
                    hideSection(sections[currentVisibleIndex]);
                }
                currentVisibleIndex = idx;
            }
            window.setTimeout(() => {
                revealSection(section);
                skipScrollCheck = false;
            }, 50);
        }
    });

    checkVisibleSection();
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
        const isMobile = window.matchMedia('(max-width: 900px)').matches;
        if (isMobile) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.dispatchEvent(new CustomEvent('snapToSection', {
                detail: { id: 'home' }
            }));
        }
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

initLoadingScreen();
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
initSidebarNav();
initFullPageScroll();
