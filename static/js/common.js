function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    var el = document.getElementById('particles-js');
    if (!el) return;
    var isMobile = window.innerWidth <= 900;
    particlesJS('particles-js', {
        particles: {
            number: { value: isMobile ? 35 : 72, density: { enable: true, value_area: isMobile ? 600 : 950 } },
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            opacity: { value: 0.42, random: true },
            size: { value: 3.2, random: true },
            line_linked: {
                enable: true,
                distance: isMobile ? 110 : 140,
                color: '#6366f1',
                opacity: 0.15,
                width: 1,
            },
            move: {
                enable: true,
                speed: isMobile ? 0.8 : 1.2,
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
                    line_linked: { opacity: 0.45 },
                },
            },
        },
    });
}

function initParticlePointerFollow() {
    var layer = document.getElementById('particles-js');
    if (!layer) return;
    var targetX = 0, targetY = 0, currentX = 0, currentY = 0, maxOffset = 38;
    function updateTarget(cx, cy) {
        var mx = window.innerWidth / 2, my = window.innerHeight / 2;
        targetX = ((cx - mx) / mx) * maxOffset;
        targetY = ((cy - my) / my) * maxOffset;
    }
    function animate() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        layer.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0)';
        requestAnimationFrame(animate);
    }
    window.addEventListener('pointermove', function(e) { updateTarget(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener('touchmove', function(e) { var t = e.touches && e.touches[0]; if (t) updateTarget(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener('pointerleave', function() { targetX = 0; targetY = 0; });
    window.addEventListener('touchend', function() { targetX = 0; targetY = 0; }, { passive: true });
    animate();
}

function initParticleMagnetEffect() {
    var maxRetry = 30;
    var retry = 0;

    function boot() {
        if (!window.pJSDom || !window.pJSDom.length) return false;
        var instance = window.pJSDom[0] && window.pJSDom[0].pJS;
        if (!instance || !instance.particles || !instance.particles.array || !instance.canvas || !instance.canvas.el) {
            return false;
        }

        var particles = instance.particles.array;
        var canvasEl = instance.canvas.el;
        var pointer = { x: 0, y: 0, active: false };
        var radius = 236;
        var strength = 0.00126;
        var damping = 0.988;
        var maxSpeed = 4.25;
        var sparseRadius = 96;
        var sparseThreshold = 1;
        var minParticles = 40;
        var magneticPower = 0;
        var frame = 0;

        function getOpacityValue(p) {
            if (p && p.opacity && typeof p.opacity.value === 'number') return p.opacity.value;
            if (p && typeof p.opacity === 'number') return p.opacity;
            return 0.5;
        }

        function setOpacityValue(p, value) {
            var next = Math.max(0, Math.min(1, value));
            if (p && p.opacity && typeof p.opacity.value === 'number') {
                p.opacity.value = next;
                return;
            }
            if (p) p.opacity = next;
        }

        function spawnParticleAt(x, y) {
            if (!instance.fn || !instance.fn.modes || typeof instance.fn.modes.pushParticles !== 'function') return;
            instance.fn.modes.pushParticles(1, { pos_x: x, pos_y: y });
            var p = particles[particles.length - 1];
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
            var count = 0;
            var rSq = r * r;
            for (var i = 0; i < particles.length; i += 1) {
                var p = particles[i];
                var dx = p.x - x;
                var dy = p.y - y;
                if (dx * dx + dy * dy <= rSq) count += 1;
            }
            return count;
        }

        function maintainSparseRegions() {
            var width = instance.canvas.w || canvasEl.width || window.innerWidth;
            var height = instance.canvas.h || canvasEl.height || window.innerHeight;
            for (var i = 0; i < 2; i += 1) {
                var x = Math.random() * width;
                var y = Math.random() * height;
                if (countParticlesNear(x, y, sparseRadius) <= sparseThreshold) {
                    spawnParticleAt(x, y);
                }
            }
            if (particles.length > minParticles && Math.random() < 0.1) {
                var idx = Math.floor(Math.random() * particles.length);
                var p = particles[idx];
                if (p && !p.__fadeOut && !p.__fadeIn) {
                    p.__fadeOut = true;
                }
            }
        }

        function setPointer(clientX, clientY) {
            var rect = canvasEl.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return;
            if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
                pointer.active = false;
                return;
            }
            var pxWidth = instance.canvas.w || canvasEl.width || rect.width;
            var pxHeight = instance.canvas.h || canvasEl.height || rect.height;
            var scaleX = pxWidth / rect.width;
            var scaleY = pxHeight / rect.height;
            pointer.x = (clientX - rect.left) * scaleX;
            pointer.y = (clientY - rect.top) * scaleY;
            pointer.active = true;
        }

        window.addEventListener('pointermove', function(e) { setPointer(e.clientX, e.clientY); }, { passive: true });
        window.addEventListener('touchmove', function(e) { var t = e.touches && e.touches[0]; if (t) setPointer(t.clientX, t.clientY); }, { passive: true });
        window.addEventListener('pointerleave', function() { pointer.active = false; }, { passive: true });
        window.addEventListener('touchend', function() { pointer.active = false; }, { passive: true });

        function tick() {
            frame += 1;
            magneticPower += pointer.active
                ? (1 - magneticPower) * 0.14
                : (0 - magneticPower) * 0.012;

            if (magneticPower > 0.001 && particles.length) {
                for (var i = 0; i < particles.length; i += 1) {
                    var p = particles[i];
                    var dx = pointer.x - p.x;
                    var dy = pointer.y - p.y;
                    var distSq = dx * dx + dy * dy;
                    if (distSq <= 1) continue;
                    var dist = Math.sqrt(distSq);
                    if (dist > radius) continue;
                    var normalized = 1 - dist / radius;
                    var pull = normalized * normalized * strength * magneticPower;
                    p.vx += dx * pull;
                    p.vy += dy * pull;
                    var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    if (speed > maxSpeed) {
                        var scale = maxSpeed / speed;
                        p.vx *= scale;
                        p.vy *= scale;
                    }
                }
            }

            for (var j = particles.length - 1; j >= 0; j -= 1) {
                var pp = particles[j];
                if (typeof pp.vx !== 'number') pp.vx = 0;
                if (typeof pp.vy !== 'number') pp.vy = 0;
                pp.vx *= damping;
                pp.vy *= damping;

                if (pp.__generated && typeof pp.__ttl === 'number') {
                    pp.__ttl -= 1;
                    if (pp.__ttl <= 0) pp.__fadeOut = true;
                }

                if (pp.__fadeIn) {
                    var next = getOpacityValue(pp) + 0.011;
                    setOpacityValue(pp, next);
                    if (next >= 0.5) pp.__fadeIn = false;
                }

                if (pp.__fadeOut) {
                    var nextVal = getOpacityValue(pp) - 0.004;
                    if (nextVal <= 0.008) {
                        particles.splice(j, 1);
                        continue;
                    }
                    setOpacityValue(pp, nextVal);
                }
            }

            if (frame % 12 === 0) {
                maintainSparseRegions();
            }

            requestAnimationFrame(tick);
        }

        tick();
        return true;
    }

    if (boot()) return;
    var timer = setInterval(function() {
        retry += 1;
        if (boot() || retry >= maxRetry) {
            clearInterval(timer);
        }
    }, 120);
}

function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

function initMobileMenu() {
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var navLinks = document.querySelector('.nav-links');
    if (!mobileMenuBtn || !navLinks) return;

    var overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);

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

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navLinks.classList.contains('mobile-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('click', function() {
        closeMenu();
    });
}

function initFloatingTools() {
    var existing = document.querySelector('.fab-tools');
    if (existing) existing.remove();

    var wrapper = document.createElement('div');
    wrapper.className = 'fab-tools';

    var refreshBtn = document.createElement('button');
    refreshBtn.type = 'button';
    refreshBtn.className = 'fab-btn fab-refresh';
    refreshBtn.innerHTML = '<i class="fas fa-rotate-right"></i><span class="fab-tooltip"></span>';

    var topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'fab-btn fab-top is-hidden';
    topBtn.innerHTML = '<i class="fas fa-arrow-up"></i><span class="fab-tooltip"></span><svg class="fab-progress" viewBox="0 0 36 36"><circle class="fab-progress-bg" cx="18" cy="18" r="16"/><circle class="fab-progress-bar" cx="18" cy="18" r="16"/></svg>';

    wrapper.appendChild(refreshBtn);
    wrapper.appendChild(topBtn);
    document.body.appendChild(wrapper);

    function updateLabels() {
        var htmlLang = document.documentElement.lang || 'zh-CN';
        var refreshText, topText;
        if (htmlLang.startsWith('en')) {
            refreshText = 'Refresh page';
            topText = 'Back to top';
        } else if (htmlLang.startsWith('fr')) {
            refreshText = 'Rafraîchir la page';
            topText = 'Retour en haut';
        } else {
            refreshText = '刷新页面';
            topText = '回到顶部';
        }
        refreshBtn.setAttribute('aria-label', refreshText);
        refreshBtn.setAttribute('title', refreshText);
        refreshBtn.querySelector('.fab-tooltip').textContent = refreshText;
        topBtn.setAttribute('aria-label', topText);
        topBtn.setAttribute('title', topText);
        topBtn.querySelector('.fab-tooltip').textContent = topText;
    }

    updateLabels();

    window.addEventListener('localechange', function() {
        updateLabels();
    });

    refreshBtn.addEventListener('click', function() {
        var cancelled = false;
        var checkEvent = new CustomEvent('xxh-refresh-check', {
            detail: { cancel: function() { cancelled = true; } }
        });
        window.dispatchEvent(checkEvent);
        if (cancelled) return;

        refreshBtn.classList.add('is-spinning');
        var fadeTargets = getLanguageFadeTargets();
        fadeTargets.forEach(function(el) { el.classList.add('lang-fade-target', 'is-leaving'); });
        window.setTimeout(function() {
            window.location.reload();
        }, 460);
    });

    topBtn.addEventListener('click', function() {
        topBtn.classList.add('is-hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(function() {
            topBtn.blur();
        }, 100);
        var checkScroll = function() {
            if (window.scrollY <= 10) {
                topBtn.classList.remove('is-hidden');
                window.removeEventListener('scroll', checkScroll);
            }
        };
        window.addEventListener('scroll', checkScroll, { passive: true });
        setTimeout(function() {
            window.removeEventListener('scroll', checkScroll);
            if (window.scrollY > 260) {
                topBtn.classList.remove('is-hidden');
            }
        }, 1500);
    });

    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;

    function onScroll() {
        var show = window.scrollY > 260;
        topBtn.classList.toggle('is-hidden', !show);

        scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
        if (scrollHeight > 0) {
            var progress = Math.min(window.scrollY / scrollHeight, 1);
            var bar = topBtn.querySelector('.fab-progress-bar');
            if (bar) bar.style.strokeDashoffset = 100.53 - progress * 100.53;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            var targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function safeStorageGet(storageType, key) {
    try {
        var store = window[storageType];
        return store ? store.getItem(key) : null;
    } catch (_err) {
        return null;
    }
}

function safeStorageSet(storageType, key, value) {
    try {
        var store = window[storageType];
        if (store) store.setItem(key, value);
    } catch (_err) {
        // Ignore storage-unavailable environments (private mode / restrictive webview).
    }
}

function safeStorageRemove(storageType, key) {
    try {
        var store = window[storageType];
        if (store) store.removeItem(key);
    } catch (_err) {
        // Ignore storage-unavailable environments (private mode / restrictive webview).
    }
}

var locale = safeStorageGet('localStorage', 'rayawa_locale') || 'zh';
var TRANSITION_MS = 420;
var REVEAL_ROW_TOLERANCE = 14;
var REVEAL_BASE_DELAY = 80;
var REVEAL_STAGGER_MS = 90;
window.__rayMotion = window.__rayMotion || {
    transitionMs: TRANSITION_MS,
    revealBaseDelay: REVEAL_BASE_DELAY,
    revealStaggerMs: REVEAL_STAGGER_MS
};

function sortByVisualFlow(elements) {
    return elements.slice().sort(function(a, b) {
        var ra = a.getBoundingClientRect();
        var rb = b.getBoundingClientRect();
        var topDiff = ra.top - rb.top;
        if (Math.abs(topDiff) > REVEAL_ROW_TOLERANCE) return topDiff;
        var leftDiff = ra.left - rb.left;
        if (Math.abs(leftDiff) > 1) return leftDiff;
        return 0;
    });
}

function setLocale(lang, opts) {
    opts = opts || {};
    locale = lang;
    if (!opts.noPersist) safeStorageSet('localStorage', 'rayawa_locale', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'fr' ? 'fr' : 'en';
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    window.dispatchEvent(new CustomEvent('localechange', { detail: { lang: lang } }));
}

function getLanguageFadeTargets() {
    return Array.from(document.querySelectorAll([
        '.navbar',
        '.page',
        '.wrap',
        '.footer',
        '.fab-tools',
    ].join(',')));
}

function runLanguageFadeTransition(callback) {
    var targets = getLanguageFadeTargets();
    targets.forEach(function(el) { el.classList.add('lang-fade-target', 'is-leaving'); });
    setTimeout(function() {
        callback();
        targets.forEach(function(el) { el.classList.remove('is-leaving'); });
        targets.forEach(function(el) { el.classList.add('is-entering'); });
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                targets.forEach(function(el) { el.classList.add('is-arriving'); });
                setTimeout(function() {
                    targets.forEach(function(el) { el.classList.remove('lang-fade-target', 'is-entering', 'is-arriving'); });
                }, TRANSITION_MS);
            });
        });
    }, TRANSITION_MS);
}

function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var lang = btn.dataset.lang;
            if (lang && lang !== locale) {
                runLanguageFadeTransition(function() {
                    setLocale(lang);
                });
            }
        });
    });
}

