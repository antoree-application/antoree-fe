"use client"

import { ChevronDown, User, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function ReviewPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-500">antoree</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-300 hover:text-green-500">
                {t("nav.teachers")}
              </a>
              <a href="#" className="text-gray-300 hover:text-green-500">
                {t("nav.community")}
              </a>
              <a href="/review/page/1" className="text-green-500 font-medium">
                {t("nav.reviews")}
              </a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-green-500 flex items-center">
                  {t("nav.about")} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="/terms" className="block px-4 py-2 text-gray-300 hover:text-green-500 hover:bg-gray-700">
                      {t("nav.about.terms")}
                    </a>
                    <a
                      href="/payment/step1"
                      className="block px-4 py-2 text-gray-300 hover:text-green-500 hover:bg-gray-700"
                    >
                      {t("nav.about.payment")}
                    </a>
                    <a
                      href="/contact-us"
                      className="block px-4 py-2 text-gray-300 hover:text-green-500 hover:bg-gray-700"
                    >
                      {t("nav.about.contact")}
                    </a>
                    <a href="/faqs" className="block px-4 py-2 text-gray-300 hover:text-green-500 hover:bg-gray-700">
                      {t("nav.about.help")}
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">{t("nav.tryFree")}</Button>
              <Button variant="ghost" className="text-gray-300 flex items-center">
                {t("nav.login")} <User className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with pagination */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-white">{t("reviews.title")}</h1>
          <div className="flex gap-4">
            <Button variant="outline" className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700">
              {t("reviews.previous")}
            </Button>
            <Button variant="outline" className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700">
              {t("reviews.next")}
            </Button>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-6">
          {/* Review 1 - QUANGPHAM */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex gap-6">
              {/* Student Info */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">QUANGPHAM</h3>
                    <p className="text-gray-400 text-sm">Viết lúc 2025-08-17 08:46 sau 1 giờ học</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-gray-300 mb-4">có đúng giờ, nhiệt tình</p>

                <div className="flex gap-8">
                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gray-700 rounded"></div>
                      <div>
                        <p className="text-white font-medium">{t("reviews.course")}</p>
                        <p className="text-green-400 text-sm">Communication P60- chị Như</p>
                      </div>
                    </div>

                    <div className="bg-orange-500 text-white px-4 py-2 rounded text-center font-bold text-lg w-20">
                      5.00
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.teachingMethod")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.courseContent")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src="/female-teacher.png" alt="Teacher" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{t("reviews.teacher")}</p>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          Miah Bentulan <ExternalLink className="w-3 h-3" />
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.attitude")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.satisfaction")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 - NGÔ VIỆT HƯNG */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">NGÔ VIỆT HƯNG - 2013</h3>
                    <p className="text-gray-400 text-sm">Viết lúc 2025-08-15 09:04 sau 1 giờ học</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-gray-300 mb-4">giáo viên nhiệt tình , quan tâm học sinh, học đúng và đủ giờ</p>

                <div className="flex gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gray-700 rounded"></div>
                      <div>
                        <p className="text-white font-medium">{t("reviews.course")}</p>
                        <p className="text-green-400 text-sm">COM - MVN120 (V60) - Movers</p>
                      </div>
                    </div>

                    <div className="bg-orange-500 text-white px-4 py-2 rounded text-center font-bold text-lg w-20">
                      5.00
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.teachingMethod")}</span>
                        <span className="text-gray-300">(4.00)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.courseContent")}</span>
                        <span className="text-gray-300">(4.00)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src="/male-teacher.png" alt="Teacher" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{t("reviews.teacher")}</p>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          Huỳnh Tấn Kha <ExternalLink className="w-3 h-3" />
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.attitude")}</span>
                        <span className="text-gray-300">(4.00)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.satisfaction")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 - Thảo Hiền Nguyễn */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src="/young-woman-student.png" alt="Student" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Thảo Hiền Nguyễn</h3>
                    <p className="text-gray-400 text-sm">Viết lúc 2025-08-14 15:47 sau 1 giờ học</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-gray-300 mb-4">Cô trẻ, vui vẻ và nhiệt tình</p>

                <div className="flex gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gray-700 rounded"></div>
                      <div>
                        <p className="text-white font-medium">{t("reviews.course")}</p>
                        <p className="text-green-400 text-sm">trial course</p>
                      </div>
                    </div>

                    <div className="bg-orange-500 text-white px-4 py-2 rounded text-center font-bold text-lg w-20">
                      5.00
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.courseContent")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src="/blonde-female-teacher.png" alt="Teacher" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{t("reviews.teacher")}</p>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          Ghracel Laine Contayoso <ExternalLink className="w-3 h-3" />
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t("reviews.teachingMethod")}</span>
                        <span className="text-gray-300">(5.00)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
