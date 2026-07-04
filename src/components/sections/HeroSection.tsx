"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/layout/Mascot";
import { siteConfig } from "@/data/site";
import { useContentRouter } from "@/hooks/use-content-router";

const highlights = [
  "Бесплатный аудит за 60 минут",
  "ROI-калькулятор до старта",
  "KPI фиксируем в договоре",
];

export function HeroSection() {
  const { handleLinkClick } = useContentRouter();

  return (
    <section className="relative overflow-hidden bg-grain bg-cream pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Декоративные пятна — бабушкин платок */}
      <div className="absolute inset-0 bg-platok pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая часть — текст */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-plum/8 px-4 py-1.5 text-sm font-medium text-plum mb-6">
              <Sparkles className="h-4 w-4 text-coral" />
              Маркетинговое ИИ-агентство полного цикла
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-plum text-balance leading-[1.05]">
              Тёплый сервис <br />
              с <span className="text-coral">холодным</span> <br />
              <span className="relative inline-block">
                интеллектом
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9C50 3 150 3 298 9"
                    stroke="#f4b942"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground text-pretty max-w-xl">
              Бабушкаробот — это ИИ-разработка, интеграция и продвижение под ключ.
              Чат-боты, ИИ-агенты, контекст и таргет, SEO, аналитика —
              всё в одном месте, с человеческим лицом и машинной точностью.
            </p>

            <ul className="mt-6 space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm font-medium text-plum">
                  <CheckCircle2 className="h-5 w-5 text-teal shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => handleLinkClick("#contacts")}
                className="bg-coral hover:bg-coral/90 text-white"
              >
                Получить бесплатный аудит
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleLinkClick("#services")}
                className="border-plum/30 text-plum hover:bg-plum/5"
              >
                Посмотреть услуги
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <div className="text-2xl font-extrabold text-plum">180+</div>
                <div>проектов</div>
              </div>
              <div className="w-px h-10 bg-plum/15" />
              <div>
                <div className="text-2xl font-extrabold text-plum">2.4×</div>
                <div>рост лидов</div>
              </div>
              <div className="w-px h-10 bg-plum/15" />
              <div>
                <div className="text-2xl font-extrabold text-plum">71</div>
                <div>NPS</div>
              </div>
            </div>
          </motion.div>

          {/* Правая часть — маскот + карточка-«чaт» */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Свечение за маскотом */}
              <div className="absolute inset-0 bg-gradient-to-tr from-coral/20 via-saffron/15 to-teal/10 blur-2xl rounded-full scale-110" />

              {/* Кружок с маскотом */}
              <div className="relative bg-white rounded-full p-8 shadow-2xl ring-1 ring-coral/15">
                <Mascot variant="float" size={280} priority />
              </div>

              {/* Плавающая карточка — «приветствие» */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -left-6 top-12 bg-plum text-cream rounded-2xl px-4 py-3 shadow-xl max-w-[200px] hidden md:block"
              >
                <div className="text-xs text-cream/60 mb-0.5">Бабушкаробот:</div>
                <div className="text-sm font-medium">
                  Привет! Я сварю тебе ИИ-стратегию за 60 минут 😉
                </div>
                <div className="absolute -right-2 top-6 h-3 w-3 rotate-45 bg-plum" />
              </motion.div>

              {/* Плавающая карточка — «метрика» */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-4 bottom-10 bg-white rounded-2xl px-4 py-3 shadow-xl hidden md:block"
              >
                <div className="text-xs text-muted-foreground">ROI клиента за 90 дней</div>
                <div className="text-2xl font-extrabold text-coral">+215%</div>
                <div className="text-[10px] text-teal">↑ 2.4× рост конверсии</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
