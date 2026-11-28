/* Signal 项目页图片灯箱:点击示意图放大查看,支持前后切换、方向键与 ESC 关闭 */
(function() {
    var figures = Array.from(document.querySelectorAll('.signal-img-card'));
    if (!figures.length) return;

    var lightbox = document.createElement('div');
    lightbox.className = 'signal-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', '图片预览');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML =
        '<img class="signal-lightbox-img" alt="">' +
        '<div class="signal-lightbox-caption" aria-live="polite" aria-atomic="true"></div>' +
        '<button type="button" class="signal-lightbox-close" aria-label="关闭"><i class="fas fa-times"></i></button>' +
        '<button type="button" class="signal-lightbox-nav prev" aria-label="上一张"><i class="fas fa-chevron-left"></i></button>' +
        '<button type="button" class="signal-lightbox-nav next" aria-label="下一张"><i class="fas fa-chevron-right"></i></button>';
    document.body.appendChild(lightbox);

    var imgEl = lightbox.querySelector('.signal-lightbox-img');
    var captionEl = lightbox.querySelector('.signal-lightbox-caption');
    var buttons = Array.from(lightbox.querySelectorAll('button'));
    var current = -1;
    var lastFocus = null;
    var background = [];
    var previousOverflow = '';

    function show(index) {
        current = (index + figures.length) % figures.length;
        var fig = figures[current];
        var src = fig.querySelector('img');
        var cap = fig.querySelector('figcaption');
        imgEl.src = src ? src.getAttribute('src') : '';
        imgEl.alt = src ? src.getAttribute('alt') || '' : '';
        captionEl.textContent = (cap ? cap.textContent.trim() + ' · ' : '') + (current + 1) + ' / ' + figures.length;
    }

    function open(fig, index) {
        lastFocus = fig;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        background = Array.from(document.body.children).filter(function(el) {
            return el !== lightbox && !el.inert && !el.matches('script, style');
        });
        background.forEach(function(el) { el.inert = true; });
        show(index);
        lightbox.removeAttribute('aria-hidden');
        lightbox.classList.add('is-open');
        buttons[0].focus({ preventScroll: true });
    }

    function hide() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = previousOverflow;
        background.forEach(function(el) { el.inert = false; });
        background = [];
        if (lastFocus) lastFocus.focus({ preventScroll: true });
        lastFocus = null;
        lightbox.setAttribute('aria-hidden', 'true');
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    figures.forEach(function(fig, idx) {
        fig.addEventListener('click', function() {
            open(fig, idx);
        });
        fig.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            open(fig, idx);
        });
        fig.setAttribute('tabindex', '0');
        fig.setAttribute('role', 'button');
        fig.setAttribute('aria-label', '放大查看: ' + (fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent : '示意图'));
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === imgEl) hide();
    });
    buttons[0].addEventListener('click', hide);
    buttons[1].addEventListener('click', prev);
    buttons[2].addEventListener('click', next);

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') hide();
        else if (e.key === 'ArrowRight') next();
        else if (e.key === 'ArrowLeft') prev();
        else if (e.key === 'Tab') {
            var index = buttons.indexOf(document.activeElement);
            var destination = index + (e.shiftKey ? -1 : 1);
            if (index !== -1 && destination >= 0 && destination < buttons.length) return;
            buttons[e.shiftKey ? buttons.length - 1 : 0].focus();
        } else return;
        e.preventDefault();
    });
})();
