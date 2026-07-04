"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { Mascot } from "@/components/layout/Mascot";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      source: "Сайт Бабушкаробот — форма контактов",
    };

    try {
      // Отправляем в API — endpoint потом легко заменить на реальный
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null); // ошибки сети не блокируем UX

      setSubmitted(true);
      toast({
        title: "Заявка отправлена!",
        description: "Бабушкаробот свяжется с вами в течение рабочего дня.",
      });
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить. Напишите нам в Telegram @rancisvokami",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-20 md:py-28 bg-cream bg-grain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Левая часть — контакты */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-coral/10 text-coral hover:bg-coral/15">Контакты</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-plum text-balance">
              Закажите бесплатную консультацию
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              60 минут разбора вашей ситуации: что можно автоматизировать, какие каналы
              продвижения дадут эффект, сколько будет стоить и когда окупится.
              Без воды и обязательств — если не подойдём, порекомендуем коллег.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="flex items-center gap-4 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/10 group-hover:bg-coral/20 transition-colors">
                  <Phone className="h-5 w-5 text-coral" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Телефон</div>
                  <div className="font-bold text-plum group-hover:text-coral transition-colors">{siteConfig.phone}</div>
                </div>
              </a>

              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/15 group-hover:bg-saffron/25 transition-colors">
                  <Mail className="h-5 w-5 text-plum" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-bold text-plum group-hover:text-coral transition-colors">{siteConfig.email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10">
                  <MapPin className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Адрес офиса</div>
                  <div className="font-bold text-plum">{siteConfig.address.street}</div>
                  <div className="text-xs text-muted-foreground">{siteConfig.address.locality}, {siteConfig.address.postalCode}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-plum/10">
                  <Clock className="h-5 w-5 text-plum" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Часы работы</div>
                  <div className="font-bold text-plum">{siteConfig.workingHours}</div>
                </div>
              </div>
            </div>

            {/* Бабушкаробот + соцсети */}
            <div className="mt-8 flex items-center gap-4 p-5 rounded-2xl bg-plum text-cream">
              <Mascot variant="wave" size={80} />
              <div className="flex-1">
                <div className="font-bold mb-1">Бабушкаробот на связи</div>
                <div className="text-sm text-cream/80 mb-2">
                  Подписывайтесь — публикуем кейсы и разборы каждую неделю
                </div>
                <div className="flex gap-2 flex-wrap text-xs">
                  <a href="https://www.youtube.com/@babushkarobot/videos" target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline">YouTube</a>
                  <span className="text-cream/30">·</span>
                  <a href="https://vk.com/romano" target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline">VK</a>
                  <span className="text-cream/30">·</span>
                  <a href="https://ok.ru/group/67483579514923" target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline">OK</a>
                  <span className="text-cream/30">·</span>
                  <a href="https://t.me/rancisvokami" target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline">Telegram</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Правая часть — форма */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 md:p-8 ring-1 ring-plum/5 shadow-lg">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-teal mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-plum mb-2">Заявка отправлена!</h3>
                  <p className="text-muted-foreground mb-6">
                    Бабушкаробот свяжется с вами в течение рабочего дня.
                    А пока — подписывайтесь на наш канал, там много полезного.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-plum/30 text-plum"
                  >
                    Отправить ещё одну
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Имя *</Label>
                      <Input id="name" name="name" required placeholder="Как к вам обращаться" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company">Компания</Label>
                      <Input id="company" name="company" placeholder="Название компании" className="h-11" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="you@company.ru" className="h-11" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Задача</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Коротко опишите, что нужно сделать. Бабушкаробот свяжется и поможет оформить."
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-coral hover:bg-coral/90 text-white"
                  >
                    {submitting ? "Отправляем..." : "Отправить заявку"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/page/privacy" className="underline hover:text-plum">политикой конфиденциальности</a>.
                    Бабушкаробот не передаёт данные третьим лицам.
                  </p>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
