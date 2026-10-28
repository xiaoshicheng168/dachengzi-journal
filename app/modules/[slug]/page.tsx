import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByModule, resolveImageSrc } from "../../content/articles";
import { modules, getModule, contentTypeLabel } from "../../content/modules";
import ModuleTabs, { type CardItem } from "./ModuleTabs";

export function generateStaticParams() {
  return modules.map(({ key }) => ({ slug: key }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getModule(slug);
  if (!item) return {};
  return {
    title: item.name,
    description: item.copy,
    alternates: { canonical: `/modules/${item.key}/` },
    openGraph: { title: `${item.name} | 大橙子🍊`, description: item.copy, type: "website" },
  };
}

/** "2026.10.29" 是否在最近 days 天之内（构建时判定，静态导出场景按构建时间算） */
function isWithinDays(date: string, days: number): boolean {
  const matched = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(date);
  if (!matched) return false;
  const time = new Date(`${matched[1]}-${matched[2]}-${matched[3]}T00:00:00`).getTime();
  return Date.now() - time <= days * 86_400_000;
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getModule(slug);
  if (!item) notFound();

  const list = getArticlesByModule(item.key);
  const weekly = list.filter((article) => isWithinDays(article.date, 7)).slice(0, 2);

  const cards: CardItem[] = list.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    type: article.type,
    typeLabel: contentTypeLabel(article.type),
    summary: article.summary,
    cover: article.cover ? resolveImageSrc(article.cover) : undefined,
  }));

  const counts = ["design", "thinking", "method", "review"]
    .map((type) => ({ type, count: list.filter((article) => article.type === type).length }))
    .filter((entry) => entry.count > 0)
    .map((entry) => `${contentTypeLabel(entry.type)} ${entry.count}`)
    .join(" / ");

  return (
    <main className="module-page">
      <header className="article-site-header">
        <Link href="/">大橙子🍊 <small>DACHENGZI</small></Link>
        <Link href="/modules">全部模块 ↗</Link>
      </header>

      <section className="module-hero" style={{ background: item.accent }}>
        <span className="module-hero-ghost" aria-hidden="true">{item.number}</span>
        <p>MODULE {item.number} / {String(modules.length).padStart(2, "0")}</p>
        <h1>{item.name}</h1>
        <p className="module-hero-copy">{item.copy}</p>
        <p className="module-hero-meta">{list.length} 篇内容 · {item.cadence}{counts ? ` · ${counts}` : ""}</p>
      </section>

      {weekly.length > 0 && (
        <section className="module-weekly">
          <p className="module-section-label">WEEKLY NEW / 本周新增</p>
          <h2>本周新增</h2>
          <div className="card-grid">
            {weekly.map((article) => (
              <Link className="text-card text-card-featured" href={`/articles/${article.slug}`} key={article.slug}>
                <span className="chip" style={{ background: item.accent }}>本周新增</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <span className="card-meta">
                  <span className="chip chip-plain">{contentTypeLabel(article.type)}</span>
                  <em>{article.date}</em>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="module-content">
        <p className="module-section-label">ALL CONTENT / 全部内容</p>
        <h2>全部内容</h2>
        <ModuleTabs items={cards} accent={item.accent} />
      </section>

      <footer className="archive-footer">
        <span>© 2026 大橙子🍊</span>
        <Link href="/articles">在全部作品里检索 →</Link>
      </footer>
    </main>
  );
}
