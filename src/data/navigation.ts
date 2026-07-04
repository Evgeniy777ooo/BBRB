/**
 * ────────────────────────────────────────────────────────────────────────────
 *  НАВИГАЦИЯ САЙТА
 * ────────────────────────────────────────────────────────────────────────────
 *  Чтобы добавить пункт меню — добавьте объект в массив mainNav.
 *  `href` с символом `#` ведёт к якорной секции на главной.
 *  `href` с символом `/page/...` открывает страницу из contentPages по slug.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type NavItem = {
  label: string;
  href: string;
  matchCategory?: string;
};

export const mainNav: NavItem[] = [
  { label: "Услуги", href: "#services", matchCategory: "services" },
  { label: "ИИ-разработка", href: "/page/ai-development", matchCategory: "ai-development" },
  { label: "ИИ-интеграция", href: "/page/ai-integration", matchCategory: "ai-integration" },
  { label: "Продвижение", href: "#promotion", matchCategory: "ai-promotion" },
  { label: "Кейсы", href: "#cases", matchCategory: "cases" },
  { label: "База знаний", href: "#knowledge", matchCategory: "guides" },
  { label: "Контакты", href: "#contacts", matchCategory: "contacts" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "ИИ-разработка",
    items: [
      { label: "Чат-боты", href: "/page/chatbot-development" },
      { label: "ИИ-агенты", href: "/page/ai-agents" },
      { label: "Голосовые ассистенты", href: "/page/voice-assistants" },
      { label: "Компьютерное зрение", href: "/page/computer-vision" },
      { label: "RAG-системы", href: "/page/rag-systems" },
    ],
  },
  {
    title: "Продвижение",
    items: [
      { label: "Контекстная реклама", href: "/page/contextual-advertising" },
      { label: "Таргет в соцсетях", href: "/page/social-targeting" },
      { label: "SEO-продвижение", href: "/page/seo-promotion" },
      { label: "Email-маркетинг", href: "/page/email-marketing" },
      { label: "Контент-маркетинг", href: "/page/content-marketing" },
    ],
  },
  {
    title: "Аналитика",
    items: [
      { label: "Веб-аналитика", href: "/page/web-analytics" },
      { label: "Сквозная аналитика", href: "/page/end-to-end-analytics" },
      { label: "Дашборды", href: "/page/business-dashboards" },
      { label: "Call-трекинг", href: "/page/call-tracking" },
      { label: "Аудит маркетинга", href: "/page/marketing-audit" },
    ],
  },
  {
    title: "Агентство",
    items: [
      { label: "О нас", href: "#about" },
      { label: "Команда", href: "/page/team" },
      { label: "Кейсы", href: "#cases" },
      { label: "База знаний", href: "#knowledge" },
      { label: "Контакты", href: "#contacts" },
    ],
  },
];
