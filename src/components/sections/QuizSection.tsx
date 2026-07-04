"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Данные квиза ────────────────────────────────────────────────────────────

type Option = { id: string; label: string; emoji: string };
type Step = {
  id: string;
  question: string;
  hint?: string;
  options: Option[];
};

const STEPS: Step[] = [
  {
    id: "goal",
    question: "Что хотите улучшить в первую очередь?",
    hint: "Выберите самую острую боль",
    options: [
      { id: "leads", label: "Больше клиентов и заявок", emoji: "🎯" },
      { id: "auto", label: "Автоматизировать рутину", emoji: "⚙️" },
      { id: "ads", label: "Реклама работает, но дорого", emoji: "💸" },
      { id: "content", label: "Нужен контент и продвижение", emoji: "✍️" },
    ],
  },
  {
    id: "business",
    question: "Как выглядит ваш бизнес сейчас?",
    options: [
      { id: "solo", label: "Я сам(а), ИП или фриланс", emoji: "🧑‍💻" },
      { id: "small", label: "Команда до 10 человек", emoji: "👥" },
      { id: "medium", label: "Компания 10–100 человек", emoji: "🏢" },
      { id: "big", label: "Крупный бизнес или сеть", emoji: "🏭" },
    ],
  },
  {
    id: "channel",
    question: "Откуда сейчас приходят клиенты?",
    hint: "Можно выбрать несколько — нажмите одно, что важнее всего",
    options: [
      { id: "word", label: "Сарафан и рекомендации", emoji: "🗣️" },
      { id: "social", label: "Соцсети — VK, Telegram, OK", emoji: "📱" },
      { id: "search", label: "Яндекс / Google реклама", emoji: "🔍" },
      { id: "none", label: "Пока почти не приходят", emoji: "🤷" },
    ],
  },
  {
    id: "speed",
    question: "Как быстро нужен результат?",
    options: [
      { id: "now", label: "Вчера — горим", emoji: "🔥" },
      { id: "month", label: "В течение месяца", emoji: "📅" },
      { id: "quarter", label: "На горизонте квартала", emoji: "🗓️" },
      { id: "explore", label: "Пока изучаю возможности", emoji: "🔭" },
    ],
  },
  {
    id: "contact",
    question: "Куда прислать персональный план?",
    hint: "Только телефон — не передаём третьим лицам",
    options: [], // спецшаг — форма
  },
];

// ─── Маппинг ответов → рекомендации ─────────────────────────────────────────

function buildRecommendation(answers: Record<string, string>): {
  title: string;
  items: string[];
} {
  const goal = answers.goal;
  const speed = answers.speed;

  const map: Record<string, { title: string; items: string[] }> = {
    leads: {
      title: "Воронка лидогенерации под ключ",
      items: [
        "Чат-бот для захвата заявок 24/7",
        "Контекстная реклама в Яндекс Директ",
        "ИИ-управление ставками (CPA ниже на 20–35%)",
        "Сквозная аналитика — видим каждый рубль",
      ],
    },
    auto: {
      title: "Автоматизация бизнес-процессов",
      items: [
        "ИИ-агент для рутинных задач",
        "Интеграция с CRM (amoCRM, Битрикс24)",
        "Автоматические отчёты и уведомления",
        "RAG-система по вашей базе знаний",
      ],
    },
    ads: {
      title: "Оптимизация рекламных расходов",
      items: [
        "Аудит текущих кампаний (бесплатно)",
        "ИИ-управление контекстом — авто-ставки",
        "A/B тесты объявлений в реальном времени",
        "Отчёт ROI по каждому каналу",
      ],
    },
    content: {
      title: "ИИ-контент и продвижение",
      items: [
        "Контент-план на 3 месяца",
        "SEO-страницы — 100+ в месяц",
        "Посты для VK, Telegram, OK",
        "Подкаст или видео под ключ",
      ],
    },
  };

  const rec = map[goal] ?? map.leads;

  if (speed === "now") {
    rec.items.unshift("⚡ Старт за 5 дней — экспресс-запуск");
  }

  return rec;
}

