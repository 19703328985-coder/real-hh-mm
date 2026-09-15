# HH022 V10 · HANGAR 022

这一版基于 V9.3 Stable 稳定底座新增一个**完全隔离**的航模收藏系统，避免影响现有 3D 地球、航班录入、学飞日志、PLAUD、勋章墙、天气墙和 Future Mail。

## 新增：HANGAR 022 · PRIVATE MODEL FLEET

每架航模可记录：
- 自动收藏编号（HM-001、HM-002…）
- 购买日期
- 飞机型号
- 制造商
- 航空公司 / 涂装
- 注册号
- 航模品牌
- 比例
- 购买地点
- 可选价格
- 飞机/涂装介绍
- 收藏故事
- 特别收藏
- 多张照片（自动压缩，每架最多读取 6 张）

## 三种浏览模式
1. **VIRTUAL HANGAR**：机库收藏墙，照片、编号、型号、比例与收藏状态一眼可见。
2. **FLEET TIMELINE**：按照购买日期回看每一架航模何时“入库”。
3. **AIRCRAFT LIBRARY**：自动按制造商和型号整理成机型图鉴。

## 自动统计
- TOTAL FLEET
- AIRCRAFT TYPES
- AIRLINES / LIVERIES
- MOST COLLECTED
- FAVORITE SCALE
- LATEST DELIVERY
- FLEET COMPOSITION 收藏构成圆环

## 特色交互
- 新航模保存后触发 **NEW DELIVERY** 机库门交付动画
- 每架航模拥有独立详情页与图片轮播
- 自动生成 **HANGAR 022 COLLECTION CERTIFICATE**
- 收藏证书可保存为 PNG
- 支持搜索、航空公司 / 比例 / 品牌筛选、特别收藏筛选
- 支持编辑、删除、收藏标记
- 支持 HANGAR 独立 JSON 导出 / 导入备份

## 数据安全
HANGAR 022 使用独立 IndexedDB：`hh022-hangar-v1`。
这意味着航模模块即使出现问题，也不会修改原有 HH022 的航班、日志、照片、PLAUD 或时间信箱数据库。

目前航模资料保存在当前浏览器。需要跨手机、电脑自动同步时，再单独接 Cloudflare D1 + R2；不建议为了云同步去改动现有稳定核心。

## 更新 GitHub
如果你已经有旧版本，只需要覆盖：
- `index.html`
- `style.css`
- `app.js`

图片和 `bgm.mp3` 不需要重新上传。
