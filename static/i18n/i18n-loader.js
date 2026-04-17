(function() {
    'use strict';

    window.I18nLoader = {
        currentLang: '',
        currentPage: '',

        init: function(pageName) {
            this.currentPage = pageName || this.detectPageName();
            this.currentLang = this.detectLanguage();
            this.loadPageI18n();
        },

        detectPageName: function() {
            var path = window.location.pathname;
            var filename = path.split('/').pop().replace('.html', '') || 'index';
            return filename;
        },

        detectLanguage: function() {
            var htmlLang = document.documentElement.lang || 'zh-CN';
            var langCode = htmlLang.startsWith('en') ? 'en' :
                          htmlLang.startsWith('fr') ? 'fr' : 'zh';
            
            localStorage.setItem('rayawa_locale', langCode);
            return langCode;
        },

        loadPageI18n: function() {
            var self = this;

            if (window.SITE_I18N_PRELOAD) {
                this.applyI18n(window.SITE_I18N_PRELOAD);
                return;
            }

            var script = document.createElement('script');
            script.src = this.getI18nUrl();
            script.async = false;
            script.onload = function() {
                if (window.PAGE_I18N) {
                    self.applyI18n(window.PAGE_I18N);
                }
            };
            document.head.appendChild(script);
        },

        getI18nUrl: function() {
            var basePath = this.getBasePath();
            return basePath + '/static/i18n/pages/' + this.currentPage + '.js';
        },

        getBasePath: function() {
            var path = window.location.pathname;
            if (path.indexOf('/fr/') === 0) return '..';
            if (path.indexOf('/en/') === 0) return '..';
            if (path.startsWith('/projects/') || 
                path.startsWith('/life/') ||
                path.startsWith('/dashboard')) return '.';
            return '';
        },

        applyI18n: function(i18nData) {
            if (!i18nData) return;

            var langData = i18nData[this.currentLang] || i18nData['zh'] || {};

            window.SITE_I18N = {};
            Object.keys(i18nData).forEach(function(lang) {
                window.SITE_I18N[lang] = i18nData[lang];
            });

            window.FOOTER_I18N = this.getFooterI18n();

            document.dispatchEvent(new CustomEvent('i18nLoaded', {
                detail: { lang: this.currentLang, data: langData }
            }));
        },

        getFooterI18n: function() {
            var footerI18n = {
                'zh': {
                    nav: {
                        home: "首页",
                        about: "关于我",
                        projects: "项目",
                        gallery: "摄影",
                        contact: "联系"
                    },
                    project: {
                        hmdb: { title: "华为应用市场看板" },
                        bio: { title: "生物学项目" },
                        spm: { title: "Sweet Potato Mod" },
                        ohos: { title: "OpenHarmony Hi3861" },
                        signal: { title: "微弱电信号的测量" }
                    },
                    life: {
                        gallery: "摄影与生活",
                        piano: "钢琴",
                        drawing: "绘画作品",
                        books: "书单"
                    },
                    footer: {
                        description: "Ray汐 / 清霁Ray / Rayawa<br>Everything is possible by code.",
                        projects: "项目",
                        life: "生活",
                        thanks: "致谢",
                        thanksLink: "查看致谢",
                        copy: "&copy; 2026 Ray Chen. All rights reserved."
                    }
                },
                'en': {
                    nav: {
                        home: "Home",
                        about: "About Me",
                        projects: "Projects",
                        gallery: "Photography",
                        contact: "Contact"
                    },
                    project: {
                        hmdb: { title: "HmDashboard" },
                        bio: { title: "Biology Projects" },
                        spm: { title: "Sweet Potato Mod" },
                        ohos: { title: "OpenHarmony Hi3861" },
                        signal: { title: "Measurement of Weak Electrical Signals" }
                    },
                    life: {
                        gallery: "Photo Gallery",
                        piano: "Piano",
                        drawing: "Artworks",
                        books: "Book List"
                    },
                    footer: {
                        description: "Ray汐 / 清霁Ray / Rayawa<br>Everything is possible by code.",
                        projects: "Projects",
                        life: "Life",
                        thanks: "Acknowledgements",
                        thanksLink: "View Acknowledgements",
                        copy: "&copy; 2026 Ray Chen. All rights reserved."
                    }
                },
                'fr': {
                    nav: {
                        home: "Accueil",
                        about: "À propos de moi",
                        projects: "Projets",
                        gallery: "Photographie",
                        contact: "Contact"
                    },
                    project: {
                        hmdb: { title: "HmDashboard" },
                        bio: { title: "Projets de biologie" },
                        spm: { title: "Sweet Potato Mod" },
                        ohos: { title: "OpenHarmony Hi3861" },
                        signal: { title: "Mesure de Signaux Électriques Faibles" }
                    },
                    life: {
                        gallery: "Galerie photo",
                        piano: "Piano",
                        drawing: "Œuvres",
                        books: "Liste de livres"
                    },
                    footer: {
                        description: "Ray汐 / 清霁Ray / Rayawa<br>Everything is possible by code.",
                        projects: "Projets",
                        life: "Vie",
                        thanks: "Remerciements",
                        thanksLink: "Voir les remerciements",
                        copy: "&copy; 2026 Ray Chen. Tous droits réservés."
                    }
                }
            };

            return footerI18n;
        }
    };
})();
