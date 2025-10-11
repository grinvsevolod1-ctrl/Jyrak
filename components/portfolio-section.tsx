"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"

export function PortfolioSection() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const portfolioItems = [
    {
      image: "/bridal-makeup-before-after.jpg",
      title: "Bridal Makeup",
    },
    {
      image: "/evening-glamorous-makeup.jpg",
      title: "Evening Look",
    },
    {
      image: "/natural-soft-makeup.jpg",
      title: "Natural Beauty",
    },
    {
      image: "/dramatic-artistic-makeup.jpg",
      title: "Dramatic Look",
    },
    {
      image: "/elegant-wedding-makeup.jpg",
      title: "Wedding Style",
    },
    {
      image: "/professional-photoshoot-makeup.jpg",
      title: "Photoshoot Ready",
    },
  ]

  return (
    <section id="portfolio" className="py-16 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.portfolio.title}</h2>
          <p className="text-lg md:text-2xl text-muted-foreground text-balance px-4">{t.portfolio.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                <p className="text-white font-medium text-sm md:text-base">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="https://www.instagram.com/olli_beauty_/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              {t.portfolio.viewAll}
              <ExternalLink className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={portfolioItems[selectedImage].image || "/placeholder.svg"}
            alt={portfolioItems[selectedImage].title}
            className="max-w-full max-h-full object-contain animate-scale-in"
          />
        </div>
      )}
    </section>
  )
}
