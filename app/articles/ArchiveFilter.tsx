"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ArchiveItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  module: string;
  moduleName: string;
  accent: string;
  type: string;
  typeLabel: string;
  tags: string[];
};

export type FilterOption = { key: string; label: string; accent?: string };

export default function ArchiveFilter({
  items,
  moduleOptions,
  typeOptions,
}: {
  items: ArchiveItem[];
  moduleOptions: FilterOption[];
  typeOptions: FilterOption[];
}) {
  const [moduleKey, setModuleKey] = useState("all");
  const [typeKey, setTypeKey] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return items.filter((item) => {
      if (moduleKey !== "all" && item.module !== moduleKey) return false;
      if (typeKey !== "all" && item.type !== typeKey) return false;
      if (!keyword) return true;
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.tags.some((tag) => tag.toLowerCase().includes(keyword))
      );
    });
  }, [items, moduleKey, typeKey, query]);

  return (
    <>
      <section className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">按模块</span>
          <div className="filter-pills">
            <button type="button" className={moduleKey === "all" ? "pill pill-active" : "pill"} onClick={() => setModuleKey("all")}>全部</button>
            {moduleOptions.map((option) => (
              <button
                type="button"
                key={option.key}
                className={moduleKey === option.key ? "pill pill-active" : "pill"}
                onClick={() => setModuleKey(option.key)}
                style={moduleKey === option.key ? { background: option.accent, borderColor: option.accent, color: "#f5efe2" } : undefined}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">按类型</span>
          <div className="filter-pills">
            <button type="button" className={typeKey === "all" ? "pill pill-active" : "pill"} onClick={() => setTypeKey("all")}>全部</button>
            {typeOptions.map((option) => (
              <button type="button" key={option.key} className={typeKey === option.key ? "pill pill-active" : "pill"} onClick={() => setTypeKey(option.key)}>{option.label}</button>
            ))}
          </div>
        </div>
        <div className="filter-group filter-search">
          <span className="filter-label">搜索</span>
          <input
            className="filter-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="标题 / 摘要 / 标签…"
            aria-label="搜索文章"
          />
        </div>
        <p className="filter-count">{filtered.length} 篇 · 按时间倒序</p>
      </section>

      <section className="archive-list">
        {filtered.map((item, index) => (
          <Link href={`/articles/${item.slug}`} key={item.slug}>
            <span className="archive-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <span className="archive-chips">
                <span className="chip" style={{ background: item.accent }}>{item.moduleName}</span>
                <span className="chip chip-plain">{item.typeLabel}</span>
              </span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <small>{item.date}</small>
            </div>
            <span className="archive-arrow">↘</span>
          </Link>
        ))}
        {filtered.length === 0 && <p className="empty-note">没有匹配的内容，换个筛选条件或关键词试试。</p>}
      </section>
    </>
  );
}
