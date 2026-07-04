"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { contentPages } from "@/data/contentPages";
import { useContentRouter } from "@/hooks/use-content-router";
import { Mascot } from "@/components/layout/Mascot";

/**
 * FAQSection — превью часто задаваемых вопросов.
 * Берёт первую FAQ-страницу из базы контента и показывает её вопросы.
 */
export function FAQSection() {
  const { handleLinkClick } = useContentRouter();
  const faqPage = contentPages.find((p) => p.slug === "faq-prices");
  const faqBlock = faqPage?.blocks.find((b) => b.type === "faq");
  const items = faqBlock && faqBlock.type === "faq" ? faqBlock.items.slice(0, 6) : [];

  return (
    <section id="faq" className="py-20 md:py-28 bg-cream bg-grain">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-coral/10 text-coral hover:bg-coral/15">Вопросы и ответы</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
            Отвечаем на частые вопросы
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Если не нашли свой — задайте в Telegram{" "}
            <a href="https://t.me/rancisvokami" target="_blank" rel="noopener noreferrer" className="text-coral font-medium hover:underline">
              @rancisvokami
            </a>
            , ответим в течение рабочего дня.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="bg-white rounded-2xl px-5 shadow-sm ring-1 ring-plum/5 border-0"
                >
                  <AccordionTrigger className="text-left text-plum font-semibold hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-6 text-center">
              <button
                onClick={() => handleLinkClick("/page/faq-prices")}
                className="text-coral font-medium hover:underline"
              >
                Все вопросы и ответы →
              </button>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-col items-center gap-3 sticky top-24">
            <Mascot variant="wave" size={140} />
            <div className="text-center max-w-[180px] text-sm text-muted-foreground">
              Бабушкаробот отвечает честно — даже когда ответ «не знаем»
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
