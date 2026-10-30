const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const { createHash } = require('node:crypto');
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

const { execFileSync } = require('node:child_process');
const referenceCommon = execFileSync('git', ['show', '59e3aaa:static/js/common.js'], { encoding: 'utf8' }).split('function initNavbarScroll')[0];
const referenceIndex = execFileSync('git', ['show', '59e3aaa:static/js/index.js'], { encoding: 'utf8' });
const currentIndex = fs.readFileSync('static/js/index.js', 'utf8');
const source = fs.readFileSync('static/js/common.js', 'utf8').split('function initNavbarScroll')[0];

function harness({ width = 1280, height = 720, reducedMotion = false, script = source } = {}) {
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
    vm.runInContext(script, context);
    return {
        instance, baseCount, canvas, document,
        snapshot() { return JSON.parse(JSON.stringify(instance.particles.array)); },
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

const plain = value => JSON.parse(JSON.stringify(value));

for (const width of [390, 1280]) {
    test(`${width}px: particle settings match 59e3aaa`, () => {
        const actual = harness({ width });
        const expected = harness({ width, script: referenceCommon });
        assert.deepEqual(plain(actual.init()), plain(expected.init()));
    });
    for (const kind of ['pointermove', 'touchmove']) {
        test(`${width}px: ${kind} and sustained attraction match 59e3aaa`, () => {
            const actual = harness({ width });
            const expected = harness({ width, script: referenceCommon });
            actual.init(); expected.init();
            for (const point of [[width * 0.3, 240], [width * 0.7, 420]]) {
                const event = kind === 'touchmove'
                    ? { touches: [{ clientX: point[0], clientY: point[1] }] }
                    : { clientX: point[0], clientY: point[1] };
                actual.dispatch(kind, event); expected.dispatch(kind, event);
                // More than 900 ms: attraction must retain the reference behavior.
                actual.step(180); expected.step(180);
                assert.equal(digest(actual.snapshot()), digest(expected.snapshot()));
            }
            actual.dispatch(kind === 'touchmove' ? 'touchend' : 'pointerleave');
            expected.dispatch(kind === 'touchmove' ? 'touchend' : 'pointerleave');
            actual.step(120); expected.step(120);
            assert.equal(digest(actual.snapshot()), digest(expected.snapshot()));
        });
    }
}

test('reduced-motion behavior matches 59e3aaa', () => {
    const actual = harness({ reducedMotion: true });
    const expected = harness({ reducedMotion: true, script: referenceCommon });
    assert.equal(actual.init(), expected.init());
    assert.equal(actual.activeLoops(), expected.activeLoops());
});

function followHarness(script) {
    const fn = script.slice(script.indexOf('function initParticlePointerFollow()'), script.indexOf('function initHeroParallax()'));
    const listeners = new Map();
    const layer = { style: {} };
    let frame;
    const window = {
        innerWidth: 1280, innerHeight: 720,
        matchMedia: () => ({ matches: false }),
        addEventListener(name, callback) { listeners.set(name, callback); },
        requestAnimationFrame(callback) { frame = callback; },
    };
    const document = { getElementById: () => layer, addEventListener() {} };
    vm.runInNewContext(fn + ';initParticlePointerFollow();', { window, document });
    return {
        dispatch(name, event) { listeners.get(name)(event); },
        step() { for (let i = 0; i < 120; i++) { const next = frame; next(); } return layer.style.transform; },
    };
}

for (const kind of ['pointermove', 'touchmove']) {
    test(`home background follows ${kind} exactly as 59e3aaa`, () => {
        const actual = followHarness(currentIndex);
        const expected = followHarness(referenceIndex);
        const event = kind === 'touchmove'
            ? { touches: [{ clientX: 1100, clientY: 500 }] }
            : { clientX: 1100, clientY: 500 };
        actual.dispatch(kind, event); expected.dispatch(kind, event);
        const moved = actual.step();
        assert.equal(moved, expected.step());
        assert.notEqual(moved, 'translate3d(0px, 0px, 0)');
        actual.dispatch(kind === 'touchmove' ? 'touchend' : 'pointerleave');
        expected.dispatch(kind === 'touchmove' ? 'touchend' : 'pointerleave');
        assert.equal(actual.step(), expected.step());
    });
}
