# HH022 · V4 Soundtrack Edition

这是带原创背景配乐的版本。上传整个文件夹中的文件到 GitHub 仓库根目录即可，Cloudflare Pages 会自动重新部署。

## 新增
- `bgm.mp3`：原创无歌词夜航氛围配乐，约 64 秒，无版权素材依赖，可循环播放。
- 点击“开始登机”后音乐约 1.6 秒淡入，避免浏览器自动播放限制。
- 顶部有 `SOUND ON / OFF` 开关；手机端显示为动态音量条。
- 静音选择会保存在当前浏览器中。
- 起飞动画时配乐会轻微增强，结束后恢复背景音量。

## 文件结构
```
index.html
style.css
app.js
nightflight.png
window-01.jpg
window-02.jpg
window-03.jpg
bgm.mp3
README.md
```

## 上传 GitHub
把 `index.html`、`style.css`、`app.js` 替换为本版本，并新增 `bgm.mp3`。三张照片与 `nightflight.png` 也一起保留。

Cloudflare 已开启 Automatic deployments 的情况下，GitHub Commit 后会自动更新网站。
