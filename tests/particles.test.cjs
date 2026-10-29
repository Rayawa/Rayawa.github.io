const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync('static/js/common.js', 'utf8').split('function initNavbarScroll')[0];

function harness({ width = 1280, height = 720, reducedMotion = false } = {}) {
    let seed = 42;
    const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
    const math = Object.create(Math);
    math.random = random;
    const listeners = new Map();
    const documentListeners = new Map();
    const addListener = map => (name, fn) => map.set(name, [...(map.get(name) || []), fn]);
    const frames = new Map();
    let nextFrameId = 0;
    let timestamp = 0;
    let config;
    const canvas = {
        width, height, isConnected: true,
        getBoundingClientRect: () => ({ left: 0, top: 0, width, height }),
    };
    const instance = {
        canvas: { w: width, h: height, el: canvas },
        particles: {
            number: { value: width <= 900 ? 35 : 72, density: { enable: true, value_area: width <= 900 ? 600 : 950 } },
            array: [],
        },
        fn: { modes: { pushParticles(count, point) {
            for (let i = 0; i < count; i++) instance.particles.array.push({
                x: point ? point.pos_x : random() * width,
                y: point ? point.pos_y : random() * height,
                vx: random() - 0.5, vy: random() - 0.5, opacity: 0.42,
            });
        } } },
    };
    const baseCount = Math.ceil(width * height / 1000 * instance.particles.number.value / instance.particles.number.density.value_area);
    instance.fn.modes.pushParticles(baseCount);
    const window = {
        innerWidth: width, innerHeight: height,
        matchMedia: () => ({ matches: reducedMotion }),
        pJSDom: [{ pJS: instance }],
        addEventListener: addListener(listeners),
    };
    const document = { hidden: false, getElementById: () => ({}), addEventListener: addListener(documentListeners) };
    const context = vm.createContext({ window, document, Math: math,
        particlesJS: (id, value) => { config = value; },
        requestAnimationFrame: fn => { frames.set(++nextFrameId, fn); return nextFrameId; },
        cancelAnimationFrame: id => { frames.delete(id); },
        setInterval: () => 1, clearInterval() {},
    });
    vm.runInContext(source, context);
    return {
        instance, baseCount, canvas, document,
        init() { context.initParticles(); context.initParticleMagnetEffect(); return config; },
        dispatch(name, event = {}) { for (const fn of listeners.get(name) || []) fn(event); },
        visibility(hidden) { document.hidden = hidden; for (const fn of documentListeners.get('visibilitychange') || []) fn(); },
        step(count) {
            for (let i = 0; i < count; i++) {
                for (const p of instance.particles.array) {
                    p.x = (p.x + p.vx * 1.75 + width) % width;
                    p.y = (p.y + p.vy * 1.75 + height) % height;
                }
                const scheduled = [...frames.values()]; frames.clear();
                timestamp += 1000 / 60;
                for (const next of scheduled) next(timestamp);
            }
        },
        activeLoops() { return frames.size; },
    };
}

for (const width of [390, 1280]) {
    test(`${width}px: only the custom magnet handles pointer interaction`, () => {
        const h = harness({ width });
        const config = h.init();
        assert.equal(config.interactivity.events.onhover.enable, false);
        assert.equal(config.interactivity.events.onclick.enable, false);
        assert.equal(config.particles.line_linked.enable, true);
    });
    test(`${width}px: long pointer dwell keeps particle and line density bounded`, () => {
        const h = harness({ width }); h.init();
        const control = harness({ width }); control.init();
        h.dispatch('pointermove', { clientX: width / 2, clientY: 360 });
        let hoveredNeighbors = 0;
        let controlNeighbors = 0;
        for (let i = 0; i < 10; i++) {
            h.step(1800); control.step(1800);
            assert.ok(h.instance.particles.array.length <= h.baseCount + 24,
                `${h.instance.particles.array.length} particles exceeds ${h.baseCount + 24}`);
            const near = p => Math.hypot(p.x - width / 2, p.y - 360) < 140;
            hoveredNeighbors += h.instance.particles.array.filter(near).length;
            controlNeighbors += control.instance.particles.array.filter(near).length;
        }
        assert.ok(hoveredNeighbors <= controlNeighbors + 40,
            `stationary pointer trapped ${hoveredNeighbors / 10} neighbors on average; control ${controlNeighbors / 10}`);
    });
}

test('reduced motion keeps the background static', () => {
    const h = harness({ reducedMotion: true });
    const config = h.init();
    assert.equal(config.particles.move.enable, false);
    assert.equal(config.interactivity.events.onclick.enable, false);
    assert.equal(h.activeLoops(), 0);
});

test('page hide and back restore pause and resume one magnet loop', () => {
    const h = harness(); h.init(); h.step(5);
    h.dispatch('pagehide');
    assert.equal(h.activeLoops(), 0);
    h.dispatch('pageshow', { persisted: true });
    assert.equal(h.activeLoops(), 1);
    h.dispatch('pageshow', { persisted: true });
    assert.equal(h.activeLoops(), 1);
    h.visibility(true);
    assert.equal(h.activeLoops(), 0);
    h.visibility(false);
    assert.equal(h.activeLoops(), 1);
});

test('particle refresh uses the replacement array rather than old particles', () => {
    const h = harness(); h.init(); h.step(2);
    const replacement = { x: 10, y: 20, vx: 0.2, vy: -0.3, opacity: 0.42 };
    h.instance.particles.array = [replacement];
    h.step(2);
    assert.equal(replacement.__driftVx, 0.2);
    assert.equal(replacement.__driftVy, -0.3);
    assert.equal(h.activeLoops(), 1);
});

test('crowded particles keep at most three links each, reset per draw', () => {
    const links = [];
    const particles = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 0 }));
    const instance = {
        particles: { array: particles, line_linked: { distance: 140 } },
        fn: {
            interact: { linkParticles(a, b) { links.push([a, b]); } },
            particlesDraw() {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) this.interact.linkParticles(particles[i], particles[j]);
                }
            },
        },
    };
    const context = vm.createContext({});
    vm.runInContext(source, context);
    context.limitParticleLinks(instance);
    context.limitParticleLinks(instance);
    instance.fn.particlesDraw();
    const firstFrame = links.length;
    assert.ok(firstFrame > 0 && firstFrame <= 30);
    assert.ok(particles.every(p => p.__rayawaLinks <= 3));
    instance.fn.particlesDraw();
    assert.equal(links.length, firstFrame * 2);
});

test('a stationary pointer releases particles back to natural drift', () => {
    const h = harness(); h.init();
    h.dispatch('pointermove', { clientX: 640, clientY: 360 });
    h.step(1200);
    for (const p of h.instance.particles.array.filter(p => typeof p.__driftVx === 'number')) {
        assert.ok(Math.abs(p.vx - p.__driftVx) < 0.02);
        assert.ok(Math.abs(p.vy - p.__driftVy) < 0.02);
    }
});
