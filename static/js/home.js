window.__HOME_JS = true;
const supportedLocales = ['zh', 'en', 'fr'];
locale = 'zh';

const i18n = { zh: {}, en: {}, fr: {} };

function getI18nValue(path, lang = locale) {
    return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), i18n[lang]);
}

function getCurrentText(path, fallback = '') {
    const value = getI18nValue(path);
    return value == null ? fallback : value;
}

let t = i18n.zh || {};
let galleryA11yUpdater = null;
const langToHtmlLang = { zh: 'zh-CN', en: 'en', fr: 'fr' };
const HOME_TRANSITION_MS = TRANSITION_MS;



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
    const fromStorage = window.localStorage.getItem('rayawa_locale');
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
}

function applyLocaleBlocks() {
    hydrateRevealItems();
}

function hydrateRevealItems() {
    const autoGroups = [
        '.section-header',
        '.projects-group .projects-group-header',
        '.projects-group .projects-group-title',
        '.projects-group .projects-group-desc',
        '.projects-group .project-card',
        '.projects-group .project-card-mini',
        '.about .about-text',
        '.about .about-side .glass-card',
        '.hero .hero-tags',
        '.hero .avatar-quote',
        '.gallery .gallery-carousel',
        '.gallery .gallery-more',
        '.contact .contact-item',
        '.contact .contact-form',
        '.contact .contact-social-divider',
        '.contact .contact-social-title',
        '.contact .contact-social-grid .social-card',
        '.social .social-card',
        '.footer .footer-logo',
        '.footer .footer-description',
        '.footer .footer-social',
        '.footer .footer-heading',
        '.footer .footer-links',
        '.footer .copyright',
    ];

    document.querySelectorAll('.reveal-section').forEach((section) => {
        autoGroups.forEach((selector) => {
            section.querySelectorAll(selector).forEach((el) => {
                if (!el.classList.contains('reveal-item')) el.classList.add('reveal-item');
            });
        });

        const orderedItems = sortByVisualFlow(Array.from(section.querySelectorAll('.reveal-item')));
        orderedItems.forEach((el, idx) => {
            const delay = 80 + idx * 100;
            el.style.setProperty('--reveal-delay', `${delay}ms`);
        });
    });
}

async function setLocale(nextLocale, { persist = true } = {}) {
    if (!supportedLocales.includes(nextLocale)) return;
    locale = nextLocale;
    t = i18n[locale];
    document.documentElement.lang = langToHtmlLang[locale] || 'zh-CN';

    applyTextNodes();
    applyLocaleBlocks();
    applyLanguageButtons();
    if (typeof galleryA11yUpdater === 'function') galleryA11yUpdater();
    var titleVal = i18n[locale] && i18n[locale].pageTitle;
    if (titleVal) document.title = titleVal;
    if (persist) window.localStorage.setItem('rayawa_locale', locale);
    window.dispatchEvent(new CustomEvent('localechange', { detail: { lang: locale } }));
}

function getLanguageFadeTargets() {
    return Array.from(document.querySelectorAll([
        '.navbar',
        '.hero',
        '.about',
        '.projects',
        '.gallery',
        '.contact',
        '.footer',
        '.fab-tools',
    ].join(',')));
}

