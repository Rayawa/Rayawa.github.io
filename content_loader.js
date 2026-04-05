// i18n.js
async function initLocalization() {
    // 1. 获取本地 JSON 资源
    const response = await fetch('./data/strings.json');
    const strings = await response.json();

    // 2. 找到所有需要填充文本的元素
    const elements = document.querySelectorAll('[data-string]');

    elements.forEach(el => {
        const path = el.getAttribute('data-string'); // 例如 "step1.title"
        const keys = path.split('.'); // 分割成 ["step1", "title"]
        
        // 3. 根据路径从 JSON 对象中提取文本
        let text = strings;
        keys.forEach(key => {
            text = text[key];
        });

        if (text) {
            el.innerText = text;
        }
    });
}

// 页面加载完成后执行
window.onload = initLocalization;