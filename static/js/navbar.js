(function() {
    var container = document.getElementById('site-navbar');
    if (!container) return;

    var isHomepage = document.body.classList.contains('is-homepage');
    var path = window.location.pathname;
    var htmlLang = document.documentElement.lang || 'zh-CN';
    var langDir = htmlLang.startsWith('en') ? 'en' : htmlLang.startsWith('fr') ? 'fr' : '';
    var depth = path.split('/').length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    if (path.endsWith('/') || path.endsWith('index.html')) {
        prefix = prefix.replace('../', '');
    }
    if (langDir) {
        var parts = path.replace(/\/$/, '').split('/').filter(function(p) { return p.length > 0; });
        var langIdx = parts.indexOf(langDir);
        if (langIdx >= 0) {
            var dirsAfterLang = Math.max(0, parts.length - langIdx - 2);
            prefix = '';
            for (var j = 0; j < dirsAfterLang; j++) prefix += '../';
        }
    }

    var NAV_TEXT = {
        zh: { home: '首页', about: '关于我', projects: '项目', gallery: '摄影', contact: '联系' },
        en: { home: 'Home', about: 'About Me', projects: 'Projects', gallery: 'Photography', contact: 'Contact' },
        fr: { home: 'Accueil', about: 'À propos de moi', projects: 'Projets', gallery: 'Photographie', contact: 'Contact' }
    };
    var texts = NAV_TEXT[langDir] || NAV_TEXT.zh;

    var homeHref = isHomepage ? '#' : prefix + 'index.html';

    var navLinks = [
        { href: isHomepage ? '#' : prefix + 'index.html', text: texts.home, i18n: 'nav.home' },
        { href: isHomepage ? '#about' : prefix + 'index.html#about', text: texts.about, i18n: 'nav.about' },
        { href: isHomepage ? '#projects' : prefix + 'index.html#projects', text: texts.projects, i18n: 'nav.projects' },
        { href: isHomepage ? '#gallery' : prefix + 'index.html#gallery', text: texts.gallery, i18n: 'nav.gallery' },
        { href: isHomepage ? '#contact' : prefix + 'index.html#contact', text: texts.contact, i18n: 'nav.contact' }
    ];

    var html = '<nav class="navbar" id="navbar">' +
        '<div class="container nav-container">' +
            '<a href="' + homeHref + '" class="logo">' +
                '<i class="fas fa-code"></i> ' +
                '<span>Ray Chen</span>' +
            '</a>' +
            '<ul class="nav-links">' +
                navLinks.map(function(l) {
                    return '<li><a href="' + l.href + '" data-i18n="' + l.i18n + '">' + l.text + '</a></li>';
                }).join('') +
            '</ul>' +
            '<div class="language-switch">' +
                '<a href="/" class="lang-btn" data-lang="zh"><img src="' + prefix + 'static/resources/cn.svg" alt="" class="lang-flag"><span>中文</span></a>' +
                '<a href="/en/" class="lang-btn" data-lang="en"><img src="' + prefix + 'static/resources/uk.svg" alt="" class="lang-flag"><span>EN</span></a>' +
                '<a href="/fr/" class="lang-btn" data-lang="fr"><img src="' + prefix + 'static/resources/fr.svg" alt="" class="lang-flag"><span>FR</span></a>' +
            '</div>' +
            '<button class="mobile-menu-btn" id="mobileMenuBtn"><i class="fas fa-bars"></i></button>' +
        '</div>' +
    '</nav>';

    container.innerHTML = html;
})();
