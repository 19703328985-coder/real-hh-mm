# HH022 · V7 Private Flight Archive

这一版在 V6 基础上加入三个核心升级：

1. **更真实、更明亮的 3D 地球**
   - Three.js 继续负责旋转、缩放、航线与机场坐标。
   - 地球使用 Blue Marble 风格真实卫星纹理（运行时从公共 CDN 加载）；加载失败时自动回退为明亮的蓝色地球，不影响航班记录。
   - 加强日光、天空光和大气层，不再是暗色网格球。

2. **MEMORY VAULT · 私人照片舱**
   - 原来的 3 张照片继续作为首批精选回忆。
   - 网页里可直接 `ADD NEW MEMORY` 上传新照片。
   - 可填写日期、地点、标题和一句话。
   - 自动压缩图片后存入浏览器 IndexedDB，不上传服务器。
   - 立体 Coverflow / 电影胶片式轮播：拖动、触控滑动、触控板横向滚动、点击放大。
   - 本机新增照片可以删除。

3. **PILOT TRAINING JOURNAL · 学飞日志**
   - 可记录日期、训练阶段、机型、时长、心情、训练正文、经验教训。
   - 每篇日志可附多张训练照片。
   - 自动保存在 IndexedDB。
   - 左侧按月份 / 日期归档；点击日期即可翻阅。
   - 支持上一篇 / 下一篇、编辑、删除。
   - 自动统计日志篇数、累计记录时长、最新日志日期。

## 私人数据备份

`MEMORY VAULT` 顶部有：

- **导出私人档案**：把新增照片、学飞日志、个人航班记录、22 岁愿望统一导出为 `hh022-private-archive-日期.json`。
- **导入私人档案**：换手机 / 换电脑后可恢复。

> 重要：这是一个纯静态 Cloudflare Pages 网站，所以“自己在网页里新增”的照片、训练日志、航班记录默认保存在 **当前浏览器 / 当前设备**，不会自动跨设备同步。定期导出备份即可长期保存。

## 文件结构

上传 GitHub 仓库根目录：

- `index.html`
- `style.css`
- `app.js`
- `bgm.mp3`
- `nightflight.png`
- `window-01.jpg`
- `window-02.jpg`
- `window-03.jpg`

`README.md` 可上传也可不上传。

## 更新 Cloudflare

你已经连接 GitHub 自动部署，因此只需要在 GitHub 的 `real-hh-mm` 仓库覆盖上述文件并 Commit。Cloudflare Pages 会自动发布到 `hh-mm.pages.dev`。