function initPageEntrance() {
    var isHomepage = !!document.getElementById('loadingScreen');
    
    // 页面加载时立即清除所有过渡状态
    clearPageTransitionStates();
    
    // 检查页面是否从缓存加载（浏览器后退/前进）
    var isFromCache = false;
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            isFromCache = true;
            // 清除所有过渡状态
            clearPageTransitionStates();
            safeStorageRemove('sessionStorage', 'rayawa_navigating');
            
            // 立即显示内容
            var navbar = document.querySelector('.navbar');
            if (navbar) navbar.classList.add('is-visible');
            
            var pageEl = document.querySelector('.page');
            if (pageEl) pageEl.classList.add('content-ready');
            
            // 设置语言
            setLocale(locale, { noPersist: true });
            
            // 触发子页面显示动画
            setTimeout(function() {
                if (typeof initSubpageReveal === 'function') {
                    initSubpageReveal();
                }
            }, 100);
        }
    }, { once: true });

    if (isHomepage) {
        var navbar = document.querySelector('.navbar');
        if (navbar) {
            function showNavbar() {
                requestAnimationFrame(function() {
                    navbar.classList.add('is-visible');
                });
            }
            if (isFromCache) {
                showNavbar();
            } else {
                window.addEventListener('loadingScreenDone', showNavbar, { once: true });
            }
        }
        return;
    }

    var navbar = document.querySelector('.navbar');
    var isNavigating = safeStorageGet('sessionStorage', 'rayawa_navigating') === '1';
    safeStorageRemove('sessionStorage', 'rayawa_navigating');

    // 如果是从缓存加载或正在导航，立即显示内容
    if (isNavigating || isFromCache) {
        setLocale(locale, { noPersist: true });
        if (navbar) navbar.classList.add('is-visible');

        var pageEl = document.querySelector('.page');
        if (pageEl) pageEl.classList.add('content-ready');

        // 只有在导航时显示过渡层，从缓存加载时不显示
        if (isNavigating && !isFromCache) {
            var overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    overlay.style.animation = 'pageOverlayOut 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                    setTimeout(function() { overlay.remove(); }, TRANSITION_MS + 40);
                });
            });
        }
        return;
    }

    var entrance = document.createElement('div');
    entrance.className = 'page-entrance';
    document.body.appendChild(entrance);

    var done = false;

    function finish() {
        if (done) return;
        done = true;
        setLocale(locale, { noPersist: true });
        if (navbar) navbar.classList.add('is-visible');
        var pageEl = document.querySelector('.page');
        if (pageEl) pageEl.classList.add('content-ready');
        setTimeout(function() {
            entrance.classList.add('is-done');
            setTimeout(function() {
                entrance.remove();
            }, 1000);
        }, 350);
    }

    window.addEventListener('load', function() {
        setTimeout(finish, 400);
    });

    setTimeout(finish, 2500);
}

