import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "../content/articles";
import { getModule, contentTypeLabel, modules, contentTypes } from "../content/modules";
import ArchiveFilter, { type ArchiveItem, type FilterOption } from "./ArchiveFilter";

export const metadata: Metadata = {
  title: "全部作品",
  description: "大橙子🍊的全部作品：按模块与类型检索 AI 外脑、招商赋能、俱乐部运营、医药橙子与股票交易的持续记录。",
  alternates: { canonical: "/articles/" },
  openGraph: { title: "全部作品 | 大橙子🍊", description: "写下正在生长的答案。", type: "website" },
};

export default function ArticlesPage() {
  const items: ArchiveItem[] = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    summary: article.summary,
    module: article.module,
    moduleName: getModule(article.module)?.name ?? "手记",
    accent: getModule(article.module)?.accent ?? "#6e7864",
    type: article.type,
    typeLabel: contentTypeLabel(article.type),
    tags: article.tags,
  }));

  const moduleOptions: FilterOption[] = modules.map((item) => ({ key: item.key, label: item.name, accent: item.accent }));
  const typeOptions: FilterOption[] = contentTypes.map((item) => ({ key: item.key, label: item.label }));

  return (
    <main className="archive-page">
      <header className="article-site-header"><Link href="/">大橙子🍊 <small>DACHENGZI</small></Link><Link href="/">回到首页 ↗</Link></header>
      <section className="archive-hero">
        <span className="ghost-char" aria-hidden="true">作</span>
        <p>PERSONAL JOURNAL · ARTICLES</p>
        <h1>写下正在<br /><i>生长的答案。</i></h1>
        <span className="stories-count">{articles.length.toString().padStart(2, "0")} STORIES</span>
      </section>
      <ArchiveFilter items={items} moduleOptions={moduleOptions} typeOptions={typeOptions} />
      <footer className="archive-footer">
        <span>© 2026 大橙子🍊</span>
        <Link href="/modules">按模块浏览 →</Link>
      </footer>
    </main>
  );
}
