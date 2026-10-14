---
id: intro
title: 快速开始
sidebar_position: 1
---

欢迎使用 **FYSETC Wiki**。这是一个基于 Docusaurus 的中英文文档项目。

## 阅读文档

默认语言为简体中文。使用导航栏右侧的语言菜单切换到 English。

## 新增文章

中文文档放在 `docs/`，英文文档放在 `i18n/en/docusaurus-plugin-content-docs/current/`。

两种语言的文章使用相同的相对路径和文档 ID。例如：

```text
docs/guides/setup.md
i18n/en/docusaurus-plugin-content-docs/current/guides/setup.md
```

文档侧边栏根据文件目录自动生成。

## 添加图片

图片统一存放在 `static/images/`，两种语言可以引用同一张图片：

```markdown
![图片说明](/images/example.png)
```

## 本地预览

```bash
npm run start
npm run start:en
```

开发服务器一次预览一种语言。运行 `npm run build` 会同时生成中英文网站。

