import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Бабушкаробот — ИИ-маркетинговое агентство полного цикла",
    template: "%s | Бабушкаробот",
  },
  description:
    "Бабушкаробот — маркетинговое ИИ-агентство. Разработка, интеграция и продвижение с помощью искусственного интеллекта: чат-боты, автоматизация, контекстная и таргетированная реклама, SEO, веб-аналитика. Тёплый сервис с холодным интеллектом.",
  keywords: [
    "ИИ-маркетинг",
    "AI-агентство",
    "внедрение искусственного интеллекта",
    "чат-боты для бизнеса",
    "контекстная реклама",
    "таргетированная реклама",
    "SEO-продвижение",
    "веб-аналитика",
    "автоматизация маркетинга",
    "Бабушкаробот",
  ],
  authors: [{ name: "Бабушкаробот" }],
  creator: "Бабушкаробот",
  publisher: "Бабушкаробот",
  icons: {
    icon: "/babushka-mascot.png",
    apple: "/babushka-mascot.png",
  },
  openGraph: {
    title: "Бабушкаробот — ИИ-маркетинговое агентство",
    description:
      "Разработка, интеграция и продвижение с помощью ИИ. Тёплый сервис с холодным интеллектом.",
    url: siteConfig.url,
    siteName: "Бабушкаробот",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/babushka-mascot.png", width: 283, height: 313, alt: "Маскот Бабушкаробот" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бабушкаробот — ИИ-маркетинговое агентство",
    description:
      "Разработка, интеграция и продвижение с помощью ИИ. Тёплый сервис с холодным интеллектом.",
    images: ["/babushka-mascot.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
