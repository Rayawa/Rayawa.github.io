function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    var el = document.getElementById('particles-js');
    if (!el) return;
    var isSubpage = !document.getElementById('loadingScreen');
    particlesJS('particles-js', {
        particles: {
            number: { value: isSubpage ? 50 : 72, density: { enable: true, value_area: isSubpage ? 1000 : 950 } },
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            opacity: { value: isSubpage ? 0.35 : 0.42, random: true },
            size: { value: isSubpage ? 2.8 : 3.2, random: true },
            line_linked: {
                enable: true,
                distance: 140,
                color: '#6366f1',
                opacity: isSubpage ? 0.12 : 0.15,
                width: 1,
            },
            move: {
                enable: true,
                speed: isSubpage ? 1.0 : 1.2,
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

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-open');
    });

    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function() {
        navLinks.classList.remove('mobile-open');
    });
}

function initFloatingTools() {
    var topBtn = document.querySelector('.fab-btn.top-btn');
    if (topBtn) {
        window.addEventListener('scroll', function() {
            topBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        topBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var refreshBtn = document.querySelector('.fab-btn.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }
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

var SITE_I18N = window.SITE_I18N || {};
var locale = localStorage.getItem('rayawa_locale') || 'zh';

function setLocale(lang, opts) {
    opts = opts || {};
    locale = lang;
    if (!opts.noPersist) localStorage.setItem('rayawa_locale', lang);
    var i18n = SITE_I18N[lang];
    if (!i18n) return;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        var val = key.split('.').reduce(function(o, k) { return o && o[k]; }, i18n);
        if (val !== undefined && val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-html');
        var val = key.split('.').reduce(function(o, k) { return o && o[k]; }, i18n);
        if (val !== undefined && val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        var val = key.split('.').reduce(function(o, k) { return o && o[k]; }, i18n);
        if (val !== undefined && val !== null) el.placeholder = val;
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'fr' ? 'fr' : 'en';
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    if (i18n.navTitle) {
        document.title = i18n.navTitle + ' | Ray Chen';
    }
}

function getLanguageFadeTargets() {
    return Array.from(document.querySelectorAll([
        '.navbar',
        '.page',
        '.wrap',
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
        setTimeout(function() {
            targets.forEach(function(el) { el.classList.remove('lang-fade-target', 'is-entering'); });
        }, 720);
    }, 420);
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
    if (isHomepage) {
        var navbar = document.querySelector('.navbar');
        if (navbar) {
            function showNavbar() {
                requestAnimationFrame(function() {
                    navbar.classList.add('is-visible');
                });
            }
            if (sessionStorage.getItem('rayawa_loaded')) {
                showNavbar();
            } else {
                window.addEventListener('loadingScreenDone', showNavbar);
            }
        }
        return;
    }

    var entrance = document.createElement('div');
    entrance.className = 'page-entrance';
    entrance.innerHTML = '<div class="page-entrance-content">' +
        '<div class="page-entrance-logo">rayawa.top</div>' +
        '<div class="page-entrance-bar-wrap"><div class="page-entrance-bar" id="entranceBar"></div></div>' +
        '<div class="page-entrance-percent"><span id="entrancePercent">0</span>%</div>' +
        '</div>';
    document.body.appendChild(entrance);

    var bar = document.getElementById('entranceBar');
    var percentEl = document.getElementById('entrancePercent');
    var progress = 0;
    var done = false;

    function setProgress(value) {
        if (done) return;
        progress = Math.min(value, 100);
        if (bar) bar.style.width = progress + '%';
        if (percentEl) percentEl.textContent = Math.floor(progress);
    }

    var steps = [
        { target: 20, delay: 80 },
        { target: 45, delay: 200 },
        { target: 70, delay: 400 },
        { target: 88, delay: 600 },
    ];

    steps.forEach(function(step) {
        setTimeout(function() { setProgress(step.target); }, step.delay);
    });

    var navbar = document.querySelector('.navbar');

    function finish() {
        if (done) return;
        done = true;
        setProgress(100);
        setLocale(locale, { noPersist: true });
        if (navbar) navbar.classList.add('is-visible');
        setTimeout(function() {
            entrance.classList.add('is-done');
            setTimeout(function() {
                entrance.remove();
            }, 1000);
        }, 350);
    }

    window.addEventListener('load', function() {
        setTimeout(finish, 500);
    });

    setTimeout(finish, 3000);

    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            window.scrollTo({ top: 0, behavior: 'instant' });
            if (navbar) navbar.classList.add('is-visible');
            if (entrance.parentNode) entrance.remove();
        }
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}
