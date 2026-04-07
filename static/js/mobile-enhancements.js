// 移动端增强脚本
(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        
        // 1. 添加触摸反馈效果
        const touchElements = document.querySelectorAll('.quick-link, .lang-btn, .project-card, .simple-link, .link-card');
        
        touchElements.forEach(element => {
            // 添加触摸开始效果
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            // 添加触摸结束效果
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
            
            // 防止触摸时滚动
            element.addEventListener('touchmove', function(e) {
                e.preventDefault();
            });
        });
        
        // 2. 检测设备类型
        function detectDevice() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
            
            if (isMobile) {
                document.body.classList.add('is-mobile');
                if (isTablet) {
                    document.body.classList.add('is-tablet');
                } else {
                    document.body.classList.add('is-phone');
                }
            }
        }
        
        detectDevice();
        
        // 3. 优化画廊触摸交互
        const galleryBoxes = document.querySelectorAll('.home-gallery-box');
        
        galleryBoxes.forEach(box => {
            let touchStartY = 0;
            let touchEndY = 0;
            
            box.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
            });
            
            box.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                
                // 如果垂直滑动距离较大，阻止默认行为（避免页面滚动）
                if (Math.abs(touchEndY - touchStartY) > 10) {
                    e.preventDefault();
                }
            });
        });
        
        // 4. 优化输入框在iOS上的显示
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            // 防止iOS缩放表单元素
            document.addEventListener('touchstart', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                    document.body.style.zoom = '100%';
                }
            });
        }
        
        // 5. 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 6. 添加加载状态指示器
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.body.classList.add('loaded');
            }, 100);
        });
        
        // 7. 检测横竖屏变化
        function handleOrientationChange() {
            if (window.matchMedia("(orientation: portrait)").matches) {
                document.body.classList.add('portrait');
                document.body.classList.remove('landscape');
            } else {
                document.body.classList.add('landscape');
                document.body.classList.remove('portrait');
            }
        }
        
        // 初始检测
        handleOrientationChange();
        
        // 监听变化
        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        console.log('移动端增强脚本已加载');
    });
})();