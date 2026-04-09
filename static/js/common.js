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
                onhover: { enable: !isSubpage, mode: 'grab' },
                onclick: { enable: !isSubpage, mode: 'push' },
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

function initCommon() {
    initParticles();
    initParticlePointerFollow();
    initNavbarScroll();
    initMobileMenu();
    initFloatingTools();
    initSmoothScroll();
    initLanguageSwitcher();
    setLocale(locale, { noPersist: true });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}
