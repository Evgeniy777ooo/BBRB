"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Mic, Youtube, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/layout/Mascot";
import { useContentRouter } from "@/hooks/use-content-router";

/**
 * PodcastShowcaseSection — крупный блок «ЕЩЁ МЫ СНИМАЕМ ПОДКАСТЫ»
 * с встроенным YouTube-видео.
 *
 * Чтобы поменять видео — отредактируйте VIDEO_ID и TITLE ниже.
 */

const VIDEO_ID = "3f-X7XQD5kU";
const VIDEO_TITLE =
  "Код Гениальности «Идеальных отношений» — Крипта, Любовь, Понимание с Алексеем и Юлией и Анна Проджект";
const VIDEO_CHANNEL = "Babushkarobot — Родные технологии";
const PLAYLIST_URL = "https://www.youtube.com/@babushkarobot/videos";

const PODCAST_FEATURES = [
  { icon: Mic, title: "Полный цикл", text: "От концепции до премьеры — сценарий, студия, запись, монтаж, дистрибуция" },
  { icon: Sparkles, title: "Живые истории", text: "Разговоры с людьми, которых интересно слушать. Без скриптов и воды" },
  { icon: Youtube, title: "Все площадки", text: "YouTube, Яндекс Музыка, Apple Podcasts, VK — публикуем везде" },
];

export function PodcastShowcaseSection() {
  const [playing, setPlaying] = useState(false);
  const { handleLinkClick } = useContentRouter();

  return (
    <section id="podcast" className="relative py-20 md:py-32 overflow-hidden bg-plum text-cream">
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff8f0 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <Badge className="bg-coral/20 text-saffron hover:bg-coral/30 border-0 mb-6">
            <Mic className="mr-1.5 h-3.5 w-3.5" />
            Подкасты Бабушкаробот
          </Badge>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance leading-[1.05]">
            ЕЩЁ МЫ СНИМАЕМ{" "}
            <span className="relative inline-block">
              <span className="text-coral">ПОДКАСТЫ</span>
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 300 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11C50 4 150 4 298 11"
                  stroke="#f4b942"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-cream/80 text-pretty max-w-3xl mx-auto">
            Живые разговоры с людьми, которых интересно слушать. Без скриптов и воды —
            только настоящие истории, инженерные разборы и тёплые разговоры о технологиях,
            бизнесе и людях. Снимаем и записываем под ключ.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-3 bg-gradient-to-tr from-coral/30 via-saffron/20 to-teal/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-cream/20 bg-black">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title={VIDEO_TITLE}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label={`Смотреть: ${VIDEO_TITLE}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt={VIDEO_TITLE}
                  className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-coral/40 animate-ping" />
                    <div className="relative flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-full bg-coral hover:bg-coral/90 transition-all group-hover:scale-110 shadow-2xl">
                      <Play className="h-9 w-9 md:h-12 md:w-12 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      СВЕЖИЙ ВЫПУСК
                    </span>
                    <span className="text-xs text-cream/60">{VIDEO_CHANNEL}</span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-cream text-balance leading-tight line-clamp-2">
                    {VIDEO_TITLE}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-cream/70 group-hover:text-cream transition-colors">
                    <Play className="h-4 w-4 fill-cream/70" />
                    <span>Смотреть выпуск</span>
                  </div>
                </div>
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
            <div className="text-sm text-cream/60 text-center sm:text-left">
              Все выпуски подкаста — на нашем YouTube-канале
            </div>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-saffron hover:text-coral transition-colors group"
            >
              <Youtube className="h-4 w-4" />
              Смотреть все выпуски
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PODCAST_FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-cream/5 backdrop-blur-sm p-6 ring-1 ring-cream/10"
            >
              <feature.icon className="h-8 w-8 text-saffron mb-3" />
              <div className="font-bold text-cream mb-1.5">{feature.title}</div>
              <div className="text-sm text-cream/70 leading-relaxed">{feature.text}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto rounded-3xl bg-cream/5 backdrop-blur-sm p-8 ring-1 ring-cream/10"
        >
          <Mascot variant="wave" size={100} />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Хотите свой подкаст?</h3>
            <p className="text-cream/80">
              Запускаем подкасты под ключ: концепция, студия, запись, монтаж, обложка,
              дистрибуция на все площадки. Вы приходите с идеей — мы возвращаем готовый
              выпуск каждую неделю.
            </p>
          </div>
          <Button
            onClick={() => handleLinkClick("/page/podcast-production")}
            className="shrink-0 bg-coral hover:bg-coral/90 text-white"
            size="lg"
          >
            Подробнее об услуге
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
