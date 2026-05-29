
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

// scripts/main.js - 在文件末尾添加简化版音乐播放器

// scripts/main.js - 简化版音乐播放器（静音按钮）

// ===== 静音按钮音乐播放器 =====
(function() {
    // 音乐配置
    const musicUrl = 'music/1.mp3';
    let audio = null;
    let isMuted = true;  // 默认静音
    
    // 创建音频元素
    function createAudio() {
        if (audio) return audio;
        audio = new Audio();
        audio.src = musicUrl;
        audio.loop = true;
        audio.volume = 0.5;
        audio.muted = true;  // 默认静音
        return audio;
    }
    
    // 切换静音
    function toggleMute() {
        if (!audio) createAudio();
        
        isMuted = !isMuted;
        audio.muted = isMuted;
        
        const muteBtn = document.getElementById('muteBtn');
        if (muteBtn) {
            muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
            muteBtn.style.background = isMuted ? '' : '#2ecc71';
        }
        
        // 首次播放尝试
        if (!isMuted && audio.paused) {
            audio.play().catch(e => console.log('点击按钮开始播放'));
        }
    }
    
    // 创建按钮
    function createMuteButton() {
        if (document.getElementById('muteBtn')) return;
        
        const btn = document.createElement('button');
        btn.id = 'muteBtn';
        btn.className = 'mute-btn';
        btn.innerHTML = '🔇';
        btn.title = 'sound off/on';
        btn.onclick = toggleMute;
        document.body.appendChild(btn);
        
        createAudio();
    }
    
    // 页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMuteButton);
    } else {
        createMuteButton();
    }
    
    window.toggleMute = toggleMute;
})();