import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://xiaoshicheng168.github.io/dachengzi-journal";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "大橙子🍊 | 把复杂的事讲清楚",
  description: "AI 共创者、医药商业观察者与表达成长实践者大橙子🍊的个人网站。",
  icons: { icon: `${siteUrl}/favicon.svg`, shortcut: `${siteUrl}/favicon.svg` },
  openGraph: {
    title: "大橙子🍊 | 把复杂的事讲清楚",
    description: "把真实的经验，变成可以行动的方法。",
    type: "website",
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "大橙子个人品牌" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "大橙子🍊 | 把复杂的事讲清楚",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
