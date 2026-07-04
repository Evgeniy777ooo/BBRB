"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { contentPages, contentCategories, type ContentBlock } from "@/data/contentPages";
import { useContentRouter } from "@/hooks/use-content-router";
import { Mascot } from "@/components/layout/Mascot";

type ContentViewerProps = {
  slug: string;
};

export function ContentViewer({ slug }: ContentViewerProps) {
  const { handleLinkClick } = useContentRouter();
  const page = contentPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <Mascot size={100} />
          <h1 className="mt-4 text-2xl font-bold text-plum">Страница не найдена</h1>
          <p className="mt-2 text-muted-foreground">
            Возможно, ссылка устарела. Загляните в базу знаний — там больше 100 страниц про ИИ и маркетинг.
          </p>
          <Button
            onClick={() => handleLinkClick("/")}
            className="mt-4 bg-coral hover:bg-coral/90 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> На главную
          </Button>
        </Card>
      </div>
    );
  }

  const catMeta = contentCategories.find((c) => c.id === page.category);
  // Похожие страницы из той же категории
  const related = contentPages
    .filter((p) => p.category === page.category && p.slug !== page.slug)
    .slice(0, 4);

  return (
    <article className="min-h-screen bg-cream">
      {/* Хедер статьи */}
      <header className="bg-plum text-cream py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-saffron/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => handleLinkClick("/")}
            className="inline-flex items-center gap-1 text-cream/70 hover:text-saffron text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Назад
          </button>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `${catMeta?.color}30`,
                color: "#fff8f0",
              }}
            >
              {catMeta?.title}
            </span>
            <span className="text-xs text-cream/60 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {page.readTime}
            </span>
            <span className="text-xs text-cream/60 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {page.lastUpdated}
            </span>
            <span className="text-xs text-cream/60 flex items-center gap-1">
              <User className="h-3 w-3" /> {page.author}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-balance leading-tight">
            {page.title}
          </h1>
          <p className="mt-4 text-cream/80 text-lg text-pretty">{page.description}</p>
        </div>
      </header>

      {/* Тело статьи */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          <div className="space-y-4">
            {page.blocks.map((block, idx) => (
              <BlockRenderer key={idx} block={block} onNavigate={handleLinkClick} />
            ))}

            {/* Поделиться */}
            <ShareBar slug={page.slug} title={page.title} />
          </div>

          {/* Сайдбар */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-5 ring-1 ring-plum/5">
                <div className="flex items-center gap-2 mb-3">
                  <Mascot size={48} />
                  <div>
                    <div className="text-sm font-bold text-plum">Бабушкаробот</div>
                    <div className="text-xs text-muted-foreground">на связи</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Хотите такое же внедрение? Бесплатная консультация — 60 минут.
                </p>
                <Button
                  onClick={() => handleLinkClick("#contacts")}
                  className="w-full bg-coral hover:bg-coral/90 text-white text-sm"
                  size="sm"
                >
                  Оставить заявку
                </Button>
              </div>

              {related.length > 0 && (
                <div className="bg-white rounded-2xl p-5 ring-1 ring-plum/5">
                  <div className="text-sm font-bold text-plum mb-3">Похожие материалы</div>
                  <div className="space-y-2">
                    {related.map((r) => (
                      <button
                        key={r.slug}
                        onClick={() => handleLinkClick(`/page/${r.slug}`)}
                        className="block w-full text-left text-sm text-plum/80 hover:text-coral transition-colors leading-tight"
                      >
                        {r.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Подвал статьи — маскот + CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-plum text-cream p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
          <Mascot variant="wave" size={120} />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Обсудим ваш проект?</h3>
            <p className="text-cream/80">
              Бесплатная 60-минутная консультация: разберём задачу, прикинем решение и смету.
              Без воды и обязательств.
            </p>
          </div>
          <Button
            onClick={() => handleLinkClick("#contacts")}
            className="shrink-0 bg-coral hover:bg-coral/90 text-white"
            size="lg"
          >
            Записаться <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

function BlockRenderer({ block, onNavigate }: { block: ContentBlock; onNavigate: (href: string) => void }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-plum/90 leading-relaxed text-base md:text-lg">{block.text}</p>;

    case "heading":
      if (block.level === 3) {
        return <h3 className="text-xl font-bold text-plum mt-6 mb-2">{block.text}</h3>;
      }
      return <h2 className="text-2xl md:text-3xl font-extrabold text-plum mt-8 mb-3">{block.text}</h2>;

    case "list":
      return block.ordered ? (
        <ol className="space-y-2 ml-6 list-decimal">
          {block.items.map((item, i) => (
            <li key={i} className="text-plum/90 leading-relaxed">{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-plum/90 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-coral shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-coral pl-6 py-2 italic text-plum/80">
          <div className="text-lg">«{block.text}»</div>
          {block.author && <div className="mt-2 text-sm text-muted-foreground">— {block.author}</div>}
        </blockquote>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          {block.items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center ring-1 ring-plum/5">
              <div className="text-2xl font-extrabold text-coral">{item.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      );

    case "callout": {
      const variantStyles = {
        info: "bg-teal/10 ring-teal/20 text-plum",
        success: "bg-teal/10 ring-teal/20 text-plum",
        warning: "bg-saffron/15 ring-saffron/30 text-plum",
      };
      const variantIcons = { info: "💡", success: "✅", warning: "⚠️" };
      return (
        <div className={`rounded-2xl p-5 ring-1 ${variantStyles[block.variant ?? "info"]} my-4`}>
          <div className="font-bold mb-1 flex items-center gap-2">
            <span>{variantIcons[block.variant ?? "info"]}</span>
            {block.title}
          </div>
          <div className="text-sm text-plum/80">{block.text}</div>
        </div>
      );
    }

    case "cta":
      return (
        <div className="rounded-2xl bg-gradient-to-br from-plum to-plum/90 text-cream p-6 my-6 text-center">
          <h3 className="text-xl font-bold mb-2">{block.title}</h3>
          <p className="text-cream/80 text-sm mb-4">{block.text}</p>
          <Button
            onClick={() => onNavigate(block.href)}
            className="bg-coral hover:bg-coral/90 text-white"
          >
            {block.buttonLabel} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );

    case "faq":
      return (
        <Accordion type="single" collapsible className="space-y-3">
          {block.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="bg-white rounded-2xl px-5 shadow-sm ring-1 ring-plum/5 border-0"
            >
              <AccordionTrigger className="text-left text-plum font-semibold hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );

    default:
      return null;
  }
}

function ShareBar({ slug, title }: { slug: string; title: string }) {
  const shareUrl = `https://babushkarobot.ru/page/${slug}`;
  const shareText = encodeURIComponent(`${title} — Бабушкаробот`);

  return (
    <div className="flex items-center gap-2 pt-6 border-t border-plum/5 flex-wrap">
      <span className="text-sm text-muted-foreground mr-2">Поделиться:</span>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full bg-white ring-1 ring-plum/10 hover:ring-coral/30 text-plum transition-colors"
      >
        Telegram
      </a>
      <a
        href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full bg-white ring-1 ring-plum/10 hover:ring-coral/30 text-plum transition-colors"
      >
        ВКонтакте
      </a>
      <a
        href={`https://connect.ok.ru/offer?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full bg-white ring-1 ring-plum/10 hover:ring-coral/30 text-plum transition-colors"
      >
        Одноклассники
      </a>
    </div>
  );
}
