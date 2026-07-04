"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { contentPages } from "@/data/contentPages";
import { useContentRouter } from "@/hooks/use-content-router";

/**
 * CasesSection — превью кейсов из базы контента.
 * Показывает 6 кейсов из категории "cases".
 */
export function CasesSection() {
  const { handleLinkClick } = useContentRouter();
  const cases = contentPages.filter((p) => p.category === "cases").slice(0, 6);

  return (
    <section id="cases" className="py-20 md:py-28 bg-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <Badge className="bg-plum/10 text-plum hover:bg-plum/15">Кейсы</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
              Реальные результаты — с метриками «до и после»
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Не верим в «работающий прототип» — верим в бизнес-эффект.
              Вот несколько проектов, которые мы довели до результата.
            </p>
          </div>
          <button
            onClick={() => handleLinkClick("#knowledge")}
            className="text-coral font-medium hover:underline whitespace-nowrap"
          >
            Все кейсы →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, idx) => {
            // Извлекаем метрики из блоков stats
            const statsBlock = c.blocks.find((b) => b.type === "stats");
            const metrics = statsBlock && statsBlock.type === "stats" ? statsBlock.items.slice(0, 3) : [];

            return (
              <motion.button
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => handleLinkClick(`/page/${c.slug}`)}
                className="text-left group"
              >
                <Card className="h-full p-6 ring-1 ring-plum/5 transition-all hover:shadow-lg hover:-translate-y-1 hover:ring-coral/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-coral/10 text-coral font-medium">
                      Кейс
                    </span>
                    <span className="text-xs text-muted-foreground">{c.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-plum group-hover:text-coral transition-colors mb-3 line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {c.description}
                  </p>

                  {metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-plum/5">
                      {metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-base font-extrabold text-teal">{m.value}</div>
                          <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-1 text-sm text-coral font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Читать кейс <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
