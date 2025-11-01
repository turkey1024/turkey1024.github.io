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

            /* 天气卡片样式 */
            .weather-card {
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
                min-width: 160px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }

            .weather-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .weather-location {
                font-size: 0.9rem;
                font-weight: 600;
                color: #333;
            }

            .weather-temp {
                font-size: 1.4rem;
                font-weight: bold;
                color: #2c3e50;
                text-align: center;
                margin: 5px 0;
            }

            .weather-desc {
                font-size: 0.8rem;
                color: #666;
                text-align: center;
                margin-bottom: 8px;
                text-transform: capitalize;
            }

            .weather-details {
                display: flex;
                justify-content: space-around;
                font-size: 0.75rem;
                color: #777;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                padding-top: 8px;
            }

            .weather-detail {
                text-align: center;
            }

            .weather-detail span {
                display: block;
                font-weight: 600;
                color: #555;
            }

            .weather-loading {
                text-align: center;
                color: #666;
                font-size: 0.9rem;
            }

            .weather-error {
                text-align: center;
                color: #e74c3c;
                font-size: 0.8rem;
            }

            /* 移动端天气卡片适配 */
            @media (max-width: 768px) {
                .avatar {
                    width: 180px;
                    height: 180px;
                }

                .weather-card {
                    top: 15px;
                    right: 15px;
                    min-width: 140px;
                    padding: 12px;
                }

                .weather-temp {
                    font-size: 1.2rem;
                }
            }

            @media (max-width: 480px) {
                .avatar {
                    width: 150px;
                    height: 150px;
                }

                .weather-card {
                    top: 10px;
                    right: 10px;
                    min-width: 130px;
                    padding: 10px;
                }

                .weather-temp {
                    font-size: 1.1rem;
                }

                .weather-details {
                    flex-direction: column;
                    gap: 4px;
                }
            }
        `;
        document.head.appendChild(style);

        // 添加天气卡片到页面
        addWeatherCard();
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

    // 天气卡片功能
    function addWeatherCard() {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
        weatherCard.innerHTML = `
            <div class="weather-header">
                <div class="weather-location">加载中...</div>
            </div>
            <div class="weather-loading">获取天气信息...</div>
        `;
        
        document.body.appendChild(weatherCard);
        
        // 获取天气数据
        getWeatherData();
    }

    async function getWeatherData() {
        try {
            // 使用免费天气API - 替换为您自己的API密钥
            // 这里使用OpenWeatherMap API，您需要注册获取免费API密钥
            const apiKey = 'YOUR_API_KEY_HERE'; // 请替换为您的实际API密钥
            const city = 'Beijing'; // 默认城市，可以根据需要修改
            
            // 先获取用户位置（可选）
            let userCity = city;
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                
                const { latitude, longitude } = position.coords;
                const locationResponse = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
                );
                const locationData = await locationResponse.json();
                userCity = locationData[0]?.name || city;
            } catch (geoError) {
                console.log('使用默认城市:', city);
            }
            
            // 获取天气数据
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}&lang=zh_cn`
            );
            
            if (!weatherResponse.ok) {
                throw new Error('天气数据获取失败');
            }
            
            const weatherData = await weatherResponse.json();
            updateWeatherCard(weatherData, userCity);
            
        } catch (error) {
            console.error('获取天气信息失败:', error);
            showWeatherError();
        }
    }

    function updateWeatherCard(data, city) {
        const weatherCard = document.querySelector('.weather-card');
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const iconCode = data.weather[0].icon;
        
        weatherCard.innerHTML = `
            <div class="weather-header">
                <div class="weather-location">${city}</div>
            </div>
            <div class="weather-temp">${temp}°C</div>
            <div class="weather-desc">${description}</div>
            <div class="weather-details">
                <div class="weather-detail">
                    湿度<br><span>${humidity}%</span>
                </div>
                <div class="weather-detail">
                    风速<br><span>${windSpeed}m/s</span>
                </div>
            </div>
        `;
    }

    function showWeatherError() {
        const weatherCard = document.querySelector('.weather-card');
        weatherCard.innerHTML = `
            <div class="weather-header">
                <div class="weather-location">天气</div>
            </div>
            <div class="weather-error">暂时无法获取天气信息</div>
        `;
    }
});
