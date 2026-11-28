(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var compactRail = window.matchMedia('(max-width: 1023px)');
    var updates = new WeakMap();

    function animateUpdate(element) {
        if (!element || reducedMotion.matches || typeof element.animate !== 'function') return;
        var previous = updates.get(element);
        if (previous) previous.cancel();
        updates.set(element, element.animate([
            { opacity: 0.52, transform: 'translateY(4px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 200, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }));
    }

    function keepInView(track, item) {
        var itemBounds = item.getBoundingClientRect();
        var trackBounds = track.getBoundingClientRect();
        if (itemBounds.left < trackBounds.left || itemBounds.right > trackBounds.right) {
            track.scrollLeft += (itemBounds.left + itemBounds.right - trackBounds.left - trackBounds.right) / 2;
        }
    }

    document.querySelectorAll('[data-pe-stage], [data-pe-linked], [data-pe-terminal]').forEach(function (group, index) {
        var tablist = group.querySelector('[role="tablist"]');
        if (!tablist) return;
        var tabs = Array.from(tablist.querySelectorAll('[role="tab"][data-target]'));
        var panels = Array.from(group.querySelectorAll('[data-frame], [data-pane]'));
        var caption = group.querySelector('[data-stage-caption], [data-terminal-title]');
        var prefix = 'pe-view-' + index;
        var linked = group.hasAttribute('data-pe-linked');
        var selected;

        if (caption) caption.id = prefix + '-caption';

        tabs = tabs.filter(function (tab) {
            var panel = panels.find(function (item) {
                return (item.dataset.frame || item.dataset.pane) === tab.dataset.target;
            });
            if (!panel) return false;

            tab.id = prefix + '-' + tab.dataset.target + '-tab';
            tab.setAttribute('aria-controls', prefix + '-' + tab.dataset.target);
            panel.id = tab.getAttribute('aria-controls');
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', tab.id);
            panel.tabIndex = 0;
            if (caption) panel.setAttribute('aria-describedby', caption.id);
            tab.addEventListener('click', function () { selectTab(tab); });
            return true;
        });
        if (!tabs.length) return;

        function selectTab(tab, animate) {
            if (selected === tab) return;
            selected = tab;
            var panelId = tab.getAttribute('aria-controls');

            tabs.forEach(function (item) {
                var active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', String(active));
                item.tabIndex = active ? 0 : -1;
            });
            panels.forEach(function (panel) {
                var active = panel.id === panelId;
                panel.classList.toggle('is-active', active);
                panel.hidden = !active;
                if (!active) return;

                if (caption) caption.textContent = panel.dataset.caption || panel.dataset.title || '';
                if (animate !== false) {
                    animateUpdate(panel);
                    animateUpdate(caption);
                }
            });
            if (linked && compactRail.matches) keepInView(tablist, tab);
        }

        function updateOrientation() {
            tablist.setAttribute('aria-orientation', linked && !compactRail.matches ? 'vertical' : 'horizontal');
            if (selected && linked && compactRail.matches) keepInView(tablist, selected);
        }

        updateOrientation();
        if (linked) compactRail.addEventListener('change', updateOrientation);

        tablist.addEventListener('keydown', function (event) {
            var index = tabs.indexOf(event.target);
            if (index === -1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

            var vertical = tablist.getAttribute('aria-orientation') === 'vertical';
            var next = index;
            if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = (index + 1) % tabs.length;
            else if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = (index - 1 + tabs.length) % tabs.length;
            else return;

            event.preventDefault();
            selectTab(tabs[next]);
            tabs[next].focus();
        });

        selectTab(tabs.find(function (tab) { return tab.classList.contains('is-active'); }) || tabs[0], false);
    });

    // The sticky chapter index follows the reading position and keeps the current pill in view.
    document.querySelectorAll('.pe-toc').forEach(function (nav) {
        var page = nav.closest('.pe-page');
        var track = nav.querySelector('.pe-toc-inner');
        var navbar = document.querySelector('.navbar');
        if (!page || !track) return;
        var chapters = Array.from(track.querySelectorAll('a[href^="#"]')).map(function (link) {
            return { link: link, section: document.getElementById(link.hash.slice(1)) };
        }).filter(function (chapter) { return chapter.section; });
        if (!chapters.length) return;

        var current;
        var pending = false;
        var readingLine;

        function updateCurrent() {
            pending = false;
            var active = chapters[0];
            chapters.forEach(function (chapter) {
                if (chapter.section.getBoundingClientRect().top <= readingLine) active = chapter;
            });
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
                active = chapters[chapters.length - 1];
            }
            if (active === current) return;

            chapters.forEach(function (chapter) {
                var selected = chapter === active;
                chapter.link.classList.toggle('is-active', selected);
                if (selected) chapter.link.setAttribute('aria-current', 'location');
                else chapter.link.removeAttribute('aria-current');
            });
            current = active;
            keepInView(track, active.link);
        }

        function queueUpdate() {
            if (!pending) window.requestAnimationFrame(updateCurrent);
            pending = true;
        }

        function measure() {
            if (navbar) nav.style.setProperty('--pe-toc-top', (navbar.offsetHeight + 4) + 'px');
            var top = parseFloat(getComputedStyle(nav).top) || 0;
            var padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            page.style.setProperty('--pe-toc-offset', nav.offsetHeight + Math.max(0, top - padding) + 'px');
            var margin = parseFloat(getComputedStyle(chapters[0].section).scrollMarginTop) || 0;
            readingLine = padding + margin + 3;
            queueUpdate();
        }

        measure();
        if (typeof ResizeObserver === 'function') {
            var observer = new ResizeObserver(measure);
            observer.observe(nav);
            if (navbar) observer.observe(navbar);
        }
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', queueUpdate, { passive: true });
        window.addEventListener('hashchange', queueUpdate);
        window.addEventListener('pageshow', queueUpdate);
    });

    // ComplexSweeper 3x3 interactive rule playground
    var lab = document.getElementById('sweeper-lab');
    if (lab) {
        var mode = 'circle'; // 'circle' or 'minkowski'
        var states = ['0', '1', '-1', 'i', '-i'];
        var cellValues = ['1', '0', 'i', '0', null, '0', '0', '0', '0']; // default +1 and +i => sqrt(2)
        var modeBtns = lab.querySelectorAll('[data-sweeper-mode]');
        var cells = lab.querySelectorAll('.pe-cell[data-idx]');
        var centerCell = lab.querySelector('.pe-cell.is-center');
        var sumEl = document.getElementById('sweeper-sum');
        var formulaEl = document.getElementById('sweeper-formula');
        var noteEl = document.getElementById('sweeper-note');

        function formatUnit(v) {
            if (v === '0') return '';
            if (v === '1') return '+1';
            if (v === '-1') return '−1';
            if (mode === 'minkowski') return v === 'i' ? '+j' : '−j';
            return v === 'i' ? '+i' : '−i';
        }

        function updateLab(animate) {
            var a = 0;
            var b = 0;
            var mineCount = 0;

            cells.forEach(function (cell) {
                var idx = Number(cell.getAttribute('data-idx'));
                var v = cellValues[idx];
                cell.setAttribute('data-val', v);
                var unitLabel = formatUnit(v);
                cell.textContent = unitLabel;
                cell.setAttribute('aria-label', '第 ' + (Math.floor(idx / 3) + 1) + ' 行第 ' + (idx % 3 + 1) +
                    ' 列：' + (unitLabel || '空格') + '，切换雷型');
                if (v !== '0') mineCount++;
                if (v === '1') a += 1;
                if (v === '-1') a -= 1;
                if (v === 'i') b += 1;
                if (v === '-i') b -= 1;
            });

            var unit = mode === 'minkowski' ? 'j' : 'i';
            var bSign = b >= 0 ? ' + ' : ' − ';
            var sumText = a + bSign + Math.abs(b) + unit;

            var clue = '';
            var formula = '';
            if (mode === 'circle') {
                var n = a * a + b * b;
                var r = Math.sqrt(n);
                clue = Number.isInteger(r) ? String(r) : '√' + n;
                formula = '√((' + a + ')² + (' + b + ')²) = √' + n + ' → 显示 ' + clue;
            } else {
                var m = a * a - b * b;
                if (m >= 0) {
                    var mr = Math.sqrt(m);
                    clue = Number.isInteger(mr) ? String(mr) : '√' + m;
                    formula = '√((' + a + ')² − (' + b + ')²) = √' + m + ' → 显示 ' + clue;
                } else {
                    var absM = Math.abs(m);
                    var ir = Math.sqrt(absM);
                    var coef = Number.isInteger(ir) ? (ir === 1 ? '' : String(ir)) : '√' + absM;
                    clue = coef + 'i';
                    formula = '√((' + a + ')² − (' + b + ')²) = √(−' + absM + ') → 显示 ' + clue;
                }
            }

            if (centerCell && centerCell.textContent !== clue) {
                centerCell.textContent = clue;
                if (animate) animateUpdate(centerCell);
            }
            if (sumEl) sumEl.textContent = sumText + '（周围实有雷数：' + mineCount + '）';
            if (formulaEl) formulaEl.textContent = formula;
            if (noteEl) {
                if (clue === '0' && mineCount > 0) {
                    noteEl.textContent = '⚠ 注意：当前中心显示 0，但周围其实埋着 ' + mineCount + ' 颗雷！这正是“0 不等于安全”的抵消现象。';
                } else if (mineCount === 0) {
                    noteEl.textContent = '周围 8 格均无雷，只有真正“空无一雷”时才会触发自动扩散。';
                } else {
                    noteEl.textContent = '点击周围任意灰格可切换雷型（空 → +1 → −1 → +' + unit + ' → −' + unit + '）。';
                }
            }
        }

        cells.forEach(function (cell) {
            cell.addEventListener('click', function () {
                var idx = Number(cell.getAttribute('data-idx'));
                var cur = cellValues[idx];
                var next = states[(states.indexOf(cur) + 1) % states.length];
                cellValues[idx] = next;
                updateLab(true);
            });
        });

        function updateModeButtons() {
            modeBtns.forEach(function (btn) {
                var active = btn.dataset.sweeperMode === mode;
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-pressed', String(active));
            });
        }

        modeBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (mode === btn.dataset.sweeperMode) return;
                mode = btn.dataset.sweeperMode;
                updateModeButtons();
                updateLab(true);
                animateUpdate(formulaEl);
            });
        });

        updateModeButtons();
        updateLab();
    }

    // Loci interactive multi-line daily text parser
    var lociLab = document.getElementById('loci-lab');
    if (lociLab) {
        var lociInput = document.getElementById('loci-input');
        var lociTimeline = document.getElementById('loci-timeline');
        var lociPresetBtns = lociLab.querySelectorAll('[data-loci-preset]');
        var PRESETS = {
            overnight: '7:25 起床\n8:00-9:30 高数\n12:10 吃饭\n14:30-17:10 ArkTS 数据库迁移\n23:30-3:00 开发时迹周视图\n3:00 睡觉',
            overlap: '8:15 起床\n9:00-11:00 系统课程实验\n10:30 导师临时讨论\n15:00-16:20 跑步骑行\n23:50 睡觉'
        };

        function toMinutes(t, wakeMin) {
            var parts = t.replace('：', ':').split(':');
            var h = parseInt(parts[0], 10);
            var m = parseInt(parts[1], 10);
            if (isNaN(h) || isNaN(m) || h > 23 || m > 59) return null;
            var mins = h * 60 + m;
            var nextDay = wakeMin !== null && mins < wakeMin;
            return { raw: (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m, mins: nextDay ? mins + 1440 : mins, nextDay: nextDay };
        }

        function renderLoci() {
            var lines = (lociInput.value || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
            var wakeMin = null;
            lines.forEach(function (l) {
                var wm = l.match(/^(\d{1,2}[:：]\d{2})\s*起床/);
                if (wm) {
                    var p = wm[1].replace('：', ':').split(':');
                    wakeMin = parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
                }
            });

            var items = [];
            var invalid = [];
            lines.forEach(function (line, i) {
                var clean = line.replace(/^[-*•]\s*/, '');
                var rangeM = clean.match(/^(\d{1,2}[:：]\d{2})\s*[-–—~到至]\s*(\d{1,2}[:：]\d{2})\s*(.+)$/);
                var singleM = clean.match(/^(\d{1,2}[:：]\d{2})\s*(.+)$/);
                if (rangeM) {
                    var s = toMinutes(rangeM[1], wakeMin);
                    var e = toMinutes(rangeM[2], wakeMin);
                    if (!s || !e) { invalid.push('第 ' + (i + 1) + ' 行时间无效'); return; }
                    if (e.mins < s.mins) { e.mins += 1440; e.nextDay = true; }
                    var dur = e.mins - s.mins;
                    items.push({
                        sort: s.mins,
                        time: s.raw + '–' + (e.nextDay ? '次日 ' : '') + e.raw,
                        text: rangeM[3].trim(),
                        badge: dur + ' min',
                        boundary: false
                    });
                } else if (singleM) {
                    var t = toMinutes(singleM[1], wakeMin);
                    if (!t) { invalid.push('第 ' + (i + 1) + ' 行时间无效'); return; }
                    var txt = singleM[2].trim();
                    var isBoundary = txt === '起床' || txt === '睡觉';
                    items.push({
                        sort: t.mins,
                        time: (t.nextDay ? '次日 ' : '') + t.raw,
                        text: txt,
                        badge: isBoundary ? '作息边界' : '时间点 · 0 min',
                        boundary: isBoundary
                    });
                } else {
                    invalid.push('第 ' + (i + 1) + ' 行无法识别');
                }
            });

            if (invalid.length) {
                lociTimeline.classList.add('is-invalid');
                lociInput.setAttribute('aria-invalid', 'true');
                lociTimeline.innerHTML = '<div class="pe-loci-row"><span class="pe-loci-time">事务回滚</span><span class="pe-loci-text">' + invalid[0] + '（整批不提交，保留原输入）</span><span class="pe-loci-badge">校验失败</span></div>';
                return;
            }

            lociTimeline.classList.remove('is-invalid');
            lociInput.removeAttribute('aria-invalid');
            items.sort(function (a, b) { return b.sort - a.sort; }); // 从晚到早倒序
            lociTimeline.innerHTML = items.map(function (it) {
                return '<div class="pe-loci-row' + (it.boundary ? ' is-boundary' : '') + '">' +
                    '<span class="pe-loci-time">' + it.time + '</span>' +
                    '<span class="pe-loci-text">' + it.text.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>' +
                    '<span class="pe-loci-badge">' + it.badge + '</span>' +
                '</div>';
            }).join('') || '<div class="pe-loci-row"><span class="pe-loci-time">--:--</span><span class="pe-loci-text">输入多行记录以预览解析结果</span></div>';
        }

        function updateLociPresets() {
            lociPresetBtns.forEach(function (btn) {
                var active = lociInput.value === PRESETS[btn.dataset.lociPreset];
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-pressed', String(active));
            });
        }

        lociInput.addEventListener('input', function () {
            updateLociPresets();
            renderLoci();
        });
        lociPresetBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var preset = PRESETS[btn.dataset.lociPreset];
                if (!preset || lociInput.value === preset) return;
                lociInput.value = preset;
                updateLociPresets();
                renderLoci();
                animateUpdate(lociTimeline);
            });
        });
        if (!lociInput.value.trim()) lociInput.value = PRESETS.overnight;
        updateLociPresets();
        renderLoci();
    }
})();
