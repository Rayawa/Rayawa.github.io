window.__HOME_JS = true;
const supportedLocales = ['zh', 'en', 'fr'];
locale = 'zh';

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
const langToHtmlLang = { zh: 'zh-CN', en: 'en', fr: 'fr' };



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
    const orderedGroups = [
        '.section-header',
        '.projects .other-projects-title',
        '.projects .project-card',
        '.about .about-text',
        '.about .about-side',
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

    document.querySelectorAll('.reveal-section').forEach(section => {
        let globalIndex = 0;
        orderedGroups.forEach(selector => {
            section.querySelectorAll(selector).forEach(el => {
                if (!el.classList.contains('reveal-item')) {
                    el.classList.add('reveal-item');
                }
                const delay = 80 + globalIndex * 100;
                el.style.setProperty('--reveal-delay', `${delay}ms`);
                globalIndex++;
            });
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
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    function scrollToHash() {
        const hash = window.location.hash;
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;
        window.setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }

    window.addEventListener('loadingScreenDone', scrollToHash);
    window.setTimeout(scrollToHash, 3000);
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

    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
    }

    function closeMenu() {
        navLinks.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-visible');
    }

    function openMenu() {
        navLinks.classList.add('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        overlay.classList.add('is-visible');
    }

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks.classList.contains('mobile-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('is-revealed')) {
                entry.target.classList.add('is-visible');
                window.setTimeout(() => {
                    entry.target.classList.add('is-revealed');
                }, 1200);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    function startObserving() {
        sections.forEach(section => observer.observe(section));
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

var _isNavigating = sessionStorage.getItem('rayawa_navigating') === '1';
sessionStorage.removeItem('rayawa_navigating');

window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        document.querySelectorAll('.page-transition-overlay').forEach(function(el) { el.remove(); });
        var navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('is-visible');
        var ls = document.getElementById('loadingScreen');
        if (ls) ls.style.display = 'none';
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
                overlay.style.animation = 'pageOverlayOut 0.3s ease forwards';
                setTimeout(function() { overlay.remove(); }, 350);
            }
        });
    }

    if (sessionStorage.getItem('rayawa_loaded') || !document.getElementById('loadingScreen') || _isNavigating) {
        showNavbar();
    } else {
        window.addEventListener('loadingScreenDone', showNavbar);
    }
})();
setLocale(locale, { persist: false });
hydrateRevealItems();
initParticles();
initNavbarScroll();
initSmoothScroll();
initContactForm();
initMobileMenu();
initGalleryCarousel();
initSectionReveal();
initPageLeaveTransitions();
requestAnimationFrame(() => {
    initParticlePointerFollow();
    initParticleMagnetEffect();
});
initHeroStarInteraction();
initAwardLinks();
initFloatingTools();
