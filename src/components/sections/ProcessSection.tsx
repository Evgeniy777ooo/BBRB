"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { processSteps, stats } from "@/data/site";

const stepColors = [
  { bg: "bg-plum/5", text: "text-plum", num: "bg-plum text-cream" },
  { bg: "bg-coral/5", text: "text-coral", num: "bg-coral text-white" },
  { bg: "bg-teal/5", text: "text-teal", num: "bg-teal text-white" },
  { bg: "bg-saffron/15", text: "text-plum", num: "bg-saffron text-plum" },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <Badge className="bg-teal/10 text-teal hover:bg-teal/15">Как мы работаем</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
            Четыре шага от идеи до результата
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Прозрачный процесс без сюрпризов: на каждом этапе — конкретные артефакты,
            метрики «как было» и «как стало», понятные обязательства сторон.
          </p>
        </div>

        {/* Шаги процесса */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => {
            const colors = stepColors[idx];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <Card className={`h-full p-6 border-0 ring-1 ring-plum/10 ${colors.bg}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-lg ${colors.num}`}>
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {step.duration}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${colors.text}`}>{step.title}</h3>
                  <p className="text-sm text-plum/80 leading-relaxed">{step.description}</p>
                </Card>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10 transform -translate-y-1/2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10m0 0L7 2m5 5L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colors.text} />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Метрики */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-white p-6 text-center ring-1 ring-plum/5 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-coral">
                {s.value}<span className="text-saffron">{s.suffix}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
