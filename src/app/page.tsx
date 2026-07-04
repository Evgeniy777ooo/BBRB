"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { PodcastShowcaseSection } from "@/components/sections/PodcastShowcaseSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { ContentHub } from "@/components/sections/ContentHub";
import { FAQSection } from "@/components/sections/FAQSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ContentViewer } from "@/components/sections/ContentViewer";
import { useContentRouter, useDocumentMeta } from "@/hooks/use-content-router";
import { getPageBySlug, getCategoryMeta } from "@/data/contentPages";

/**
 * Главная (и единственная) страница Next.js-приложения.
 *
 * Логика:
 *  - URL "/" → лендинг со всеми секциями
 *  - URL "/page/<slug>" → виртуальная страница из contentPages (через history API)
 *
 * Маршрутизация — клиентская, через useContentRouter. Кнопка "Назад" работает,
 * URL выглядят как настоящие (/page/chatbot-development) — хорошо для SEO.
 */
export default function Home() {
  const { route } = useContentRouter();
  // Обновляем document.title и meta description при смене маршрута
  useDocumentMeta();

  // Если URL указывает на /page/<slug> при первом рендере — синхронизируем
  useEffect(() => {
    if (typeof window !== "undefined") {
      const m = window.location.pathname.match(/^\/page\/([a-z0-9-]+)\/?$/i);
      if (m) {
        // уже на странице контента — роутер должен это отловить
      }
    }
  }, []);

  // Прокрутка наверх при переходе
  useEffect(() => {
    if (route.kind === "page") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [route]);

  if (route.kind === "page") {
    return (
      <>
        <ContentViewer slug={route.slug} />
        <PageJsonLd slug={route.slug} />
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <QuizSection />
      <PodcastShowcaseSection />
      <ServicesGrid />
      <ProcessSection />
      <AboutSection />
      <CasesSection />
      <ContentHub />
      <FAQSection />
      <SocialSection />
      <ContactSection />
      <HomeJsonLd />
    </>
  );
}

/** JSON-LD для главной — Organization + WebSite + FAQPage */
function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Бабушкаробот",
        legalName: 'Маркетинговое ИИ-агентство "Бабушкаробот"',
        url: "https://babushkarobot.ru",
        logo: "https://babushkarobot.ru/babushka-mascot.png",
        description:
          "Маркетинговое ИИ-агентство полного цикла. Разработка, интеграция и продвижение с помощью искусственного интеллекта.",
        foundingDate: "2023",
        email: "Oldgoodbatman@gmail.com",
        telephone: "+79650503125",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Лесная, 7, БЦ White Square, оф. 412",
          addressLocality: "Москва",
          postalCode: "125047",
          addressCountry: "RU",
        },
        sameAs: [
          "https://www.youtube.com/@babushkarobot/videos",
          "https://vk.com/romano",
          "https://ok.ru/group/67483579514923",
          "https://t.me/rancisvokami",
        ],
      },
      {
        "@type": "WebSite",
        name: "Бабушкаробот",
        url: "https://babushkarobot.ru",
        inLanguage: "ru-RU",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://babushkarobot.ru/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** JSON-LD для контентной страницы — Article + BreadcrumbList */
function PageJsonLd({ slug }: { slug: string }) {
  const page = getPageBySlug(slug);
  if (!page) return null;

  const catMeta = getCategoryMeta(page.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: page.title,
        description: page.description,
        keywords: page.keywords.join(", "),
        dateModified: page.lastUpdated,
        author: {
          "@type": "Organization",
          name: page.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Бабушкаробот",
          logo: {
            "@type": "ImageObject",
            url: "https://babushkarobot.ru/babushka-mascot.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://babushkarobot.ru/page/${slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: "https://babushkarobot.ru/" },
          { "@type": "ListItem", position: 2, name: catMeta?.title ?? "Раздел", item: `https://babushkarobot.ru/#${page.category}` },
          { "@type": "ListItem", position: 3, name: page.title, item: `https://babushkarobot.ru/page/${slug}` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
