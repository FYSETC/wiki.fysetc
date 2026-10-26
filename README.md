# FYSETC Wiki

基于 Docusaurus 3.10.2 的中英文文档项目。默认语言为 English，第二语言为简体中文。英文使用站点根路径，中文使用 /zh-Hans/ 前缀。

## 安装与运行

需要 Node.js 20 或更新版本。在 PowerShell 中先进入项目目录：

```powershell
cd C:\Users\kg\Desktop\wiki.fysetc
```

首次下载项目、缺少 `node_modules/` 或依赖发生变更时，安装依赖：

```powershell
npm.cmd ci
```

### 日常编辑：开发服务器

英文开发预览（默认），修改文档后自动更新：

```powershell
npm.cmd run start
```

中文开发预览：

```powershell
npm.cmd run start:zh
```

开发服务器一次预览一种语言。保持运行命令的终端打开，按 `Ctrl+C` 停止。

### 查看完整双语网站：构建后预览

```powershell
npm.cmd run build
npm.cmd run serve -- --host 127.0.0.1 --port 3000 --no-open
```

访问（默认 baseUrl 为 /wiki.fysetc/）：

- 英文首页：`http://127.0.0.1:3000/wiki.fysetc/`
- 中文首页：`http://127.0.0.1:3000/wiki.fysetc/zh-Hans/`
- 第一篇英文文章：`http://127.0.0.1:3000/wiki.fysetc/docs/first-article/`
- 第一篇中文文章：`http://127.0.0.1:3000/wiki.fysetc/zh-Hans/docs/first-article/`

生产构建会为原来的 /en/ 页面生成跳转，旧英文链接仍可访问。

此模式支持在同一篇文章上切换中英文；修改文档后需要重新运行 `npm.cmd run build`。
保持终端打开，按 `Ctrl+C` 停止。端口已被占用时可改为 `--port 3006`，并使用相应地址访问。

## 文档目录

- `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`：中文文档，初始内容复制自英文版，后续在这里翻译。
- `i18n/en/docusaurus-plugin-content-docs/current/`：英文文档，与中文使用相同相对路径和文档 ID。
- `i18n/en/code.json`：界面翻译资源；当前首页中英文文案位于 src/pages/index.jsx。
- `i18n/zh-Hans/docusaurus-theme-classic/`：中文导航和页脚翻译；配置中的默认导航文案为英文。
- `static/images/`：中英文共用的文档图片。
- `src/`：首页、组件和样式。
- `docusaurus.config.js`：网站和语言配置。
- `sidebars.js`：根据文档的真实文件目录自动生成导航。

文章按真实文件夹分类，中英文保持相同相对路径；文章顺序使用 sidebar_position，分类名称和顺序使用各目录的 _category_.json。已有文章保留绝对 slug，移动文件不改页面地址。启动与构建前只派生首页分类入口和中文分类标签，不再使用 tree.json 或 wiki_category 管理文章归属。详细规则见 [文件目录与导航](navigation/README.md)。图片可用 `/images/文件名.png` 引用。

原 `docs/` 保留迁移时的文件，不参与当前站点构建。当前中文和英文文章分别从各自的 i18n 目录读取。

## 主题与文档功能

首页、导航栏、文档页和暗色样式使用 FYSETC 自定义主题，字体文件在 static/fonts/inter/。文档支持本地搜索、数学公式、图片放大和驱动参考电压计算器。scripts/sync-navigation.mjs 仅更新文档导航，不生成迁移记录，也不准备 CMS。

## 部署地址

当前配置用于本地预览。部署时设置实际网站地址，必要时设置子目录：

```powershell
$env:SITE_URL = 'https://your-domain.example'
$env:SITE_BASE_URL = '/'
npm.cmd run build
```

构建输出位于 `build/`。本项目保留原有 Git 仓库，初始化过程未执行提交、推送或重新初始化 Git。

## English

Chinese articles are stored in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`; English counterparts are stored in
`i18n/en/docusaurus-plugin-content-docs/current/`. Keep their relative paths and
document IDs identical. Shared images belong in `static/images/`.

Use `npm run start:en` to develop in English, or `npm run build` and
`npm run serve` to preview both languages.

