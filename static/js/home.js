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
        const radius = 190;
        const strength = 0.00072;
        const damping = 0.986;
        const maxSpeed = 3.1;

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
            if (pointer.active && particles.length) {
                for (let i = 0; i < particles.length; i += 1) {
                    const p = particles[i];
                    const dx = pointer.x - p.x;
                    const dy = pointer.y - p.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq <= 1) continue;

                    const dist = Math.sqrt(distSq);
                    if (dist > radius) continue;

                    const normalized = 1 - dist / radius;
                    const pull = normalized * normalized * strength;
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

            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i];
                p.vx *= damping;
                p.vy *= damping;
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

initParticles();
initNavbarScroll();
initSmoothScroll();
initContactForm();
initMobileMenu();
initGalleryCarousel();
initPageLoadAnimation();
initParticlePointerFollow();
initParticleMagnetEffect();
