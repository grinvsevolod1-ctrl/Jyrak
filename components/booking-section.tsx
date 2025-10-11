"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendToTelegram } from "@/lib/telegram"

export function BookingSection() {
  const { t } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      message: formData.get("message") as string,
      formType: "Запись на услугу",
    }

    const result = await sendToTelegram(data)

    if (result.success) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        ;(e.target as HTMLFormElement).reset()
      }, 5000)
    } else {
      setError("Произошла ошибка. Попробуйте позже или свяжитесь со мной напрямую.")
    }

    setIsSubmitting(false)
  }

  return (
    <section id="booking" className="py-16 md:py-32 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.booking.title}</h2>
          <p className="text-lg md:text-2xl text-muted-foreground text-balance px-4">{t.booking.subtitle}</p>
        </div>

        <Card className="p-6 md:p-8 animate-scale-in">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <p className="text-xl font-semibold mb-2">{t.booking.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.booking.name}</label>
                <Input type="text" name="name" required placeholder={t.booking.name} className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.booking.phone}</label>
                <Input type="tel" name="phone" required placeholder="+7 (XXX) XXX-XX-XX" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.booking.service}</label>
                <Select name="service" required>
                  <SelectTrigger>
                    <SelectValue placeholder={t.booking.service} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">{t.services.wedding.title}</SelectItem>
                    <SelectItem value="evening">{t.services.evening.title}</SelectItem>
                    <SelectItem value="photoshoot">{t.services.photoshoot.title}</SelectItem>
                    <SelectItem value="lesson">{t.services.lesson.title}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.booking.date}</label>
                <Input type="date" name="date" required className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.booking.message}</label>
                <Textarea name="message" placeholder={t.booking.message} rows={4} className="w-full resize-none" />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white hover:opacity-90"
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Отправка..." : t.booking.submit}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
