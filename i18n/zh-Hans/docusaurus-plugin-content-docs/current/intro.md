---
id: intro
title: Getting started
sidebar_position: 1
---

Welcome to **FYSETC Wiki**, a bilingual documentation project built with Docusaurus.

## Reading the documentation

Simplified Chinese is the default language. Use the language menu in the navigation bar to switch to English.

## Adding an article

Store Chinese documents in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` and English documents in `i18n/en/docusaurus-plugin-content-docs/current/`.

Use the same relative path and document ID for both languages. For example:

```text
i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/setup.md
i18n/en/docusaurus-plugin-content-docs/current/guides/setup.md
```

The documentation sidebar is generated automatically from the directory structure.

## Adding images

Store images in `static/images/`. Both languages can reference the same image:

```markdown
![Image description](/images/example.png)
```

## Local preview

```bash
npm run start
npm run start:en
```

The development server previews one language at a time. Run `npm run build` to generate both language versions.

