/* Signal 项目页图片灯箱:点击示意图放大查看,支持前后切换、方向键与 ESC 关闭 */
(function() {
    var figures = Array.from(document.querySelectorAll('.signal-img-card'));
    if (!figures.length) return;

    var lightbox = document.createElement('div');
    lightbox.className = 'signal-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', '图片预览');
    lightbox.innerHTML =
        '<img class="signal-lightbox-img" alt="">' +
        '<div class="signal-lightbox-caption"></div>' +
        '<button type="button" class="signal-lightbox-close" aria-label="关闭"><i class="fas fa-times"></i></button>' +
        '<button type="button" class="signal-lightbox-nav prev" aria-label="上一张"><i class="fas fa-chevron-left"></i></button>' +
        '<button type="button" class="signal-lightbox-nav next" aria-label="下一张"><i class="fas fa-chevron-right"></i></button>';
    document.body.appendChild(lightbox);

    var imgEl = lightbox.querySelector('.signal-lightbox-img');
    var captionEl = lightbox.querySelector('.signal-lightbox-caption');
    var current = -1;
    var lastFocus = null;

    function show(index) {
        current = (index + figures.length) % figures.length;
        var fig = figures[current];
        var src = fig.querySelector('img');
        var cap = fig.querySelector('figcaption');
        imgEl.src = src ? src.getAttribute('src') : '';
        imgEl.alt = src ? src.getAttribute('alt') || '' : '';
        captionEl.textContent = cap ? cap.textContent : '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function hide() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    figures.forEach(function(fig, idx) {
        fig.addEventListener('click', function() {
            lastFocus = fig;
            show(idx);
        });
        fig.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            lastFocus = fig;
            show(idx);
        });
        fig.setAttribute('tabindex', '0');
        fig.setAttribute('role', 'button');
        fig.setAttribute('aria-label', '放大查看: ' + (fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent : '示意图'));
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === imgEl) hide();
    });
    lightbox.querySelector('.signal-lightbox-close').addEventListener('click', hide);
    lightbox.querySelector('.signal-lightbox-nav.prev').addEventListener('click', function(e) { e.stopPropagation(); prev(); });
    lightbox.querySelector('.signal-lightbox-nav.next').addEventListener('click', function(e) { e.stopPropagation(); next(); });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') hide();
        else if (e.key === 'ArrowRight') next();
        else if (e.key === 'ArrowLeft') prev();
    });
})();
