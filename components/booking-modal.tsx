"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { sendToTelegram } from "@/lib/telegram"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  formType: string
  title?: string
}

export function BookingModal({ isOpen, onClose, formType, title }: BookingModalProps) {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      formType,
    }

    const result = await sendToTelegram(data)

    if (result.success) {
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 3000)
    } else {
      setError(t.modal.error)
    }

    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title || t.modal.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label={t.modal.close}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium">{t.modal.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input name="name" placeholder={t.modal.name} required className="w-full" />
            </div>
            <div>
              <Input name="phone" type="tel" placeholder={t.modal.phone} required className="w-full" />
            </div>
            <div>
              <Textarea name="message" placeholder={t.modal.message} rows={4} className="w-full resize-none" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white hover:opacity-90"
            >
              {isSubmitting ? "..." : t.modal.submit}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
