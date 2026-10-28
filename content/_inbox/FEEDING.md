# 投料映射表（哪条自动化 → 哪个模块）

各模块自动化在自己产出完成后，额外写一份**脱敏版**到 `content/_inbox/<module>/`。
每周日 21:00 的「内容复盘官」从这里取料加工发布。

| 自动化 | 频率 | 模块 | type | 投料条件 |
| --- | --- | --- | --- | --- |
| AI Builders 每日中文摘要 | 每日 08:00 | `ai-brain` | `thinking` | 当日有信息量的动态 |
| 李继刚 prompt 周报 | 周一 09:00 | `ai-brain` | `method` | 本周有更新且有学习价值 |
| 招商-每日复盘导览生成 | 每日 20:30 | `biz-enablement` | `review` | 关键判断抽象后仍有通用价值 |
| 医药行业动态周报 | 周一 09:00 | `pharma-orange` | `review` | 必须（公开来源，最适合对外） |
| 集采科普每日生成 | 每日 09:00 | `pharma-orange` | `thinking` | 通过公开前合规检查 |
| 教练技术实践复盘·周日提醒 | 周日 10:00 | `club-ops` | `thinking` | 本周确有成型复盘（无素材不投） |
| 每周交易研究复盘 | 周五 17:00 | `stock-trading` | `review` | 必须（只投方法论章节） |
| 每周交易经验资产入库 | 周五 17:30 | `stock-trading` | `method` | 有通用性的新条目 |

`life-notes` 无自动化投料，由手动撰写。

## 兜底采集

若某模块 `_inbox` 为空（投料自动化受工作目录限制未写入），复盘官会去源目录**只读**补料：

| 模块 | 兜底源目录 |
| --- | --- |
| `ai-brain` | `/Users/xiaoshicheng168/Desktop/Obsidian-Vault/RAW/AI互动共创/` |
| `biz-enablement` | `/Users/xiaoshicheng168/Desktop/招商赋能工作流/复盘导览/` |
| `club-ops` | `/Users/xiaoshicheng168/Desktop/Obsidian-Vault/50-读书库/拆书/10-教练技术/实践复盘/` |
| `pharma-orange` | `/Users/xiaoshicheng168/Desktop/研究/医药橙子/40-内容项目/`、`/Users/xiaoshicheng168/Desktop/招商赋能工作流/资产/知识库/行业周报/` |
| `stock-trading` | `/Users/xiaoshicheng168/Desktop/行业研究/Trading Research OS/40-Output/` |

兜底取到的料一律视为**未脱敏**，复盘官必须先脱敏再加工。

## 投料文件规范

```md
---
title: "对外可读的中文标题"
date: "2026.10.29"
module: "ai-brain"        # 必须是 modules.ts 里的 key
type: "thinking"          # design | thinking | method | review
tags: ["..."]
summary: "一句话摘要"
cover: "/images/xxx.jpg"  # 仅 type: design 必填
---
```

文件名：`YYYY-MM-DD-<英文短名>.md`

## 三条铁律

1. **脱敏**——客户名、医院名、科室名、他人姓名、价格返利、持仓与盈亏、内部路径，一律不出现。
2. **不空投**——无实质内容、纯提醒、未过合规核验时，不建空文件、不占位。
3. **不编造**——无素材就不投，绝不为了凑数生成内容。
