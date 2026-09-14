# HH022 V9.1 · Future Mail

本版把原先「ONE LINE TO YOUR FUTURE SELF」的展示逻辑升级为真正的时间信箱。

## 新增功能

- FUTURE MAIL 独立入口
- 写信时选择开启日期、标题和完整正文
- 开启日前正文保持封存，只显示标题、抵达日期和倒计时
- 到达开启日期后，下一次进入 HH022 会自动弹出这封信
- 关闭弹窗后不会反复强制弹出，但信件永久保留在「时间信箱」中，可随时重读
- 如果同一天有多封到期信，可以在弹窗中继续打开 NEXT LETTER
- 未到期的信可以修改或删除；到期后的信可随时查看或删除
- FUTURE MAIL 会跟随「导出私人档案 / 导入私人档案」一起备份
- IndexedDB 数据库升级到 v2，原有照片、学飞日志、录音等数据继续保留

## 更新 GitHub

只需覆盖：

- index.html
- style.css
- app.js

其他照片、nightflight.png、bgm.mp3 不需要重新上传。

建议 Commit message：

`Upgrade to V9.1 Future Mail`

## 测试方法

1. 打开 FUTURE MAIL。
2. 写一封测试信，OPEN ON 选择今天。
3. 刷新网站并点击「开始登机」。
4. 进入网站后，这封信应自动以 MESSAGE ARRIVED 弹窗出现。
5. 关闭后，到 FUTURE MAIL 的「时间信箱」仍可再次打开。

说明：这是本机时间锁，不是服务器邮件或系统推送。只有在到期日之后再次打开 HH022 时才会触发自动送达；不会在网站完全关闭时主动向手机发送通知。
