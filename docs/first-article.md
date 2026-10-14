---
id: first-article
title: 第一篇双语文章：认识 FYSETC Wiki
description: 用一篇示例文章体验中英文切换、图片、表格和代码块。
slug: /first-article
sidebar_position: 2
---

这篇文章用于查看 **FYSETC Wiki** 的文档展示效果。你可以在右上角切换到 **English**，阅读同一篇文章的英文版本。

## 文档如何组织

每篇文章都有中文和英文两个文件。它们使用相同的相对路径和文档 ID，方便在两种语言之间切换。

| 内容 | 存放位置 |
| --- | --- |
| 中文文章 | `docs/first-article.md` |
| 英文文章 | `i18n/en/docusaurus-plugin-content-docs/current/first-article.md` |
| 共用图片 | `static/images/` |

## 一张图片，两种语言共用

下面的流程图展示了文档从编辑到本地预览的过程。中英文文章引用同一张图片。

![文档编辑、构建和预览流程](/images/document-workflow.svg)

## 编辑与预览

日常编辑中文文档时，可以启动开发服务器：

```powershell
cd C:\Users\kg\Desktop\wiki.fysetc
npm.cmd run start
```

如果需要同时预览完整的中英文网站，先构建，再运行静态预览：

```powershell
npm.cmd run build
npm.cmd run serve
```

:::tip 试一下语言切换

点击右上角的语言菜单，选择 **English**。页面应保持在这篇文章，并显示英文标题和正文。

:::

:::info 静态预览需要重新构建

修改 Markdown 后，开发服务器会自动更新。使用 `npm run serve` 时，需要先重新运行 `npm run build`，才能看到最新内容。

:::

## 接下来

阅读 [快速开始](./intro.md)，了解文档目录和图片引用方式，再新增你自己的产品文章。
