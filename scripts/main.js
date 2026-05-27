
(function() {
    
    function addThemeToggleButton() {
        
        if (document.getElementById('themeToggle')) return;
        
        const themeBtn = document.createElement('button');
        themeBtn.id = 'themeToggle';
        themeBtn.className = 'theme-toggle';
        themeBtn.setAttribute('aria-label', 'Switch between light and dark themes');
        themeBtn.innerHTML = '🌙';
        themeBtn.onclick = toggleTheme;
        document.body.appendChild(themeBtn);
    }

    // 切换主题函数
    function toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            if (themeBtn) themeBtn.innerHTML = '🌙';
            console.log('light theme');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            if (themeBtn) themeBtn.innerHTML = '☀️';
            console.log('dark theme');
        }
    }

    // 加载保存的主题
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeBtn = document.getElementById('themeToggle');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeBtn) themeBtn.innerHTML = '☀️';
        } else {
            // 默认亮色模式，但确保没有暗色类
            document.body.classList.remove('dark-theme');
            if (themeBtn) themeBtn.innerHTML = '🌙';
        }
    }

    // 导出全局函数供HTML调用
    window.toggleTheme = toggleTheme;
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        addThemeToggleButton();
        loadTheme();
    });
})();


// ===== 页面加载时的额外初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    // 为作品集卡片添加点击提示（如果有模态窗）
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'click to detail');
    });
    
    // 控制台输出，确认JS加载成功
    console.log('main.js success');
});