"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, BookOpen, Users, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export default function TeacherLoginPage() {
  const { t } = useLanguage()
  const { login, loading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(formData.email, formData.password, "teacher")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-green-600">antoree</div>
              <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">TEACHER PORTAL</div>
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("teacher.login.title")}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {t("teacher.login.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("auth.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="teacher@antoree.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("auth.password")}
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/teacher/forgot-password"
                    className="text-sm text-green-600 hover:text-green-500 dark:text-green-400"
                  >
                    {t("auth.forgotPassword")}
                  </Link>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {loading ? t("auth.login.loading") : t("auth.login.button")}
                </Button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {t("auth.noAccount")}{" "}
                  <Link href="/teacher/register" className="text-green-600 hover:text-green-500 dark:text-green-400">
                    {t("auth.register.link")}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex flex-1 bg-green-600 text-white p-12 items-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">{t("teacher.login.welcome")}</h2>
            <p className="text-green-100 mb-8">{t("teacher.login.description")}</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("teacher.bookings.title")}</h3>
                  <p className="text-green-100 text-sm">Quản lý yêu cầu đặt lịch từ học viên một cách dễ dàng</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("teacher.schedule.title")}</h3>
                  <p className="text-green-100 text-sm">Theo dõi lịch giảng dạy và quản lý thời gian hiệu quả</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("teacher.students.title")}</h3>
                  <p className="text-green-100 text-sm">Quản lý thông tin và tiến độ học tập của học viên</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Thu nhập ổn định</h3>
                  <p className="text-green-100 text-sm">Tạo thu nhập ổn định từ việc giảng dạy trực tuyến</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