async function runLanguageTextTransition(changeAction) {
    const targets = getLanguageFadeTargets();
    targets.forEach((el) => el.classList.add('lang-fade-target', 'is-leaving'));
    await sleep(HOME_TRANSITION_MS);
    await changeAction();
    targets.forEach((el) => el.classList.remove('is-leaving'));
    targets.forEach((el) => el.classList.add('is-entering'));
    await sleep(HOME_TRANSITION_MS);
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

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const URL_INTIMATE = "https://formspree.io/f/mnjorrro";
    const URL_GENERAL = "https://formspree.io/f/mqegjjgr";

    const SECRET_CODE = "#sweet";

    function getI18nText(key, fallback) {
        var htmlLang = document.documentElement.lang || 'zh-CN';
        var locale = htmlLang.startsWith('en') ? 'en' : htmlLang.startsWith('fr') ? 'fr' : 'zh';
        var i18n = {};
        return i18n[key] || fallback;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : getI18nText('send', 'Send');
        
        const nameValue = document.getElementById('name')?.value || '';
        const emailValue = document.getElementById('email')?.value || '';
        const messageValue = document.getElementById('message')?.value || '';
        
        const isIntimate = messageValue.toLowerCase().includes(SECRET_CODE.toLowerCase());
        var htmlLang = document.documentElement.lang || 'zh-CN';
        var locale = htmlLang.startsWith('en') ? 'en' : htmlLang.startsWith('fr') ? 'fr' : 'zh';
        const anonymousName = locale === 'en' ? 'Anonymous' : locale === 'fr' ? 'Anonyme' : '匿名用户';
        const displayName = nameValue.trim() || anonymousName;

        const targetUrl = isIntimate ? URL_INTIMATE : URL_GENERAL;
        const subject = isIntimate 
            ? `[rayawa.top] 💗 ${displayName} - Secret Message ✨` 
            : `[rayawa.top] Message from ${displayName}`;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> ' + getI18nText('sending', 'Sending...');
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
                    const intimateMsg = locale === 'en' ? `💗 Secret code verified! ${displayName}, your message has been delivered ✨` : locale === 'fr' ? `💗 Code secret vérifié ! ${displayName}, votre message a été livré ✨` : `💗 暗号认证成功！${displayName}，你的私信已投递至亲密邮箱✨`;
                    alert(intimateMsg);
                } else {
                    alert(getI18nText('sent', locale === 'fr' ? 'Message envoyé ! Merci pour votre message.' : 'Message sent! Thank you for your message.'));
                }
                form.reset();
            } else {
                throw new Error('Response error');
            }
        } catch (err) {
            alert(getI18nText('sendFailed', locale === 'fr' ? "Échec de l'envoi. Veuillez réessayer plus tard." : 'Failed to send. Please try again later.'));
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
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
    const slideImages = slides
        .map((slide) => slide.querySelector('img'))
        .filter(Boolean);

    let current = 0;
    let timer = null;
    let autoStarted = false;

    const dotLabelTpl = t.dotLabel || '第 {n} 张';
    const dots = slides.map((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
        dot.dataset.index = String(idx + 1);
        dot.setAttribute('aria-label', dotLabelTpl.replace('{n}', String(idx + 1)));
        dot.addEventListener('click', () => {
            goTo(idx);
            restart();
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    galleryA11yUpdater = () => {
        const dotLabelTpl2 = t.dotLabel || '第 {n} 张';
        dots.forEach((dot) => {
            const idx = dot.dataset.index || '1';
            dot.setAttribute('aria-label', dotLabelTpl2.replace('{n}', idx));
        });
        prevBtn.setAttribute('aria-label', locale === 'zh' ? '上一张' : locale === 'fr' ? 'Precedent' : 'Previous');
        nextBtn.setAttribute('aria-label', locale === 'zh' ? '下一张' : locale === 'fr' ? 'Suivant' : 'Next');
    };
    galleryA11yUpdater();

    function preloadAllImages() {
        slideImages.forEach((img, idx) => {
            img.loading = 'eager';
            if (idx < 3) img.fetchPriority = 'high';
            if (typeof img.decode === 'function') {
                img.decode().catch(() => {});
            }
        });
    }

    function ensureImageReady(index) {
        const img = slideImages[(index + slideImages.length) % slideImages.length];
        if (!img) return;
        img.loading = 'eager';
        if (typeof img.decode === 'function') {
            img.decode().catch(() => {});
        }
    }

    preloadAllImages();

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
        if (timer) return;
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
    carousel.addEventListener('mouseleave', () => {
        if (autoStarted) start();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
        stop();
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
            isSwiping = true;
        }
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        if (!isSwiping) {
            if (autoStarted) start();
            return;
        }
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) {
            if (dx < 0) next();
            else prev();
            restart();
        } else {
            if (autoStarted) start();
        }
    }, { passive: true });

    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !autoStarted) {
                    autoStarted = true;
                    start();
                    galleryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        galleryObserver.observe(gallerySection);
    }

    ensureImageReady(0);
}

function initLoadingScreen() {
    const screen = document.getElementById('loadingScreen');
    const bar = document.getElementById('loadingBar');
    const percent = document.getElementById('loadingPercent');
    const ring = document.getElementById('loadingRing');
    const logoEl = document.getElementById('loadingLogo');

    if (sessionStorage.getItem('rayawa_loaded')) {
        if (screen) screen.remove();
        document.body.classList.remove('is-loading');
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.requestAnimationFrame(() => {
            window.dispatchEvent(new CustomEvent('loadingScreenDone'));
        });
        return;
    }

    if (!screen || !bar || !percent) {
        window.dispatchEvent(new CustomEvent('loadingScreenDone'));
        return;
    }

    document.body.classList.add('is-loading');

    const logoText = 'rayawa.top';
    let charIndex = 0;
    function typeLogo() {
        if (charIndex <= logoText.length) {
            if (logoEl) logoEl.textContent = logoText.slice(0, charIndex);
            charIndex++;
            window.setTimeout(typeLogo, 80 + Math.random() * 60);
        }
    }
    typeLogo();

    const circumference = 2 * Math.PI * 36;
    let progress = 0;
    let done = false;

    function setProgress(value) {
        if (done) return;
        progress = Math.min(value, 100);
        bar.style.width = `${progress}%`;
        percent.textContent = Math.floor(progress);
        if (ring) ring.style.strokeDashoffset = circumference - (progress / 100) * circumference;
    }

    function finish() {
        if (done) return;
        done = true;
        setProgress(100);
        sessionStorage.setItem('rayawa_loaded', '1');
        window.setTimeout(() => {
            screen.classList.add('is-done');
            document.body.classList.remove('is-loading');
            window.scrollTo({ top: 0, behavior: 'instant' });
            window.requestAnimationFrame(() => {
                window.dispatchEvent(new CustomEvent('loadingScreenDone'));
            });
        }, 350);
    }

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            window.scrollTo({ top: 0, behavior: 'instant' });
            // 清除所有过渡状态
            document.body.classList.remove('page-leaving', 'is-loading');
            document.querySelectorAll('.navbar').forEach(function(navbar) {
                navbar.classList.remove('navbar-leaving');
            });
            document.querySelectorAll('.page-transition-overlay').forEach(function(el) { el.remove(); });
            document.querySelectorAll('.page-entrance').forEach(function(el) { el.remove(); });
        }
    });

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

