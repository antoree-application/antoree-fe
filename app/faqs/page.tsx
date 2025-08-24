"use client"

import { ChevronDown, User, Phone, Mail, BookOpen, Users, GraduationCap, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function FAQsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">antoree</div>
              <div className="ml-2 text-xs text-gray-500">LEARN ENGLISH ONLINE 1-ON-1</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-green-600">
                {t("nav.teachers")}
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600">
                {t("nav.community")}
              </a>
              <a href="/review/page/1" className="text-gray-700 hover:text-green-600">
                {t("nav.reviews")}
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 flex items-center">
                {t("nav.about")} <ChevronDown className="ml-1 h-4 w-4" />
              </a>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">{t("nav.tryFree")}</Button>
              <Button variant="ghost" className="text-gray-700 flex items-center">
                {t("nav.login")} <User className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("faq.title")}</h1>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">1. {t("faq.question1")}</h2>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">{t("faq.answer1")}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">1.</span>
                <p>{t("faq.point1")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">2.</span>
                <p>{t("faq.point2")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">3.</span>
                <p>{t("faq.point3")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">4.</span>
                <p>{t("faq.point4")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">5.</span>
                <p>{t("faq.point5")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">6.</span>
                <p>{t("faq.point6")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">7.</span>
                <p>{t("faq.point7")}</p>
              </div>
            </div>

            <p className="mb-6">{t("faq.note")}</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-600 italic">{t("faq.disclaimer")}</p>
            </div>

            {/* Additional FAQ Items */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-medium text-gray-900">{t("faq.question2")}</h3>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-medium text-gray-900">{t("faq.question3")}</h3>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-medium text-gray-900">{t("faq.question4")}</h3>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-medium text-gray-900">{t("faq.question5")}</h3>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-medium text-gray-900">{t("faq.question6")}</h3>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-medium text-gray-900">{t("faq.question7")}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t("faq.popularTopics")}</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">{t("faq.courses")}</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">{t("faq.learning")}</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">{t("faq.teachers")}</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">{t("faq.other")}</h3>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.customerSupport")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{t("footer.hotline")} /</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{t("footer.email")}</span>
                </div>
                <div>cskh@antoree.com</div>
                <div className="mt-4">
                  <div>{t("footer.feedback")}</div>
                  <div>anh.pham2@antoree.com</div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.serviceInfo")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <a href="#" className="block hover:text-white">
                  {t("footer.termsOfUse")}
                </a>
                <a href="#" className="block hover:text-white">
                  {t("footer.privacyPolicy")}
                </a>
                <a href="#" className="block hover:text-white">
                  {t("footer.refundPolicy")}
                </a>
                <a href="/faqs" className="block hover:text-white text-green-400">
                  {t("footer.faqs")}
                </a>
                <a href="#" className="block hover:text-white">
                  {t("footer.commitment")}
                </a>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.connect")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>{t("footer.community")}</div>
                <Button className="bg-green-600 hover:bg-green-700 text-sm">{t("footer.becomeTeacher")}</Button>
              </div>
            </div>

            {/* Mobile Apps */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.mobileApps")}</h4>
              <div className="space-y-3">
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
                  Google Play
                </div>
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">App Store</div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <div className="space-y-2">
              <div>{t("footer.companyInfo")}</div>
              <div>{t("footer.mainOffice")}</div>
              <div className="mt-4">
                <div>{t("footer.vietnamOffice")}</div>
                <div>{t("footer.headquarters")}</div>
                <div>{t("footer.representativeOffice")}</div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
              <div>© 2025 Antoree Pte.Ltd</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">
                  {t("footer.privacyPolicy")}
                </a>
                <a href="#" className="hover:text-white">
                  {t("footer.termsOfUse")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
