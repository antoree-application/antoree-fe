"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
      className="flex items-center gap-2 text-gray-700 hover:text-green-600"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "vi" ? "EN" : "VI"}</span>
    </Button>
  )
}
