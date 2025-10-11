"use client"

import { MapPin, Phone, Instagram, Send, MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ContactsSection() {
  const { t } = useLanguage()

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/olli_beauty_/",
      color: "hover:text-pink-500",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/79999999999",
      color: "hover:text-green-500",
    },
    {
      name: "Telegram",
      icon: Send,
      href: "https://t.me/olli_beauty",
      color: "hover:text-blue-500",
    },
    {
      name: "Viber",
      icon: Phone,
      href: "viber://chat?number=79999999999",
      color: "hover:text-purple-500",
    },
  ]

  return (
    <section id="contacts" className="py-16 md:py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.contacts.title}</h2>
          <p className="text-lg md:text-2xl text-muted-foreground text-balance px-4">{t.contacts.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6 animate-slide-up">
            <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[var(--gradient-start)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1">Адрес</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{t.contacts.address}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-[var(--gradient-start)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1">Телефон</h3>
                  <a
                    href={`tel:${t.contacts.phone}`}
                    className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.contacts.phone}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-semibold text-base md:text-lg mb-4">{t.contacts.messengers}</h3>
              <div className="grid grid-cols-4 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className={`transition-all duration-300 ${link.color} hover:scale-110`}
                    >
                      <link.icon className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="sr-only">{link.name}</span>
                    </Button>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Map */}
          <div className="relative aspect-square md:aspect-auto min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden bg-muted animate-scale-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127320.89634554!2d30.264168!3d59.938732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696378cc74a65ed%3A0x6dc7673fab848eff!2sSaint%20Petersburg%2C%20Russia!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
