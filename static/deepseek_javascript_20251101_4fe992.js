document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 通用样式 - 彻底解决背景问题并移除卡片效果
    let globalStyle = document.createElement("style");
    globalStyle.innerHTML = `
        /* 彻底解决背景问题 - 使用静态背景 */
        html {
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center;
            background-size: cover;
            background-attachment: fixed;
            min-height: 100vh;
        }
        
        /* 创建背景容器防止滚动问题 */
        .background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center;
            background-size: cover;
            z-index: -2;
            pointer-events: none;
        }
        
        /* 移除卡片效果 - 让内容铺满屏幕 */
        body {
            margin: 0 !important;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            overflow-x: hidden;
            min-width: 100%;
            max-width: 100%;
        }
        
        /* 主要内容区域铺满 */
        .container, main, .main-content {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 0;
        }
        
        /* 移动端通用优化 */
        @media (max-width: 768px) {
            body {
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(globalStyle);

    // 添加背景容器
    let bgContainer = document.createElement('div');
    bgContainer.className = 'background-container';
    document.body.appendChild(bgContainer);

    //主页主题------------------------------------------------------------------------------
    
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        .blogTitle {
            display: unset;
        }

        #header {
            height: 300px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 30px;
        }

        .avatar {
            width: 200px;
            height: 200px;
        }

        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
            color: #333;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        /* 主页博客列表 - 铺满宽度 */
        .SideNav {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 0;
            min-width: unset;
            width: 100%;
            margin: 0;
            padding: 20px 0;
        }

        /* 鼠标放到博客标题后会高亮 */
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.8);
            border-radius: 8px;
            transform: scale(1.02);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .SideNav-item {
            transition: 0.1s;
            margin: 0 20px;
            border-radius: 8px;
        }

        /* 分页条 */
        .pagination {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            margin: 0;
        }

        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }

        /* 赞助商信息样式 */
        .sponsor-info {
            text-align: center;
            margin-top: 20px;
            font-size: small;
            color: #666;
            background: rgba(255, 255, 255, 0.9);
            padding: 15px;
            width: 100%;
        }

        /* 移动端主页优化 */
        @media (max-width: 768px) {
            #header {
                height: 200px;
            }

            .avatar {
                width: 120px !important;
                height: 120px !important;
            }

            #header h1 a {
                font-size: 1.4rem;
                margin-top: 15px !important;
            }

            .SideNav-item {
                margin: 0 10px;
                padding: 12px 8px;
            }

            .header-nav {
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 1000;
            }

            .header-nav .btn {
                background: rgba(255, 255, 255, 0.9) !important;
                backdrop-filter: blur(10px);
            }
        }
        `;
        document.head.appendChild(style);

        // 添加赞助商信息到页脚
        let footer = document.getElementById('footer');
        if (footer) {
            let sponsorInfo = document.createElement('div');
            sponsorInfo.className = 'sponsor-info';
            sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
            footer.appendChild(sponsorInfo);
        }
    }

    //文章页主题------------------------------------------------------------------------------
    
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `
        /* 文章页头部 */
        #header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding: 20px 0;
        }

        /* 文章内容区域 */
        .markdown-body {
            background: rgba(255, 255, 255, 0.95);
            margin: 0;
            padding: 40px;
            min-height: calc(100vh - 200px);
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        /* 图片圆角 */
        .markdown-body img {
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.78);
            max-width: 100%;
            height: auto;
        }
        
        /* notice、caution、warning等提示信息的圆角 */
        .markdown-alert {
            border-radius: 8px;
        }
        
        /* 代码块 */
        .markdown-body .highlight pre, .markdown-body pre {
            color: rgb(0, 0, 0);
            background-color: rgba(243, 244, 243, 0.967);
            box-shadow: 0 10px 30px 0 rgba(222, 217, 217, 0.4);
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
        }

        /* 行内代码 */
        .markdown-body code, .markdown-body tt {
            background-color: #c9daf8;
        }
        
        /* 标题橙色包裹 */
        .markdown-body h1{
            display: inline-block;
            font-size: 1.3rem;
            font-weight: bold;
            background: rgb(239, 112, 96);
            color: #ffffff;
            padding: 3px 10px 1px;
            border-top-right-radius: 8px;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            margin-right: 2px;
            margin-top: 1.8rem; 
        }

        /* 移动端文章页优化 */
        @media (max-width: 768px) {
            .markdown-body {
                padding: 20px 15px;
            }
            
            .markdown-body h1 {
                font-size: 1.1rem;
                display: block;
                text-align: center;
            }
            
            .markdown-body .highlight pre, .markdown-body pre {
                padding: 15px;
                font-size: 0.9rem;
            }
        }
        `;
        document.head.appendChild(style);
        
        // 添加赞助商信息到页脚
        let footer = document.getElementById('footer');
        if (footer) {
            let sponsorInfo = document.createElement('div');
            sponsorInfo.className = 'sponsor-info';
            sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
            sponsorInfo.style.background = 'rgba(255, 255, 255, 0.9)';
            sponsorInfo.style.padding = '15px';
            sponsorInfo.style.textAlign = 'center';
            sponsorInfo.style.width = '100%';
            footer.appendChild(sponsorInfo);
        }
    } 

    // 搜索页主题--------------------------------------------------------------------
    
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 搜索页头部 */
        #header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding: 20px 0;
        }
        
        /* 搜索内容区域 */
        .SideNav {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 0;
            min-width: unset;
            width: 100%;
            margin: 0;
            padding: 20px 0;
            min-height: calc(100vh - 200px);
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.8);
            border-radius: 8px;
            transform: scale(1.01);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .SideNav-item {
            transition: 0.1s;
            margin: 0 20px;
            border-radius: 8px;
        }
        
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: unset; 
            height: 36px;
        }

        /* 移动端搜索页优化 */
        @media (max-width: 768px) {
            .SideNav {
                padding: 15px 0;
            }
            
            .SideNav-item {
                margin: 0 10px;
                padding: 12px 8px;
            }
            
            .subnav-search {
                width: 100% !important;
                margin: 10px 0;
            }
            
            .subnav-search-input {
                width: 100% !important;
                font-size: 0.9rem;
            }
            
            .header-nav {
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 1000;
            }

            .header-nav .btn {
                background: rgba(255, 255, 255, 0.9) !important;
                backdrop-filter: blur(10px);
            }
        }
        `;
        document.head.appendChild(style);
        
        // 添加赞助商信息到页脚
        let footer = document.getElementById('footer');
        if (footer) {
            let sponsorInfo = document.createElement('div');
            sponsorInfo.className = 'sponsor-info';
            sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
            sponsorInfo.style.background = 'rgba(255, 255, 255, 0.9)';
            sponsorInfo.style.padding = '15px';
            sponsorInfo.style.textAlign = 'center';
            sponsorInfo.style.width = '100%';
            footer.appendChild(sponsorInfo);
        }
    
        // 搜索框回车触发
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        if (input && button) {
            input.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    button.click();
                }
            });
        }
    }
});