"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import Link from "next/link"

export default function TeacherSchedule() {
  const { t } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")

  const sidebarItems = [
    { name: t("teacher.dashboard.title"), href: "/teacher/dashboard", icon: TrendingUp },
    { name: t("teacher.bookings.title"), href: "/teacher/bookings", icon: BookOpen },
    { name: t("teacher.schedule.title"), href: "/teacher/schedule", icon: Calendar, current: true },
    { name: t("teacher.students.title"), href: "/teacher/students", icon: Users },
    { name: "Tin nhắn", href: "/teacher/messages", icon: MessageSquare },
    { name: "Cài đặt", href: "/teacher/settings", icon: Settings },
  ]

  // Sample schedule data
  const scheduleData = {
    "2024-01-15": [
      {
        id: 1,
        student: "Nguyễn Văn A",
        subject: "English Conversation",
        time: "09:00",
        duration: 60,
        type: "online",
        status: "confirmed",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        student: "Trần Thị B",
        subject: "IELTS Preparation",
        time: "14:00",
        duration: 90,
        type: "online",
        status: "confirmed",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    "2024-01-16": [
      {
        id: 3,
        student: "Lê Minh C",
        subject: "Business English",
        time: "10:30",
        duration: 60,
        type: "online",
        status: "confirmed",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    "2024-01-17": [
      {
        id: 4,
        student: "Phạm Thị D",
        subject: "General English",
        time: "16:00",
        duration: 60,
        type: "online",
        status: "pending",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  }

  const todayClasses = scheduleData["2024-01-15"] || []
  const upcomingClasses = [...(scheduleData["2024-01-16"] || []), ...(scheduleData["2024-01-17"] || [])]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDays = getWeekDays(currentDate)

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const renderClassCard = (classItem: any, isToday = false) => (
    <Card key={classItem.id} className={`mb-3 ${isToday ? "border-green-200 bg-green-50 dark:bg-green-900/20" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={classItem.avatar || "/placeholder.svg"} />
              <AvatarFallback>{classItem.student.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{classItem.student}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.subject}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-medium text-green-600">
                  {classItem.time} ({classItem.duration} phút)
                </span>
                <Badge variant={classItem.type === "online" ? "default" : "secondary"}>
                  {classItem.type === "online" ? (
                    <Video className="h-3 w-3 mr-1" />
                  ) : (
                    <MapPin className="h-3 w-3 mr-1" />
                  )}
                  {classItem.type === "online" ? "Online" : "Offline"}
                </Badge>
                <Badge variant={classItem.status === "confirmed" ? "default" : "secondary"}>
                  {classItem.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {classItem.status === "confirmed" && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Video className="h-4 w-4 mr-1" />
                Tham gia
              </Button>
            )}
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-1" />
              Nhắn tin
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderWeekView = () => (
    <div className="grid grid-cols-7 gap-4">
      {weekDays.map((day, index) => {
        const dateKey = day.toISOString().split("T")[0]
        const dayClasses = scheduleData[dateKey] || []
        const isToday = day.toDateString() === new Date().toDateString()

        return (
          <div key={index} className="min-h-[200px]">
            <div
              className={`text-center p-2 rounded-t-lg ${isToday ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-700"}`}
            >
              <div className="text-sm font-medium">{day.toLocaleDateString("vi-VN", { weekday: "short" })}</div>
              <div className="text-lg font-bold">{day.getDate()}</div>
            </div>
            <div className="border border-t-0 rounded-b-lg p-2 min-h-[150px] bg-white dark:bg-gray-800">
              {dayClasses.map((classItem) => (
                <div key={classItem.id} className="mb-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs">
                  <div className="font-medium">{classItem.time}</div>
                  <div className="text-gray-600 dark:text-gray-400 truncate">{classItem.student}</div>
                  <div className="text-gray-500 dark:text-gray-500 truncate">{classItem.subject}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

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
                    {t("teacher.schedule.title")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Quản lý lịch giảng dạy và thời gian biểu
                  </p>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <LanguageToggle />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm lịch trống
                  </Button>
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

          {/* Schedule content */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList>
                    <TabsTrigger value="day">{t("teacher.schedule.today")}</TabsTrigger>
                    <TabsTrigger value="week">{t("teacher.schedule.week")}</TabsTrigger>
                    <TabsTrigger value="month">{t("teacher.schedule.month")}</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {viewMode === "week"
                        ? `Tuần ${Math.ceil(currentDate.getDate() / 7)} - ${currentDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}`
                        : formatDate(currentDate)}
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <TabsContent value="day" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Lớp học hôm nay</CardTitle>
                          <CardDescription>{formatDate(new Date())}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {todayClasses.length > 0 ? (
                            todayClasses.map((classItem) => renderClassCard(classItem, true))
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                              Không có lớp học nào hôm nay
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Lớp học sắp tới</CardTitle>
                          <CardDescription>Những ngày tiếp theo</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {upcomingClasses.length > 0 ? (
                            upcomingClasses.map((classItem) => renderClassCard(classItem))
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                              Không có lớp học sắp tới
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="week" className="mt-6">
                  {renderWeekView()}
                </TabsContent>

                <TabsContent value="month" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        Chế độ xem tháng sẽ được cập nhật sớm
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
