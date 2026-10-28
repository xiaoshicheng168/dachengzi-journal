# 发文指南 · 大橙子🍊

一页纸讲清楚：从写完到上线。

## 30 秒流程

```bash
cp content/articles/_template.md content/articles/my-new-article.md
# 用 Obsidian / 任意编辑器写好它，然后：
node scripts/publish-weekly.mjs "新增文章：文章标题"
```

脚本会先校验 frontmatter（module / type / cover / summary），再只提交 `content/` 与 `public/images/` 并 push，
等价于下面这几步：

```bash
git add content public/images
git commit -m "content: 新增文章：文章标题"
git -c http.proxy=http://127.0.0.1:10090 push github main
```

push 后 GitHub Actions 自动构建，约 1 分钟上线。

### 脚本参数

| 参数 | 作用 |
|---|---|
| `--dry-run` | 只看会提交什么，不提交 |
| `--validate-only` | 只校验 frontmatter，不提交 |
| `--force` | 校验不通过也继续（紧急发布时用） |

不想改内容只想重建：GitHub Actions 页 →「Deploy website to GitHub Pages」→ Run workflow（`workflow_dispatch`），不用提交也能重部署。

## 模块与内容类型

文章除了 `category`，现在还有两个必填的分类维度：

- **`module`（一级模块）**：`ai-brain` / `biz-enablement` / `club-ops` / `pharma-orange` / `stock-trading` / `life-notes`，
  定义在 `app/content/modules.ts`。新增模块只改这一个文件，首页网格、`/modules`、`/modules/[slug]` 会自动跟上。
- **`type`（内容类型）**：`design` 设计作品 / `thinking` 思考手记 / `method` 方法卡 / `review` 周复盘。

`type: design` 必须配 `cover`（设计作品在模块页以封面卡展示）。

## 头部字段（frontmatter）

| 字段 | 说明 |
|---|---|
| `title` | 文章标题，显示在首页、列表页、分享卡片 |
| `slug` | 英文 URL，全站唯一；与内置文章同 slug 会覆盖内置版本 |
| `date` | 格式 `YYYY.MM.DD`，决定排序；**留空的排到最后** |
| `module` | **必填**。模块 key，见上表 |
| `type` | **必填**。design / thinking / method / review |
| `cover` | 封面图路径，如 `/images/xxx.jpg`；`type: design` 时必填 |
| `tags` | 标签数组，如 `["周报", "工作流"]`，参与全部作品页的搜索 |
| `category` | 旧分类字段，仍兼容；缺 module/type 时用它兜底归类 |
| `readingTime` | 如 `"5 MIN READ"` |
| `summary` | 一句话摘要，用于列表页、分享描述、RSS |

## 正文语法

| 写法 | 效果 |
|---|---|
| `## 小标题` | 章节标题 |
| `**加粗**` / `*斜体*` | 行内强调 |
| `` `代码` `` | 朱砂底行内代码 |
| `[文字](https://…)` | 朱砂色链接（新窗口打开） |
| `- 条目` | 朱砂短线列表 |
| `> 引用` | 「」引用块 |
| `![图注](/images/xxx.jpg)` | 插图（自动适配子路径） |

普通空行分段即可。行首 `#` 的大标题会被忽略（标题来自 frontmatter）。

## 图片

- 文件放进 `public/images/`（目录不存在就新建）
- 正文引用 `![这里写图注](/images/xxx.jpg)`，图注显示在图片下方
- 建议宽度 ≥1200px，JPG 比 PNG 小很多

## 小贴士

- **草稿**：文件名以 `_` 开头不会被发布（如 `_draft.md`）
- **暂存区**：自动化的原始产出先落 `content/_inbox/<module>/`，复盘加工后再移到 `content/articles/`，规则见 `content/_inbox/README.md`
- **下架**：删除对应 md 文件，push 即可
- **自动更新**：新文章自动进入首页「近期作品」（最新 4 篇）、所属模块页、全部作品列表、`sitemap.xml`、`feed.xml`，无需改任何代码
- **本地预览**：`npm run dev` 后打开终端里显示的地址
- **免输代理**（可选，一次配置）：`git config --global http.proxy http://127.0.0.1:10090`
