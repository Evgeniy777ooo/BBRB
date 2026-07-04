"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";
import { footerNav } from "@/data/navigation";
import { useContentRouter } from "@/hooks/use-content-router";
import { SocialIcon } from "./SocialIcons";

export function SiteFooter() {
  const { handleLinkClick } = useContentRouter();

  const onNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    handleLinkClick(href);
  };

  return (
    <footer className="mt-auto bg-plum text-cream">
      {/* Верхняя часть — навигация */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Бренд + соцсети */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link
              href="/"
              onClick={(e) => onNavClick(e, "/")}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white ring-2 ring-coral/40">
                <img src="/babushka-mascot.png" alt="Бабушкаробот" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="font-extrabold text-lg">Бабушкаробот</div>
                <div className="text-xs text-cream/60">ИИ-маркетинг с заботой</div>
              </div>
            </Link>
            <p className="text-sm text-cream/80 mb-5 max-w-sm">
              Маркетинговое ИИ-агентство полного цикла. Разработка, интеграция и
              продвижение с помощью искусственного интеллекта. Тёплый сервис с
              холодным интеллектом.
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={`${s.label} — ${s.handle}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 hover:bg-coral transition-colors"
                >
                  <SocialIcon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Навигация по услугам */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold mb-4 text-saffron">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => onNavClick(e, item.href)}
                      className="text-sm text-cream/75 hover:text-coral transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Средняя часть — контакты */}
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="flex items-start gap-3 group"
            >
              <Phone className="h-5 w-5 text-coral mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-cream/60 mb-0.5">Телефон</div>
                <div className="text-sm font-medium group-hover:text-coral transition-colors">{siteConfig.phone}</div>
              </div>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 group">
              <Mail className="h-5 w-5 text-coral mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-cream/60 mb-0.5">Email</div>
                <div className="text-sm font-medium group-hover:text-coral transition-colors">{siteConfig.email}</div>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-coral mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-cream/60 mb-0.5">Адрес</div>
                <div className="text-sm font-medium">{siteConfig.address.street}</div>
                <div className="text-xs text-cream/60">{siteConfig.address.locality}, {siteConfig.address.postalCode}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-coral mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-cream/60 mb-0.5">Часы работы</div>
                <div className="text-sm font-medium">{siteConfig.workingHours}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть — копирайт */}
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-cream/60 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.legalName}. ИНН {siteConfig.inn}. Все права защищены.
          </div>
          <div className="flex items-center gap-4 text-xs text-cream/60">
            <a
              href="/page/privacy"
              onClick={(e) => onNavClick(e, "/page/privacy")}
              className="hover:text-coral transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/page/terms"
              onClick={(e) => onNavClick(e, "/page/terms")}
              className="hover:text-coral transition-colors"
            >
              Условия оказания услуг
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
