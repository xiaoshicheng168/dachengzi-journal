import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "../content/articles";

export const metadata: Metadata = {
  title: "全部文章",
  description: "大橙子🍊的全部文章：AI 共创、医药商业观察与表达成长的持续记录。",
  alternates: { canonical: "/articles/" },
  openGraph: { title: "全部文章 | 大橙子🍊", description: "写下正在生长的答案。", type: "website" },
};

export default function ArticlesPage() {
  return (
    <main className="archive-page">
      <header className="article-site-header"><Link href="/">大橙子🍊 <small>DACHENGZI</small></Link><Link href="/">回到首页 ↗</Link></header>
      <section className="archive-hero"><span className="ghost-char" aria-hidden="true">文</span><p>PERSONAL JOURNAL · ARTICLES</p><h1>写下正在<br /><i>生长的答案。</i></h1><span className="stories-count">{articles.length.toString().padStart(2,"0")} STORIES</span></section>
      <section className="archive-list">
        {articles.map((article, index) => (
          <Link href={`/articles/${article.slug}`} key={article.slug}>
            <span className="archive-index">{String(index + 1).padStart(2,"0")}</span>
            <div><small>{article.category} · {article.date}</small><h2>{article.title}</h2><p>{article.summary}</p></div>
            <span className="archive-arrow">↘</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
