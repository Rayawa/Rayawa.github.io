(function () {
    var container = document.getElementById('site-footer');
    if (!container) return;
    var lang = document.documentElement.lang || 'zh-CN';
    var title = lang.startsWith('fr') ? 'Documentation des projets' : lang.startsWith('en') ? 'Project Documentation' : '项目文档';
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.style.cssText = 'padding:2rem;text-align:center;border-top:1px solid rgba(255,255,255,.1);color:#cbd5e1';
    var label = document.createElement('p');
    label.textContent = title;
    var source = document.createElement('a');
    source.href = 'https://github.com/Rayawa/Rayawa.github.io';
    source.textContent = 'Source';
    source.rel = 'noopener';
    footer.append(label, source);
    container.replaceChildren(footer);
})();
