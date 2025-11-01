document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 主页优化 - 只修改头像大小和基础圆角
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页头像优化');
        let style = document.createElement("style");
        style.innerHTML = `
            /* 只增大头像，不改变其他任何布局 */
            .avatar {
                width: 220px; /* 从200px增加到220px */
                height: 220px;
            }

            /* 保留基础圆角优化 */
            .SideNav {
                border-radius: 8px;
            }

            .SideNav-item {
                border-radius: 6px;
                transition: all 0.2s ease;
            }

            .SideNav-item:hover {
                border-radius: 6px;
                transform: translateY(-1px);
            }

            /* 移动端头像适配 */
            @media (max-width: 768px) {
                .avatar {
                    width: 180px;
                    height: 180px;
                }
            }

            @media (max-width: 480px) {
                .avatar {
                    width: 150px;
                    height: 150px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 其他页面只保留基础圆角
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('应用文章页基础优化');
        
        let style = document.createElement("style");
        style.innerHTML = `
            /* 只保留基础圆角 */
            .markdown-body img {
                border-radius: 6px;
            }
            
            .markdown-alert {
                border-radius: 6px;
            }
            
            .markdown-body .highlight pre, 
            .markdown-body pre {
                border-radius: 6px;
            }
        `;
        document.head.appendChild(style);
    }

    // 搜索页只保留基础圆角
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页基础优化');
        
        let style = document.createElement("style");
        style.innerHTML = `
            /* 只保留基础圆角 */
            .SideNav {
                border-radius: 8px;
            }
            
            .SideNav-item {
                border-radius: 6px;
                transition: all 0.2s ease;
            }
            
            .SideNav-item:hover {
                border-radius: 6px;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(style);
    }
});
