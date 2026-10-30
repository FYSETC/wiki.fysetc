# HelpLook 最新导出同步记录

日期：2026-10-29。

**已同步 9 篇更新、其中 6 篇更名，另导入 4 篇新增文章。中英文目录共处理 26 个文件，所有已有文章 ID 和页面 URL 保持不变。**

源目录：`C:/Users/kg/Desktop/helplook-new-version/docs`。未向线上发布。没有中文译文的文章继续使用英文原文。

## 文章和图片

| 文章 | 操作 | 新下载图片数 |
| --- | --- | ---: |
| [CATALYST.K](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/controllers/CATALYST.K.md>) | 更新 | 1 |
| [CHAMELEON X5](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/controllers/CHAMELEON-X5.md>) | 更新 | 6 |
| [SPIDER_V1-3_F446](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/controllers/SPIDER_V1-3_F446.md>) | 更新并更名 | 0 |
| [SPIDER_V3_H723](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/controllers/SPIDER_V3_H723.md>) | 更新并更名 | 0 |
| [H36 Combo V2](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/modules/H36-Combo-V2.md>) | 更新 | 0 |
| [Adventurer AD5M_AD5M Pro_AD5X_Series Camera](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/upgrade-kits/Adventurer-AD5M_AD5M-Pro_AD5X_Series-Camera.md>) | 更新并更名 | 10 |
| [PSF Feedback Sensor](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/upgrade-kits/PSF-Feedback-Sensor.md>) | 更新并更名 | 11 |
| [Sparkx i7 LED Upgrade](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/upgrade-kits/Sparkx-i7-LED-Upgrade.md>) | 更新并更名 | 1 |
| [X1P1S Door Hinge Upgrade](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/upgrade-kits/X1P1S-Door-Hinge-Upgrade.md>) | 更新并更名 | 0 |
| [Catalyst.K_Mainboard_V1.1](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/controllers/Catalyst.K_Mainboard_V1.1.md>) | 新增 | 11 |
| [Catalyst.K_Tool_V1.1](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/modules/Catalyst.K_Tool_V1.1.md>) | 新增 | 11 |
| [FYSETC Paneldue 5i7i](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/displays/FYSETC-Paneldue-5i7i.md>) | 新增 | 2 |
| [Raspberry Pi 5 DSI Touch Screen MIPI LCD V1.1](<C:/Users/kg/Desktop/wiki.fysetc/i18n/en/docusaurus-plugin-content-docs/current/displays/Raspberry-Pi-5-DSI-Touch-Screen-MIPI-LCD-V1.1.md>) | 新增 | 5 |

共下载 **58 张图片，17,212,494 字节（约 16.4 MiB）**，存放于 `static/images/`。其中为 4 篇新增文章新下载 29 张，另外 14 处图片引用复用已有本地文件；这 4 篇文章共 43 处图片引用。既有且内容相同的图片复用原文件，更新图使用新文件名，正文改为本地 `/images/` 引用。

两篇 SPIDER 只应用 EXP1/EXP2 标注修正，保留 Wiki 中已有的其他正文；CHAMELEON X5 只替换变更的固件章节；CATALYST.K 只替换引脚图；H36 Combo V2 更新 Discord 地址。

## 更名和旧地址兼容

| 旧文件 | 新文件 | 保留页面地址 |
| --- | --- | --- |
| SPIDER.md | SPIDER_V1-3_F446.md | `/docs/Spider/` |
| SPIDER_V3_H7.md | SPIDER_V3_H723.md | `/docs/SPIDER_V3_H7/` |
| Adventurer AD5M Series Camera.md | Adventurer-AD5M_AD5M-Pro_AD5X_Series-Camera.md | `/docs/Adventurer-AD5M-Series-Camera/` |
| FC Product Manual.md | PSF-Feedback-Sensor.md | `/docs/FC-Product-Manual/` |
| Sparkx_i7_Led_System.md | Sparkx-i7-LED-Upgrade.md | `/docs/Sparkx_i7_Led_System/` |
| X1P1S  door hinge.md | X1P1S-Door-Hinge-Upgrade.md | `/docs/X1P1S-door-hinge/` |

## 来源中的占位内容

Sparkx i7 LED Upgrade 原文仍有一个图片地址 `h`，以及未提供地址的 Coming Soon 视频链接。未猜测图片或视频地址：保留图片缺失提示和 Coming Soon 文字，移除无效跳转。其余有效图片地址均已本地化。

两篇新增显示屏文档原稿将邮箱写成相对链接，已改为 `mailto:support@fysetc.com`。新增页面使用连字符形式的地址以兼容直接访问。CHAMELEON X5 和 PSF 文档中代码块之外的 UUID、串口、ADC GPIO 尖括号占位符已转义，防止被当成 HTML 标签隐藏；代码块中的原始命令保持原样。

## 验证

- 导航与 Markdown 检查已通过（共 6 项）。
- 标准双语生产构建已通过；完成参数占位符显示修正后，用 `npm run build -- --no-minify` 再次验证双语页面、站内链接与锚点。
- `node scripts/validate-helplook-updates.mjs --rendered` 校验本次 26 个文件、58 个下载图片校验值及构建后图片文件，同时检查参数占位符显示。
- 浏览器实际打开 PSF 页面，全部配图成功加载；4 篇新增页面直接访问均返回成功，页面内图片均可用且没有外部图片地址。

旧版全量迁移清单记录的以下 4 个 Venture XL 页面在本次同步前就已不在项目中：`1.1. Introduction`、`2. Assembly Guide`、`3.3 Head Tool Board`、`5. FAQ`。因此旧的 `validate-helplook.mjs` 会继续报告这 4 个历史缺失；本次同步未恢复或删除这些页面。本次独立校验报告将它们单独记录，不混入新增修改的检查结果。

## 本地记录

- [本次文件、URL、图片及校验值清单](helplook-update-2026-10-29.json)
- [本次校验结果](helplook-update-validation.json)
- [同步前文件备份](helplook-update-backup-2026-10-29/)

备份保留了同步前的工作区文件（包括原先尚未提交的编辑），备份目录已从 Git 中排除。
