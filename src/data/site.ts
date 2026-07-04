/**
 * ────────────────────────────────────────────────────────────────────────────
 *  КОНФИГУРАЦИЯ САЙТА — Бабушкаробот
 * ────────────────────────────────────────────────────────────────────────────
 *  Здесь меняются: телефон, email, адрес, ссылки на соцсети, базовый URL.
 *  Эти данные подтягиваются в Header, Footer, Contact-секции и в JSON-LD.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Бабушкаробот",
  legalName: 'Маркетинговое ИИ-агентство "Бабушкаробот"',
  tagline: "Тёплый сервис с холодным интеллектом",
  shortDescription:
    "Маркетинговое ИИ-агентство полного цикла: разработка, интеграция и продвижение с помощью искусственного интеллекта.",
  url: "https://babushkarobot.ru",
  email: "Oldgoodbatman@gmail.com",
  phone: "+7 (965) 050-31-25",
  phoneHref: "+79650503125",
  telegram: "t.me/rancisvokami",
  telegramHref: "https://t.me/rancisvokami",
  address: {
    locality: "Москва",
    region: "Московская область",
    country: "Россия",
    street: "ул. Лесная, 7, БЦ White Square, оф. 412",
    postalCode: "125047",
  },
  workingHours: "Пн–Пт 10:00–19:00 (МСК)",
  inn: "7707332548",
  ogImage: "/babushka-mascot.png",
  founded: 2023,
} as const;

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
  description: string;
  icon: "youtube" | "vk" | "ok" | "telegram";
};

export const socialLinks: SocialLink[] = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@babushkarobot/videos",
    handle: "@babushkarobot",
    description: "Видео-кейсы, разборы ИИ-инструментов и обучающие ролики",
    icon: "youtube",
  },
  {
    id: "vk",
    label: "ВКонтакте",
    href: "https://vk.com/romano",
    handle: "vk.com/romano",
    description: "Сообщество, новости агентства и публикации команды",
    icon: "vk",
  },
  {
    id: "ok",
    label: "Одноклассники",
    href: "https://ok.ru/group/67483579514923",
    handle: "ok.ru/babushkarobot",
    description: "Канал для аудитории Одноклассников: лайфхаки и кейсы",
    icon: "ok",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/rancisvokami",
    handle: "@rancisvokami",
    description: "Бот-ассистент и канал с оперативными новостями",
    icon: "telegram",
  },
];

export const stats = [
  { label: "Проектов внедрили", value: "180+", suffix: "" },
  { label: "Средний рост лидов", value: "2.4", suffix: "×" },
  { label: "Часов автоматизировано", value: "12 500", suffix: "" },
  { label: "NPS клиентов", value: "71", suffix: "" },
];

export const processSteps = [
  {
    title: "Знакомство и аудит",
    description:
      "Бабушкаробот варит кофе, слушает задачу и проводит бесплатный аудит: считаем узкие места, оцениваем потенциал автоматизации и продвижения, составляем карту возможностей.",
    duration: "1–2 встречи",
  },
  {
    title: "Стратегия и прототип",
    description:
      "Формируем дорожную карту: какие ИИ-сервисы и какие каналы продвижения подключаем, в каком порядке, с какими метриками. На выходе — прототип и смета.",
    duration: "5–10 дней",
  },
  {
    title: "Внедрение и интеграция",
    description:
      "Разрабатываем чат-ботов, агентов, дашборды, подключаем рекламные кабинеты, CRM, аналитику. Каждый спринт — с демо и приёмкой.",
    duration: "2–8 недель",
  },
  {
    title: "Продвижение и оптимизация",
    description:
      "Запускаем кампании в контексте, таргете, SEO. ИИ-агенты continuously оптимизируют ставки, объявления и контент. Раз в неделю — отчёт с выводами.",
    duration: "постоянно",
  },
];
