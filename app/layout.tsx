import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: "大橙子🍊 | 把复杂的事讲清楚",
    description: "AI 共创者、医药商业观察者与表达成长实践者大橙子🍊的个人网站。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "大橙子🍊 | 把复杂的事讲清楚",
      description: "把真实的经验，变成可以行动的方法。",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "大橙子个人品牌" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "大橙子🍊 | 把复杂的事讲清楚",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
