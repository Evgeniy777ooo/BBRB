# 🚀 Деплой Бабушкаробот на Vercel

## Что сделано

- ✅ `/api/contact` — отправляет красивое HTML-письмо на `oldgoodbatman@gmail.com` через Resend
- ✅ Telegram-уведомление (если задан токен) — теперь только на сервере
- ✅ Убран сломанный Telegram-запрос без токена из фронтенда
- ✅ `reply_to` в письме = email клиента → можно ответить прямо из Gmail

---

## Шаг 1 — Получить API-ключ Resend (5 минут, бесплатно)

1. Зайти на [resend.com](https://resend.com) → **Sign up**
2. **API Keys** → **Create API Key** → скопировать `re_...`
3. **Domains** → **Add Domain** → добавить `babushkarobot.ru`
   - Прописать DNS-записи у регистратора (Resend покажет инструкцию)
   - Без домена можно слать только на `oldgoodbatman@gmail.com` в тестовом режиме (с `onboarding@resend.dev`)

> ⚠️ **Пока домен не подтверждён** — в `route.ts` замени `from` на:
> ```
> from: "Бабушкаробот <onboarding@resend.dev>"
> ```
> После верификации домена верни обратно `noreply@babushkarobot.ru`

---

## Шаг 2 — Загрузить на GitHub

```bash
git add -A
git commit -m "feat: email via Resend, contact form fix"
git push
```

Если репозитория нет — создать на [github.com/new](https://github.com/new) и:

```bash
git remote add origin https://github.com/ВАШ_НИКИ/babushkarobot.git
git push -u origin main
```

---

## Шаг 3 — Деплой на Vercel

1. Зайти на [vercel.com](https://vercel.com) → **Add New Project**
2. Выбрать репозиторий `babushkarobot`
3. Framework: **Next.js** (определяется автоматически)
4. **Environment Variables** — добавить:

| Ключ | Значение |
|------|----------|
| `RESEND_API_KEY` | `re_xxxxxxxxxx` |
| `CONTACT_EMAIL` | `oldgoodbatman@gmail.com` |
| `DATABASE_URL` | (см. ниже) |

5. Нажать **Deploy**

### База данных на Vercel

SQLite не работает на Vercel (serverless). Варианты:

**Вариант A — Vercel Postgres (Neon, бесплатно)**
1. В Vercel → Storage → **Create Database** → Postgres
2. Скопировать `DATABASE_URL` → вставить в переменные
3. Поменять в `prisma/schema.prisma`: `provider = "postgresql"`
4. `npx prisma db push`

**Вариант B — Если БД не нужна сейчас**
Заявки идут на email — база не используется.
Убери Prisma из билда временно:
```bash
# В package.json убери "prisma generate" из postinstall если есть
```

---

## Шаг 4 — Привязать домен

1. Vercel → Settings → **Domains** → добавить `babushkarobot.ru`
2. У регистратора домена прописать:
   - `A 76.76.21.21` (или CNAME `cname.vercel-dns.com`)
3. Vercel автоматически выдаст SSL

---

## Шаг 5 — Проверить

Отправить тестовую заявку через форму на сайте → должно прийти письмо на `oldgoodbatman@gmail.com`

---

## Опционально: Telegram-уведомления

Добавить в Vercel Environment Variables:
- `TELEGRAM_BOT_TOKEN` — токен от @BotFather
- `TELEGRAM_CHAT_ID` — твой chat_id (узнать через @userinfobot)

Тогда каждая заявка будет приходить **и на email, и в Telegram** одновременно.

---

## Структура проекта

```
src/
  app/
    api/
      contact/route.ts   ← Обработчик заявок (email + Telegram)
  components/
    sections/
      ContactSection.tsx ← Форма на сайте
  data/
    site.ts              ← Настройки сайта (название, контакты)
```
