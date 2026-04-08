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
        sendFailed: '发送失败，请稍后重试。',
        top: '回到顶部',
        refresh: '刷新页面',
        dotLabel: '跳转到第 {n} 张',
    },
    en: {
        sending: 'Sending...',
        sent: 'Message sent successfully. I will reply soon.',
        sendFailed: 'Failed to send. Please try again later.',
        top: 'Back to top',
        refresh: 'Refresh page',
        dotLabel: 'Go to slide {n}',
    },
    fr: {
        sending: 'Envoi...',
        sent: 'Message envoye. Je vous repondrai bientot.',
        sendFailed: 'Echec de l envoi. Veuillez reessayer plus tard.',
        top: 'Retour en haut',
        refresh: 'Rafraichir la page',
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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="loading"></span> ${t.sending}`;
        submitBtn.disabled = true;

        const payload = {
            name: (document.getElementById('name') || {}).value || '',
            email: (document.getElementById('email') || {}).value || '',
            message: (document.getElementById('message') || {}).value || '',
            lang: locale,
        };

        const apiBase = window.CONTACT_API_URL || 'http://localhost:8787';
        try {
            const res = await fetch(`${apiBase}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            alert(t.sent);
            form.reset();
        } catch (err) {
            console.error('contact submit failed', err);
            alert(t.sendFailed);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
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
        window.location.reload();
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

initParticles();
initNavbarScroll();
initSmoothScroll();
initContactForm();
initMobileMenu();
initGalleryCarousel();
initPageLoadAnimation();
initParticlePointerFollow();
initParticleMagnetEffect();
initHeroStarInteraction();
initFloatingTools();
