document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 通用移动端优化样式 - 修复背景卡顿和重叠问题
    let mobileStyle = document.createElement("style");
    mobileStyle.innerHTML = `
        /* 修复背景滚动卡顿问题 - 使用优化后的背景设置 */
        html {    
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
            -webkit-overflow-scrolling: touch;
            background-attachment: scroll; /* 移动端改为scroll避免卡顿 */
        }
        
        /* 防止背景图片在移动端重复加载导致的闪烁 */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center;
            background-size: cover;
            z-index: -1;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }
        
        body {
            -webkit-overflow-scrolling: touch;
            overflow-x: hidden;
            position: relative;
        }

        /* 移动端响应式设计 */
        @media (max-width: 768px) {
            /* 修复标题和按钮重叠问题 */
            #header {
                height: auto !important;
                min-height: 180px;
                padding: 60px 0 20px 0 !important;
                position: relative;
            }

            #header h1 {
                position: relative !important;
                left: unset !important;
                transform: none !important;
                width: 100% !important;
                padding: 0 15px;
                box-sizing: border-box;
                text-align: center;
            }

            .avatar {
                width: 100px !important;
                height: 100px !important;
            }

            #header h1 a {
                margin-top: 15px !important;
                font-size: 1.4rem;
                text-align: center;
                display: block;
                word-break: break-word;
            }

            /* 调整右上角导航按钮位置 */
            .header-nav {
                position: fixed !important;
                top: 15px;
                right: 15px;
                z-index: 1000;
            }

            .header-nav .btn {
                padding: 8px 12px;
                font-size: 0.8rem;
                background: rgba(255, 255, 255, 0.9) !important;
                backdrop-filter: blur(10px);
                border-radius: 20px;
            }

            /* 调整主体布局 */
            body {
                margin: 10px auto !important;
                border-radius: 8px !important;
                max-width: 95% !important;
                min-width: unset !important;
            }

            /* 文章列表调整 */
            .SideNav {
                margin: 10px 0;
                padding: 8px;
            }

            .SideNav-item {
                padding: 12px 8px;
                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {
            /* 超小屏幕进一步优化 */
            #header {
                min-height: 160px;
                padding: 50px 0 15px 0 !important;
            }

            .avatar {
                width: 80px !important;
                height: 80px !important;
            }

            #header h1 a {
                font-size: 1.2rem;
                margin-top: 10px !important;
            }

            body {
                margin: 8px auto !important;
                max-width: 92% !important;
                font-size: 14px !important;
            }

            /* 文章内容调整 */
            .markdown-body {
                padding: 0 8px;
            }

            .markdown-body h1 {
                font-size: 1.1rem !important;
                margin-top: 1.2rem !important;
            }

            .header-nav .btn {
                padding: 6px 10px;
                font-size: 0.75rem;
            }
        }
    `;
    document.head.appendChild(mobileStyle);

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
        }

        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .avatar {
            width: 200px;
            height: 200px;
        }

        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
        }

        /* 主体布局 */
        body {
            min-width: 200px;
            max-width: 885px;
            margin: 30px auto;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: rgba(237, 239, 233, 0.84); 
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            overflow: auto;
        }

        /* 主页博客列表圆角边框 */
        .SideNav {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            min-width: unset;
        }

        /* 鼠标放到博客标题后会高亮 */
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.04);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }

        .SideNav-item {
            transition: 0.1s;
        }

        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }

        /* 赞助商信息样式 */
        .sponsor-info {
            text-align: center;
            margin-top: 20px;
            font-size: small;
            color: #666;
        }

        /* 移动端分页调整 */
        @media (max-width: 768px) {
            .pagination {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .pagination a, .pagination span {
                margin: 2px;
                padding: 6px 10px;
                font-size: 0.9rem;
            }
            
            /* 移动端悬停效果调整 */
            .SideNav-item:hover {
                transform: scale(1.02);
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
            footer.insertBefore(sponsorInfo, footer.firstChild);
        }
    }

    //文章页主题------------------------------------------------------------------------------
    
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `
        /* 主体布局 */
        body {
            min-width: 200px;
            max-width: 885px;
            margin: 30px auto;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: rgba(237, 239, 233, 0.84); 
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            overflow: auto;
        }

        /* markdown内容 */
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
            padding: 15px;
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

        /* 移动端文章页调整 */
        @media (max-width: 768px) {
            .markdown-body h1 {
                font-size: 1.1rem;
                display: block;
                text-align: center;
            }
            
            .markdown-body .highlight pre, .markdown-body pre {
                padding: 10px;
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
            footer.insertBefore(sponsorInfo, footer.firstChild);
        }
    } 

    // 搜索页主题--------------------------------------------------------------------
    
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主体布局 */
        body {
            min-width: 200px;
            max-width: 885px;
            margin: 30px auto;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: rgba(237, 239, 233, 0.84); 
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            overflow: auto;
        }
        
        .SideNav {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .SideNav-item {
            transition: 0.1s;
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

        /* 移动端搜索页调整 */
        @media (max-width: 768px) {
            .subnav-search {
                width: 100% !important;
                margin: 10px 0;
            }
            
            .subnav-search-input {
                width: 100% !important;
                font-size: 0.9rem;
            }
            
            .SideNav-item:hover {
                transform: scale(1.01);
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
            footer.insertBefore(sponsorInfo, footer.firstChild);
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