function initSectionReveal() {
    const sections = document.querySelectorAll('.reveal-section');
    if (!sections.length) return;

    function revealSection(el) {
        if (el.classList.contains('is-visible') || el.classList.contains('is-revealed')) return;
        el.classList.add('is-visible');
        window.setTimeout(() => {
            el.classList.add('is-revealed');
        }, 1200);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealSection(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    function checkVisibleSections() {
        const vh = window.innerHeight;
        sections.forEach(section => {
            if (section.classList.contains('is-visible')) return;
            const rect = section.getBoundingClientRect();
            if (rect.top < vh && rect.bottom > 0) {
                revealSection(section);
            }
        });
    }

    let scrollCheckTimer = null;
    function onScrollCheck() {
        if (scrollCheckTimer) return;
        scrollCheckTimer = window.setTimeout(() => {
            scrollCheckTimer = null;
            checkVisibleSections();
            if (Array.from(sections).every(s => s.classList.contains('is-revealed'))) {
                window.removeEventListener('scroll', onScrollCheck);
                observer.disconnect();
            }
        }, 150);
    }

    function startObserving() {
        sections.forEach(section => observer.observe(section));
        checkVisibleSections();
        window.addEventListener('scroll', onScrollCheck, { passive: true });
    }

    if (!document.getElementById('loadingScreen')) {
        startObserving();
    } else {
        window.addEventListener('loadingScreenDone', () => {
            window.requestAnimationFrame(startObserving);
        });
        window.setTimeout(startObserving, 5000);
    }
}

function initParticlePointerFollow() {
    const layer = document.getElementById('particles-js');
    if (!layer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const maxOffset = 38;

    function updateTarget(clientX, clientY) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetX = ((clientX - cx) / cx) * maxOffset;
        targetY = ((clientY - cy) / cy) * maxOffset;
    }

    function animate() {
        currentX += (targetX - currentX) * 0.03;
        currentY += (targetY - currentY) * 0.03;
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

function initHeroStarInteraction() {
    const star = document.getElementById('heroStar');
    if (!star) return;

    star.addEventListener('mouseenter', function() {
        star.classList.add('is-hovered');
    });

    star.addEventListener('mouseleave', function() {
        star.classList.remove('is-hovered');
    });

    window.setTimeout(function() {
        star.classList.add('is-tooltip-visible');
    }, 1000);
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

var _isNavigating = sessionStorage.getItem('rayawa_navigating') === '1';
sessionStorage.removeItem('rayawa_navigating');

// 标记是否从缓存加载
var _isFromCache = false;

window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        _isFromCache = true;
        document.querySelectorAll('.page-transition-overlay').forEach(function(el) { el.remove(); });
        var navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('is-visible');
        var ls = document.getElementById('loadingScreen');
        if (ls) {
            ls.style.display = 'none';
            // 确保内容可见
            document.body.classList.remove('is-loading');
        }
        // 设置已加载标记
        sessionStorage.setItem('rayawa_loaded', '1');
    }
});

if (_isNavigating && document.getElementById('loadingScreen')) {
    var _navOverlay = document.createElement('div');
    _navOverlay.className = 'page-transition-overlay';
    document.body.appendChild(_navOverlay);
    document.getElementById('loadingScreen').style.display = 'none';
    sessionStorage.setItem('rayawa_loaded', '1');
}

initLoadingScreen();
initLanguageSwitcher();

(function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function showNavbar() {
        requestAnimationFrame(() => {
            navbar.classList.add('is-visible');
            var overlay = document.querySelector('.page-transition-overlay');
            if (overlay) {
                overlay.style.animation = 'pageOverlayOut 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                setTimeout(function() { overlay.remove(); }, HOME_TRANSITION_MS + 40);
            }
        });
    }

    if (sessionStorage.getItem('rayawa_loaded') || !document.getElementById('loadingScreen') || _isNavigating || _isFromCache) {
        showNavbar();
    } else {
        window.addEventListener('loadingScreenDone', showNavbar);
    }

    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            navbar.classList.add('is-visible');
            // 如果是从缓存加载，确保移除可能存在的过渡层
            var overlay = document.querySelector('.page-transition-overlay');
            if (overlay) {
                overlay.style.animation = 'pageOverlayOut 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                setTimeout(function() { overlay.remove(); }, HOME_TRANSITION_MS + 40);
            }
        }
    });
})();
setLocale(locale, { persist: false });
hydrateRevealItems();
initParticles();
initContactForm();
initGalleryCarousel();
initSectionReveal();
initPageLeaveTransitions();
requestAnimationFrame(() => {
    initParticlePointerFollow();
    if (typeof initParticleMagnetEffect === 'function') initParticleMagnetEffect();
});
initHeroStarInteraction();
initAwardLinks();
initFloatingTools();
