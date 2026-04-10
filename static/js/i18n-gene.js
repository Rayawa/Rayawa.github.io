window.SITE_I18N = window.SITE_I18N || {};
(function () {
    var additions = {
        zh: {
            nav: { home: '首页', about: '关于我', projects: '项目', gallery: '摄影', contact: '联系' },
            navTitle: '基因工程交互实验室',
            refresh: '刷新页面',
            top: '回到顶部'
        },
        en: {
            nav: { home: 'Home', about: 'About', projects: 'Projects', gallery: 'Gallery', contact: 'Contact' },
            navTitle: 'Gene Engineering Lab',
            refresh: 'Refresh',
            top: 'Back to Top'
        },
        fr: {
            nav: { home: 'Accueil', about: 'A propos', projects: 'Projets', gallery: 'Galerie', contact: 'Contact' },
            navTitle: 'Labo de génie génétique',
            refresh: 'Rafraîchir',
            top: 'Retour en haut'
        }
    };
    for (var lang in additions) {
        window.SITE_I18N[lang] = Object.assign({}, additions[lang], window.SITE_I18N[lang] || {});
    }
})();
