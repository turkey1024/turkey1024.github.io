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

            /* 笑话卡片样式 */
            .joke-card {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 12px;
                padding: 15px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                z-index: 1000;
                min-width: 200px;
                max-width: 280px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .joke-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
            }

            .joke-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                padding-bottom: 8px;
            }

            .joke-title {
                font-size: 0.9rem;
                font-weight: 600;
                color: #333;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .joke-title::before {
                content: "😂";
                font-size: 1rem;
            }

            .joke-refresh {
                background: none;
                border: none;
                font-size: 1rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.2s ease;
            }

            .joke-refresh:hover {
                background: rgba(0, 0, 0, 0.05);
            }

            .joke-content {
                font-size: 0.85rem;
                line-height: 1.4;
                color: #444;
                margin-bottom: 10px;
                min-height: 40px;
            }

            .joke-setup {
                font-weight: 500;
                margin-bottom: 5px;
            }

            .joke-punchline {
                color: #e74c3c;
                font-weight: 600;
            }

            .joke-loading {
                text-align: center;
                color: #666;
                font-size: 0.8rem;
                padding: 10px 0;
            }

            .joke-error {
                text-align: center;
                color: #e74c3c;
                font-size: 0.8rem;
                padding: 10px 0;
            }

            .joke-category {
                display: inline-block;
                background: #3498db;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
                margin-top: 5px;
            }

            /* 移动端笑话卡片适配 */
            @media (max-width: 768px) {
                .avatar {
                    width: 180px;
                    height: 180px;
                }

                .joke-card {
                    top: 15px;
                    right: 15px;
                    min-width: 180px;
                    max-width: 240px;
                    padding: 12px;
                }
            }

            @media (max-width: 480px) {
                .avatar {
                    width: 150px;
                    height: 150px;
                }

                .joke-card {
                    top: 10px;
                    right: 10px;
                    min-width: 160px;
                    max-width: 200px;
                    padding: 10px;
                }

                .joke-content {
                    font-size: 0.8rem;
                }
            }
        `;
        document.head.appendChild(style);

        // 添加笑话卡片到页面
        addJokeCard();
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

    // 笑话卡片功能
    function addJokeCard() {
        const jokeCard = document.createElement('div');
        jokeCard.className = 'joke-card';
        jokeCard.innerHTML = `
            <div class="joke-header">
                <div class="joke-title">每日一笑</div>
                <button class="joke-refresh" title="换一个笑话">🔄</button>
            </div>
            <div class="joke-loading">加载笑话中...</div>
        `;
        
        document.body.appendChild(jokeCard);
        
        // 获取笑话数据
        getJokeData();
        
        // 点击刷新按钮获取新笑话
        const refreshBtn = jokeCard.querySelector('.joke-refresh');
        refreshBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            getJokeData();
        });
        
        // 点击卡片也可以刷新笑话
        jokeCard.addEventListener('click', function() {
            getJokeData();
        });
    }

    async function getJokeData() {
        const jokeCard = document.querySelector('.joke-card');
        const contentArea = jokeCard.querySelector('.joke-content') || jokeCard.querySelector('.joke-loading') || jokeCard.querySelector('.joke-error');
        
        // 显示加载状态
        contentArea.innerHTML = '加载笑话中...';
        contentArea.className = 'joke-loading';
        
        try {
            // 使用免费笑话API - 不需要API密钥
            // 这里使用JokeAPI，支持多种类型的笑话
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=twopart&safe-mode');
            
            if (!response.ok) {
                throw new Error('笑话数据获取失败');
            }
            
            const jokeData = await response.json();
            updateJokeCard(jokeData);
            
        } catch (error) {
            console.error('获取笑话失败:', error);
            showJokeError();
        }
    }

    function updateJokeCard(data) {
        const jokeCard = document.querySelector('.joke-card');
        
        let jokeHTML = '';
        
        if (data.type === 'twopart') {
            // 两部分笑话（setup + delivery）
            jokeHTML = `
                <div class="joke-setup">${data.setup}</div>
                <div class="joke-punchline">${data.delivery}</div>
            `;
        } else if (data.type === 'single') {
            // 单行笑话
            jokeHTML = `<div class="joke-content">${data.joke}</div>`;
        }
        
        // 添加分类标签
        if (data.category) {
            jokeHTML += `<div class="joke-category">${data.category}</div>`;
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'joke-content';
        contentDiv.innerHTML = jokeHTML;
        
        // 替换内容区域
        const oldContent = jokeCard.querySelector('.joke-content, .joke-loading, .joke-error');
        if (oldContent) {
            jokeCard.replaceChild(contentDiv, oldContent);
        } else {
            jokeCard.appendChild(contentDiv);
        }
    }

    function showJokeError() {
        const jokeCard = document.querySelector('.joke-card');
        const contentDiv = document.createElement('div');
        contentDiv.className = 'joke-error';
        contentDiv.textContent = '暂时无法获取笑话，点击重试';
        
        // 替换内容区域
        const oldContent = jokeCard.querySelector('.joke-content, .joke-loading, .joke-error');
        if (oldContent) {
            jokeCard.replaceChild(contentDiv, oldContent);
        } else {
            jokeCard.appendChild(contentDiv);
        }
    }
});
