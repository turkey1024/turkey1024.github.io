// Gmeek独立主题插件 - 无需修改原有代码
(function() {
    'use strict';
    
    // 配置项 - 在这里修改您的个性化设置
    const config = {
        // 必填：替换为您的头像URL
        avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        // 必填：替换为您的背景图片URL
        backgroundUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        // 可选：头像大小
        avatarSize: '120px',
        // 可选：背景透明度 0-1
        backgroundOpacity: '0.8',
        // 可选：显示的用户名
        userName: '我的博客',
        // 可选：文章列表透明度 0-1
        contentOpacity: '0.7'
    };
    
    // 创建并注入CSS样式
    const style = document.createElement('style');
    style.textContent = `
        /* 背景图片设置 */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${config.backgroundUrl}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            z-index: -1;
            opacity: ${config.backgroundOpacity};
        }
        
        /* 文章列表半透明效果 */
        .issue-list,
        .blog-post-item,
        [class*="post-item"],
        [class*="issue-item"] {
            background: rgba(255, 255, 255, ${config.contentOpacity}) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 12px !important;
            padding: 20px !important;
            margin-bottom: 20px !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease !important;
        }
        
        /* 文章列表悬停效果 */
        .blog-post-item:hover,
        [class*="post-item"]:hover {
            background: rgba(255, 255, 255, 0.9) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        /* 头像容器样式 */
        .gmeek-plugin-avatar {
            text-align: center;
            margin: 30px 0;
            padding: 25px;
            background: rgba(255, 255, 255, 0.6) !important;
            backdrop-filter: blur(8px) !important;
            border-radius: 16px !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
        }
        
        /* 头像样式 */
        .gmeek-plugin-avatar-img {
            width: ${config.avatarSize};
            height: ${config.avatarSize};
            border-radius: 50%;
            border: 4px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            background: rgba(255, 255, 255, 0.9);
            object-fit: cover;
            transition: all 0.3s ease;
        }
        
        .gmeek-plugin-avatar-img:hover {
            transform: scale(1.05);
            border-color: rgba(255, 255, 255, 1);
        }
        
        /* 文章标题样式优化 */
        .blog-post-title a,
        [class*="post-title"] a {
            color: #2c3e50 !important;
            font-weight: 600;
            text-decoration: none;
        }
        
        .blog-post-title a:hover,
        [class*="post-title"] a:hover {
            color: #e74c3c !important;
            text-decoration: underline;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .gmeek-plugin-avatar-img {
                width: 80px;
                height: 80px;
            }
            
            .gmeek-plugin-avatar {
                margin: 20px 0;
                padding: 20px;
            }
        }
    `;
    
    // 添加头像到页面
    function addAvatar() {
        // 寻找文章列表容器
        const selectors = [
            '.issue-list',
            '.blog-home', 
            '[class*="post-list"]',
            '[class*="issue-list"]',
            'main',
            '.container'
        ];
        
        let targetContainer = null;
        for (const selector of selectors) {
            targetContainer = document.querySelector(selector);
            if (targetContainer) break;
        }
        
        if (targetContainer) {
            const avatarHTML = `
                <div class="gmeek-plugin-avatar">
                    <img src="${config.avatarUrl}" alt="${config.userName}" class="gmeek-plugin-avatar-img">
                    <h3 style="margin-top: 15px; color: #333; text-shadow: 0 1px 2px rgba(255,255,255,0.8); font-weight: 500;">
                        ${config.userName}
                    </h3>
                </div>
            `;
            
            // 插入到文章列表之前
            targetContainer.insertAdjacentHTML('beforebegin', avatarHTML);
        }
    }
    
    // 初始化插件
    function init() {
        // 注入样式
        document.head.appendChild(style);
        
        // 等待页面加载完成后添加头像
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addAvatar);
        } else {
            setTimeout(addAvatar, 100);
        }
        
        console.log('Gmeek独立主题插件加载成功');
    }
    
    // 自动初始化
    init();
    
})();
