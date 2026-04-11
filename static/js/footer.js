(function() {
    var container = document.getElementById('site-footer');
    if (!container) return;

    var isHomepage = document.body.classList.contains('is-homepage');
    var inProjects = window.location.pathname.indexOf('/projects/') !== -1;
    var prefix = inProjects ? '../' : '';

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
            return '<li><a href="' + l.href + '" data-i18n="' + l.i18n + '"></a></li>';
        }).join('') + '</ul>';
    }

    var footerClass = isHomepage ? 'footer reveal-section' : 'footer';

    var html = '<footer class="' + footerClass + '">' +
        '<div class="container">' +
            '<div class="footer-content">' +
                '<div>' +
                    '<a href="' + prefix + 'index.html" class="footer-logo">Ray Chen</a>' +
                    '<p class="footer-description" data-i18n-html="footer.description"></p>' +
                    '<div class="footer-social">' +
                        '<a href="https://github.com/Rayawa" target="_blank" rel="noopener" class="footer-social-link"><i class="fab fa-github"></i></a>' +
                        '<a href="https://space.bilibili.com/3546835039815692" target="_blank" rel="noopener" class="footer-social-link" title="Bilibili (Rayawa)"><i class="fab fa-bilibili"></i></a>' +
                        '<a href="https://space.bilibili.com/524181098" target="_blank" rel="noopener" class="footer-social-link" title="Bilibili (Ray汐)"><i class="fab fa-bilibili"></i></a>' +
                        '<a href="https://www.xiaohongshu.com/user/profile/67468e02000000001d02f990" target="_blank" rel="noopener" class="footer-social-link"><i class="fas fa-camera"></i></a>' +
                    '</div>' +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading" data-i18n="footer.quick"></h3>' +
                    buildLinkList(quickLinks) +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading" data-i18n="footer.projects"></h3>' +
                    buildLinkList(projectLinks) +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading" data-i18n="footer.thanks"></h3>' +
                    buildLinkList(thanksLinks) +
                '</div>' +
            '</div>' +
            '<div class="copyright">' +
                '<p data-i18n-html="footer.copy"></p>' +
            '</div>' +
        '</div>' +
    '</footer>';

    container.innerHTML = html;
})();
