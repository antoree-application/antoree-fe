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
  Search,
  Filter,
  Star,
  Clock,
  Award,
  BarChart3,
  FileText,
  Phone,
  Mail,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import Link from "next/link"

export default function TeacherStudents() {
  const { t } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const sidebarItems = [
    { name: t("teacher.dashboard.title"), href: "/teacher/dashboard", icon: TrendingUp },
    { name: t("teacher.bookings.title"), href: "/teacher/bookings", icon: BookOpen },
    { name: t("teacher.schedule.title"), href: "/teacher/schedule", icon: Calendar },
    { name: t("teacher.students.title"), href: "/teacher/students", icon: Users, current: true },
    { name: "Tin nhắn", href: "/teacher/messages", icon: MessageSquare },
    { name: "Cài đặt", href: "/teacher/settings", icon: Settings },
  ]

  const students = {
    active: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        phone: "+84 901 234 567",
        avatar: "/placeholder.svg?height=60&width=60",
        level: "Intermediate",
        subject: "English Conversation",
        joinDate: "2023-10-15",
        totalLessons: 24,
        completedLessons: 18,
        upcomingLesson: "2024-01-16 10:00",
        progress: 75,
        rating: 4.8,
        lastActivity: "2 ngày trước",
        notes: "Học viên rất tích cực, cần cải thiện phát âm",
        goals: ["Cải thiện giao tiếp", "Luyện phát âm", "Từ vựng business"],
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@email.com",
        phone: "+84 902 345 678",
        avatar: "/placeholder.svg?height=60&width=60",
        level: "Advanced",
        subject: "IELTS Preparation",
        joinDate: "2023-11-20",
        totalLessons: 16,
        completedLessons: 12,
        upcomingLesson: "2024-01-17 14:00",
        progress: 85,
        rating: 4.9,
        lastActivity: "1 ngày trước",
        notes: "Mục tiêu IELTS 7.0, đang cải thiện Writing Task 2",
        goals: ["IELTS 7.0", "Academic Writing", "Speaking fluency"],
      },
      {
        id: 3,
        name: "Lê Minh C",
        email: "leminhc@email.com",
        phone: "+84 903 456 789",
        avatar: "/placeholder.svg?height=60&width=60",
        level: "Beginner",
        subject: "General English",
        joinDate: "2023-12-01",
        totalLessons: 8,
        completedLessons: 6,
        upcomingLesson: "2024-01-18 16:30",
        progress: 40,
        rating: 4.7,
        lastActivity: "3 ngày trước",
        notes: "Mới bắt đầu, cần động viên và hỗ trợ nhiều",
        goals: ["Giao tiếp cơ bản", "Ngữ pháp nền tảng", "Từ vựng hàng ngày"],
      },
    ],
    completed: [
      {
        id: 4,
        name: "Phạm Thị D",
        email: "phamthid@email.com",
        phone: "+84 904 567 890",
        avatar: "/placeholder.svg?height=60&width=60",
        level: "Intermediate",
        subject: "Business English",
        joinDate: "2023-08-10",
        totalLessons: 30,
        completedLessons: 30,
        completedDate: "2023-12-15",
        progress: 100,
        rating: 4.9,
        finalFeedback: "Đã hoàn thành khóa học xuất sắc, có thể giao tiếp tự tin trong môi trường công việc",
        achievement: "Đạt mục tiêu giao tiếp business English",
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        email: "hoangvane@email.com",
        phone: "+84 905 678 901",
        avatar: "/placeholder.svg?height=60&width=60",
        level: "Advanced",
        subject: "TOEIC Preparation",
        joinDate: "2023-09-05",
        totalLessons: 20,
        completedLessons: 20,
        completedDate: "2023-12-20",
        progress: 100,
        rating: 4.8,
        finalFeedback: "Đạt 850 điểm TOEIC, vượt mục tiêu ban đầu",
        achievement: "TOEIC 850/990",
      },
    ],
  }

  const renderStudentCard = (student: any, isActive = true) => (
    <Card key={student.id} className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatar || "/placeholder.svg"} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                <Badge variant="outline">{student.level}</Badge>
                {!isActive && <Badge variant="secondary">Hoàn thành</Badge>}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{student.subject}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {student.email}
                </span>
                <span className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {student.phone}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Tham gia: {new Date(student.joinDate).toLocaleDateString("vi-VN")}</span>
                <span>
                  Bài học: {student.completedLessons}/{student.totalLessons}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  <span>{student.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-1" />
              Nhắn tin
            </Button>
            {isActive && (
              <Button size="sm" variant="outline">
                <Video className="h-4 w-4 mr-1" />
                Lớp học
              </Button>
            )}
            <Button size="sm" variant="outline">
              <FileText className="h-4 w-4 mr-1" />
              Hồ sơ
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tiến độ học tập</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{student.progress}%</span>
          </div>
          <Progress value={student.progress} className="h-2" />
        </div>

        {/* Goals or Achievement */}
        <div className="mb-4">
          {isActive ? (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mục tiêu học tập</h4>
              <div className="flex flex-wrap gap-2">
                {student.goals?.map((goal: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">Thành tích</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">{student.achievement}</p>
            </div>
          )}
        </div>

        {/* Notes/Feedback */}
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {isActive ? "Ghi chú" : "Đánh giá cuối khóa"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{isActive ? student.notes : student.finalFeedback}</p>
        </div>

        {/* Next lesson info for active students */}
        {isActive && student.upcomingLesson && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Lớp học tiếp theo: {new Date(student.upcomingLesson).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        )}
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
                    {t("teacher.students.title")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Quản lý và theo dõi tiến độ học tập của học viên
                  </p>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <LanguageToggle />
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Báo cáo
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

          {/* Students content */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Search and filters */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm học viên..."
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

              {/* Students tabs */}
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {t("teacher.students.active")} ({students.active.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    {t("teacher.students.completed")} ({students.completed.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-6">
                  <div className="space-y-6">{students.active.map((student) => renderStudentCard(student, true))}</div>
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                  <div className="space-y-6">
                    {students.completed.map((student) => renderStudentCard(student, false))}
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
