document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    // 主页优化 - 只修改头像大小和基础圆角
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页头像优化');
        let style = document.createElement("style");
        style.innerHTML = `
            /* 只增大头像，不改变其他任何布局 */
            .avatar {
                width: 150px; /* 从200px增加到220px */
                height: 150px;
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

            /* 简洁笑话样式 - 无框小字 */
            .joke-text {
                position: fixed;
                top: 25px;
                right: 25px;
                z-index: 1000;
                max-width: 200px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                font-size: 0.75rem;
                line-height: 1.3;
                color: #666;
                text-align: right;
                cursor: pointer;
                transition: all 0.2s ease;
                background: none;
                border: none;
                padding: 0;
                margin: 0;
            }

            .joke-text:hover {
                color: #333;
                transform: translateY(-1px);
            }

            .joke-setup {
                margin-bottom: 2px;
            }

            .joke-punchline {
                font-weight: 500;
                color: #e74c3c;
            }

            .joke-loading {
                color: #999;
                font-style: italic;
            }

            .joke-error {
                color: #999;
                font-style: italic;
            }

            /* 移动端适配 */
            @media (max-width: 768px) {
                .avatar {
                    width: 140px;
                    height: 140px;
                }

                .joke-text {
                    top: 20px;
                    right: 20px;
                    max-width: 150px;
                    font-size: 0.7rem;
                }
            }

            @media (max-width: 480px) {
                .avatar {
                    width: 150px;
                    height: 150px;
                }

                .joke-text {
                    top: 15px;
                    right: 15px;
                    max-width: 130px;
                    font-size: 0.65rem;
                }
            }
        `;
        document.head.appendChild(style);

        // 添加笑话到页面
        addJokeText();
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

    // 简洁笑话功能
    function addJokeText() {
        const jokeText = document.createElement('div');
        jokeText.className = 'joke-text';
        jokeText.innerHTML = '<div class="joke-loading">加载中...</div>';
        
        document.body.appendChild(jokeText);
        
        // 获取笑话数据
        getJokeData();
        
        // 点击获取新笑话
        jokeText.addEventListener('click', function() {
            getJokeData();
        });
    }

    async function getJokeData() {
        const jokeText = document.querySelector('.joke-text');
        
        // 显示加载状态
        jokeText.innerHTML = '<div class="joke-loading">加载中...</div>';
        
        try {
            // 使用免费笑话API
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=twopart&safe-mode');
            
            if (!response.ok) {
                throw new Error('笑话数据获取失败');
            }
            
            const jokeData = await response.json();
            updateJokeText(jokeData);
            
        } catch (error) {
            console.error('获取笑话失败:', error);
            showJokeError();
        }
    }

    function updateJokeText(data) {
        const jokeText = document.querySelector('.joke-text');
        
        let jokeHTML = '';
        
        if (data.type === 'twopart') {
            // 两部分笑话
            jokeHTML = `
                <div class="joke-setup">${data.setup}</div>
                <div class="joke-punchline">${data.delivery}</div>
            `;
        } else if (data.type === 'single') {
            // 单行笑话
            jokeHTML = `<div>${data.joke}</div>`;
        }
        
        jokeText.innerHTML = jokeHTML;
    }

    function showJokeError() {
        const jokeText = document.querySelector('.joke-text');
        jokeText.innerHTML = '<div class="joke-error">点击刷新笑话</div>';
    }
});
