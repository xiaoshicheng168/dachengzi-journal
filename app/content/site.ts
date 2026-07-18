export const siteUrl = "https://xiaoshicheng168.github.io/dachengzi-journal";
export const siteName = "大橙子🍊";
export const siteTitle = "大橙子🍊 | 把复杂的事讲清楚";
export const siteDescription =
  "AI 共创者、医药商业观察者与表达成长实践者大橙子🍊的个人网站。";
export const authorName = "大橙子🍊";
export const ogImage = {
  url: `${siteUrl}/og.jpg`,
  width: 1200,
  height: 630,
  alt: "大橙子个人品牌",
};

/** "2026.07.01" -> "2026-07-01"，无法解析时返回 undefined */
export function toISODate(date: string): string | undefined {
  return /^\d{4}\.\d{2}\.\d{2}$/.test(date) ? date.replaceAll(".", "-") : undefined;
}
