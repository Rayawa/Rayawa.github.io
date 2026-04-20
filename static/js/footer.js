(function() {
    var container = document.getElementById('site-footer');
    if (!container) return;

    var isHomepage = document.body.classList.contains('is-homepage');
    var path = window.location.pathname;
    var htmlLang = document.documentElement.lang || 'zh-CN';
    var langDir = htmlLang.startsWith('en') ? 'en' : htmlLang.startsWith('fr') ? 'fr' : '';
    var lang = langDir || 'zh';
    var parts = path.replace(/\/$/, '').split('/').filter(function(p) { return p.length > 0; });
    var prefix = '';
    var lastPart = parts[parts.length - 1] || '';
    var hasExtension = lastPart.indexOf('.') !== -1;
    var depth = hasExtension ? parts.length - 1 : parts.length;
    for (var i = 0; i < depth; i++) prefix += '../';

    var langPrefix = langDir ? langDir + '/' : '';

    var FOOTER_TEXT = {
        zh: {
            description: 'Ray汐 · 清霁Ray · Rayawa',
            thanksLink: '致谢',
            projects: '项目',
            life: '生活',
            copy: '&copy; 2026 Ray Chen. All Rights Reserved.',
            projectHmdb: '鸿蒙应用看板',
            projectBio: '生物学项目',
            projectSpm: '烤地瓜模组',
            projectOhos: 'Hi3861 开发',
            projectSignal: '微弱电信号测量',
            lifeGallery: '摄影与生活',
            lifePiano: '钢琴',
            lifeDrawing: '绘画',
            lifeBooks: '书单'
        },
        en: {
            description: 'Ray汐 · 清霁Ray · Rayawa',
            thanksLink: 'Thanks',
            projects: 'Projects',
            life: 'Life',
            copy: '&copy; 2026 Ray Chen. All Rights Reserved.',
            projectHmdb: 'HarmonyOS Dashboard',
            projectBio: 'Biology Projects',
            projectSpm: 'Sweet Potato Mod',
            projectOhos: 'Hi3861 Development',
            projectSignal: 'Signal',
            lifeGallery: 'Photography',
            lifePiano: 'Piano',
            lifeDrawing: 'Drawing',
            lifeBooks: 'Books'
        },
        fr: {
            description: 'Ray汐 · 清霁Ray · Rayawa',
            thanksLink: 'Remerciements',
            projects: 'Projets',
            life: 'Vie',
            copy: '&copy; 2026 Ray Chen. Tous droits réservés.',
            projectHmdb: 'Tableau de bord HarmonyOS',
            projectBio: 'Projets de biologie',
            projectSpm: 'Mod Patate douce',
            projectOhos: 'Développement Hi3861',
            projectSignal: 'Signal',
            lifeGallery: 'Photographie',
            lifePiano: 'Piano',
            lifeDrawing: 'Dessin',
            lifeBooks: 'Livres'
        }
    };

    var t = FOOTER_TEXT[lang] || FOOTER_TEXT.zh;

    var styleEl = document.getElementById('site-footer-css');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'site-footer-css';
        document.head.appendChild(styleEl);
    }
    styleEl.textContent =
        '.footer{background:rgba(11,19,37,.95);color:#fff;padding:2.2rem 0 1.1rem;border-top:1px solid rgba(255,255,255,.1);flex-shrink:0;margin-top:auto}' +
        '.footer .container{max-width:960px;margin:0 auto;padding:0 1.2rem}' +
        '.footer-content{display:flex;align-items:flex-start;justify-content:space-between;gap:2rem;flex-wrap:wrap;margin-bottom:1.5rem}' +
        '.footer-logo{font-size:1.2rem;font-weight:700;color:#fff;text-decoration:none;display:inline-block;margin-bottom:.45rem}' +
        '.footer-description{color:rgba(255,255,255,.7);margin-bottom:.75rem;max-width:360px;font-size:.9rem}' +
        '.footer-social{display:flex;gap:.65rem}' +
        '.footer-social-link{width:34px;height:34px;background:rgba(255,255,255,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:background .3s,transform .3s}' +
        '.footer-social-link:hover{background:#6366f1;transform:translateY(-3px)}' +
        '.footer-heading{font-size:.92rem;font-weight:600;margin-bottom:.45rem;color:#fff}' +
        '.footer-heading.footer-heading-link{text-decoration:none;cursor:pointer}' +
        '.footer-links{list-style:none;display:flex;flex-direction:column;gap:.4rem;flex-wrap:wrap;padding:0;margin:0}' +
        '.footer-links a{color:rgba(255,255,255,.7);text-decoration:none;transition:color .3s,transform .3s;font-size:.9rem}' +
        '.footer-links a:hover{color:#fff;transform:translateY(-1px)}' +
        '.footer-thanks-gap{margin-top:1rem}' +
        '.copyright{text-align:center;padding-top:.95rem;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:.8rem;display:flex;flex-direction:column;align-items:center;gap:.3rem}' +
        '.icp-link{color:rgba(255,255,255,.5);font-size:.75rem;transition:color .3s}' +
        '.icp-link:hover{color:rgba(255,255,255,.8)}' +
        '@media(max-width:768px){.footer-content{align-items:flex-start;gap:.8rem}.footer-social-link{width:44px;height:44px}.copyright{gap:.2rem}}';

    var projectLinks = [
        { href: prefix + langPrefix + 'dashboard.html', text: t.projectHmdb },
        { href: prefix + langPrefix + 'projects/biology.html', text: t.projectBio },
        { href: prefix + langPrefix + 'projects/spm.html', text: t.projectSpm },
        { href: prefix + langPrefix + 'projects/Hi3861.html', text: t.projectOhos },
        { href: prefix + langPrefix + 'projects/signal.html', text: t.projectSignal }
    ];

    var lifeLinks = [
        { href: prefix + langPrefix + 'index.html#gallery', text: t.lifeGallery },
        { href: prefix + 'life/piano.html', text: t.lifePiano },
        { href: prefix + 'life/books.html', text: t.lifeBooks }
    ];

    function buildLinkList(links) {
        return '<ul class="footer-links">' + links.map(function(l) {
            return '<li><a href="' + l.href + '">' + l.text + '</a></li>';
        }).join('') + '</ul>';
    }

    var footerClass = isHomepage ? 'footer reveal-section' : 'footer';

    var html = '<footer class="' + footerClass + '">' +
        '<div class="container">' +
            '<div class="footer-content">' +
                '<div>' +
                    '<a href="' + prefix + langPrefix + 'index.html" class="footer-logo">Ray Chen</a>' +
                    '<p class="footer-description">' + t.description + '</p>' +
                    '<div class="footer-social">' +
                        '<a href="https://github.com/Rayawa" target="_blank" rel="noopener" class="footer-social-link"><i class="fab fa-github"></i></a>' +
                        '<a href="https://space.bilibili.com/3546835039815692" target="_blank" rel="noopener" class="footer-social-link" title="Bilibili (Rayawa)"><i class="fab fa-bilibili"></i></a>' +
                        '<a href="https://space.bilibili.com/524181098" target="_blank" rel="noopener" class="footer-social-link" title="Bilibili (Ray汐)"><i class="fab fa-bilibili"></i></a>' +
                        '<a href="https://www.xiaohongshu.com/user/profile/67468e02000000001d02f990" target="_blank" rel="noopener" class="footer-social-link"><i class="fas fa-camera"></i></a>' +
                    '</div>' +
                    '<div class="footer-thanks-gap">' +
                        '<a href="' + prefix + langPrefix + 'thanks.html" class="footer-heading footer-heading-link">' + t.thanksLink + '</a>' +
                    '</div>' +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading">' + t.projects + '</h3>' +
                    buildLinkList(projectLinks) +
                '</div>' +
                '<div>' +
                    '<h3 class="footer-heading">' + t.life + '</h3>' +
                    buildLinkList(lifeLinks) +
                '</div>' +
            '</div>' +
            '<div class="copyright">' +
                '<p>' + t.copy + '</p>' +
                '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="icp-link">京ICP备2025153453号</a>' +
            '</div>' +
        '</div>' +
    '</footer>';

    container.innerHTML = html;
})();
