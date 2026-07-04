"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * useContentRouter — клиентский роутер для виртуальных страниц `/page/<slug>`.
 *
 * Подход: используем History API + popstate + общий модуль-синглтон,
 * чтобы все компоненты на странице видели одно и то же состояние маршрута.
 * URL выглядит как настоящий (/page/chatbot-development), что хорошо для SEO.
 */

export type RouteState =
  | { kind: "home" }
  | { kind: "page"; slug: string };

function parsePath(pathname: string): RouteState {
  const m = pathname.match(/^\/page\/([a-z0-9-]+)\/?$/i);
  if (m) return { kind: "page", slug: m[1] };
  return { kind: "home" };
}

// ─── Глобальное состояние (синглтон на модуль) ─────────────────────────────
let currentRoute: RouteState =
  typeof window !== "undefined" ? parsePath(window.location.pathname) : { kind: "home" };
const listeners = new Set<(r: RouteState) => void>();

function setRouteInternal(r: RouteState) {
  currentRoute = r;
  listeners.forEach((l) => l(r));
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    setRouteInternal(parsePath(window.location.pathname));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

export function useContentRouter() {
  const [route, setRoute] = useState<RouteState>(currentRoute);

  useEffect(() => {
    const cb = (r: RouteState) => setRoute(r);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  /** Открыть виртуальную страницу по slug */
  const navigateToPage = useCallback((slug: string) => {
    const url = `/page/${slug}`;
    if (typeof window !== "undefined" && window.location.pathname !== url) {
      window.history.pushState({ slug }, "", url);
    }
    setRouteInternal({ kind: "page", slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /** Вернуться на главную */
  const navigateHome = useCallback(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
    setRouteInternal({ kind: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /** Перейти к якорю на главной */
  const navigateToAnchor = useCallback((anchor: string) => {
    const cleanAnchor = anchor.replace(/^#/, "");
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      setRouteInternal({ kind: "home" });
      setTimeout(() => {
        document.getElementById(cleanAnchor)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(cleanAnchor)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /** Универсальный обработчик клика по ссылке */
  const handleLinkClick = useCallback(
    (href: string) => {
      if (href.startsWith("/page/")) {
        const slug = href.replace("/page/", "").replace(/\/$/, "");
        navigateToPage(slug);
      } else if (href.startsWith("#")) {
        navigateToAnchor(href);
      } else if (href === "/" || href === "") {
        navigateHome();
      } else if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        // Внешняя ссылка или протокольная — открываем в новой вкладке для http/https
        if (href.startsWith("http")) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = href;
        }
      } else {
        // Любой другой путь — inner navigation на главную + якорь
        navigateHome();
      }
    },
    [navigateToPage, navigateToAnchor, navigateHome],
  );

  return { route, navigateToPage, navigateHome, navigateToAnchor, handleLinkClick };
}

/**
 * Хук, обновляющий document.title и meta description при смене виртуальной страницы.
 * Решает SEO-проблему: статические метаданные в layout.tsx не меняются при client-side routing.
 */
export function useDocumentMeta() {
  const { route } = useContentRouter();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (route.kind === "page") {
      // Динамически подгружаем данные страницы, чтобы обновить title
      import("@/data/contentPages").then(({ getPageBySlug }) => {
        const page = getPageBySlug(route.slug);
        if (page) {
          document.title = page.metaTitle;
          // Обновляем meta description
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute("content", page.description);
          // Canonical
          let canonical = document.querySelector('link[rel="canonical"]');
          if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
          }
          canonical.setAttribute("href", `https://babushkarobot.ru/page/${route.slug}`);
        }
      });
    } else {
      document.title = "Бабушкаробот — ИИ-маркетинговое агентство полного цикла";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Маркетинговое ИИ-агентство полного цикла: разработка, интеграция и продвижение с помощью искусственного интеллекта.");
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://babushkarobot.ru/");
    }
  }, [route]);
}
