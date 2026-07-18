# 发文指南 · 大橙子🍊

一页纸讲清楚：从写完到上线。

## 30 秒流程

```bash
cp content/articles/_template.md content/articles/my-new-article.md
# 用 Obsidian / 任意编辑器写好它，然后：
git add -A
git commit -m "Add article: 文章标题"
git -c http.proxy=http://127.0.0.1:10090 push github main
```

push 后 GitHub Actions 自动构建，约 1 分钟上线。

## 头部字段（frontmatter）

| 字段 | 说明 |
|---|---|
| `title` | 文章标题，显示在首页、列表页、分享卡片 |
| `slug` | 英文 URL，全站唯一；与内置文章同 slug 会覆盖内置版本 |
| `date` | 格式 `YYYY.MM.DD`，决定排序；**留空的排到最后** |
| `category` | 分类标签，如 `AI 共创`、`医药实践` |
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
- **下架**：删除对应 md 文件，push 即可
- **自动更新**：新文章自动进入首页「近期作品」（最新 3 篇）、全部文章列表、`sitemap.xml`、`feed.xml`，无需改任何代码
- **本地预览**：`npm run dev` 后打开终端里显示的地址
- **免输代理**（可选，一次配置）：`git config --global http.proxy http://127.0.0.1:10090`
