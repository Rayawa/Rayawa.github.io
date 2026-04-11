(function() {
    var container = document.getElementById('site-footer');
    if (!container) return;

    var isHomepage = document.body.classList.contains('is-homepage');
    var path = window.location.pathname;
    var depth = path.split('/').length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    if (path.endsWith('/') || path.endsWith('index.html')) {
        prefix = prefix.replace('../', '');
    }

    var locale = localStorage.getItem('rayawa_locale') || 'zh';
    var i18n = (window.FOOTER_I18N && window.FOOTER_I18N[locale]) || {};

    function t(key) {
        return key.split('.').reduce(function(o, k) { return o && o[k]; }, i18n) || '';
    }

    if (!document.getElementById('site-footer-css')) {
        var style = document.createElement('style');
        style.id = 'site-footer-css';
        style.textContent =
            '.footer{background:rgba(11,19,37,.95);color:#fff;padding:1.8rem 0 1.1rem;border-top:1px solid rgba(255,255,255,.1);flex-shrink:0;margin-top:auto}' +
            '.footer .container{max-width:1100px;margin:0 auto;padding:0 1.2rem}' +
            '.footer-content{display:flex;align-items:flex-start;justify-content:space-between;gap:1.2rem;flex-wrap:wrap;margin-bottom:1.2rem}' +
            '.footer-logo{font-size:1.2rem;font-weight:700;color:#fff;text-decoration:none;display:inline-block;margin-bottom:.45rem}' +
            '.footer-description{color:rgba(255,255,255,.7);margin-bottom:.75rem;max-width:360px;font-size:.9rem}' +
            '.footer-social{display:flex;gap:.65rem}' +
            '.footer-social-link{width:34px;height:34px;background:rgba(255,255,255,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:background .3s,transform .3s}' +
            '.footer-social-link:hover{background:#6366f1;transform:translateY(-3px)}' +
            '.footer-heading{font-size:.92rem;font-weight:600;margin-bottom:.45rem;color:#fff}' +
            '.footer-links{list-style:none;display:flex;flex-direction:column;gap:.4rem;flex-wrap:wrap;padding:0;margin:0}' +
            '.footer-links a{color:rgba(255,255,255,.7);text-decoration:none;transition:color .3s,transform .3s;font-size:.9rem}' +
            '.footer-links a:hover{color:#fff;transform:translateY(-1px)}' +
            '.copyright{text-align:center;padding-top:.95rem;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:.8rem;display:flex;justify-content:center;align-items:center;gap:1rem;flex-wrap:wrap}' +
            '@media(max-width:768px){.footer-content{align-items:flex-start;gap:.8rem}.footer-social-link{width:44px;height:44px}.copyright{flex-direction:column;gap:.2rem}}';
        document.head.appendChild(style);
    }

    var quickLinks = [
        { href: prefix + 'index.html', i18n: 'nav.home' },
        { href: prefix + 'index.html#about', i18n: 'nav.about' },
        { href: prefix + 'index.html#projects', i18n: 'nav.projects' },
        { href: prefix + 'index.html#gallery', i18n: 'nav.gallery' },
        { href: prefix + 'index.html#contact', i18n: 'nav.contact' }
    ];

    var projectLinks = [
        { href: prefix + 'projects/dashboard.html', i18n: 'project.hmdb.title' },
        { href: prefix + 'projects/bio.html', i18n: 'project.bio.title' },
        { href: prefix + 'projects/spm.html', i18n: 'project.spm.title' },
        { href: prefix + 'projects/openharmony.html', i18n: 'project.ohos.title' },
        { href: prefix + 'projects/dx.html', i18n: 'project.xiaodou.title' },
        { href: prefix + 'projects/idv.html', i18n: 'project.idv.title' }
    ];

    var thanksLinks = [
        { href: prefix + 'thanks.html', i18n: 'footer.thanksLink' }
    ];

    function buildLinkList(links) {
        return '<ul class="footer-links">' + links.map(function(l) {
            return '<li><a href="' + l.href + '" data-i18n="' + l.i18n + '">' + t(l.i18n) + '</a></li>';
        }).join('') + '</ul>';
    }

    var footerClass = isHomepage ? 'footer reveal-section' : 'footer';
    var desc = t('footer.description');

    var html = '<footer class="' + footerClass + '">' +
        '<div class="container">' +
            '<div class="footer-content">' +
                '<div>' +
                    '<a href="' + prefix + 'index.html" class="footer-logo">Ray Chen</a>' +
                    '<p class="footer-description" data-i18n-html="footer.description">' + desc + '</p>' +
                    '<div class="footer-social">' +
                        '<a href="https://github.com/Rayawa" target="_blank" rel="noopener" class="footer-social-link"><i class="fab fa-github"></i></a>' +
                        '<a href="https://space.bilibili.com/3546835039815692" target="_blank" rel="noopener" class="footer-social-link" title="Bilibili (Rayawa)"><i class="fab fa-bilibili"></i></a>' +
                        '<a href="https://space.bilibili.com/524181098" target="_blank" rel="noopener" class="footer-social-link" title="Bilibili (Ray汐)"><i class="fab fa-bilibili"></i></a>' +
                        '<a href="https://www.xiaohongshu.com/user/profile/67468e02000000001d02f990" target="_blank" rel="noopener" class="footer-social-link"><i class="fas fa-camera"></i></a>' +
                    '</div>' +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading" data-i18n="footer.quick">' + t('footer.quick') + '</h3>' +
                    buildLinkList(quickLinks) +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading" data-i18n="footer.projects">' + t('footer.projects') + '</h3>' +
                    buildLinkList(projectLinks) +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading" data-i18n="footer.thanks">' + t('footer.thanks') + '</h3>' +
                    buildLinkList(thanksLinks) +
                '</div>' +
            '</div>' +
            '<div class="copyright">' +
                '<p data-i18n-html="footer.copy">' + t('footer.copy') + '</p>' +
            '</div>' +
        '</div>' +
    '</footer>';

    container.innerHTML = html;
})();
