document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 只修复背景问题，保持其他样式不变
    let backgroundFix = document.createElement("style");
    backgroundFix.innerHTML = `
        /* 修复背景滚动问题 - 保持原有卡片样式 */
        html {    
            background: url('https://free.picui.cn/free/2025/11/01/69059029a7667.jpg') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        /* 确保背景在移动端也不滚动 */
        body {
            background-attachment: fixed;
        }
        
        /* 防止背景闪烁 */
        .background-fixed {
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
    `;
    document.head.appendChild(backgroundFix);

    // 添加固定背景层
    let fixedBg = document.createElement('div');
    fixedBg.className = 'background-fixed';
    document.body.appendChild(fixedBg);

    // 保持原有的所有样式不变
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

        /* 主体布局 - 保持原有卡片样式 */
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

        let footer = document.getElementById('footer');
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
        footer.insertBefore(sponsorInfo, footer.firstChild);
    }

    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `
        /* 主体布局 - 保持原有卡片样式 */
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
        .markdown-body img {
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.78); 
        }
        
        .markdown-alert {
            border-radius: 8px;
        }
        
        .markdown-body .highlight pre, .markdown-body pre {
            color: rgb(0, 0, 0);
            background-color: rgba(243, 244, 243, 0.967);
            box-shadow: 0 10px 30px 0 rgba(222, 217, 217, 0.4);
            padding-top: 20px; 
            border-radius: 8px;
        }

        .markdown-body code, .markdown-body tt {
            background-color: #c9daf8;
        }
        
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
        
        let footer = document.getElementById('footer');
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
        footer.insertBefore(sponsorInfo, footer.firstChild);
    } 

    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主体布局 - 保持原有卡片样式 */
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
        
        let footer = document.getElementById('footer');
        let sponsorInfo = document.createElement('div');
        sponsorInfo.className = 'sponsor-info';
        sponsorInfo.innerHTML = '本站由 <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img src="https://gcore.jsdelivr.net/gh/YukiNoUta/cdn-static@main/blog/svg/upyun.svg" width="45" height="13" style="fill: currentColor;"></a> 提供 CDN 加速/云存储服务';
        footer.insertBefore(sponsorInfo, footer.firstChild);
    
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