// ─── Главный компонент ────────────────────────────────────────────────────────

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  // форма контакта
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const currentStep = STEPS[step];
  const isContactStep = currentStep.options.length === 0;
  const progress = ((step) / (STEPS.length - 1)) * 100;

  function handleSelect(optionId: string) {
    setSelected(optionId);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [currentStep.id]: optionId }));
      setSelected(null);
      setStep((s) => s + 1);
    }, 280);
  }

  function handleBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
    setSelected(null);
  }

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон");
      return;
    }
    setError("");
    setSending(true);

    const rec = buildRecommendation(answers);
    const message = `Квиз-воронка:\nЦель: ${answers.goal}\nБизнес: ${answers.business}\nКанал: ${answers.channel}\nСроки: ${answers.speed}\n\nРекомендация: ${rec.title}\n${rec.items.join("; ")}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source: "Квиз" }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Не удалось отправить. Напишите нам: @rancisvokami");
      }
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setSending(false);
    }
  }

  const rec = buildRecommendation(answers);

  // ── Финальный экран ──────────────────────────────────────────────────────
  if (done) {
    return (
      <section id="quiz" className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/15 mb-6">
              <CheckCircle2 className="w-10 h-10 text-teal" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-plum mb-4">
              Готово, {name.split(" ")[0]}!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Персональный план уже летит к нам. Мы позвоним в течение рабочего дня —
              обсудим вашу ситуацию и расскажем, что реально сработает.
            </p>
            <div className="bg-white rounded-2xl border border-plum/10 shadow-sm p-6 text-left">
              <div className="text-sm font-semibold text-coral uppercase tracking-wide mb-3">
                Ваша рекомендация
              </div>
              <div className="text-lg font-bold text-plum mb-4">{rec.title}</div>
              <ul className="space-y-2">
                {rec.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="mx-auto max-w-3xl px-4">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-saffron/15 px-4 py-1.5 text-sm font-semibold text-plum mb-4">
            <Sparkles className="h-4 w-4 text-coral" />
            Подберём решение за 1 минуту
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-plum">
            Какой инструмент подойдёт вашему бизнесу?
          </h2>
          <p className="mt-2 text-muted-foreground">
            4 вопроса — и получите персональный план от Бабушкаробота
          </p>
        </div>

        {/* Прогресс-бар */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Шаг {Math.min(step + 1, STEPS.length)} из {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-plum/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-coral to-saffron rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Карточка шага */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl shadow-lg border border-plum/8 p-8 md:p-10"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold text-coral uppercase tracking-widest mb-2">
                {currentStep.hint ?? `Вопрос ${step + 1}`}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-plum">
                {currentStep.question}
              </h3>
            </div>

            {/* Варианты ответов */}
            {!isContactStep && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`group flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200
                      ${selected === opt.id
                        ? "border-coral bg-coral/8 scale-[0.98]"
                        : "border-plum/12 hover:border-coral/50 hover:bg-coral/4"
                      }`}
                  >
                    <span className="text-3xl shrink-0">{opt.emoji}</span>
                    <span className="font-semibold text-plum text-sm md:text-base leading-snug">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Контактный шаг */}
            {isContactStep && (
              <div className="space-y-4">
                {/* Превью рекомендации */}
                <div className="bg-plum/5 rounded-2xl p-5 mb-6">
                  <div className="text-xs font-semibold text-coral uppercase tracking-wide mb-2">
                    Ваш персональный план
                  </div>
                  <div className="font-bold text-plum mb-3">{rec.title}</div>
                  <ul className="space-y-1.5">
                    {rec.items.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-plum mb-1.5">
                    Как вас зовут?
                  </label>
                  <input
                    type="text"
                    placeholder="Имя или компания"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-plum/20 px-4 py-3 text-plum placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-coral/40 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-plum mb-1.5">
                    Телефон для связи
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-plum/20 px-4 py-3 text-plum placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-coral/40 bg-white"
                  />
                </div>
                {error && (
                  <p className="text-sm text-coral font-medium">{error}</p>
                )}
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={sending}
                  className="w-full bg-coral hover:bg-coral/90 text-white rounded-xl h-14 text-base font-bold"
                >
                  {sending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Отправляем…</>
                  ) : (
                    <>Получить персональный план <ArrowRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Не спамим. Позвоним один раз в рабочее время.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Кнопка назад */}
        {step > 0 && !isContactStep && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-plum transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
