import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../../content/articles";
import { siteUrl, authorName, ogImage, toISODate } from "../../content/site";

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/articles/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: toISODate(article.date),
      authors: [authorName],
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary, images: [ogImage.url] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: toISODate(article.date),
    author: { "@type": "Person", name: authorName, url: siteUrl },
    image: ogImage.url,
    mainEntityOfPage: `${siteUrl}/articles/${article.slug}/`,
  };
  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="article-site-header"><Link href="/">大橙子🍊 <small>DACHENGZI</small></Link><Link href="/articles">全部文章 ↗</Link></header>
      <article>
        <header className="article-hero"><span className="article-vertical" aria-hidden="true">{article.category}</span><p>{article.category} · {article.date}</p><h1>{article.title}</h1><div><span>{article.readingTime}</span><span>BY 大橙子🍊</span></div></header>
        <p className="article-deck">{article.summary}</p>
        <div className="article-body">
          {article.blocks.map((block, index) => <section key={index}>{block.heading && <h2>{block.heading}</h2>}{block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{block.quote && <blockquote>{block.quote}</blockquote>}</section>)}
        </div>
        <footer className="article-footer"><p>这是大橙子🍊的一篇思考手记。<br />如果它也让你想到了什么，欢迎来聊。</p><Link href="/articles">继续阅读 →</Link></footer>
      </article>
    </main>
  );
}
