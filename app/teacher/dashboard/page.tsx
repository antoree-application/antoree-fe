"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  BookOpen,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  Star,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import Link from "next/link"

export default function TeacherDashboard() {
  const { t } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    {
      title: t("teacher.students.total"),
      value: "24",
      change: "+3",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Thu nhập tháng này",
      value: "$1,240",
      change: "+12%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Giờ dạy tuần này",
      value: "32h",
      change: "+5h",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Đánh giá trung bình",
      value: "4.9",
      change: "+0.1",
      changeType: "positive" as const,
      icon: Star,
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      student: "Nguyễn Văn A",
      subject: "English Conversation",
      time: "10:00 AM",
      duration: "60 min",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      student: "Trần Thị B",
      subject: "IELTS Preparation",
      time: "2:00 PM",
      duration: "90 min",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      student: "Lê Minh C",
      subject: "Business English",
      time: "4:30 PM",
      duration: "60 min",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recentBookings = [
    {
      id: 1,
      student: "Phạm Thị D",
      subject: "General English",
      status: "pending",
      time: "Tomorrow 9:00 AM",
    },
    {
      id: 2,
      student: "Hoàng Văn E",
      subject: "TOEIC Preparation",
      status: "confirmed",
      time: "Friday 3:00 PM",
    },
  ]

  const sidebarItems = [
    { name: t("teacher.dashboard.title"), href: "/teacher/dashboard", icon: TrendingUp, current: true },
    { name: t("teacher.bookings.title"), href: "/teacher/bookings", icon: BookOpen },
    { name: t("teacher.schedule.title"), href: "/teacher/schedule", icon: Calendar },
    { name: t("teacher.students.title"), href: "/teacher/students", icon: Users },
    { name: "Tin nhắn", href: "/teacher/messages", icon: MessageSquare },
    { name: "Cài đặt", href: "/teacher/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="text-2xl font-bold text-green-600">antoree</div>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      item.current
                        ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="text-2xl font-bold text-green-600">antoree</div>
              <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">TEACHER</div>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>GV</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Giáo viên A</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">teacher@antoree.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50 dark:bg-gray-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          {/* Page header */}
          <div className="bg-white dark:bg-gray-800 shadow">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    {t("teacher.dashboard.welcome")}, Giáo viên A
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Hôm nay là ngày tuyệt vời để giảng dạy!
                  </p>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <LanguageToggle />
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Thông báo
                  </Button>
                  <Button variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <stat.icon className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              {stat.title}
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                              <div
                                className={`ml-2 flex items-baseline text-sm font-semibold ${
                                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {stat.change}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main dashboard grid */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Upcoming Classes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-green-600" />
                      Lớp học hôm nay
                    </CardTitle>
                    <CardDescription>Các lớp học sắp tới của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingClasses.map((class_) => (
                        <div
                          key={class_.id}
                          className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <Avatar>
                            <AvatarImage src={class_.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{class_.student.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {class_.student}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{class_.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{class_.time}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{class_.duration}</p>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Tham gia
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                      {t("teacher.bookings.title")}
                    </CardTitle>
                    <CardDescription>Yêu cầu đặt lịch gần đây</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.student}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {booking.subject} • {booking.time}
                            </p>
                          </div>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status === "confirmed"
                              ? t("teacher.bookings.confirmed")
                              : t("teacher.bookings.pending")}
                          </Badge>
                        </div>
                      ))}
                      <div className="pt-2">
                        <Link href="/teacher/bookings">
                          <Button variant="outline" className="w-full bg-transparent">
                            Xem tất cả yêu cầu
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
