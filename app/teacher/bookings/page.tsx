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
  Clock,
  Star,
  TrendingUp,
  MessageSquare,
  Check,
  XIcon,
  Eye,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import Link from "next/link"

export default function TeacherBookings() {
  const { t } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const sidebarItems = [
    { name: t("teacher.dashboard.title"), href: "/teacher/dashboard", icon: TrendingUp },
    { name: t("teacher.bookings.title"), href: "/teacher/bookings", icon: BookOpen, current: true },
    { name: t("teacher.schedule.title"), href: "/teacher/schedule", icon: Calendar },
    { name: t("teacher.students.title"), href: "/teacher/students", icon: Users },
    { name: "Tin nhắn", href: "/teacher/messages", icon: MessageSquare },
    { name: "Cài đặt", href: "/teacher/settings", icon: Settings },
  ]

  const bookings = {
    pending: [
      {
        id: 1,
        student: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        subject: "English Conversation",
        level: "Intermediate",
        date: "2024-01-15",
        time: "10:00 AM",
        duration: "60 min",
        price: "$25",
        message: "Tôi muốn cải thiện kỹ năng giao tiếp tiếng Anh cho công việc.",
        avatar: "/placeholder.svg?height=40&width=40",
        requestedAt: "2 giờ trước",
      },
      {
        id: 2,
        student: "Trần Thị B",
        email: "tranthib@email.com",
        subject: "IELTS Preparation",
        level: "Advanced",
        date: "2024-01-16",
        time: "2:00 PM",
        duration: "90 min",
        price: "$35",
        message: "Cần luyện thi IELTS để đạt band 7.0.",
        avatar: "/placeholder.svg?height=40&width=40",
        requestedAt: "5 giờ trước",
      },
      {
        id: 3,
        student: "Lê Minh C",
        email: "leminhc@email.com",
        subject: "Business English",
        level: "Intermediate",
        date: "2024-01-17",
        time: "4:30 PM",
        duration: "60 min",
        price: "$30",
        message: "Muốn học tiếng Anh thương mại để thuyết trình tốt hơn.",
        avatar: "/placeholder.svg?height=40&width=40",
        requestedAt: "1 ngày trước",
      },
    ],
    confirmed: [
      {
        id: 4,
        student: "Phạm Thị D",
        email: "phamthid@email.com",
        subject: "General English",
        level: "Beginner",
        date: "2024-01-14",
        time: "9:00 AM",
        duration: "60 min",
        price: "$20",
        message: "Tôi là người mới bắt đầu học tiếng Anh.",
        avatar: "/placeholder.svg?height=40&width=40",
        confirmedAt: "1 ngày trước",
      },
      {
        id: 5,
        student: "Hoàng Văn E",
        email: "hoangvane@email.com",
        subject: "TOEIC Preparation",
        level: "Intermediate",
        date: "2024-01-18",
        time: "3:00 PM",
        duration: "90 min",
        price: "$35",
        message: "Cần đạt 800+ điểm TOEIC.",
        avatar: "/placeholder.svg?height=40&width=40",
        confirmedAt: "3 ngày trước",
      },
    ],
    completed: [
      {
        id: 6,
        student: "Võ Thị F",
        email: "vothif@email.com",
        subject: "English Conversation",
        level: "Advanced",
        date: "2024-01-10",
        time: "11:00 AM",
        duration: "60 min",
        price: "$25",
        rating: 5,
        feedback: "Giáo viên rất nhiệt tình và bài học rất hữu ích!",
        avatar: "/placeholder.svg?height=40&width=40",
        completedAt: "4 ngày trước",
      },
    ],
  }

  const handleAcceptBooking = (bookingId: number) => {
    console.log("[v0] Accepting booking:", bookingId)
    // Handle accept booking logic
  }

  const handleDeclineBooking = (bookingId: number) => {
    console.log("[v0] Declining booking:", bookingId)
    // Handle decline booking logic
  }

  const renderBookingCard = (booking: any, status: string) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={booking.avatar || "/placeholder.svg"} />
              <AvatarFallback>{booking.student.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{booking.student}</h3>
                <Badge variant="outline">{booking.level}</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{booking.email}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{booking.subject}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {booking.date}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {booking.time} ({booking.duration})
                </span>
                <span className="font-semibold text-green-600">{booking.price}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                "{booking.message}"
              </p>
              {booking.feedback && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{booking.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">"{booking.feedback}"</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {status === "pending" && `Yêu cầu ${booking.requestedAt}`}
              {status === "confirmed" && `Xác nhận ${booking.confirmedAt}`}
              {status === "completed" && `Hoàn thành ${booking.completedAt}`}
            </span>
            {status === "pending" && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeclineBooking(booking.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Từ chối
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAcceptBooking(booking.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Chấp nhận
                </Button>
              </div>
            )}
            {status === "confirmed" && (
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-1" />
                Nhắn tin
              </Button>
            )}
            {status === "completed" && (
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                Xem chi tiết
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
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
                    {t("teacher.bookings.title")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Quản lý yêu cầu đặt lịch từ học viên</p>
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

          {/* Bookings content */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Search and filters */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm theo tên học viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>

              {/* Booking tabs */}
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending" className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {t("teacher.bookings.pending")} ({bookings.pending.length})
                  </TabsTrigger>
                  <TabsTrigger value="confirmed" className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    {t("teacher.bookings.confirmed")} ({bookings.confirmed.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    {t("teacher.bookings.completed")} ({bookings.completed.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                  <div className="space-y-4">
                    {bookings.pending.map((booking) => renderBookingCard(booking, "pending"))}
                  </div>
                </TabsContent>

                <TabsContent value="confirmed" className="mt-6">
                  <div className="space-y-4">
                    {bookings.confirmed.map((booking) => renderBookingCard(booking, "confirmed"))}
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                  <div className="space-y-4">
                    {bookings.completed.map((booking) => renderBookingCard(booking, "completed"))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