function initSubpageReveal() {
    var isSubpage = !document.getElementById('loadingScreen');
    if (!isSubpage) return;
    if (window.__subpageRevealBooted) {
        if (typeof window.__subpageRevealRefresh === 'function') {
            window.__subpageRevealRefresh();
        }
        return;
    }

    var isThanks = !!document.querySelector('.thanks-section');
    var isBio = !!document.querySelector('.pcr-lab');
    var isDashboard = !!document.querySelector('.dashboard-page');

    if (isDashboard) {
        var sections = document.querySelectorAll('.dashboard-page .hero-section, .dashboard-page .content-section');
        sections.forEach(function(el, idx) {
            el.classList.add('subpage-reveal');
            el.style.setProperty('--subpage-delay', (idx * REVEAL_STAGGER_MS) + 'ms');
        });
    } else if (isThanks) {
        var groups = document.querySelectorAll('.thanks-group');
        groups.forEach(function(el) {
            el.classList.add('subpage-reveal');
        });
    } else if (isBio) {
        var heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.classList.add('subpage-reveal');
        }
        var parts = document.querySelectorAll('.pcr-lab, .thesis-archive, .hero-interactive');
        parts.forEach(function(part, partIdx) {
            var delay = (partIdx + 1) * 150;
            var children = part.querySelectorAll('.section-header, .pcr-result, .pcr-docs, .doc-card, .thesis-featured, .thesis-grid, .thesis-card, .interactive-content');
            children.forEach(function(child) {
                child.classList.add('subpage-reveal');
                child.style.setProperty('--subpage-delay', delay + 'ms');
            });
        });
    } else {
        var items = document.querySelectorAll(
            '.hero-card, .card, .feature-card, .glass-card, ' +
            '.hi-card, .hi-overview-card, .doc-card, .thesis-card, ' +
            '.social-card, .project-card, .single-action, .button-row, ' +
            '.dev-section, .notice-list, .spm-section, ' +
            '.metric-card-small, .metric-card, .info-card, .note-card, ' +
            '.highlight-card, .case-item, .team-item, ' +
            '.access-metrics-card, .hero-section, .content-section, ' +
            '.hero-tags-wrapper, .platform-grid, .download-section, ' +
            '.api-section, .acknowledgments-section, .license-section, ' +
            '.tech-subsection, .card-image'
        );
        if (!items.length) return;

        var ordered = sortByVisualFlow(Array.from(items));
        ordered.forEach(function(el, idx) {
            el.classList.add('subpage-reveal');
            el.style.setProperty('--subpage-delay', (REVEAL_BASE_DELAY + idx * REVEAL_STAGGER_MS) + 'ms');
        });
    }

    var revealEls = document.querySelectorAll('.subpage-reveal');
    if (!revealEls.length) return;

    function revealEl(el) {
        if (el.classList.contains('is-visible')) return;
        el.classList.add('is-visible');
        if (observer) observer.unobserve(el);
    }

    var observer = null;
    
    // 初始化IntersectionObserver
    function initObserver() {
        if (observer) observer.disconnect();
        
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    revealEl(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        revealEls.forEach(function(el) { 
            if (!el.classList.contains('is-visible')) {
                observer.observe(el); 
            }
        });
    }

    function checkVisibleEls() {
        var vh = window.innerHeight;
        var scrollY = window.scrollY;
        
        revealEls.forEach(function(el) {
            if (el.classList.contains('is-visible')) return;
            var rect = el.getBoundingClientRect();
            var elementTop = rect.top + scrollY;
            var elementBottom = rect.bottom + scrollY;
            var viewportTop = scrollY;
            var viewportBottom = scrollY + vh;
            
            // 检查元素是否在视口内或接近视口
            if ((rect.top < vh && rect.bottom > 0) || 
                (elementTop < viewportBottom + 100 && elementBottom > viewportTop - 100)) {
                revealEl(el);
            }
        });
    }

    var scrollCheckTimer = null;
    function onScrollCheck() {
        if (scrollCheckTimer) return;
        scrollCheckTimer = window.setTimeout(function() {
            scrollCheckTimer = null;
            checkVisibleEls();
            var allVisible = Array.from(revealEls).every(function(el) { 
                return el.classList.contains('is-visible'); 
            });
            if (allVisible && observer) {
                window.removeEventListener('scroll', onScrollCheck);
                observer.disconnect();
                observer = null;
            }
        }, 150);
    }

    function refreshRevealState() {
        checkVisibleEls();
        if (observer) {
            observer.disconnect();
            initObserver();
        }
    }

    initObserver();
    checkVisibleEls();

    window.addEventListener('scroll', onScrollCheck, { passive: true });
    window.addEventListener('resize', refreshRevealState, { passive: true });
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            setTimeout(refreshRevealState, 300);
        }
    });

    window.__subpageRevealRefresh = refreshRevealState;
    window.__subpageRevealBooted = true;
}

