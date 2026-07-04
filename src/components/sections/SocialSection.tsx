"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { socialLinks } from "@/data/site";
import { SocialIcon } from "@/components/layout/SocialIcons";
import { Mascot } from "@/components/layout/Mascot";

const iconBg: Record<string, string> = {
  youtube: "bg-red-500/10 hover:bg-red-500/20 text-red-600",
  vk: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600",
  ok: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-600",
  telegram: "bg-sky-500/10 hover:bg-sky-500/20 text-sky-600",
};

export function SocialSection() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-saffron/15 text-plum hover:bg-saffron/20">Мы в соцсетях</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
            Подписывайтесь на Бабушкаробот
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Кейсы, разборы ИИ-инструментов, лайфхаки по автоматизации и
            продвижению. Публикуем везде, где удобно вам — выбирайте площадку.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="h-full p-6 ring-1 ring-plum/5 transition-all hover:shadow-lg hover:-translate-y-1 hover:ring-coral/30">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${iconBg[social.icon]}`}>
                    <SocialIcon name={social.icon} className="h-7 w-7" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-plum mb-1">{social.label}</h3>
                <div className="text-xs text-coral font-medium mb-2">{social.handle}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{social.description}</p>
              </Card>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Mascot variant="wave" size={100} />
          <div className="text-sm text-muted-foreground max-w-sm">
            В Telegram <a href="https://t.me/rancisvokami" target="_blank" rel="noopener noreferrer" className="text-coral font-medium hover:underline">@rancisvokami</a> —
            бот-ассистент и канал с оперативными новостями. Заглядывайте в гости!
          </div>
        </div>
      </div>
    </section>
  );
}
