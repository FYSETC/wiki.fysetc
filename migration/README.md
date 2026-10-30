# HelpLook 本地迁移记录

2026-10-29 正文复核：修复 SPIDER 的旧正文和英文 CHAMELEON 的零字节文件，并补齐另外 7 篇旧正文；CHAMELEON 中文手工译文保持不变。详见 [正文恢复记录](content-recovery.md)。

2026-10-29 增量同步：已同步 9 篇更新（含 6 篇更名）、导入 4 篇新增，并下载本次涉及的 58 张图片。详见 [最新同步记录](helplook-update-2026-10-29.md)。下文保留 2026-10-27 的首次迁移历史。

迁移日期：2026-10-27。源目录为本机 `helplook_docs/docs`，目标为本项目参与站点构建的中英文 i18n 目录。源文件保持不变；没有执行 Git 提交、推送或云端发布。

## 结果

- 134 份源 Markdown 文件对应 124 篇独立文章，其中包含同一文章的语言版本。
- 新增 50 篇文章，中英文目录各增加 50 个文件。原文缺少对应译文时沿用原文，没有自动翻译。
- 识别并保留 74 篇已有文章及其已有语言版本，不用 HelpLook 的不同正文覆盖现有正文。
- 4 篇已有文章调整分类：CAN Setup Guide 移到 Voron V2.4 Kit；Prusa MMU2S Clone 移到 3D Printer Kits；Cables 和 Others 分别进入独立分类。页面 slug 保留。
- 补入 400 个图片文件，按 SHA-256 内容复用已有图片，没有新增重复图片。其中 398 个来自导出缓存，2 个补充下载自公开原始地址。
- 中英文目录各有 131 篇文章，15 个顶层分类；其中 13 个分类对应 HelpLook，另外保留快速开始、补充资料以及根目录总览。

## 目录与兼容处理

分类层级以 HelpLook 为准。为兼容现有 CMS、首页分类入口和页面链接，沿用 Wiki 的目录键名，例如 `3D Printer Kits` 对应 `printer-kits`，`Tutorial` 对应 `guides`，`Stepper Drivers` 对应 `drivers`。

Venture XL 下保留 Introduction、Assembly Guide、Electronics Guide、Firmware Guide、FAQ 的编号与层级；Voron V2.4 Kit 及其 CAN 教程位于同一个子目录。新增 Cables、FAQ、Others 分类。文件夹与 `_category_.json` 共同驱动导航。

本地审阅后，三篇 Prusa 套件文章统一归入 `printer-kits/others/`，顺序为 MMU2S、MK3s、Mini。中英文路径和顺序同步，原页面地址保持不变。

新增文章的 HelpLook 提示框已转换为 Docusaurus 提示框；文章内的标题跳转按本地标题修复。图片引用改为本地 `/images/` 路径，包含空格的文件名进行 URL 编码。空链接保留文字或图片展示，避免生成失效跳转。旧文章只进行必要的目录、图片和站内链接适配。

图片标签中的特殊空格已规范化，HTML 图片使用站点子路径解析，兼容本地的 `/wiki.fysetc/` 以及正式部署时的路径配置。自动生成的打印机套件入口页已刷新为实际套件列表。

图片统一平铺存放在 `static/images/` 中，与原有图片同级。迁入的 400 张图片已移出原子目录，76 个中英文文章文件的引用及迁移清单已同步更新；导入工具后续也直接使用此目录。

## 源文档已有缺失

- `Displays/Generic_12864_Panel.md` 有一个只写到 `.../docs/images/` 的图片地址，缺少文件名。Wiki 已有文章版本保留。
- `Upgrade Kits/FC Product Manual.md` 有多个空图片地址及 `h`、`ht` 链接占位。
- `Upgrade Kits/Retracting Spool Holder.md` 和 `Upgrade Kits/Sparkx_i7_Led_System.md` 有 `h` 图片或链接占位。

没有根据占位地址猜测图片；新增页面中无效的图片标签改为“Image unavailable in the source export.”。其余可定位的图片已全部本地化。详细原始地址和受影响文章见 `helplook-report.json` 的 `unresolvedImages` 与 `incompleteSourceLinks`。

## 清单与检查

- `helplook-report.json`：本次迁移的逐篇源文件、目标路径、页面地址、处理方式及新增图片清单。
- `validation.json`：双语路径、文档 ID、页面地址、图片引用、源文件覆盖和图片去重检查结果。
- `build.log`：本地双语生产构建日志，不纳入版本管理。

在项目根目录运行：

```powershell
node scripts/validate-helplook.mjs
npm.cmd run test:navigation
npm.cmd run build
node scripts/validate-helplook.mjs --rendered
```

导入工具默认只生成计划，不写文章或图片：

```powershell
node scripts/migrate-helplook.mjs
```

源目录不在默认位置时，可传入 `--source=绝对路径`。`--apply` 会应用计划并重写迁移记录；再次运行前应先保留本次记录。工具对已有文章和相同图片进行复用。