function clearPageTransitionStates() {
    document.body.classList.remove('page-leaving', 'is-loading');
    document.querySelectorAll('.navbar').forEach(function(navbar) {
        navbar.classList.remove('navbar-leaving');
    });
    document.querySelectorAll('.page-transition-overlay').forEach(function(el) { el.remove(); });
    document.querySelectorAll('.page-entrance').forEach(function(el) { el.remove(); });
}

function initPageLeaveTransitions() {
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearPageTransitionStates();
            safeStorageRemove('sessionStorage', 'rayawa_navigating');
            
            var navbar = document.querySelector('.navbar');
            if (navbar) navbar.classList.add('is-visible');
            
            var pageEl = document.querySelector('.page');
            if (pageEl) pageEl.classList.add('content-ready');
            
            if (typeof initSubpageReveal === 'function') {
                setTimeout(function() {
                    initSubpageReveal();
                }, 100);
            }
        }
    });

    document.addEventListener('click', function(e) {
        var anchor = e.target.closest('a[href]');
        if (!anchor) return;
        if (e.defaultPrevented) return;
        var href = anchor.getAttribute('href') || '';
        if (!href || href.startsWith('#')) return;
        if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
        if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

        var destination;
        try { destination = new URL(anchor.href, window.location.href); } catch(ex) { return; }
        if (destination.origin !== window.location.origin) return;

        e.preventDefault();

        document.body.classList.add('page-leaving');

        var navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('navbar-leaving');

        var overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        safeStorageSet('sessionStorage', 'rayawa_navigating', '1');

        setTimeout(function() {
            window.location.href = destination.href;
        }, TRANSITION_MS);
    });
}

function initCommon() {
    initPageEntrance();
    initParticles();
    initParticlePointerFollow();
    initParticleMagnetEffect();
    initNavbarScroll();
    initMobileMenu();
    initFloatingTools();
    initSmoothScroll();
    initLanguageSwitcher();
    initSubpageReveal();
    initPageLeaveTransitions();
}

var __isHomePage = !!document.body.classList.contains('is-homepage') || !!document.getElementById('loadingScreen');
if (!window.__HOME_JS && !__isHomePage) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCommon);
    } else {
        initCommon();
    }
}
