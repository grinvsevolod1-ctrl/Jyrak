"use client"

import { Heart, Award } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.about.title}</h2>
          <p className="text-lg md:text-2xl text-muted-foreground text-balance px-4">{t.about.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted animate-scale-in">
            <img
              src="/images/artist-portrait.jpg"
              alt="Olli Beauty - Professional Makeup Artist"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{t.about.description}</p>

            <Card className="p-4 md:p-6 border-l-4 border-l-[var(--gradient-start)]">
              <div className="flex items-start gap-4">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-[var(--gradient-start)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{t.about.philosophy}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.about.philosophyText}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 border-l-4 border-l-[var(--gradient-end)]">
              <div className="flex items-start gap-4">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-[var(--gradient-end)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{t.about.experience}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.about.experienceText}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img
              src="/images/artist-working-1.jpg"
              alt="Olli Beauty at work"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img
              src="/images/artist-working-2.jpg"
              alt="Professional makeup artist"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img
              src="/images/artist-working-3.jpg"
              alt="Makeup artistry"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img
              src="/images/makeup-products.jpg"
              alt="Professional makeup products"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
