"use client";

import { motion } from "framer-motion";
import {
  MessageSquare, Bot, Mic, Eye, Library, Sparkles,
  Cpu, Workflow, LifeBuoy, Cog, Database, Webhook,
  TrendingUp, Target, Share2, PenLine, Mail, Users,
  Megaphone, MousePointerClick, Search, BarChart3, Network, PhoneCall,
  LayoutDashboard, ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { serviceCategories } from "@/data/services";
import { useContentRouter } from "@/hooks/use-content-router";
import { Mascot } from "@/components/layout/Mascot";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare, Bot, Mic, Eye, Library, Sparkles,
  Cpu, Workflow, LifeBuoy, Cog, Database, Webhook,
  TrendingUp, Target, Share2, PenLine, Mail, Users,
  Megaphone, MousePointerClick, Search, BarChart3, Network, PhoneCall,
  LayoutDashboard, ClipboardCheck,
};

const accentMap: Record<string, { bg: string; text: string; ring: string; badge: string }> = {
  plum:   { bg: "bg-plum/5",   text: "text-plum",   ring: "group-hover:ring-plum/30",   badge: "bg-plum/10 text-plum" },
  coral:  { bg: "bg-coral/5",  text: "text-coral",  ring: "group-hover:ring-coral/30",  badge: "bg-coral/10 text-coral" },
  saffron:{ bg: "bg-saffron/5",text: "text-saffron",ring: "group-hover:ring-saffron/30",badge: "bg-saffron/15 text-plum" },
  teal:   { bg: "bg-teal/5",   text: "text-teal",   ring: "group-hover:ring-teal/30",   badge: "bg-teal/10 text-teal" },
};

export function ServicesGrid() {
  const { handleLinkClick } = useContentRouter();

  return (
    <section id="services" className="py-20 md:py-28 bg-cream relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <Badge className="bg-coral/10 text-coral hover:bg-coral/15">Услуги</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
            Всё, что нужно для роста бизнеса с ИИ
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            От разработки чат-бота до управления рекламой в Яндекс Директ и VK —
            мы закрываем весь цикл. Не нужно ходить в три агентства: одно окно,
            одна команда, единая ответственность за результат.
          </p>
        </div>

        <div className="space-y-12">
          {serviceCategories.map((cat, catIdx) => {
            const accent = accentMap[cat.accent];
            return (
              <div key={cat.id}>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className={`text-sm font-bold ${accent.text}`}>
                    0{catIdx + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-plum">{cat.title}</h3>
                  <div className="flex-1 h-px bg-plum/10" />
                  <span className="text-sm text-muted-foreground hidden md:block">{cat.tagline}</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.services.map((service, idx) => {
                    const Icon = iconMap[service.icon] ?? Sparkles;
                    return (
                      <motion.button
                        key={service.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        onClick={() => handleLinkClick(`/page/${service.slug}`)}
                        className="group text-left"
                      >
                        <Card className={`h-full ring-1 ring-plum/5 transition-all hover:shadow-lg hover:-translate-y-1 ${accent.bg} ${accent.ring}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ${accent.text}`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${accent.badge} font-medium`}>
                                {service.duration}
                              </span>
                            </div>
                            <CardTitle className="text-lg text-plum group-hover:text-coral transition-colors">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                              {service.shortDescription}
                            </p>
                            <ul className="space-y-1">
                              {service.benefits.map((b) => (
                                <li key={b} className="text-xs text-plum/70 flex items-center gap-1.5">
                                  <span className={`h-1 w-1 rounded-full ${accent.text.replace('text-', 'bg-')}`} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA с маскотом */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-plum text-cream p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-saffron/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <Mascot variant="wave" size={120} />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Не нашли нужную услугу?</h3>
              <p className="text-cream/80 max-w-2xl">
                У нас есть готовые решения и под нестандартные задачи. Опишите, что нужно —
                Бабушкаробот подберёт стек и прикинет смету бесплатно.
              </p>
            </div>
            <button
              onClick={() => handleLinkClick("#contacts")}
              className="shrink-0 rounded-full bg-coral hover:bg-coral/90 px-6 py-3 font-semibold text-white transition-colors"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
