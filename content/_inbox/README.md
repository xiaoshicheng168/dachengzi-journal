# content/_inbox —— 自动产出的暂存区

各模块的每周自动化把**原始产出**先落到这里，不直接进 `content/articles/`。
每周复盘官从这里取料，加工后再发布。

```
content/_inbox/<module-key>/     # 目录名 = modules.ts 里的 key
  ai-brain/  biz-enablement/  club-ops/  pharma-orange/  stock-trading/  life-notes/
```

## 复盘官五道工序

| 工序 | 做什么 | 产出 |
| --- | --- | --- |
| 1 采集 | 扫 `_inbox/<module>/` 下的原始文件（草稿、碎片、图片），按日期排序 | 待复盘清单 |
| 2 复盘筛选 | 按三条打分：完整性 / 价值密度 / 可发布性 | 发布 / 降级草稿 / 丢弃 |
| 3 梳理归类 | 补全 frontmatter（module/type/tags/summary/cover），校验封面图 | 合规的 md |
| 4 深度加工 | 每周每模块合成 1 篇「周复盘」，把散料串成有叙事的成品 | 可发布成品 |
| 5 发布 | 移到 `content/articles/`，图片进 `public/images/`，调发布脚本 | push + 重新部署 |

## 筛选标准（三条都要过）

1. **完整性**：有明确标题、一句话摘要；设计类必须有 `cover`。缺件 → 补，补不上降级草稿。
2. **价值密度**：有没有新观点 / 新方法 / 新案例。纯记录、无判断 → 降级草稿，不单独发布。
3. **可发布性**：语言是否成型（不是聊天碎片）、是否脱敏（客户名、数据）。

## frontmatter 规范（发布前必须齐全）

```md
---
title: "标题"
slug: "url-in-english"
date: "2026.10.29"
module: "ai-brain"        # 必填，必须是 modules.ts 里存在的 key
type: "design"            # 必填：design | thinking | method | review
tags: ["周报", "工作流"]  # 可选
cover: "/images/xxx.jpg"  # type: design 时必填
category: "AI 共创"       # 兼容旧字段，可省略
readingTime: "5 MIN READ"
summary: "一句话摘要"
---
```

`scripts/publish-weekly.mjs` 会在发布前校验这几项，不合规直接拦下（除非 `--force`）。

## 节奏

- 各模块自动化：随时产出 → 落 `_inbox/<module>/`
- 复盘官：**每周日 21:00**（避开既有的周日 09:00 飞书 + IMA 同步）
- 复盘官只动 `content/` 与 `public/images/`，不碰代码
