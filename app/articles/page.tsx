import Link from "next/link";
import { articles } from "../content/articles";

export default function ArticlesPage() {
  return (
    <main className="archive-page">
      <header className="article-site-header"><Link href="/">大橙子🍊 <small>DACHENGZI</small></Link><Link href="/">回到首页 ↗</Link></header>
      <section className="archive-hero"><p>PERSONAL JOURNAL · ARTICLES</p><h1>写下正在<br /><i>生长的答案。</i></h1><span>{articles.length.toString().padStart(2,"0")} STORIES</span></section>
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
