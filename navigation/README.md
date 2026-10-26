# 网站目录

`tree.json` 是 CMS「目录管理 → 网站目录」编辑的共享配置，中英文共用结构。

- `categories`：目录 ID、中文名称 `zh`、英文名称 `en`、上级目录 `parent`、顺序 `order` 和可选首页文档 `intro`。
- `articles`：文档 ID `doc`、所属目录 `parent` 和顺序 `order`。空父级表示导航顶层。
- 同级目录与文章按顺序数字升序排列，同值时目录优先，各自保持列表顺序。
- 未分配的文档自动放入「未归档文档」。移动导航不改文档地址。
- 新目录先保存，再选择它作为上级目录或文章所属目录。

运行 `npm run nav:sync` 生成 `sidebars.js`、`catalog.json` 和英文目录翻译；开发启动和生产构建也会自动执行。`catalog.json` 供网站顶部导航与首页分类入口使用，只展示顶层目录，子目录在侧边栏中展开。

`official-categories.json` 是旧官网分类快照，只保留参考。只要 `tree.json` 存在，就不再使用旧分类匹配规则，也不再根据 `wiki_category` 自动放置文章。

构建前会检查循环嵌套、重复目录 ID、无效父级、缺失文档和重复文章位置。删除目录前先处理下级内容以及手写链接；目录 ID 决定默认目录地址，创建后应保持稳定。

验证：`npm run test:navigation`、`npm run build`。CMS 与本 Wiki 的改动需要一起更新到对应部署分支。
