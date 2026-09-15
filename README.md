# HH022 V9.3 Stable

这版从已验证可用的 V8.1 核心重新构建。

- 保留 V8.1 的 3D 地球、航班录入、相册、学飞日志、勋章墙、Inner Weather。
- PLAUD 与 Future Mail 改为“隔离式附加模块”，不会再改 IndexedDB 版本，也不会阻断核心功能。
- Future Mail 使用独立 localStorage：到期后下一次进入 HH022 自动弹出，关闭后可在档案里重读。
- PLAUD 导入仍写入原有 journal 数据库，因此可以继续按日期翻阅。

更新 GitHub 只需覆盖 index.html / style.css / app.js。
