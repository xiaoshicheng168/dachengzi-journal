"use client";

import Link from "next/link";
import { useState } from "react";

export type CardItem = {
  slug: string;
  title: string;
  date: string;
  type: string;
  typeLabel: string;
  summary: string;
  /** 已带 basePath 前缀的封面地址 */
  cover?: string;
};

const TABS = [
  { key: "all", label: "全部" },
  { key: "design", label: "设计作品" },
  { key: "thinking", label: "思考手记" },
  { key: "method", label: "方法卡" },
  { key: "review", label: "周复盘" },
];

export default function ModuleTabs({ items, accent }: { items: CardItem[]; accent: string }) {
  const [active, setActive] = useState("all");
  const tabs = TABS.filter((tab) => tab.key === "all" || items.some((item) => item.type === tab.key));
  const list = active === "all" ? items : items.filter((item) => item.type === active);

  return (
    <div className="module-tabs-wrap">
      <div className="module-tabs" role="tablist" aria-label="内容类型筛选">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            className={active === tab.key ? "tab tab-active" : "tab"}
            onClick={() => setActive(tab.key)}
            style={active === tab.key ? { color: accent, borderColor: accent } : undefined}
          >
            {tab.label}
          </button>
        ))}
        <span className="module-tabs-count">{list.length} 篇</span>
      </div>

      <div className="card-grid">
        {list.map((item) =>
          item.type === "design" ? (
            <Link className="media-card" href={`/articles/${item.slug}`} key={item.slug}>
              <span className="media-cover">
                {item.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.cover} alt={item.title} loading="lazy" />
                ) : (
                  <span className="media-cover-empty">封面待补</span>
                )}
              </span>
              <h3>{item.title}</h3>
              <span className="card-meta">
                <span className="chip" style={{ background: accent }}>{item.typeLabel}</span>
                <em>{item.date}</em>
              </span>
            </Link>
          ) : (
            <Link className="text-card" href={`/articles/${item.slug}`} key={item.slug}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="card-meta">
                <span className="chip chip-plain">{item.typeLabel}</span>
                <em>{item.date}</em>
              </span>
            </Link>
          ),
        )}
        {list.length === 0 && <p className="empty-note">这个类型下还没有内容，下一轮自动化产出的第一批会落在这里。</p>}
      </div>
    </div>
  );
}
