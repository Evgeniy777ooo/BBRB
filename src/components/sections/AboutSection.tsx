"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/layout/Mascot";
import { siteConfig } from "@/data/site";

const values = [
  { icon: Heart, title: "Забота как сервис", text: "Относимся к проекту клиента как к собственному. Бабушкино тепло — в каждом релизе.", color: "text-coral" },
  { icon: Sparkles, title: "Эффект важнее технологий", text: "Выбираем решение под задачу, а не наоборот. Никакого хайпа ради хайпа.", color: "text-saffron" },
  { icon: Shield, title: "Прозрачность во всём", text: "От сметы до кода, от сроков до метрик. Вы всегда знаете, что и зачем происходит.", color: "text-teal" },
  { icon: Users, title: "Партнёрство, а не подряд", text: "Растём вместе с клиентом. Многие из них с нами с первого года.", color: "text-plum" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-plum text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-saffron/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-cream/15 text-cream hover:bg-cream/20">О нас</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-balance">
              Бабушка + Робот ={" "}
              <span className="text-saffron">забота и интеллект</span> в одном агентстве
            </h2>
            <p className="mt-6 text-cream/80 text-lg text-pretty">
              Бабушкаробот — независимое маркетинговое ИИ-агентство, основанное в{" "}
              {siteConfig.founded} году. Мы соединяем заботу и внимание к клиенту —
              то, что отличает хорошую бабушку — с холодным интеллектом современных
              моделей машинного обучения.
            </p>
            <p className="mt-4 text-cream/70">
              На рынке ИИ-услуг много подрядчиков, которые умеют «сделать работающий
              прототип». Мы идём дальше: доводим проект до бизнес-метрик, считаем ROI
              до старта, отвечаем за результат в договоре.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {values.map((v) => (
                <Card key={v.title} className="bg-cream/5 border-0 ring-1 ring-cream/10 p-4">
                  <v.icon className={`h-6 w-6 ${v.color} mb-2`} />
                  <div className="font-bold text-cream mb-1 text-sm">{v.title}</div>
                  <div className="text-xs text-cream/70">{v.text}</div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-coral/30 via-saffron/20 to-teal/20 blur-3xl rounded-full scale-110" />
              <div className="relative bg-cream rounded-full p-6 shadow-2xl">
                <Mascot variant="float" size={260} />
              </div>

              <div className="absolute -top-4 -right-4 bg-saffron text-plum rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-xs font-medium opacity-70">с</div>
                <div className="text-2xl font-extrabold">{siteConfig.founded}</div>
                <div className="text-xs font-medium opacity-70">года</div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-coral text-white rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-xs font-medium opacity-90">всего</div>
                <div className="text-2xl font-extrabold">180+</div>
                <div className="text-xs font-medium opacity-90">проектов</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
