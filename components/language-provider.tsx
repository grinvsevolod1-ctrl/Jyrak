"use client"

import * as React from "react"
import { type Language, translations } from "@/lib/translations"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: typeof translations.ru
}

const LanguageProviderContext = React.createContext<LanguageProviderState | undefined>(undefined)

export function LanguageProvider({ children, defaultLanguage = "ru" }: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage)

  const value = {
    language,
    setLanguage: (lang: Language) => {
      localStorage.setItem("olli-beauty-language", lang)
      setLanguage(lang)
    },
    t: translations[language],
  }

  return <LanguageProviderContext.Provider value={value}>{children}</LanguageProviderContext.Provider>
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
