"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Mascot } from "@/components/layout/Mascot";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    text: "Бабушкаробот переделали нам техподдержку за 3 недели. Сейчас 67% обращений закрывает ИИ-бот, а операторы занимаются сложными случаями. NPS вырос на 14 пунктов за квартал.",
    author: "Ирина Соколова",
    role: "COO, B2B SaaS-платформа",
    company: "Москва",
  },
  {
    text: "Заказывали сквозную аналитику и ИИ-управление контекстом. Видим ROI каждого рубля рекламы. За 3 месяца снизили CAC на 28% при росте выручки с рекламы на 34%.",
    author: "Дмитрий Кравцов",
    role: "Маркетинг-директор",
    company: "Сеть фитнес-клубов",
  },
  {
    text: "Чат-бот для подбора квартир — лучшее, что мы сделали за год. Лиды выросли на 58%, нагрузка на менеджеров упала на треть. Бабушкаробот — партнёры, а не подрядчики.",
    author: "Анна Левина",
    role: "Коммерческий директор",
    company: "Девелопер бизнес-класса",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-saffron/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <Badge className="bg-saffron/15 text-plum hover:bg-saffron/20">Отзывы</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-plum text-balance">
              Нам доверяют бизнес — от стартапов до корпораций
            </h2>
            <p className="mt-4 text-muted-foreground">
              Каждый проект мы доводим до бизнес-метрик и берём ответственность
              за результат в договоре. Вот что говорят клиенты.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Mascot size={80} />
              <div>
                <div className="text-3xl font-extrabold text-coral">71</div>
                <div className="text-xs text-muted-foreground">NPS клиентов</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 ring-1 ring-plum/5 shadow-sm">
                  <Quote className="h-8 w-8 text-coral/20 mb-3" />
                  <p className="text-plum text-base leading-relaxed mb-4">{t.text}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-plum/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-plum text-cream font-bold">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-plum text-sm">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
