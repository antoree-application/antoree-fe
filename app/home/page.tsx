"use client"

import { ChevronDown, User, Phone, Mail, Star, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import type { Teacher, TeacherSearchResponse } from "@/types/api"

export default function HomePage() {
  const { t } = useLanguage()
  const router = useRouter()
  
  // State for search and teachers
  const [searchQuery, setSearchQuery] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [format, setFormat] = useState("")
  const [level, setLevel] = useState("")
  const [minRating, setMinRating] = useState<number | undefined>(undefined)
  const [specialties, setSpecialties] = useState("")
  const [minExperience, setMinExperience] = useState<number | undefined>(undefined)
  const [timezone, setTimezone] = useState("Asia/Ho_Chi_Minh")
  const [availableOnDay, setAvailableOnDay] = useState<number | undefined>(undefined)
  const [availableAtTime, setAvailableAtTime] = useState("")
  const [certifications, setCertifications] = useState("")
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [languages, setLanguages] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [totalTeachers, setTotalTeachers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // Fetch teachers function with error handling
  const fetchTeachers = async (search = "", page = 1, loadMore = false) => {
    setLoading(true)
    try {
      const filters: any = {
        search: search || searchQuery || undefined,
        page,
        limit: 3,
        sortBy: 'averageRating',
        sortOrder: 'desc' as const
      }

      // Add advanced filters
      if (minRating !== undefined) filters.minRating = minRating
      if (specialties) filters.specialties = specialties
      if (minExperience !== undefined) filters.minExperience = minExperience
      if (timezone) filters.timezone = timezone
      if (availableOnDay !== undefined) filters.availableOnDay = availableOnDay
      if (availableAtTime) filters.availableAtTime = availableAtTime
      if (certifications) filters.certifications = certifications
      if (minPrice !== undefined) filters.minPrice = minPrice
      if (maxPrice !== undefined) filters.maxPrice = maxPrice
      if (languages) filters.languages = languages
      if (format) filters.format = format
      if (level) filters.level = level

      // Check if API is available
      if (typeof api !== 'undefined' && api.teachers && api.teachers.search) {
        const response = await api.teachers.search(filters)
        const data = response.data as TeacherSearchResponse
        
        if (loadMore) {
          setTeachers(prev => [...prev, ...data.data.teachers])
        } else {
          setTeachers(data.data.teachers)
        }
        setTotalTeachers(data.data.total)
      } else {
        // Fallback with mock data if API is not available
        const mockTeachers = [
          {
            id: "1",
            fullName: "Sarah Johnson",
            avatar: "/professional-english-teacher-.png",
            bio: "Experienced English teacher with 5+ years of teaching business English and IELTS preparation.",
            experience: 5,
            averageRating: 4.8,
            hourlyRate: 25,
            totalLessons: 150,
            specialties: ["Business English", "IELTS"],
            isLive: true,
            recentReviews: [{
              studentName: "John Doe",
              studentAvatar: "/student-testimonial.png",
              comment: "Great teacher, very patient and helpful!"
            }]
          },
          {
            id: "2",
            fullName: "Michael Chen",
            avatar: "/male-teacher.png",
            bio: "Native English speaker specializing in conversation practice and pronunciation improvement.",
            experience: 3,
            averageRating: 4.9,
            hourlyRate: 20,
            totalLessons: 80,
            specialties: ["Conversation", "Pronunciation"],
            isLive: false,
            recentReviews: [{
              studentName: "Jane Smith",
              studentAvatar: "/student-testimonial.png",
              comment: "Excellent conversation practice sessions!"
            }]
          },
          {
            id: "3",
            fullName: "Emma Wilson",
            avatar: "/female-teacher.png",
            bio: "Certified TESOL teacher with expertise in grammar and academic English.",
            experience: 7,
            averageRating: 4.7,
            hourlyRate: 30,
            totalLessons: 200,
            specialties: ["Grammar", "Academic English"],
            isLive: true,
            recentReviews: [{
              studentName: "Mike Brown",
              studentAvatar: "/student-testimonial.png",
              comment: "Very knowledgeable and well-prepared lessons!"
            }]
          }
        ]
        
        if (loadMore) {
          setTeachers(prev => [...prev, ...mockTeachers])
        } else {
          setTeachers(mockTeachers)
        }
        setTotalTeachers(mockTeachers.length)
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error)
      // Set empty state if there's an error
      setTeachers([])
      setTotalTeachers(0)
    } finally {
      setLoading(false)
    }
  }

  // Load initial teachers
  useEffect(() => {
    fetchTeachers()
  }, [])

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1)
    fetchTeachers(searchQuery, 1)
  }

  // Handle load more
  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchTeachers(searchQuery, nextPage, true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/home" className="text-2xl font-bold text-green-600">antoree</Link>
              <div className="ml-2 text-xs text-gray-500">LEARN ENGLISH ONLINE 1-ON-1</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/teachers" className="text-gray-700 hover:text-green-600">
                Teachers
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-600">
                Community
              </Link>
              <Link href="/review/page/1" className="text-gray-700 hover:text-green-600">
                Reviews
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-green-600 flex items-center">
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/terms" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    Terms
                  </Link>
                  <Link href="/payment/step1" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    Payment
                  </Link>
                  <Link href="/contact-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    Contact
                  </Link>
                  <Link href="/faqs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    Help
                  </Link>
                </div>
              </div>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                onClick={() => router.push('/register/student')}
              >
                Try Free
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 flex items-center"
                onClick={() => router.push('/login')}
              >
                Login <User className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium">🚀 Join 10,000+ students learning online</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent leading-tight">
            Learn English Online 1-on-1
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-green-50 font-light max-w-3xl mx-auto leading-relaxed">
            Connect with qualified English teachers from around the world for personalized learning
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-5xl mx-auto shadow-2xl border border-white/20">
            {/* Main Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-stretch">
              <div className="md:col-span-2">
                <Input 
                  placeholder="What do you want to learn?" 
                  className="h-14 text-gray-700 border-0 bg-gray-50 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 text-base px-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div>
                <Select value={timeSlot} onValueChange={(value) => {
                  setTimeSlot(value)
                  // Map time slot to availableAtTime
                  const timeMap: Record<string, string> = {
                    morning: "09:00",
                    afternoon: "14:00", 
                    evening: "19:00"
                  }
                  setAvailableAtTime(timeMap[value] || "")
                }}>
                  <SelectTrigger className="h-14 text-gray-700 border-0 bg-gray-50 rounded-xl shadow-sm px-4">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 shadow-xl">
                    <SelectItem value="morning">🌅 Morning (9AM)</SelectItem>
                    <SelectItem value="afternoon">☀️ Afternoon (2PM)</SelectItem>
                    <SelectItem value="evening">🌙 Evening (7PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="h-14 text-gray-700 border-0 bg-gray-50 rounded-xl shadow-sm px-4">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 shadow-xl">
                    <SelectItem value="online">💻 Online</SelectItem>
                    <SelectItem value="offline">🏫 Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="h-14 text-gray-700 border-0 bg-gray-50 rounded-xl shadow-sm px-4">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 shadow-xl">
                    <SelectItem value="beginner">🌱 Beginner</SelectItem>
                    <SelectItem value="intermediate">🌿 Intermediate</SelectItem>
                    <SelectItem value="advanced">🌳 Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-14 px-10 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      🔍 Find Teachers
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🌟 Featured Teachers</h2>
              <p className="text-gray-600">Meet our top-rated English teachers</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => router.push('/teachers')}
              className="px-6 py-3 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700 font-semibold"
            >
              View All Teachers
            </Button>
          </div>

          {/* Teacher Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.slice(0, 3).map((teacher, index) => (
              <div key={teacher.id} className="group bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative text-center">
                  {/* Teacher Avatar */}
                  <div className="relative mx-auto mb-4">
                    <img
                      src={teacher.avatar}
                      alt={teacher.fullName}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto ring-2 ring-gray-100 group-hover:ring-green-200 transition-all duration-300"
                    />
                    {/* Online status indicator */}
                    {teacher.isLive && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Teacher Info */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300 mb-2">
                    {teacher.fullName}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      📚 {teacher.experience} years
                    </span>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-yellow-100 px-2 py-1 rounded-lg">
                      <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">⭐</span>
                      </div>
                      <span className="font-semibold text-orange-700">{teacher.averageRating}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{teacher.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {teacher.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
                      >
                        🎯 {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="space-y-3">
                    <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${teacher.hourlyRate}/hour
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => router.push(`/teachers/${teacher.id}`)}
                    >
                      👁️ View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning with our qualified teachers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-green-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push('/register/student')}
            >
              🚀 Start Learning Now
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              onClick={() => router.push('/teachers')}
            >
              👀 Browse Teachers
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Hotline 0877709376</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>cskh@antoree.com</span>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Info</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <Link href="/terms" className="block hover:text-white">Terms of Service</Link>
                <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
                <Link href="/refund" className="block hover:text-white">Refund Policy</Link>
                <Link href="/faqs" className="block hover:text-white">FAQs</Link>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <Link href="/community" className="block hover:text-white">Community</Link>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-sm"
                  onClick={() => router.push('/register/teacher')}
                >
                  Become a Teacher
                </Button>
              </div>
            </div>

            {/* Mobile Apps */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Mobile Apps</h4>
              <div className="space-y-3">
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
                  Google Play
                </div>
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">App Store</div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2025 Antoree. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
