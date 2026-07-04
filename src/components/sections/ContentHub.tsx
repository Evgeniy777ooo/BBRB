"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, FolderOpen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contentPages, contentCategories, type ContentPage } from "@/data/contentPages";
import { useContentRouter } from "@/hooks/use-content-router";
import { Mascot } from "@/components/layout/Mascot";

const PAGE_SIZE = 9;

export function ContentHub() {
  const { handleLinkClick } = useContentRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Считаем количество страниц в каждой категории для бейджей
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    contentPages.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  // Фильтрация
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contentPages
      .filter((p) => category === "all" || p.category === category)
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
      .slice(0, visibleCount);
  }, [query, category, visibleCount]);

  const totalCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contentPages
      .filter((p) => category === "all" || p.category === category)
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
        );
      }).length;
  }, [query, category]);

  const handleFilterChange = (newCategory?: string, newQuery?: string) => {
    if (newCategory !== undefined && newCategory !== category) {
      setCategory(newCategory);
      setVisibleCount(PAGE_SIZE);
    }
    if (newQuery !== undefined && newQuery !== query) {
      setQuery(newQuery);
      setVisibleCount(PAGE_SIZE);
    }
  };

  return (
    <section id="knowledge" className="py-20 md:py-28 bg-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12">
          <div className="max-w-3xl">
            <Badge className="bg-teal/10 text-teal hover:bg-teal/15">База знаний</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
              Более 100 страниц про ИИ и маркетинг
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Услуги, отраслевые решения, кейсы, гайды, FAQ. Используйте поиск и
              фильтры — найдёте то, что нужно именно вам. Каждая страница — с
              конкретными метриками, ценами и сроками.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <Mascot variant="float" size={90} />
            <div className="text-sm text-muted-foreground max-w-[180px]">
              Бабушкаробот собрал для вас всё, что знает про ИИ-маркетинг
            </div>
          </div>
        </div>

        {/* Поиск + фильтр */}
        <div className="grid md:grid-cols-[1fr_220px] gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => handleFilterChange(undefined, e.target.value)}
              placeholder="Поиск по услугам, кейсам, гайдам..."
              className="pl-10 h-12 bg-white ring-1 ring-plum/10 border-0"
            />
            {query && (
              <button
                onClick={() => handleFilterChange(undefined, "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-plum"
                aria-label="Очистить"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Select value={category} onValueChange={(v) => handleFilterChange(v)}>
            <SelectTrigger className="h-12 bg-white ring-1 ring-plum/10 border-0">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {contentCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.title} ({categoryCounts[cat.id] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Чипы категорий для быстрого переключения */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === "all"
                ? "bg-plum text-cream"
                : "bg-white text-plum/80 hover:bg-plum/10 ring-1 ring-plum/10"
            }`}
          >
            Все ({contentPages.length})
          </button>
          {contentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat.id
                  ? "bg-plum text-cream"
                  : "bg-white text-plum/80 hover:bg-plum/10 ring-1 ring-plum/10"
              }`}
            >
              {cat.title} ({categoryCounts[cat.id] ?? 0})
            </button>
          ))}
        </div>

        {/* Результаты */}
        <div className="text-sm text-muted-foreground mb-4">
          Найдено: <strong className="text-plum">{totalCount}</strong>{" "}
          {totalCount === 1 ? "страница" : totalCount < 5 ? "страницы" : "страниц"}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((page, idx) => (
            <ContentCard key={page.slug} page={page} index={idx} onClick={() => handleLinkClick(`/page/${page.slug}`)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Mascot size={100} />
            <div className="mt-4 text-lg font-medium text-plum">Ничего не нашлось</div>
            <div className="text-sm text-muted-foreground mt-1">
              Попробуйте другой запрос или категорию. Или{" "}
              <button onClick={() => handleLinkClick("#contacts")} className="text-coral hover:underline">
                напишите нам
              </button>
              .
            </div>
          </div>
        )}

        {filtered.length < totalCount && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="rounded-full bg-plum hover:bg-plum/90 text-cream px-6 py-3 font-medium transition-colors"
            >
              Показать ещё ({totalCount - filtered.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ContentCard({ page, index, onClick }: { page: ContentPage; index: number; onClick: () => void }) {
  const catMeta = contentCategories.find((c) => c.id === page.category);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 9) * 0.05 }}
      onClick={onClick}
      className="text-left group"
    >
      <Card className="h-full p-5 ring-1 ring-plum/5 transition-all hover:shadow-md hover:-translate-y-0.5 hover:ring-coral/30 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `${catMeta?.color}15`,
              color: catMeta?.color,
            }}
          >
            {catMeta?.title}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {page.readTime}
          </span>
        </div>
        <h3 className="font-bold text-plum group-hover:text-coral transition-colors mb-2 line-clamp-2 leading-tight">
          {page.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {page.description}
        </p>
        <div className="mt-3 pt-3 border-t border-plum/5 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {page.keywords.slice(0, 2).map((k) => (
              <span key={k} className="text-[10px] text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded">
                {k}
              </span>
            ))}
          </div>
          <ArrowRight className="h-4 w-4 text-coral opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Card>
    </motion.button>
  );
}
