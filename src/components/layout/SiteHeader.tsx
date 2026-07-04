"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Mascot } from "./Mascot";
import { useContentRouter } from "@/hooks/use-content-router";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { handleLinkClick } = useContentRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    handleLinkClick(href);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-coral/15"
          : "bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Лого + маскот */}
        <Link
          href="/"
          onClick={(e) => onNavClick(e, "/")}
          className="flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-full overflow-hidden bg-white ring-2 ring-coral/30">
            <img
              src="/babushka-mascot.png"
              alt="Бабушкаробот"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-plum text-lg">Бабушкаробот</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">ИИ-маркетинг с заботой</div>
          </div>
        </Link>

        {/* Десктоп-навигация */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-plum/80 hover:text-plum hover:bg-coral/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Контакты + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="flex items-center gap-2 text-sm font-medium text-plum hover:text-coral transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Button
            onClick={() => handleLinkClick("#contacts")}
            className="bg-coral hover:bg-coral/90 text-white"
          >
            Оставить заявку
          </Button>
        </div>

        {/* Мобильное меню */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Меню">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] bg-cream">
            <SheetTitle className="sr-only">Меню навигации</SheetTitle>
            <div className="flex items-center gap-3 mt-2 mb-6">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-white ring-2 ring-coral/30">
                <img src="/babushka-mascot.png" alt="Бабушкаробот" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="font-bold text-plum">Бабушкаробот</div>
                <div className="text-xs text-muted-foreground">ИИ-маркетинг с заботой</div>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-plum hover:bg-coral/10 hover:text-coral transition-colors"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-coral/15 space-y-3">
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="flex items-center gap-2 text-sm font-medium text-plum"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <Button
                onClick={() => {
                  handleLinkClick("#contacts");
                  setOpen(false);
                }}
                className="w-full bg-coral hover:bg-coral/90 text-white"
              >
                Оставить заявку
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-plum/5 p-3">
              <Mascot size={40} />
              <div className="text-xs text-muted-foreground">
                Бабушкаробот варит ваш проект с заботой. Напишите — поможем.
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
