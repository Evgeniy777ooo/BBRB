"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type MascotVariant = "default" | "wave" | "float" | "peek" | "badge";

type MascotProps = {
  variant?: MascotVariant;
  size?: number;
  className?: string;
  /** подпись под маскотом — на случай, если нужна "реплика бабушки" */
  caption?: string;
  priority?: boolean;
};

/**
 * Mascot — Бабушкаробот.
 *
 * Используется в Hero, About, CTA, Contact, в боковых плавающих блоках и т.д.
 * variant:
 *   - default: статичная
 *   - wave: машет (для приветствия)
 *   - float: лёгкое парение (для акцентных блоков)
 *   - peek: выглядывает из-за края (для декоративных секций)
 *   - badge: круглый бейдж (для футера, формы)
 */
export function Mascot({
  variant = "default",
  size = 160,
  className,
  caption,
  priority = false,
}: MascotProps) {
  const animationClass =
    variant === "wave"
      ? "mascot-wave"
      : variant === "float"
      ? "mascot-float"
      : "";

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center",
        variant === "peek" && "overflow-hidden",
        className,
      )}
      style={{ width: size }}
    >
      <div
        className={cn(
          "relative",
          variant === "badge" && "rounded-full overflow-hidden ring-4 ring-white/60 shadow-xl",
          animationClass,
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/babushka-mascot.png"
          alt="Бабушкаробот — маскот маркетингового ИИ-агентства"
          fill
          priority={priority}
          sizes={`${size}px`}
          className="object-contain"
        />
      </div>
      {caption && (
        <div className="mt-2 max-w-[14rem] rounded-2xl bg-plum px-4 py-2 text-center text-sm font-medium text-cream shadow-sm">
          <span className="relative inline-block">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-plum" />
          </span>
          {caption}
        </div>
      )}
    </div>
  );
}

/**
 * FloatingMascot — плавающий маскот в углу экрана, который ссылается на контакты.
 * Появляется после скролла ниже hero-секции.
 */
export function FloatingMascot() {
  return (
    <a
      href="#contacts"
      className="group fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 rounded-full bg-cream/95 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-coral/20 transition-all hover:shadow-xl hover:ring-coral/40"
      aria-label="Связаться с Бабушкаробот"
    >
      <div className="relative h-12 w-12 shrink-0">
        <Image
          src="/babushka-mascot.png"
          alt="Бабушкаробот"
          fill
          sizes="48px"
          className="object-contain mascot-float"
        />
      </div>
      <div className="text-left">
        <div className="text-xs text-muted-foreground">Привет! Я —</div>
        <div className="text-sm font-bold text-plum">Бабушкаробот</div>
      </div>
      <div className="ml-1 h-2 w-2 rounded-full bg-coral animate-pulse" />
    </a>
  );
}
