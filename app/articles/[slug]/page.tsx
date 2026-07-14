import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../../content/articles";

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? { title: `${article.title} | 大橙子🍊`, description: article.summary } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <main className="article-page">
      <header className="article-site-header"><Link href="/">大橙子🍊 <small>DACHENGZI</small></Link><Link href="/articles">全部文章 ↗</Link></header>
      <article>
        <header className="article-hero"><p>{article.category} · {article.date}</p><h1>{article.title}</h1><div><span>{article.readingTime}</span><span>BY 大橙子🍊</span></div></header>
        <p className="article-deck">{article.summary}</p>
        <div className="article-body">
          {article.blocks.map((block, index) => <section key={index}>{block.heading && <h2>{block.heading}</h2>}{block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{block.quote && <blockquote>{block.quote}</blockquote>}</section>)}
        </div>
        <footer className="article-footer"><p>这是大橙子🍊的一篇思考手记。<br />如果它也让你想到了什么，欢迎来聊。</p><Link href="/articles">继续阅读 →</Link></footer>
      </article>
    </main>
  );
}
