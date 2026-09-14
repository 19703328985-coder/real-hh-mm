# HH022 · V8 Flight Life OS

这版是在 V7 基础上的长期成长版，保留：
- 真实 3D 地球 + 航班 / 机型记录
- MEMORY VAULT 私人照片舱
- PILOT TRAINING JOURNAL 学飞日志
- 音乐、生日信、愿望黑匣子

新增并融合 5 个功能：

## 1. FLIGHT LIFE CONSTELLATION · 飞行人生星图
把航班、训练日志、带日期的私人照片以及 21→22 的时间节点按时间连接成星图。
点击星星会跳回对应的航班、日志、照片或时间轴。

## 2. GROWTH COCKPIT · 成长仪表盘
用真实数据统计训练小时、机型、机场和日志天数。
成长百分比只依据 6 个明确里程碑；已在日志中出现的“起落航线 / 单飞 / 转场 / 仪表”等会自动点亮，其余可以本人手动标记。

## 3. WINGS & BADGES · 飞行勋章墙
根据真实记录自动解锁，例如：第一篇日志、第一条航线、10 小时、首次单飞、夜航、3 种机型、5 个机场、10 程航班、第一次 CVR 语音记录。

## 4. COCKPIT VOICE RECORDER · 训练语音黑匣子
在每篇学飞日志里可以直接调用麦克风录音，最长 3 分钟。
录音会和该篇日志一起保存在浏览器 IndexedDB 中，也会包含在“导出私人档案”的备份里。

## 5. INNER WEATHER · 飞行情绪气象图
每篇训练日志新增 INNER WEATHER：CAVOK / CLEAR / CLOUDY / CROSSWIND / TURBULENCE / STORM / AFTER RAIN。
Flight Life OS 会自动按月份生成年度内心天气图。

## 更新到 GitHub
只需要覆盖仓库根目录的：
- index.html
- style.css
- app.js

图片和 bgm.mp3 没变，不需要重新上传。
Cloudflare Pages 会自动部署。

## 数据存储
用户新增的航班保存在 localStorage；照片、训练日志、日志照片和语音保存在 IndexedDB。
“导出私人档案”现在会同时备份照片、训练日志、语音、航班、里程碑和生日愿望。
