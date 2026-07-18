import { articles, type Article } from "../content/articles";
import { siteUrl, siteTitle, siteDescription, toISODate } from "../content/site";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toPubDate(date: string): string | null {
  const iso = toISODate(date);
  return iso ? new Date(`${iso}T08:00:00+08:00`).toUTCString() : null;
}

function articleHtml(article: Article): string {
  return article.blocks
    .map((block) => {
      const parts = [];
      if (block.heading) parts.push(`<h2>${escapeXml(block.heading)}</h2>`);
      // paragraphs / list / quote 已是转义后的行内 HTML，直接拼接
      for (const paragraph of block.paragraphs) parts.push(`<p>${paragraph}</p>`);
      if (block.list?.length) parts.push(`<ul>${block.list.map((item) => `<li>${item}</li>`).join("")}</ul>`);
      if (block.image) {
        const src = block.image.src.startsWith("/") ? `${siteUrl}${block.image.src}` : block.image.src;
        parts.push(`<figure><img src="${escapeXml(src)}" alt="${escapeXml(block.image.alt)}"/></figure>`);
      }
      if (block.quote) parts.push(`<blockquote>${block.quote}</blockquote>`);
      return parts.join("");
    })
    .join("");
}

export function GET() {
  const items = articles
    .map((article) => {
      const url = `${siteUrl}/articles/${article.slug}/`;
      const pubDate = toPubDate(article.date);
      return [
        "<item>",
        `<title>${escapeXml(article.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
        `<category>${escapeXml(article.category)}</category>`,
        `<description>${escapeXml(article.summary)}</description>`,
        `<content:encoded><![CDATA[${articleHtml(article)}]]></content:encoded>`,
        "</item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>${escapeXml(siteTitle)}</title>
<link>${siteUrl}/</link>
<description>${escapeXml(siteDescription)}</description>
<language>zh-CN</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
