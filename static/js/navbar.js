(function() {
    var container = document.getElementById('site-navbar');
    if (!container) return;

    var isHomepage = document.body.classList.contains('is-homepage');
    var path = window.location.pathname;
    var htmlLang = document.documentElement.lang || 'zh-CN';
    var langDir = htmlLang.startsWith('en') ? 'en' : htmlLang.startsWith('fr') ? 'fr' : '';
    var parts = path.replace(/\/$/, '').split('/').filter(function(p) { return p.length > 0; });
    var prefix = '';
    var lastPart = parts[parts.length - 1] || '';
    var hasExtension = lastPart.indexOf('.') !== -1;
    var depth = hasExtension ? parts.length - 1 : parts.length;
    for (var i = 0; i < depth; i++) prefix += '../';

    var langPrefix = langDir ? langDir + '/' : '';

    var NAV_TEXT = {
        zh: { home: '首页', about: '关于我', projects: '项目', gallery: '摄影与生活', contact: '联系' },
        en: { home: 'Home', about: 'About Me', projects: 'Projects', gallery: 'Gallery & Life', contact: 'Contact' },
        fr: { home: 'Accueil', about: 'À propos de moi', projects: 'Projets', gallery: 'Gallery & Vie', contact: 'Contact' }
    };
    var texts = NAV_TEXT[langDir] || NAV_TEXT.zh;

    var homeHref = isHomepage ? '#' : prefix + langPrefix + 'index.html';

    var navLinks = [
        { href: isHomepage ? '#' : prefix + langPrefix + 'index.html', text: texts.home, i18n: 'nav.home' },
        { href: isHomepage ? '#about' : prefix + langPrefix + 'index.html#about', text: texts.about, i18n: 'nav.about' },
        { href: isHomepage ? '#projects' : prefix + langPrefix + 'index.html#projects', text: texts.projects, i18n: 'nav.projects' },
        { href: isHomepage ? '#gallery' : prefix + langPrefix + 'index.html#gallery', text: texts.gallery, i18n: 'nav.gallery' },
        { href: isHomepage ? '#contact' : prefix + langPrefix + 'index.html#contact', text: texts.contact, i18n: 'nav.contact' }
    ];

    var currentPage = path.replace(/\/$/, '');
    var pageWithoutLang = currentPage;
    if (langDir && currentPage.indexOf('/' + langDir) === 0) {
        pageWithoutLang = currentPage.substring(('/' + langDir).length) || '/';
    }
    if (!pageWithoutLang) pageWithoutLang = '/';
    var zhHref = pageWithoutLang;
    var enHref = '/en' + pageWithoutLang;
    var frHref = '/fr' + pageWithoutLang;

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
                '<a href="' + zhHref + '" class="lang-btn" data-lang="zh"><img src="' + prefix + 'static/resources/cn.svg" alt="中文" class="lang-flag"><span>中文</span></a>' +
                '<a href="' + enHref + '" class="lang-btn" data-lang="en"><img src="' + prefix + 'static/resources/uk.svg" alt="English" class="lang-flag"><span>EN</span></a>' +
                '<a href="' + frHref + '" class="lang-btn" data-lang="fr"><img src="' + prefix + 'static/resources/fr.svg" alt="Français" class="lang-flag"><span>FR</span></a>' +
            '</div>' +
            '<button class="mobile-menu-btn" id="mobileMenuBtn"><i class="fas fa-bars"></i></button>' +
        '</div>' +
    '</nav>';

    container.innerHTML = html;
})();
