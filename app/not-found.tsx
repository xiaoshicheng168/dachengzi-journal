import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "页面未找到" };

export default function NotFound() {
  return (
    <main className="not-found-page">
      <header className="article-site-header">
        <Link href="/">大橙子🍊 <small>DACHENGZI</small></Link>
        <Link href="/">回到首页 ↗</Link>
      </header>
      <section className="not-found-hero">
        <span className="ghost-char" aria-hidden="true">觅</span>
        <p className="not-found-kicker">404 · PAGE NOT FOUND</p>
        <h1>这一页，<br /><i>还在生长。</i></h1>
        <p className="not-found-copy">你要找的内容不在这里——它可能还没写好，也可能搬了家。</p>
        <div className="not-found-links">
          <Link href="/">回到首页 <span>→</span></Link>
          <Link href="/articles">读全部文章 <span>→</span></Link>
        </div>
      </section>
    </main>
  );
}
