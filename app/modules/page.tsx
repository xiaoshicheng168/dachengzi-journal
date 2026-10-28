import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { moduleStats } from "../content/articles";
import { modules } from "../content/modules";

export const metadata: Metadata = {
  title: "模块",
  description: "大橙子🍊的工作主线：AI 外脑、招商赋能、俱乐部运营、医药橙子与股票交易，按模块沉淀每周自动产出的内容。",
  alternates: { canonical: "/modules/" },
  openGraph: { title: "模块 | 大橙子🍊", description: "五条正在生长的工作主线。", type: "website" },
};

export default function ModulesPage() {
  return (
    <main className="archive-page">
      <header className="article-site-header">
        <Link href="/">大橙子🍊 <small>DACHENGZI</small></Link>
        <Link href="/">回到首页 ↗</Link>
      </header>
      <section className="archive-hero">
        <span className="ghost-char" aria-hidden="true">块</span>
        <p>MODULES · WORKING THREADS</p>
        <h1>五条正在<br /><i>生长的线。</i></h1>
        <span className="stories-count">{modules.length.toString().padStart(2, "0")} MODULES</span>
      </section>
      <section className="module-index">
        {modules.map((item) => {
          const stats = moduleStats(item.key);
          return (
            <Link className="module-index-row" href={`/modules/${item.key}`} key={item.key} style={{ "--accent": item.accent } as CSSProperties}>
              <span className="module-index-num">{item.number}</span>
              <span className="module-index-body">
                <small>{item.en}</small>
                <h2>{item.name}</h2>
                <p>{item.copy}</p>
              </span>
              <span className="module-index-meta">
                <span className="chip" style={{ background: item.accent }}>{stats.total} 篇</span>
                <em>{item.cadence}</em>
              </span>
              <span className="module-index-arrow" aria-hidden="true">↘</span>
            </Link>
          );
        })}
      </section>
      <footer className="archive-footer">
        <span>© 2026 大橙子🍊</span>
        <Link href="/articles">去全部作品检索 →</Link>
      </footer>
    </main>
  );
}
