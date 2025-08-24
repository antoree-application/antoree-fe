"use client"

import { ChevronDown, User, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function TermsPage() {
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
              <a href="/terms" className="text-green-600 font-medium flex items-center">
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
        {/* Sidebar Navigation */}
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              <a href="/review/page/1" className="block text-gray-700 hover:text-green-600 py-2">
                {t("terms.sidebarReviews")}
              </a>
              <a href="/terms" className="block text-green-600 font-medium py-2">
                {t("terms.sidebarAbout")}
              </a>
              <a href="#" className="block text-gray-700 hover:text-green-600 py-2">
                {t("terms.sidebarRefund")}
              </a>
              <a href="#" className="block text-gray-700 hover:text-green-600 py-2">
                {t("terms.sidebarTerms")}
              </a>
              <a href="#" className="block text-gray-700 hover:text-green-600 py-2">
                {t("terms.sidebarPrivacy")}
              </a>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-600 mb-8">{t("terms.title")}</h1>

            {/* Hero Image */}
            <div className="mb-8">
              <img src="/antoree-team-story.png" alt="Antoree team startup story" className="w-full rounded-lg" />
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">{t("terms.story")}</p>

              {/* Video Section */}
              <div className="my-8">
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-gray-500">{t("terms.video")}</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{t("terms.team")}</p>

              <p className="text-gray-700 leading-relaxed mb-8">{t("terms.learningProcess")}</p>

              {/* Values Section */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <blockquote className="text-center">
                  <p className="text-xl font-medium text-blue-900 mb-4">{t("terms.values")}</p>
                </blockquote>
              </div>

              <h2 className="text-2xl font-bold text-green-600 mb-6">{t("terms.aboutAntoree")}</h2>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("terms.features.teacherQuality")}</h3>
                      <p className="text-gray-600 text-sm">{t("terms.features.teacherQualityDescription")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("terms.features.personalizedLearning")}</h3>
                      <p className="text-gray-600 text-sm">{t("terms.features.personalizedLearningDescription")}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("terms.features.modernTechnology")}</h3>
                      <p className="text-gray-600 text-sm">{t("terms.features.modernTechnologyDescription")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("terms.features.support247")}</h3>
                      <p className="text-gray-600 text-sm">{t("terms.features.support247Description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Process */}
              <h2 className="text-2xl font-bold text-green-600 mb-6">{t("terms.learningProcessTitle")}</h2>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("terms.learningProcess.enroll")}</h3>
                    <p className="text-gray-600">{t("terms.learningProcess.enrollDescription")}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("terms.learningProcess.chooseTeacher")}
                    </h3>
                    <p className="text-gray-600">{t("terms.learningProcess.chooseTeacherDescription")}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("terms.learningProcess.receiveResults")}
                    </h3>
                    <p className="text-gray-600">{t("terms.learningProcess.receiveResultsDescription")}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    04
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("terms.learningProcess.rateReview")}
                    </h3>
                    <p className="text-gray-600">{t("terms.learningProcess.rateReviewDescription")}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    05
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("terms.learningProcess.continueLearning")}
                    </h3>
                    <p className="text-gray-600">{t("terms.learningProcess.continueLearningDescription")}</p>
                  </div>
                </div>
              </div>
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
                  <span>{t("footer.hotline")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{t("footer.email")}</span>
                </div>
                <div>{t("footer.emailAddress")}</div>
                <div className="mt-4">
                  <div>{t("footer.feedback")}</div>
                  <div>{t("footer.feedbackEmail")}</div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.serviceInfo")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <a href="/terms" className="block hover:text-white">
                  {t("footer.terms")}
                </a>
                <a href="#" className="block hover:text-white">
                  {t("footer.privacy")}
                </a>
                <a href="#" className="block hover:text-white">
                  {t("footer.refund")}
                </a>
                <a href="/faqs" className="block hover:text-white">
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
                <Button className="bg-green-600 hover:bg-green-700 text-sm">{t("sidebar.becomeTeacher")}</Button>
              </div>
            </div>

            {/* Mobile Apps */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.mobileApps")}</h4>
              <div className="space-y-3">
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
                  {t("footer.googlePlay")}
                </div>
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
                  {t("footer.appStore")}
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <div className="space-y-2">
              <div>{t("footer.companyInfo")}</div>
              <div>{t("footer.mainOffice")}</div>
              <div className="mt-4">
                <div>{t("footer.vietnamRepresentative")}</div>
                <div>{t("footer.vietnamOffice")}</div>
                <div>{t("footer.vietnamBranch")}</div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
              <div>{t("footer.copyright")}</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">
                  {t("footer.privacy")}
                </a>
                <a href="/terms" className="hover:text-white">
                  {t("footer.terms")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
