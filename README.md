# HH022 V9 · PLAUD × PERSONAL BLACK BOX

这一版把 PLAUD 作为现实世界里的“实体黑匣子”，和 HH022 的学飞日志、3D 地球、人生星图、勋章系统真正串起来。

> **PLAUD 负责记录现实。HH022 负责收藏人生。**

## V9 新增

- **IMPORT FROM PLAUD**：导入 PLAUD 导出的 MP3 / WAV / M4A / WEBM 录音，以及 TXT / MD / SRT / VTT 转写与总结。
- **真实声音波形**：浏览器会分析音频并绘制可点击跳转的动态波形，不再使用普通 audio 播放器。
- **FIRST SOLO BLACK BOX**：首次单飞且留有语音的日志会永久置顶。
- **FIRST SOLO CVR 勋章**：首次单飞语音封存后自动解锁。
- **声音地图**：训练日志填写机场代码并带语音时，3D 地球出现青绿色呼吸式语音坐标；点击坐标直接回到当天日志。
- **会说话的人生星图**：有语音的训练记录成为会呼吸的 VOICE 星点。
- **ONE LINE TO YOUR FUTURE SELF**：每篇训练可以留一句给未来自己的话；Life OS 会把过去的句子重新带回来。
- **PLAUD 转写 / 总结归档**：和当天日志绑定，可以按日期翻阅。
- **私人档案备份兼容**：录音、转写、总结、未来留言会跟随原有私人档案一起导出。

## 上传 GitHub

如果 V8.1 已经正常在线，这次只需要覆盖三个文件：

- `index.html`
- `style.css`
- `app.js`

图片、`nightflight.png`、`bgm.mp3` 都不用重新上传。

建议 Commit：`Upgrade to V9 PLAUD Personal Black Box`

## 关于存储

V9 仍是纯静态 Cloudflare Pages。PLAUD 文件、照片和日志保存在当前浏览器的 IndexedDB，不会自动上传到公共服务器。请定期使用网站里的“导出私人档案”进行备份。
