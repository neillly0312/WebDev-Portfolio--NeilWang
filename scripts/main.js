
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

    // switch
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



(function() {
    // music
    const musicUrl = 'music/1.mp3';
    let audio = null;
    let isMuted = true;  // off
    
    // music
    function createAudio() {
        if (audio) return audio;
        audio = new Audio();
        audio.src = musicUrl;
        audio.loop = true;
        audio.volume = 0.5;
        audio.muted = true;  // off
        return audio;
    }
    
    // off
    function toggleMute() {
        if (!audio) createAudio();
        
        isMuted = !isMuted;
        audio.muted = isMuted;
        
        const muteBtn = document.getElementById('muteBtn');
        if (muteBtn) {
            muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
            muteBtn.style.background = isMuted ? '' : '#2ecc71';
        }
        
        // on
        if (!isMuted && audio.paused) {
            audio.play().catch(e => console.log('on'));
        }
    }
    
    // button
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
    
    //finish
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMuteButton);
    } else {
        createMuteButton();
    }
    
    window.toggleMute = toggleMute;
})();