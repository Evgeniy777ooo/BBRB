/**
 * ────────────────────────────────────────────────────────────────────────────
 *  УСЛУГИ — Бабушкаробот
 * ────────────────────────────────────────────────────────────────────────────
 *  Структура: 4 блока (ИИ-разработка, ИИ-интеграция, ИИ-продвижение, Performance-маркетинг).
 *  Каждый блок содержит категории услуг. Каждая категория — отдельная карточка.
 *  Чтобы добавить услугу — добавьте объект в массив соответствующей категории.
 *  `slug` должен совпадать со slug-ом в contentPages.ts, чтобы карточка вела на SEO-страницу.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  /** ключевые выгоды для карточки */
  benefits: string[];
  /** средний срок запуска */
  duration: string;
  /** индекс иконки из lucide-react (см. ServicesGrid.tsx → iconMap) */
  icon: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  tagline: string;
  accent: "plum" | "coral" | "saffron" | "teal";
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "ai-development",
    title: "ИИ-разработка",
    tagline: "Строим ИИ-продукты под вашу задачу — от чат-бота до собственного агента",
    accent: "plum",
    services: [
      {
        slug: "chatbot-development",
        title: "Чат-боты для бизнеса",
        shortDescription:
          "Диалоговые боты для Telegram, VK, сайта и мессенджеров. Понимают контекст, ведут по воронке, передают лиды в CRM.",
        benefits: ["Ответы 24/7", "Передача в CRM", "Мультиканальность"],
        duration: "от 2 недель",
        icon: "MessageSquare",
      },
      {
        slug: "ai-agents",
        title: "ИИ-агенты",
        shortDescription:
          "Автономные агенты, которые сами выполняют цепочки задач: поиск, анализ, рассылки, отчёты, дозвон.",
        benefits: ["Цепочки задач", "Инструменты", "Память диалогов"],
        duration: "от 3 недель",
        icon: "Bot",
      },
      {
        slug: "voice-assistants",
        title: "Голосовые ассистенты",
        shortDescription:
          "Голосовые роботы для колл-центров и IoT: распознают речь, ведут диалог, переводят в оператора при необходимости.",
        benefits: ["STT + TTS", "Распознавание интентов", "Эскалация"],
        duration: "от 4 недель",
        icon: "Mic",
      },
      {
        slug: "computer-vision",
        title: "Компьютерное зрение",
        shortDescription:
          "Распознавание объектов, лиц, документов, дефектов. Подходит для ритейла, производства, безопасности.",
        benefits: ["Object detection", "OCR", "Аналитика потока"],
        duration: "от 5 недель",
        icon: "Eye",
      },
      {
        slug: "rag-systems",
        title: "RAG-системы",
        shortDescription:
          "Базы знаний с ИИ-поиском: сотрудник задаёт вопрос — система ищет ответ в ваших документах и формулирует.",
        benefits: ["Поиск по документам", "Цитирование источников", "Без галлюцинаций"],
        duration: "от 3 недель",
        icon: "Library",
      },
      {
        slug: "ai-content-generation",
        title: "Генерация контента",
        shortDescription:
          "ИИ-генерация текстов, изображений, видео, аудио. Шаблоны под брендбук, массовая генерация, рерайтинг.",
        benefits: ["Бренд-стиль", "Массовая генерация", "API"],
        duration: "от 1 недели",
        icon: "Sparkles",
      },
    ],
  },
  {
    id: "ai-integration",
    title: "ИИ-интеграция",
    tagline: "Подключаем ИИ к вашим системам — CRM, ERP, BI, колл-центру, сайту",
    accent: "teal",
    services: [
      {
        slug: "ai-integration",
        title: "Внедрение ИИ в бизнес",
        shortDescription:
          "Аудит процессов, выбор моделей, разработка интеграции, обучение команды. ИИ начинает приносить деньги.",
        benefits: ["Аудит процессов", "ROI-калькулятор", "Обучение команды"],
        duration: "от 4 недель",
        icon: "Cpu",
      },
      {
        slug: "crm-ai-integration",
        title: "ИИ в CRM",
        shortDescription:
          "Подключаем GPT-модели к amoCRM, Битрикс24, Salesforce. Автоматические резюме сделок, прогнозы, рекомендации.",
        benefits: ["Авто-резюме", "Прогноз выручки", "Рекомендации"],
        duration: "от 2 недель",
        icon: "Workflow",
      },
      {
        slug: "helpdesk-ai",
        title: "ИИ для техподдержки",
        shortDescription:
          "Бот отвечает на 60–80% обращений первой линией. Сложные — эскалирует оператору с готовым черновиком ответа.",
        benefits: ["Снижение нагрузки 60%+", "SLA-контроль", "Готовые черновики"],
        duration: "от 2 недель",
        icon: "LifeBuoy",
      },
      {
        slug: "ai-automation",
        title: "Автоматизация рутины",
        shortDescription:
          "ИИ-агенты забирают на себя повторяющиеся операции: выгрузки, рассылки, классификацию, заполнение документов.",
        benefits: ["RPA + LLM", "Очереди задач", "Контроль качества"],
        duration: "от 3 недель",
        icon: "Cog",
      },
      {
        slug: "ai-data-platform",
        title: "ИИ-платформы данных",
        shortDescription:
          "Хранилище + ETL + векторная база + модели. Единая платформа для всех ИИ-сервисов компании.",
        benefits: ["Vector DB", "ETL-пайплайны", "Governance"],
        duration: "от 6 недель",
        icon: "Database",
      },
      {
        slug: "ai-api-development",
        title: "AI API и микросервисы",
        shortDescription:
          "Разрабатываем собственные API поверх открытых и коммерческих моделей. Можем продавать ИИ как сервис.",
        benefits: ["OpenAPI-спека", "Rate limits", "Биллинг"],
        duration: "от 2 недель",
        icon: "Webhook",
      },
    ],
  },
  {
    id: "ai-promotion",
    title: "ИИ-продвижение",
    tagline: "Привлекаем трафик и лиды с помощью ИИ — быстрее, точнее, дешевле",
    accent: "coral",
    services: [
      {
        slug: "ai-seo",
        title: "ИИ-SEO-продвижение",
        shortDescription:
          "Генерация SEO-оптимизированных посадочных страниц в масштабе: 100+ страниц в месяц под семантику, без потери качества.",
        benefits: ["100+ страниц/мес", "Авто-перелинковка", "Топ-10 за 4–6 мес"],
        duration: "от 1 месяца",
        icon: "TrendingUp",
      },
      {
        slug: "ai-context-ads",
        title: "ИИ-управление контекстом",
        shortDescription:
          "ИИ-агенты управляют ставками, генерируют объявления, тестируют заголовки. CPA ниже на 20–35% по сравнению с ручным управлением.",
        benefits: ["Авто-ставки", "Генерация объявлений", "A/B-тесты"],
        duration: "от 2 недель",
        icon: "Target",
      },
      {
        slug: "ai-targeting",
        title: "ИИ-таргет в соцсетях",
        shortDescription:
          "Генерация креативов, аудиторий и стратегий для VK, OK, Telegram Ads. ИИ находит похожих на ваших лучших клиентов.",
        benefits: ["Look-alike", "Авто-креативы", "Кросс-платформа"],
        duration: "от 2 недель",
        icon: "Share2",
      },
      {
        slug: "ai-content-marketing",
        title: "ИИ-контент-маркетинг",
        shortDescription:
          "Контент-план, генерация статей, видео-сценариев, постов. Топики подбираются на основе анализа поискового спроса.",
        benefits: ["Контент-план", "Мульти-формат", "Бренд-голос"],
        duration: "от 1 месяца",
        icon: "PenLine",
      },
      {
        slug: "ai-email-marketing",
        title: "ИИ-email-маркетинг",
        shortDescription:
          "Персонализированные рассылки: ИИ сегментирует базу, генерирует темы, выбирает время отправки, пишет тело письма.",
        benefits: ["Сегментация", "A/B темы", "Динамический контент"],
        duration: "от 2 недель",
        icon: "Mail",
      },
      {
        slug: "ai-influencer-marketing",
        title: "ИИ-инфлюенсер-маркетинг",
        shortDescription:
          "Поиск блогеров, оценка аудитории ИИ, автоматическая рассылка КП, отслеживание упоминаний и ROI.",
        benefits: ["Подбор блогеров", "Анти-фрод", "ROI-аналитика"],
        duration: "от 2 недель",
        icon: "Users",
      },
    ],
  },
  {
    id: "performance-marketing",
    title: "Performance-маркетинг",
    tagline: "Полный спектр инструментов digital-маркетинга под ключ — без посредников",
    accent: "saffron",
    services: [
      {
        slug: "contextual-advertising",
        title: "Контекстная реклама",
        shortDescription:
          "Яндекс Директ, Google Ads, ВКонтакте Реклама. Настройка, ведение, оптимизация. Прозрачные отчёты по расходам и конверсиям.",
        benefits: ["Я.Директ + Google Ads", "Семантика 1000+", "Ведение 24/7"],
        duration: "от 5 дней",
        icon: "Megaphone",
      },
      {
        slug: "social-targeting",
        title: "Таргетированная реклама",
        shortDescription:
          "Реклама в VK, OK, Telegram Ads. Подбор аудиторий, креативы, ведение кампаний, оптимизация CPA.",
        benefits: ["VK + OK + TG Ads", "Парсеры аудиторий", "Авто-креативы"],
        duration: "от 5 дней",
        icon: "MousePointerClick",
      },
      {
        slug: "seo-promotion",
        title: "SEO-продвижение",
        shortDescription:
          "Технический аудит, семантическое ядро, контент-стратегия, наращивание ссылочной массы. Рост органического трафика.",
        benefits: ["Тех. аудит", "Семантика 5000+", "Контент-стратегия"],
        duration: "от 1 месяца",
        icon: "Search",
      },
      {
        slug: "web-analytics",
        title: "Веб-аналитика",
        shortDescription:
          "Настройка Яндекс Метрики, Google Analytics 4, серверный трекинг. Карточки отчётов под KPI бизнеса.",
        benefits: ["Метрика + GA4", "Server-side", "Цели и воронки"],
        duration: "от 5 дней",
        icon: "BarChart3",
      },
      {
        slug: "end-to-end-analytics",
        title: "Сквозная аналитика",
        shortDescription:
          "Связываем рекламные каналы, CRM и выручку. Видим реальный ROI каждого рубля рекламы.",
        benefits: ["Расход → Сделка → Деньги", "Мульти-канал", "ROI по каналам"],
        duration: "от 2 недель",
        icon: "Network",
      },
      {
        slug: "call-tracking",
        title: "Колл-трекинг",
        shortDescription:
          "Динамический и статический call-трекинг. Знаем, с какого объявления позвонили, сколько длился разговор, был ли продаж.",
        benefits: ["Динамический + статический", "Записи звонков", "ИИ-разметка"],
        duration: "от 5 дней",
        icon: "PhoneCall",
      },
    ],
  },
];

/** Сводный список всех услуг — для удобного импорта в footer, sitemap и т.д. */
export const allServices: Service[] = serviceCategories.flatMap((cat) => cat.services);

/** Найти категорию по id */
export function getCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.id === id);
}

/** Найти услугу по slug */
export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}
