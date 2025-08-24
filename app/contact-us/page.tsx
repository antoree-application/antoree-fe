"use client"

import { ChevronDown, User, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function ContactUsPage() {
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("contact.title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.sendContact")}</h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.name")}
                </label>
                <Input id="name" type="text" className="w-full" placeholder={t("contact.namePlaceholder")} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.email")}
                </label>
                <Input id="email" type="email" className="w-full" placeholder={t("contact.emailPlaceholder")} />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.phone")}
                </label>
                <Input id="phone" type="tel" className="w-full" placeholder={t("contact.phonePlaceholder")} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.message")}
                </label>
                <Textarea id="message" rows={6} className="w-full" placeholder={t("contact.messagePlaceholder")} />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">{t("contact.send")}</Button>
            </form>
          </div>

          {/* Company Information */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ANTOREE INTERNATIONAL PTE. LTD.</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Trụ sở chính: 10 Anson Road, #27-15,</p>
                <p>International Plaza, Singapore 079903.</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Đối tác đại diện tại Việt Nam: CÔNG TY TNHH PHÁT TRIỂN GIÁO DỤC ANTOREE.
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Trụ sở chính: 18/77 Điện Biên Phủ, P. Đa</p>
                <p>Kao, Q 1, TP Hồ Chí Minh, Việt Nam.</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="space-y-2 text-sm text-gray-600">
                <p>Văn phòng đại diện, tiếp khách và nhận thư</p>
                <p>tại TP Hồ Chí Minh: 56 SSA Trần Thái Tông,</p>
                <p>phường 15, quận Tân Bình, Thành phố Hồ</p>
                <p>Chí Minh.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">0877709376</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">cskh@antoree.com</span>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 bg-green-600 text-white p-6 rounded-lg text-center">
              <h4 className="font-semibold mb-2">{t("contact.feedbackTitle")}</h4>
              <p className="text-sm mb-4">ANH.PHAM2@ANTOREE.COM</p>
            </div>
          </div>
        </div>

        {/* Office Image */}
        <div className="mt-16">
          <div className="relative">
            <img
              src="/antoree-office.png"
              alt="Antoree office meeting room"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{t("contact.officeTitle")}</h3>
                <p className="text-lg">{t("contact.officeDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.customerSupport")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{t("footer.hotline")} 0877709376 /</span>
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
                <a href="/faqs" className="block hover:text-white">
                  {t("footer.faq")}
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
                <div>{t("footer.vietnamOffice")}</div>
                <div>{t("footer.vietnamOfficeAddress")}</div>
                <div>{t("footer.hcmOffice")}</div>
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
