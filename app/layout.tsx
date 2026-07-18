import type { Metadata } from "next";
import "./globals.css";
import { siteUrl, siteTitle, siteDescription, ogImage } from "./content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | 大橙子🍊" },
  description: siteDescription,
  icons: { icon: `${siteUrl}/favicon.svg`, shortcut: `${siteUrl}/favicon.svg` },
  openGraph: {
    title: siteTitle,
    description: "把真实的经验，变成可以行动的方法。",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
