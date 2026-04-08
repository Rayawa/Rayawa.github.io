const locale = (() => {
    const lang = (document.documentElement.lang || 'zh').toLowerCase();
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('fr')) return 'fr';
    return 'zh';
})();

const i18n = {
    zh: {
        sending: '发送中...',
        sent: '消息发送成功！我会尽快回复您。',
        dotLabel: '跳转到第 {n} 张',
    },
    en: {
        sending: 'Sending...',
        sent: 'Message sent successfully. I will reply soon.',
        dotLabel: 'Go to slide {n}',
    },
    fr: {
        sending: 'Envoi...',
        sent: 'Message envoye. Je vous repondrai bientot.',
        dotLabel: 'Aller a la diapositive {n}',
    },
};

const t = i18n[locale];

function initParticles() {
    if (typeof particlesJS !== 'function') return;
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
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
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
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
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth',
            });
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="loading"></span> ${t.sending}`;
        submitBtn.disabled = true;
        window.setTimeout(() => {
            alert(t.sent);
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
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

    let current = 0;
    let timer = null;

    const dots = slides.map((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', t.dotLabel.replace('{n}', String(idx + 1)));
        dot.addEventListener('click', () => {
            goTo(idx);
            restart();
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
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
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        window.setTimeout(() => {
            window.setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        }, 100);
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

function initScrollShowcase() {
    const sections = Array.from(document.querySelectorAll('body > section[id]'));
    if (!sections.length) return;

    const mediaQuery = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    const navMap = new Map(
        Array.from(document.querySelectorAll('.nav-links a[href^="#"]')).map((link) => [link.getAttribute('href'), link.textContent.trim()])
    );

    let dock = null;
    let dockButtons = [];
    let ticking = false;

    function scrollToSection(section) {
        window.scrollTo({
            top: section.offsetTop - 24,
            behavior: 'smooth',
        });
    }

    function buildDock() {
        if (dock) return;
        dock = document.createElement('div');
        dock.className = 'section-dock';

        dockButtons = sections.map((section) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'section-dock-dot';
            button.setAttribute('aria-label', navMap.get(`#${section.id}`) || section.id);
            button.addEventListener('click', () => scrollToSection(section));
            dock.appendChild(button);
            return button;
        });

        document.body.appendChild(dock);
    }

    function destroyDock() {
        if (!dock) return;
        dock.remove();
        dock = null;
        dockButtons = [];
    }

    function clearState() {
        sections.forEach((section) => {
            section.classList.remove('is-current');
            section.style.removeProperty('--section-progress');
            section.style.removeProperty('--section-focus');
        });
    }

    function updateSections() {
        ticking = false;
        if (!mediaQuery.matches) return;

        const viewportHeight = window.innerHeight;
        let currentIndex = 0;
        let smallestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
            const normalized = Math.max(-1.15, Math.min(1.15, centerOffset / viewportHeight));
            const focus = Math.max(0, 1 - Math.min(Math.abs(normalized), 1));

            section.style.setProperty('--section-progress', normalized.toFixed(4));
            section.style.setProperty('--section-focus', focus.toFixed(4));

            const distance = Math.abs(centerOffset);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                currentIndex = index;
            }
        });

        sections.forEach((section, index) => {
            section.classList.toggle('is-current', index === currentIndex);
        });

        dockButtons.forEach((button, index) => {
            button.classList.toggle('is-active', index === currentIndex);
        });
    }

    function requestUpdate() {
        if (ticking || !mediaQuery.matches) return;
        ticking = true;
        window.requestAnimationFrame(updateSections);
    }

    function syncMode() {
        const enabled = mediaQuery.matches;
        document.documentElement.classList.toggle('has-scroll-showcase', enabled);
        document.body.classList.toggle('has-scroll-showcase', enabled);

        if (!enabled) {
            destroyDock();
            clearState();
            return;
        }

        buildDock();
        updateSections();
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', syncMode);
    } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(syncMode);
    }
    syncMode();
}

initParticles();
initNavbarScroll();
initSmoothScroll();
initContactForm();
initMobileMenu();
initGalleryCarousel();
initPageLoadAnimation();
initParticlePointerFollow();
initScrollShowcase();
