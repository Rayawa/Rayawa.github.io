(() => {
    'use strict';

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileBridgeQuery = window.matchMedia('(max-width: 800px)');

    let activeScrollRaf = null;
    let activeSnapTimer = null;
    let isSnapping = false;
    let isProgrammaticNav = false;

    function clamp(val, min = 0, max = 1) {
        return Math.max(min, Math.min(max, val));
    }

    function getTargetScrollTop(target) {
        if (!target) return 0;
        const marginTop = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
        const rect = target.getBoundingClientRect();
        return Math.max(0, Math.round(window.scrollY + rect.top - marginTop));
    }

    function cancelActiveScroll() {
        if (activeScrollRaf !== null) {
            cancelAnimationFrame(activeScrollRaf);
            activeScrollRaf = null;
        }
        if (activeSnapTimer !== null) {
            clearTimeout(activeSnapTimer);
            activeSnapTimer = null;
        }
        isSnapping = false;
        isProgrammaticNav = false;
    }

    function smoothScrollTo(targetY, duration = 700, { programmatic = false, cooldownMs = 180, onFinish } = {}) {
        cancelActiveScroll();

        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const destY = clamp(Math.round(targetY), 0, maxScroll);
        const startY = window.scrollY;
        const delta = destY - startY;

        if (Math.abs(delta) < 2 || motionQuery.matches) {
            window.scrollTo({ top: destY, behavior: 'instant' });
            if (onFinish) onFinish();
            return;
        }

        isSnapping = !programmatic;
        isProgrammaticNav = programmatic;

        const startTime = performance.now();
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(now) {
            const elapsed = now - startTime;
            const progress = clamp(elapsed / duration);
            const eased = easeInOutCubic(progress);
            window.scrollTo({ top: Math.round(startY + delta * eased), behavior: 'instant' });

            if (progress < 1) {
                activeScrollRaf = requestAnimationFrame(step);
            } else {
                activeScrollRaf = null;
                activeSnapTimer = window.setTimeout(() => {
                    activeSnapTimer = null;
                    isSnapping = false;
                    isProgrammaticNav = false;
                    if (onFinish) onFinish();
                }, cooldownMs);
            }
        }

        activeScrollRaf = requestAnimationFrame(step);
    }

    function initMobileDrawer() {
        const menuBtn = document.getElementById('home-menu-button');
        const navLinks = document.getElementById('home-nav-links');
        const overlay = document.getElementById('home-menu-overlay');
        if (!menuBtn || !navLinks || !overlay) return;

        function setOpen(open) {
            menuBtn.setAttribute('aria-expanded', String(open));
            navLinks.classList.toggle('is-open', open);
            overlay.classList.toggle('is-visible', open);
        }

        menuBtn.addEventListener('click', () => {
            setOpen(menuBtn.getAttribute('aria-expanded') === 'false');
        });

        navLinks.addEventListener('click', (event) => {
            if (event.target.closest('a')) setOpen(false);
        });

        overlay.addEventListener('click', () => setOpen(false));
        mobileBridgeQuery.addEventListener('change', () => setOpen(false));

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                menuBtn.focus();
            }
        });
    }

    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;
                const target = document.querySelector(targetId);
                if (!target) return;
                event.preventDefault();
                const destY = getTargetScrollTop(target);
                smoothScrollTo(destY, 720, { programmatic: true });
            });
        });
    }

    function initActiveNav() {
        const links = Array.from(document.querySelectorAll('.home-nav-links a[href^="#"]'));
        if (!links.length || !('IntersectionObserver' in window)) return;

        const map = new Map();
        links.forEach((link) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) map.set(target, link);
        });
        if (!map.size) return;

        const visible = new Set();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) visible.add(entry.target);
                else visible.delete(entry.target);
            });

            let currentSection = null;
            for (const section of map.keys()) {
                if (visible.has(section)) {
                    currentSection = section;
                    break;
                }
            }

            links.forEach((link) => {
                link.classList.toggle('is-active', Boolean(currentSection && map.get(currentSection) === link));
            });
        }, { rootMargin: '-32% 0px -52% 0px', threshold: 0 });

        map.forEach((_, section) => observer.observe(section));
    }

    function initDrawerToggle(buttonId, panelId, expandedLabel) {
        const toggleBtn = document.getElementById(buttonId);
        const panel = document.getElementById(panelId);
        if (!toggleBtn || !panel) return;

        const labelEl = toggleBtn.querySelector('span:first-child');
        const symbolEl = toggleBtn.querySelector('.home-drawer-symbol');
        const collapsedLabel = labelEl ? labelEl.textContent : '';

        toggleBtn.addEventListener('click', () => {
            const nextExpanded = toggleBtn.getAttribute('aria-expanded') !== 'true';
            toggleBtn.setAttribute('aria-expanded', String(nextExpanded));
            panel.hidden = !nextExpanded;
            if (labelEl) labelEl.textContent = nextExpanded ? expandedLabel : collapsedLabel;
            if (symbolEl) symbolEl.textContent = nextExpanded ? '−' : '+';
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        });
    }

    function initProjectTabs() {
        const mainGroup = document.getElementById('main-projects-group');
        const mainList = document.getElementById('main-projects-list');
        const archiveGroup = document.getElementById('archive-projects-group');
        const status = document.getElementById('home-project-count');
        const showAllBtn = document.getElementById('projects-show-all');
        const tabButtons = Array.from(document.querySelectorAll('[data-project-tab]'));
        const mainCards = Array.from(document.querySelectorAll('[data-project-card]'));
        if (!mainGroup || !mainList || !archiveGroup || !tabButtons.length || !mainCards.length) return;

        let showingAll25 = false;

        function setTabState(activeTab) {
            tabButtons.forEach((btn) => {
                const isActive = btn.dataset.projectTab === activeTab;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
            });
        }

        function setShowAllLabel(allVisible) {
            if (!showAllBtn) return;
            showAllBtn.innerHTML = allVisible
                ? '收起至精选代表 (6) <span aria-hidden="true">↑</span>'
                : '查看全部 25 个项目 <span aria-hidden="true">→</span>';
        }

        function applyTab(tab) {
            showingAll25 = false;
            setTabState(tab);
            setShowAllLabel(false);

            if (tab === 'archive') {
                mainGroup.hidden = true;
                archiveGroup.hidden = false;
                archiveGroup.classList.add('is-solo');
                if (status) status.textContent = '当前展示 11 项课程项目与个人创作';
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
                return;
            }

            mainGroup.hidden = false;
            archiveGroup.hidden = true;
            archiveGroup.classList.remove('is-solo');

            const isCompact = tab !== 'featured' && tab !== 'all-main';
            mainList.classList.toggle('is-compact-grid', isCompact);

            let visibleCount = 0;
            mainCards.forEach((card) => {
                let matched = false;
                if (tab === 'featured') {
                    matched = card.dataset.featured === 'true';
                } else if (tab === 'all-main') {
                    matched = true;
                } else {
                    const cats = (card.dataset.categories || '').split(/\s+/).filter(Boolean);
                    matched = cats.includes(tab);
                }
                card.hidden = !matched;
                if (matched) visibleCount += 1;
            });

            if (status) {
                if (tab === 'featured') {
                    status.textContent = '当前展示 6 项代表作品，可切换全部 14 项主要项目与 11 项课程创作';
                } else if (tab === 'all-main') {
                    status.textContent = `当前展示全部 ${visibleCount} 个主要项目`;
                } else {
                    status.textContent = `当前筛选显示 ${visibleCount} 个主要项目`;
                }
            }

            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }

        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                applyTab(btn.dataset.projectTab || 'featured');
            });
        });

        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                if (showingAll25) {
                    applyTab('featured');
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                        smoothScrollTo(getTargetScrollTop(projectsSection), 680, { programmatic: true });
                    }
                    return;
                }

                showingAll25 = true;
                setTabState('all-main');
                mainGroup.hidden = false;
                mainList.classList.remove('is-compact-grid');
                mainCards.forEach((card) => {
                    card.hidden = false;
                });
                archiveGroup.hidden = false;
                archiveGroup.classList.remove('is-solo');
                if (status) status.textContent = '当前展示全部 25 个项目（14 主要项目 · 11 课程与创作）';
                setShowAllLabel(true);
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            });
        }
    }

    function initGalleryMetadata() {
        const carousel = document.getElementById('galleryCarousel');
        const photoCount = document.getElementById('home-photo-count');
        const photoCaption = document.getElementById('home-photo-caption');
        const dotsWrap = document.getElementById('galleryDots');
        if (!carousel || !dotsWrap) return;

        const slides = Array.from(carousel.querySelectorAll('.gallery-slide'));
        const prevBtn = carousel.querySelector('.gallery-nav.prev');
        const nextBtn = carousel.querySelector('.gallery-nav.next');

        function syncMeta() {
            const dots = Array.from(dotsWrap.children);
            const activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
            const total = slides.length || dots.length;

            if (photoCount && total > 0) {
                const currentStr = String(activeIndex + 1).padStart(2, '0');
                const totalStr = String(total).padStart(2, '0');
                photoCount.textContent = `${currentStr} / ${totalStr}`;
            }

            if (photoCaption && slides[activeIndex]) {
                const img = slides[activeIndex].querySelector('img');
                if (img && img.alt) photoCaption.textContent = img.alt;
            }

            dots.forEach((dot, idx) => {
                dot.setAttribute('aria-current', idx === activeIndex ? 'true' : 'false');
            });
        }

        new MutationObserver(syncMeta).observe(dotsWrap, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class']
        });

        carousel.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && prevBtn) {
                event.preventDefault();
                prevBtn.click();
            } else if (event.key === 'ArrowRight' && nextBtn) {
                event.preventDefault();
                nextBtn.click();
            }
        });

        syncMeta();
    }

    function initHeroEntrance() {
        const hero = document.getElementById('home');
        if (!hero) return;

        let revealed = false;
        function revealHero() {
            if (revealed) return;
            revealed = true;
            hero.classList.add('is-stage-entered');
        }

        if (motionQuery.matches) {
            revealHero();
            return;
        }

        if (document.body.classList.contains('is-loading')) {
            const scheduleReveal = () => {
                window.setTimeout(revealHero, 180);
            };
            window.addEventListener('loadingScreenDone', scheduleReveal, { once: true });
            window.setTimeout(revealHero, 4600);
        } else {
            window.requestAnimationFrame(() => {
                window.setTimeout(revealHero, 140);
            });
        }
    }

    function initScrollChoreography() {
        const heroSection = document.querySelector('.home-welcome[data-home-scroll]');
        const heroStage = heroSection ? heroSection.querySelector('[data-home-stage]') : null;
        const bridges = Array.from(document.querySelectorAll('[data-photo-bridge]'));
        const focusItems = Array.from(document.querySelectorAll('[data-focus-item]'));
        const snapStages = Array.from(document.querySelectorAll('[data-snap-stage]')).map((el) => ({
            el,
            kind: el.dataset.snapStage || 'bridge',
            nextEl: el.dataset.snapNext ? document.querySelector(el.dataset.snapNext) : null,
            countEl: el.querySelector('.home-bridge-count'),
            enterArmed: false,
            exitArmed: el.dataset.snapStage === 'hero'
        }));

        let lastScrollY = window.scrollY;

        function resetMotionState() {
            cancelActiveScroll();
            if (heroSection) {
                heroSection.classList.remove('home-scroll-motion');
                heroSection.style.removeProperty('--stage-progress');
                heroSection.style.removeProperty('--snap-charge');
                heroSection.classList.add('is-stage-entered');
            }
            bridges.forEach((bridge) => {
                bridge.style.removeProperty('--bridge-open');
                bridge.style.removeProperty('--snap-charge');
                bridge.classList.add('is-stage-entered');
                const countEl = bridge.querySelector('.home-bridge-count');
                if (countEl) countEl.textContent = '100';
            });
            focusItems.forEach((item) => item.classList.add('is-active'));
        }

        if (motionQuery.matches) {
            resetMotionState();
            return;
        }

        if (heroSection && heroStage) {
            heroSection.classList.add('home-scroll-motion');
        }

        // Prevent downward trackpad inertia from overshooting during a stage snap;
        // upward gestures immediately cancel any active snap so user control always wins.
        window.addEventListener('wheel', (event) => {
            if (!isSnapping) return;
            if (event.deltaY < -8) {
                cancelActiveScroll();
            } else if (event.deltaY > 0) {
                event.preventDefault();
            }
        }, { passive: false });

        window.addEventListener('touchstart', () => {
            if (isSnapping || isProgrammaticNav) cancelActiveScroll();
        }, { passive: true });

        window.addEventListener('keydown', (event) => {
            if ((isSnapping || isProgrammaticNav) && (event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === 'Home')) {
                cancelActiveScroll();
            }
        });

        let mobileObserver = null;
        function syncMobileBridgeObserver() {
            if (mobileObserver) {
                mobileObserver.disconnect();
                mobileObserver = null;
            }
            if (!mobileBridgeQuery.matches || !('IntersectionObserver' in window) || !bridges.length) return;
            mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-stage-entered');
                    }
                });
            }, { threshold: 0.35 });
            bridges.forEach((bridge) => mobileObserver.observe(bridge));
        }

        syncMobileBridgeObserver();
        mobileBridgeQuery.addEventListener('change', syncMobileBridgeObserver);

        let rafId = null;
        function updateScrollEffects() {
            rafId = null;
            if (motionQuery.matches) return;

            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY + 1;
            lastScrollY = currentScrollY;

            const vh = window.innerHeight || 900;
            const isMobile = mobileBridgeQuery.matches;

            snapStages.forEach((stage) => {
                const { el, kind, nextEl, countEl } = stage;
                const rect = el.getBoundingClientRect();

                if (kind === 'hero') {
                    const stageHeight = heroStage ? heroStage.offsetHeight : vh;
                    const travel = Math.max(1, rect.height - stageHeight);
                    const scrolledInStage = Math.max(0, -rect.top);
                    const dwellProgress = clamp(scrolledInStage / travel);
                    const exitThresholdPx = Math.min(travel * 0.75, travel * 0.30 + 20);
                    el.style.setProperty('--stage-progress', dwellProgress.toFixed(3));
                    el.style.setProperty('--snap-charge', clamp(scrolledInStage / exitThresholdPx).toFixed(3));

                    if (!isMobile) {
                        if (!isSnapping && (rect.top >= -12 || dwellProgress < 0.14)) {
                            stage.exitArmed = true;
                        }
                        if (
                            scrollingDown &&
                            stage.exitArmed &&
                            !isSnapping &&
                            !isProgrammaticNav &&
                            rect.top <= 0 &&
                            rect.bottom >= stageHeight * 0.65 &&
                            scrolledInStage >= exitThresholdPx &&
                            dwellProgress < 0.96 &&
                            nextEl
                        ) {
                            stage.exitArmed = false;
                            smoothScrollTo(getTargetScrollTop(nextEl), 700, {
                                onFinish: () => {
                                    lastScrollY = window.scrollY;
                                }
                            });
                        }
                    }
                    return;
                }

                // Photographic Bridge Stage
                if (isMobile) {
                    el.style.removeProperty('--bridge-open');
                    el.style.setProperty('--snap-charge', '0');
                    return;
                }

                // Expand frame cleanly to 100% full-screen by the time stage reaches top: 0,
                // then remain at 1.0 (never shrinking back or exiting).
                const open = clamp((vh * 0.85 - rect.top) / Math.max(1, vh * 0.83));
                el.style.setProperty('--bridge-open', open.toFixed(3));
                if (countEl) countEl.textContent = String(Math.round(open * 100)).padStart(2, '0');

                if (open >= 0.92) {
                    el.classList.add('is-stage-entered');
                } else if (open < 0.12) {
                    el.classList.remove('is-stage-entered');
                }

                const travel = Math.max(1, rect.height - vh);
                const scrolledInStage = Math.max(0, -rect.top);
                const dwellProgress = rect.top <= 0 ? clamp(scrolledInStage / travel) : 0;
                const exitThresholdPx = Math.min(travel * 0.75, travel * 0.30 + 20);
                el.style.setProperty('--snap-charge', clamp(scrolledInStage / exitThresholdPx).toFixed(3));

                if (rect.top > vh * 0.62) {
                    stage.enterArmed = true;
                }

                // Top-entry magnetic snap straight into full-screen
                if (
                    scrollingDown &&
                    stage.enterArmed &&
                    !isSnapping &&
                    !isProgrammaticNav &&
                    rect.top <= vh * 0.50 &&
                    rect.top > 8
                ) {
                    stage.enterArmed = false;
                    stage.exitArmed = false;
                    const bridgeTop = Math.round(window.scrollY + rect.top);
                    smoothScrollTo(bridgeTop, 620, {
                        cooldownMs: 260,
                        onFinish: () => {
                            lastScrollY = window.scrollY;
                            stage.exitArmed = true;
                        }
                    });
                    return;
                }

                if (rect.top <= 8) {
                    stage.enterArmed = false;
                }

                if (!isSnapping && (rect.top >= -12 || dwellProgress < 0.14)) {
                    stage.exitArmed = true;
                }

                // Bottom-exit threshold snap directly to next chapter
                if (
                    scrollingDown &&
                    stage.exitArmed &&
                    !isSnapping &&
                    !isProgrammaticNav &&
                    rect.top <= 0 &&
                    rect.bottom >= vh * 0.65 &&
                    scrolledInStage >= exitThresholdPx &&
                    dwellProgress < 0.96 &&
                    nextEl
                ) {
                    stage.exitArmed = false;
                    smoothScrollTo(getTargetScrollTop(nextEl), 700, {
                        onFinish: () => {
                            lastScrollY = window.scrollY;
                        }
                    });
                }
            });
        }

        function queueScrollUpdate() {
            if (rafId === null) rafId = requestAnimationFrame(updateScrollEffects);
        }

        window.addEventListener('scroll', queueScrollUpdate, { passive: true });
        window.addEventListener('resize', queueScrollUpdate, { passive: true });
        updateScrollEffects();

        if (focusItems.length) {
            if ('IntersectionObserver' in window) {
                const focusObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        entry.target.classList.toggle('is-active', entry.isIntersecting);
                    });
                }, { rootMargin: '-22% 0px -22% 0px', threshold: 0.1 });
                focusItems.forEach((item) => focusObserver.observe(item));
            } else {
                focusItems.forEach((item) => item.classList.add('is-active'));
            }
        }

        if (window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);

            document.querySelectorAll('[data-reveal]').forEach((el) => {
                window.gsap.from(el, {
                    y: 20,
                    opacity: 0,
                    duration: 0.65,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        once: true
                    }
                });
            });

            window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
            window.addEventListener('loadingScreenDone', () => window.ScrollTrigger.refresh(), { once: true });
        }
    }

    function initHome() {
        initMobileDrawer();
        initSmoothAnchors();
        initActiveNav();
        initDrawerToggle('about-bio-toggle', 'about-bio-full', '收起个人自述');
        initDrawerToggle('about-details-toggle', 'about-details-full', '收起技术栈与成就明细');
        initProjectTabs();
        initGalleryMetadata();
        initHeroEntrance();
        initScrollChoreography();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHome);
    } else {
        initHome();
    }
})();
