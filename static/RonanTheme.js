document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 主页优化 - 只修改头像和保留基础圆角
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页优化');
        let style = document.createElement("style");
        style.innerHTML = `
            /* 只修改头像大小和位置 */
            #header {
                height: 350px; /* 稍微增加头部高度容纳更大头像 */
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
                width: 220px; /* 增大头像 */
                height: 220px;
                border-radius: 50%; /* 保持圆形 */
                border: 3px solid rgba(255, 255, 255, 0.8);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            #header h1 a {
                margin-top: 25px;
                font-family: fantasy;
                margin-left: unset;
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
                #header {
                    height: 280px;
                }
                
                .avatar {
                    width: 180px;
                    height: 180px;
                }
            }

            @media (max-width: 480px) {
                #header {
                    height: 240px;
                }
                
                .avatar {
                    width: 150px;
                    height: 150px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 文章页只保留基础圆角
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
            
            .subnav-search-input {
                border-radius: 20px;
            }
        `;
        document.head.appendChild(style);
    }
});
