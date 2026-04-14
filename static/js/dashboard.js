(function() {
    var metricsEl = document.getElementById('metricsGrid');
    if (!metricsEl) return;

    var PLATFORM_ICONS = {
        web: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBvcGFjaXR5PSIwIj48L3JlY3Q+PGc+PHBhdGggZD0iTTEyIDEuMDFROS4wMiAxLjAxIDYuNDkgMi40OFEzLjk2IDMuOTYgMi40OCA2LjQ5UTEuMDEgOS4wMiAxLjAxIDEyUTEuMDEgMTQuOTggMi40OCAxNy41MVEzLjk2IDIwLjA0IDYuNDkgMjEuNTJROS4wMiAyMi45OSAxMiAyMi45OVExNC45OCAyMi45OSAxNy41MSAyMS41MlEyMC4wNCAyMC4wNCAyMS41MiAxNy41MVEyMi45OSAxNC45OCAyMi45OSAxMlEyMi45OSA5LjAyIDIxLjUyIDYuNDlRMjAuMDQgMy45NiAxNy41MSAyLjQ4UTE0Ljk4IDEuMDEgMTIgMS4wMVpNMTYuOTcgMTEuMjZRMTYuOSA5LjI2IDE2LjM0IDcuMzRRMTguMDIgNi44MiAxOS4zNyA2UTIwLjI2IDcuMSAyMC44IDguNDRRMjEuMzQgOS43NyAyMS40NiAxMS4yNkwxNi45NyAxMS4yNlpNOC41MiAxMS4yNlE4LjU5IDkuNDMgOS4xIDcuN1ExMC4zNyA3Ljk5IDExLjk5IDcuOTlRMTMuNjEgNy45OSAxNC45IDcuNzNRMTUuNDEgOS40MSAxNS40OCAxMS4yNkw4LjUyIDExLjI2Wk0xNS40OCAxMi43NFExNS4zOCAxNC41IDE0Ljg2IDE2LjI3UTEyIDE1LjcgOS4xNCAxNi4yN1E4LjYyIDE0LjUgOC41MiAxMi43NEwxNS40OCAxMi43NFpNMTUuODkgNS45M1ExNS4yNiA0LjI1IDE0LjMgMi43OFExNS40MyAzLjA3IDE2LjQ0IDMuNjFRMTcuNDUgNC4xNSAxOC4yOSA0LjlRMTcuMjEgNS41IDE1Ljg5IDUuOTNaTTEyLjMxIDIuNTJRMTMuNjEgNC4yIDE0LjQyIDYuMjlRMTMuMjcgNi41IDEyLjAxIDYuNVExMC43NSA2LjUgOS42IDYuMjZRMTAuMDEgNS4yNiAxMC41NCA0LjMyUTExLjA2IDMuMzggMTEuNzQgMi41MlExMS44OCAyLjUgMTIuMDIgMi41UTEyLjE3IDIuNSAxMi4zMSAyLjUyWk04LjE0IDUuOVE2Ljg5IDUuNTIgNS43MSA0Ljg3UTYuNTUgNC4xMyA3LjU3IDMuNlE4LjU5IDMuMDcgOS43IDIuNzhROC43MSA0LjMyIDguMTQgNS45Wk00LjY2IDUuOThRNi4xIDYuODIgNy42NiA3LjMyUTcuMSA5LjI5IDcuMDMgMTEuMjNMMi41NCAxMS4yM1EyLjY0IDkuNzcgMy4xOSA4LjQ0UTMuNzQgNy4xIDQuNjYgNS45OFpNNy4wMyAxMi43NFE3LjEgMTQuNTkgNy42OCAxNi42NlE2LjA3IDE3LjE2IDQuNjYgMThRMy43NCAxNi44NyAzLjE5IDE1LjU0UTIuNjQgMTQuMjEgMi41NCAxMi43NEw3LjAzIDEyLjc0Wk04LjE4IDE4LjA3UTguNzggMTkuNjggOS44MiAyMS4yNFE4LjY5IDIwLjk1IDcuNjQgMjAuNDFRNi42IDE5Ljg3IDUuNzEgMTkuMVE2Ljg2IDE4LjQ4IDguMTggMTguMDdaTTExLjg2IDIxLjQ4UTExLjI4IDIwLjc4IDEwLjggMjBRMTAuMzIgMTkuMjIgOS45NCAxOC4zOEw5LjY1IDE3LjcxUTEwLjk0IDE3LjQ3IDEyLjAyIDE3LjQ3UTEzLjEgMTcuNDcgMTQuMzUgMTcuNzFRMTQuMyAxNy44NiAxNC4wMiAxOC40OFExMy42MyAxOS4zIDEzLjE4IDIwLjA1UTEyLjcyIDIwLjgxIDEyLjE3IDIxLjQ4UTEyLjA3IDIxLjQ4IDEyLjAxIDIxLjQ4UTExLjk1IDIxLjQ4IDExLjg2IDIxLjQ4Wk0xNS44NCAxOC4wNVExNy4xNCAxOC40NiAxOC4yOSAxOS4xUTE3LjQyIDE5Ljg3IDE2LjM4IDIwLjQyUTE1LjM0IDIwLjk4IDE0LjIxIDIxLjI0UTE1LjIyIDE5LjY2IDE1Ljg0IDE4LjA1Wk0xOS4zNyAxOFExNy45IDE3LjE0IDE2LjMyIDE2LjYzUTE2LjkgMTQuNzYgMTYuOTcgMTIuNzRMMjEuNDggMTIuNzRRMjEuMzYgMTQuMjMgMjAuODIgMTUuNTZRMjAuMjggMTYuOSAxOS4zNyAxOFoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMSkiPjwvcGF0aD48L2c+PC9zdmc+',
        harmony: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz4gIDxnIGZpbGw9JyNGRkYnIGZpbGwtcnVsZT0nZXZlbm9kZCc+ICAgIDxwYXRoIGZpbGwtcnVsZT0nbm9uemVybycgZD0nTTAgMGg0MHY0MEgweicgb3BhY2l0eT0nMCcvPiAgICA8cGF0aCBkPSdNMTUuMiAyMy4yYy0uNC0uMi0uOC0uMy0xLjMtLjNzLS45LjEtMS4zLjNjLS40LjItLjcuNS0uOS45LS4yLjQtLjMuOC0uMyAxLjNzLjEuOS4zIDEuM2MuMi40LjUuNy45LjkuNC4yLjguMyAxLjMuM3MuOS0uMSAxLjMtLjNjLjQtLjIuNy0uNS45LS45LjItLjQuMy0uOC4zLTEuM3MtLjEtLjktLjMtMS4zYy0uMi0uNC0uNS0uNy0uOS0uOXpNMTEuNiA1QzggNSA1IDcuOSA1IDExLjZ2MTYuOEM1IDMyIDcuOSAzNSAxMS42IDM1aDE2LjhjMy42IDAgNi42LTIuOSA2LjYtNi42VjExLjZDMzUgOCAzMi4xIDUgMjguNCA1SDExLjZ6bS0uOSA1LjNoMS41djMuMmgzLjV2LTMuMmgxLjV2OGgtMS41di0zLjRoLTMuNXYzLjRoLTEuNXYtOHptNi4xIDIyaC01LjdWMzFoNS43djEuM3ptLjctNC44Yy0uNC42LS45IDEuMS0xLjUgMS41LS42LjQtMS4zLjUtMi4xLjVzLTEuNS0uMi0yLjEtLjVjLS42LS40LTEuMS0uOS0xLjUtMS41LS40LS42LS41LTEuMy0uNS0yLjFzLjItMS41LjUtMi4xYy40LS42LjktMS4xIDEuNS0xLjUuNi0uNCAxLjMtLjUgMi4xLS41czEuNS4yIDIuMS41Yy42LjQgMS4xLjkgMS41IDEuNS40LjYuNSAxLjMuNSAyLjFzLS4yIDEuNS0uNSAyLjF6bTEwLjYgMS4xYy0uMi40LS42LjYtMSAuOC0uNC4yLS45LjMtMS40LjMtLjUgMC0xLjMtLjEtMS45LS40LS41LS4zLS45LS42LTEuMS0xLjFWMjhoLjFsLjctLjQuMi0uMS4yLjMuNi42Yy4zLjIuNy4zIDEgLjMuMyAwIC43IDAgMS0uMy4yLS4yLjMtLjQuMy0uNyAwLS4zIDAtLjQtLjItLjUtLjItLjItLjQtLjMtLjgtLjRsLTEuMS0uM2MtMS4zLS40LTItMS4xLTItMi4zIDAtMS4yLjEtLjkuNC0xLjMuMi0uNC42LS42IDEtLjguNC0uMi45LS4zIDEuNC0uMy41IDAgMS4yLjEgMS43LjQuNC4yLjguNiAxIDF2LjNjLjEgMCAwIC4xIDAgLjFsLS45LjYtLjItLjNjLS4xLS4yLS4zLS40LS41LS41LS4zLS4yLS42LS4yLS45LS4yLS4zIDAtLjcgMC0uOS4zLS4yLjItLjMuNC0uMy43IDAgLjMgMCAuNC4yLjUuMi4yLjQuMy44LjRsMS4xLjNjMS4zLjQgMS45IDEuMSAxLjkgMi4zIDAgMS4yLS4xLjktLjMgMS4zbC0uMS0uNHptLS4yLTEwLjRWMTNsLTIgMy4yaC0uN2wtMi0zLjJ2NS4xaC0xLjR2LThoMS40bDIuNSA0IDIuNS00aDEuM3Y4aC0xLjRsLS4yLjF6Jy8+ICA8L2c+PC9zdmc+',
        apple: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIHZpZXdCb3g9JzAgMCA0MCA0MCc+ICA8ZGVmcz4gICAgPHBhdGggaWQ9JzQ3ZjEzMjNjLTk5M2MtNGQ0NS1hYWIxLWJlYmIxMjA2YzJiYi1hJyBkPSdNLjAwMS41OTJoMjYuOTI2djI0LjAzOUguMDAxeicvPiAgPC9kZWZzPiAgPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gICAgPHBhdGggZD0nTTAgMGg0MHY0MEgweicvPiAgICA8ZyBvcGFjaXR5PScxJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg2LjMxNiAyLjczNyknPiAgICAgIDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAgNy4wNDUpJz4gICAgICAgIDxtYXNrIGlkPSc0N2YxMzIzYy05OTNjLTRkNDUtYWFiMS1iZWJiMTIwNmMyYmItYicgZmlsbD0nI2ZmZic+ICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nIzQ3ZjEzMjNjLTk5M2MtNGQ0NS1hYWIxLWJlYmIxMjA2YzJiYi1hJy8+ICAgICAgICA8L21hc2s+ICAgICAgICA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMjAuMDA1LjYwOGMtMi43MjItLjE5My01LjAzMSAxLjQ1Ni02LjMyIDEuNDU2LTEuMzA4IDAtMy4zMjQtMS40MTUtNS40NjEtMS4zNzYtMi44MDYuMDQtNS4zOTMgMS41NjQtNi44NCAzLjk3MkMtMS41MzEgOS41MDYuNjQgMTYuNjg3IDMuNDc5IDIwLjYyYzEuMzg5IDEuOTIyIDMuMDQ1IDQuMDg4IDUuMjIxIDQuMDA5IDIuMDk0LS4wOCAyLjg4Ny0xLjI5OCA1LjQxOC0xLjI5OCAyLjUzIDAgMy4yNDMgMS4yOTggNS40NTggMS4yNTkgMi4yNTQtLjA0IDMuNjgzLTEuOTYyIDUuMDYxLTMuODk0IDEuNTk2LTIuMjMgMi4yNTEtNC4zOSAyLjI5LTQuNTA1LS4wNS0uMDE4LTQuMzk0LTEuNjE0LTQuNDM3LTYuNDA4LS4wNC00LjAwOCAzLjQxNS01LjkzNSAzLjU3My02LjAyOEMyNC4xMDIuOTg5IDIxLjA3My42ODQgMjAuMDA1LjYwOCcgbWFzaz0ndXJsKCM0N2YxMzIzYy05OTNjLTRkNDUtYWFiMS1iZWJiMTIwNmMyYmItYiknLz4gICAgICA8L2c+ICAgICAgPHBhdGggZmlsbD0nI0ZGRicgZD0nTTE4LjMyNSA1LjA1N0MxOS40ODIgMy43MTggMjAuMjYgMS44NTQgMjAuMDQ1IDBjLTEuNjYzLjA2My0zLjY3NiAxLjA2Mi00Ljg3IDIuNC0xLjA3IDEuMTg1LTIuMDA4IDMuMDgzLTEuNzUzIDQuODk5IDEuODU1LjEzNyAzLjc0OC0uOTAyIDQuOTAzLTIuMjQyJy8+ICAgIDwvZz4gIDwvZz48L3N2Zz4=',
        android: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIHZpZXdCb3g9JzAgMCA0MCA0MCc+ICA8ZGVmcz4gICAgPHBhdGggaWQ9J2E2ODgxMDhmLTMwOWYtNGUxOC1hMGRjLWVkMDI2NzQxZmExMi1hJyBkPSdNMCAwaDMzLjY4NHYxOC45NDdIMHonLz4gIDwvZGVmcz4gIDxnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+ICAgIDxwYXRoIGQ9J00wIDBoNDB2NDBIMHonLz4gICAgPGcgb3BhY2l0eT0nMScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4xNTggMTEuMTU4KSc+ICAgICAgPG1hc2sgaWQ9J2E2ODgxMDhmLTMwOWYtNGUxOC1hMGRjLWVkMDI2NzQxZmExMi1iJyBmaWxsPScjZmZmJz4gICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI2E2ODgxMDhmLTMwOWYtNGUxOC1hMGRjLWVkMDI2NzQxZmExMi1hJy8+ICAgICAgPC9tYXNrPiAgICAgIDxwYXRoIGZpbGw9JyNGRkYnIGQ9J00yNC41OTQgMTQuMTU2YTEuNDAyIDEuNDAyIDAgMSAxLS4wMDMtMi44MDMgMS40MDIgMS40MDIgMCAwIDEgLjAwMyAyLjgwM20tMTUuNTA0IDBhMS40MDIgMS40MDIgMCAxIDEtLjAwMi0yLjgwMyAxLjQwMiAxLjQwMiAwIDAgMSAuMDAyIDIuODAzTTI1LjA5NyA1LjcyTDI3LjkuODc0YS41ODQuNTg0IDAgMCAwLTEuMDEtLjU4M0wyNC4wNSA1LjJjLTIuMTctLjk4OS00LjYwOC0xLjU0LTcuMjEtMS41NC0yLjYgMC01LjAzOC41NTItNy4yMDkgMS41NEw2Ljc5NC4yOTFhLjU4NC41ODQgMCAwIDAtMS4wMS41ODJsMi44MDMgNC44NDhDMy43NzQgOC4zMzUuNDgyIDEzLjIgMCAxOC45NDdoMzMuNjg0QzMzLjIwMiAxMy4yIDI5LjkxIDguMzM1IDI1LjA5NyA1LjcyMScgbWFzaz0ndXJsKCNhNjg4MTA4Zi0zMDlmLTRlMTgtYTBkYy1lZDAyNjc0MWZhMTItYiknLz4gICAgPC9nPiAgPC9nPjwvc3ZnPg==',
    };

    function applyPlatformIcons() {
        var iconEls = document.querySelectorAll('[data-platform-icon]');
        iconEls.forEach(function(el) {
            var key = el.getAttribute('data-platform-icon');
            var src = PLATFORM_ICONS[key];
            if (src) el.src = src;
        });
    }

    applyPlatformIcons();

    var API_BASE = 'http://ddns.shenjack.top:10003';

    var mockData = {
        totalViews: 86248606,
        todayViews: 32404,
        harmonyTotalViews: 918190,
    };

    function fetchStatistics() {
        return Promise.all([
            fetch(API_BASE + '/api/v0/statistics/today_access').then(function(res) {
                console.log('today_access status:', res.status);
                return res.json();
            }),
            fetch(API_BASE + '/api/v0/statistics/top_rayawa_access').then(function(res) {
                console.log('top_rayawa_access status:', res.status);
                return res.json();
            }),
            fetch(API_BASE + '/api/v0/statistics/total_access').then(function(res) {
                console.log('total_access status:', res.status);
                return res.json();
            })
        ]).then(function(results) {
            console.log('API results:', results);
            var data = {
                todayViews: typeof results[0] === 'number' ? results[0] : results[0].count || results[0].value || 0,
                harmonyTotalViews: typeof results[1] === 'number' ? results[1] : results[1].count || results[1].value || 0,
                totalViews: typeof results[2] === 'number' ? results[2] : results[2].count || results[2].value || 0
            };
            console.log('Parsed data:', data);
            return mockData; ///api错误
        }).catch(function(error) {
            console.error('API fetch error:', error);
            return mockData;
        });
    }

    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function formatNumber(value) {
        return new Intl.NumberFormat().format(Math.max(0, Math.floor(value)));
    }

    function animateCounter(el, target, duration) {
        if (!el) return;
        if (prefersReducedMotion) {
            el.textContent = formatNumber(target);
            return;
        }

        var start = 0;
        var startTime = performance.now();

        function frame(now) {
            var progress = Math.min((now - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = start + (target - start) * eased;
            el.textContent = formatNumber(value);
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                el.textContent = formatNumber(target);
            }
        }

        requestAnimationFrame(frame);
    }

    var items = Array.from(metricsEl.querySelectorAll('.metric-value'));
    items.forEach(function(el) {
        el.textContent = '0';
    });

    var started = false;
    function startCounters(data) {
        if (started) return;
        started = true;
        items.forEach(function(el, index) {
            var key = el.getAttribute('data-counter-key');
            var fallback = Number(el.getAttribute('data-counter-fallback')) || 0;
            var target = (data && Object.prototype.hasOwnProperty.call(data, key)) ? data[key] : fallback;
            el.setAttribute('data-counter-target', String(target));
            var duration = 1200 + index * 320;
            animateCounter(el, target, duration);
        });
    }

    fetchStatistics().then(function(data) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    startCounters(data);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.26 });

        observer.observe(metricsEl);
    });
})();
