document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 移动端优化样式 - 保留之前的修改
    let mobileStyle = document.createElement("style");
    mobileStyle.innerHTML = `
        /* 修复背景滚动问题 - 使用优化方案 */
        html {    
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center;
            background-size: cover;
            background-attachment: fixed;
            height: 100%;
        }
        
        /* 创建固定背景层防止滚动问题 */
        .fixed-background-layer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center;
            background-size: cover;
            z-index: -1;
            pointer-events: none;
        }

        /* 移动端响应式设计 - 保留之前的适配 */
        @media (max-width: 768px) {
            /* 修复标题和按钮重叠问题 */
            #header {
                height: auto !important;
                min-height: 200px;
                padding: 20px 0;
                position: relative;
            }

            #header h1 {
                position: relative !important;
                left: unset !important;
                transform: none !important;
                width: 100%;
                padding: 0 15px;
                box-sizing: border-box;
            }

            .avatar {
                width: 120px !important;
                height: 120px !important;
            }

            #header h1 a {
                margin-top: 15px !important;
                font-size: 1.5rem;
                text-align: center;
                display: block;
            }

            /* 调整主体布局 */
            body {
                margin: 15px auto !important;
                border-radius: 8px !important;
                max-width: 95% !important;
            }

            /* 导航按钮调整 */
            .header-nav {
                position: absolute !important;
                top: 15px;
                right: 15px;
                z-index: 1000;
            }

            .header-nav .btn {
                padding: 6px 12px;
                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {
            /* 超小屏幕进一步优化 */
            #header {
                min-height: 180px;
            }

            .avatar {
                width: 100px !important;
                height: 100px !important;
            }

            #header h1 a {
                font-size: 1.3rem;
                margin-top: 10px !important;
            }

            body {
                margin: 10px auto !important;
                max-width: 92% !important;
            }
        }
    `;
    document.head.appendChild(mobileStyle);

    // 添加固定背景层
    let fixedBg = document.createElement('div');
    fixedBg.className = 'fixed-background-layer';
    document.body.appendChild(fixedBg);

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
        `;
        document.head.appendChild(style);

        // 添加赞助商信息到页脚
        let footer = document.getElementById('footer');
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
        footer.insertBefore(sponsorInfo, footer.firstChild);
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
            padding-top: 20px; 
            border-radius: 8px;
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
        `;
        document.head.appendChild(style);
        
        // 添加赞助商信息到页脚
        let footer = document.getElementById('footer');
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
        footer.insertBefore(sponsorInfo, footer.firstChild);
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
        `;
        document.head.appendChild(style);
        
        // 添加赞助商信息到页脚
        let footer = document.getElementById('footer');
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
        footer.insertBefore(sponsorInfo, footer.firstChild);
    
        // 搜索框回车触发
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });
    }
});
