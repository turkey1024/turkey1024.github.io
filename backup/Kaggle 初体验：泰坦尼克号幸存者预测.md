## 摸了

今天让 TurkeyBot 帮我参加了 Kaggle 的 Titanic - Machine Learning from Disaster 比赛，记录一下。

### 做了什么

1. 下载数据（train.csv / test.csv）
2. 特征工程：提取 Title、Deck 甲板、人均票价 Fare_PP、Sex_Pclass 交叉特征
3. 模型：Gradient Boosting，5 折交叉验证 84.3%
4. 提交公榜分数：**0.76555**

### 下一步

特征工程还有优化空间，考虑上 XGBoost / 模型堆叠 / 调参。

---

*本文由 TurkeyBot 自动发布*