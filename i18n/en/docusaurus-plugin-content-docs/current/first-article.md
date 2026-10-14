---
id: first-article
title: "First bilingual article: Exploring FYSETC Wiki"
description: Try language switching, images, tables and code blocks in a sample article.
slug: /first-article
sidebar_position: 2
---

This article demonstrates how documentation looks in **FYSETC Wiki**. Use the language menu in the upper-right corner to select **简体中文** and read the Chinese version of the same article.

## How documentation is organized

Each article has a Chinese file and an English file. Both use the same relative path and document ID so that readers can switch between the two versions.

| Content | Location |
| --- | --- |
| Chinese article | `i18n/zh-Hans/docusaurus-plugin-content-docs/current/first-article.md` |
| English article | `i18n/en/docusaurus-plugin-content-docs/current/first-article.md` |
| Shared images | `static/images/` |

## One image shared by both languages

The diagram below shows the process of editing, building and previewing documentation. Both versions of this article reference the same image.

![Documentation editing, building and preview workflow](/images/document-workflow.svg)

## Editing and previewing

Start the development server when editing Chinese documentation:

```powershell
cd C:\Users\kg\Desktop\wiki.fysetc
npm.cmd run start
```

To preview the complete bilingual website, build it first and then serve the generated files:

```powershell
npm.cmd run build
npm.cmd run serve
```

:::tip Try switching languages

Open the language menu in the upper-right corner and select **简体中文**. You should stay on this article and see its Chinese title and content.

:::

:::info Rebuild to update the static preview

The development server updates automatically when Markdown changes. When using `npm run serve`, run `npm run build` again to display updated content.

:::

## Next steps

Read [Getting started](./intro.md) to learn about documentation directories and image references, then add your own product article.
