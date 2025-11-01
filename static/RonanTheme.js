document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 动态渐变背景系统
    let gradientStyle = document.createElement("style");
    gradientStyle.innerHTML = `
        /* 全屏渐变背景 */
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        /* 动态渐变背景容器 */
        .gradient-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            transition: background 2s ease-in-out;
        }
        
        /* 内容区域 - 铺满屏幕 */
        body {
            background: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            margin: 0 !important;
            max-width: 100% !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
        }
        
        /* 头部样式 - 半透明毛玻璃效果 */
        #header {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding: 20px 0;
            width: 100%;
        }
        
        #header h1 {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin: 0;
        }
        
        .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        #header h1 a {
            margin-top: 15px;
            font-family: 'Segoe UI', sans-serif;
            font-weight: 300;
            font-size: 1.8rem;
            color: #fff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            text-decoration: none;
        }
        
        /* 主要内容区域 */
        .main-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border-radius: 0;
            margin: 0;
            padding: 30px;
            min-height: calc(100vh - 200px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* 文章列表样式 */
        .SideNav {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin: 20px 0;
        }
        
        .SideNav-item {
            background: rgba(255, 255, 255, 0.05);
            margin: 8px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
            color: #fff;
        }
        
        .SideNav-item:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .SideNav-item a {
            color: #fff !important;
            text-decoration: none;
        }
        
        /* 文章内容样式 */
        .markdown-body {
            background: transparent;
            color: #fff;
        }
        
        .markdown-body h1, 
        .markdown-body h2, 
        .markdown-body h3 {
            color: #fff;
        }
        
        .markdown-body code {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }
        
        .markdown-body pre {
            background: rgba(0, 0, 0, 0.3) !important;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* 页脚样式 */
        #footer {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            padding: 20px;
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sponsor-info {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .sponsor-info a {
            color: rgba(255, 255, 255, 0.9);
        }
        
        /* 移动端优化 */
        @media (max-width: 768px) {
            #header {
                padding: 15px 0;
            }
            
            .avatar {
                width: 80px;
                height: 80px;
            }
            
            #header h1 a {
                font-size: 1.4rem;
                margin-top: 10px;
            }
            
            .main-content {
                padding: 20px 15px;
            }
            
            .SideNav {
                margin: 15px 0;
            }
            
            .SideNav-item {
                margin: 6px;
                padding: 12px 10px;
            }
            
            /* 移动端导航按钮优化 */
            .header-nav {
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 1000;
            }
            
            .header-nav .btn {
                background: rgba(255, 255, 255, 0.2) !important;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
            }
        }
        
        @media (max-width: 480px) {
            .avatar {
                width: 70px;
                height: 70px;
            }
            
            #header h1 a {
                font-size: 1.2rem;
            }
            
            .main-content {
                padding: 15px 10px;
            }
        }
    `;
    document.head.appendChild(gradientStyle);

    // 创建动态渐变背景
    let gradientBg = document.createElement('div');
    gradientBg.className = 'gradient-bg';
    document.body.appendChild(gradientBg);

    // 动态渐变背景函数
    function updateGradient() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // 基于时间创建不同的渐变
        let gradient;
        
        if (hours >= 6 && hours < 12) {
            // 早晨 - 温暖色调
            const progress = (hours - 6 + minutes/60) / 6;
            gradient = `linear-gradient(135deg, 
                hsl(${30 + progress * 10}, 100%, 65%), 
                hsl(${200 + progress * 20}, 80%, 55%),
                hsl(${280 + progress * 10}, 70%, 45%))`;
        } else if (hours >= 12 && hours < 18) {
            // 下午 - 明亮色调
            const progress = (hours - 12 + minutes/60) / 6;
            gradient = `linear-gradient(135deg, 
                hsl(${40 + progress * 15}, 95%, 60%), 
                hsl(${180 + progress * 10}, 85%, 50%),
                hsl(${300 + progress * 15}, 75%, 40%))`;
        } else if (hours >= 18 && hours < 22) {
            // 傍晚 - 日落色调
            const progress = (hours - 18 + minutes/60) / 4;
            gradient = `linear-gradient(135deg, 
                hsl(${20 + progress * 5}, 100%, 55%), 
                hsl(${350 - progress * 10}, 90%, 45%),
                hsl(${280 - progress * 5}, 80%, 35%))`;
        } else {
            // 夜晚 - 深色色调
            const progress = ((hours >= 22 ? hours - 22 : hours + 2) + minutes/60) / 8;
            gradient = `linear-gradient(135deg, 
                hsl(${240 + progress * 10}, 70%, 20%), 
                hsl(${280 + progress * 15}, 60%, 15%),
                hsl(${320 + progress * 10}, 50%, 10%))`;
        }
        
        gradientBg.style.background = gradient;
    }

    // 初始更新并设置定时器
    updateGradient();
    setInterval(updateGradient, 60000); // 每分钟更新一次

    // 页面特定样式
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页主题');
        // 主页不需要额外样式，使用通用样式
    }

    //文章页主题
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');
        
        let articleStyle = document.createElement("style");
        articleStyle.innerHTML = `
            /* 文章页特定样式 */
            .markdown-body img {
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 100%;
                height: auto;
            }
            
            .markdown-alert {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 15px;
                margin: 15px 0;
            }
            
            .markdown-body h1 {
                display: inline-block;
                font-size: 1.4rem;
                font-weight: bold;
                background: linear-gradient(135deg, #ff6b6b, #ffa726);
                color: #fff;
                padding: 8px 15px;
                border-radius: 8px;
                margin: 2rem 0 1rem 0;
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            }
            
            .markdown-body h2 {
                color: #fff;
                border-bottom: 2px solid rgba(255, 255, 255, 0.2);
                padding-bottom: 5px;
                margin: 1.8rem 0 1rem 0;
            }
            
            .markdown-body blockquote {
                border-left: 4px solid rgba(255, 255, 255, 0.3);
                background: rgba(255, 255, 255, 0.05);
                padding: 10px 15px;
                border-radius: 0 8px 8px 0;
                margin: 15px 0;
            }
        `;
        document.head.appendChild(articleStyle);
    }

    // 搜索页主题
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        
        let searchStyle = document.createElement("style");
        searchStyle.innerHTML = `
            .subnav-search-input {
                background: rgba(255, 255, 255, 0.1) !important;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 25px !important;
                color: #fff !important;
                padding: 10px 20px;
            }
            
            .subnav-search-input::placeholder {
                color: rgba(255, 255, 255, 0.6) !important;
            }
            
            .subnav-search-icon {
                color: rgba(255, 255, 255, 0.7) !important;
            }
            
            button.btn.float-left {
                display: none;
            }
            
            .subnav-search {
                background: transparent !important;
                border: none !important;
            }
        `;
        document.head.appendChild(searchStyle);
        
        // 搜索框回车触发
        let input = document.querySelector(".form-control.subnav-search-input.float-left");
        let button = document.querySelector(".btn.float-left");
        if (input && button) {
            input.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    button.click();
                }
            });
        }
    }

    // 添加赞助商信息到页脚
    let footer = document.getElementById('footer');
    if (footer) {
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="filter: brightness(0) invert(1);"></a> 提供 CDN 加速/云存储服务';
        footer.appendChild(sponsorInfo);
    }
});
