(function () {
  var container = document.getElementById('mdContainer');
  if (!container || typeof marked === 'undefined') return;

  (async function () {
    try {
      var res = await fetch('/static/resources/openharmony/README.md', { cache: 'no-store' });
      var text = await res.text();
      container.innerHTML = marked.parse(text, { breaks: true, mangle: false, headerIds: true });
    } catch (err) {
      container.innerHTML = '<p>README load failed. Please try again later.</p>';
    }
  })();
})();
