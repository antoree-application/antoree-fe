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

  // Fetch teachers function
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

      const response = await api.teachers.search(filters)
      const data = response.data as TeacherSearchResponse
      
      if (loadMore) {
        setTeachers(prev => [...prev, ...data.data.teachers])
      } else {
        setTeachers(data.data.teachers)
      }
      setTotalTeachers(data.data.total)
    } catch (error) {
      console.error('Failed to fetch teachers:', error)
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
              <div className="text-2xl font-bold text-green-600">antoree</div>
              <div className="ml-2 text-xs text-gray-500">LEARN ENGLISH ONLINE 1-ON-1</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/teachers" className="text-gray-700 hover:text-green-600">
                {t("nav.teachers")}
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-600">
                {t("nav.community")}
              </Link>
              <Link href="/review/page/1" className="text-gray-700 hover:text-green-600">
                {t("nav.reviews")}
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-green-600 flex items-center">
                  {t("nav.about")} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/terms" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    {t("nav.about.terms")}
                  </Link>
                  <Link href="/payment/step1" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    {t("nav.about.payment")}
                  </Link>
                  <Link href="/contact-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    {t("nav.about.contact")}
                  </Link>
                  <Link href="/faqs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600">
                    {t("nav.about.help")}
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
                {t("nav.tryFree")}
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 flex items-center"
                onClick={() => router.push('/login')}
              >
                {t("nav.login")} <User className="ml-2 h-4 w-4" />
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
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-green-50 font-light max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
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
                  variant="outline"
                  className="h-14 px-4 rounded-xl border-2 border-gray-300 hover:border-green-400 hover:bg-green-50 text-gray-700 transition-all duration-300"
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                >
                  <span className="flex items-center gap-2">
                    ⚙️ Filters
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSearchExpanded ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
              </div>
            </div>

            {/* Advanced Filters Section - Collapsible */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSearchExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border border-gray-200/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    🎯 Advanced Search Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMinRating(undefined)
                      setSpecialties("")
                      setMinExperience(undefined)
                      setAvailableOnDay(undefined)
                      setAvailableAtTime("")
                      setCertifications("")
                      setMinPrice(undefined)
                      setMaxPrice(undefined)
                      setLanguages("")
                      setTimeSlot("")
                      setFormat("")
                      setLevel("")
                    }}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    🗑️ Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Min Rating</label>
                    <Select value={minRating?.toString() || "any"} onValueChange={(value) => setMinRating(value === "any" ? undefined : Number(value))}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Rating</SelectItem>
                        <SelectItem value="4">⭐ 4+ Stars</SelectItem>
                        <SelectItem value="4.5">⭐ 4.5+ Stars</SelectItem>
                        <SelectItem value="4.8">⭐ 4.8+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Specialties</label>
                    <Select value={specialties || "all"} onValueChange={(value) => setSpecialties(value === "all" ? "" : value)}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="English">🇬🇧 English</SelectItem>
                        <SelectItem value="Business English">💼 Business English</SelectItem>
                        <SelectItem value="IELTS">📝 IELTS</SelectItem>
                        <SelectItem value="TOEFL">📖 TOEFL</SelectItem>
                        <SelectItem value="Conversation">💬 Conversation</SelectItem>
                        <SelectItem value="Grammar">📚 Grammar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Min Experience</label>
                    <Select value={minExperience?.toString() || "any"} onValueChange={(value) => setMinExperience(value === "any" ? undefined : Number(value))}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Any Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Experience</SelectItem>
                        <SelectItem value="1">1+ Years</SelectItem>
                        <SelectItem value="2">2+ Years</SelectItem>
                        <SelectItem value="3">3+ Years</SelectItem>
                        <SelectItem value="5">5+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Certifications</label>
                    <Select value={certifications || "any"} onValueChange={(value) => setCertifications(value === "any" ? "" : value)}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Any Certification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Certification</SelectItem>
                        <SelectItem value="TESOL">🎓 TESOL</SelectItem>
                        <SelectItem value="TEFL">🎓 TEFL</SelectItem>
                        <SelectItem value="TESOL,TEFL">🎓 TESOL & TEFL</SelectItem>
                        <SelectItem value="CELTA">🎓 CELTA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Available Day</label>
                    <Select value={availableOnDay?.toString() || "any"} onValueChange={(value) => setAvailableOnDay(value === "any" ? undefined : Number(value))}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Any Day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Day</SelectItem>
                        <SelectItem value="1">Monday</SelectItem>
                        <SelectItem value="2">Tuesday</SelectItem>
                        <SelectItem value="3">Wednesday</SelectItem>
                        <SelectItem value="4">Thursday</SelectItem>
                        <SelectItem value="5">Friday</SelectItem>
                        <SelectItem value="6">Saturday</SelectItem>
                        <SelectItem value="0">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range ($/hour)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice || ""}
                        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                        className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice || ""}
                        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                        className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Languages</label>
                    <Select value={languages || "any"} onValueChange={(value) => setLanguages(value === "any" ? "" : value)}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Any Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Language</SelectItem>
                        <SelectItem value="English">🇬🇧 English</SelectItem>
                        <SelectItem value="Vietnamese">🇻🇳 Vietnamese</SelectItem>
                        <SelectItem value="Chinese">🇨🇳 Chinese</SelectItem>
                        <SelectItem value="Japanese">🇯🇵 Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Timezone</label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="h-12 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Select Timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Ho_Chi_Minh">🇻🇳 Ho Chi Minh</SelectItem>
                        <SelectItem value="Asia/Bangkok">🇹🇭 Bangkok</SelectItem>
                        <SelectItem value="Asia/Singapore">🇸🇬 Singapore</SelectItem>
                        <SelectItem value="Asia/Tokyo">🇯🇵 Tokyo</SelectItem>
                        <SelectItem value="America/New_York">🇺🇸 New York</SelectItem>
                        <SelectItem value="Europe/London">🇬🇧 London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-14 px-10 rounded-xl font-semibold flex-1 sm:flex-none text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
              
              <Button 
                variant="outline"
                className="h-14 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 transition-all duration-300"
                onClick={() => {
                  setSearchQuery("")
                  setTimeSlot("")
                  setFormat("")
                  setLevel("")
                  setMinRating(undefined)
                  setSpecialties("")
                  setMinExperience(undefined)
                  setAvailableOnDay(undefined)
                  setAvailableAtTime("")
                  setCertifications("")
                  setMinPrice(undefined)
                  setMaxPrice(undefined)
                  setLanguages("")
                  setCurrentPage(1)
                  fetchTeachers("", 1)
                }}
              >
                🔄 Clear All
              </Button>

              {isSearchExpanded && (
                <Button 
                  variant="ghost"
                  className="h-14 px-6 rounded-xl text-gray-600 hover:text-gray-800 transition-all duration-300"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  ⬆️ Collapse
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Teacher Listings */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Search Results</h2>
                  <p className="text-gray-600">{totalTeachers} teachers match your requirements</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Available now</span>
                  </div>
                  <span>•</span>
                  <span>Highest rated</span>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || minRating || specialties || minExperience || certifications || availableAtTime || minPrice || maxPrice) && (
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Active Filters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        🔍 Search: "{searchQuery}"
                        <button onClick={() => { setSearchQuery(""); fetchTeachers("", 1); }} className="ml-1 hover:text-blue-600">×</button>
                      </span>
                    )}
                    {minRating && (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                        ⭐ Rating: {minRating}+
                        <button onClick={() => { setMinRating(undefined); fetchTeachers("", 1); }} className="ml-1 hover:text-yellow-600">×</button>
                      </span>
                    )}
                    {specialties && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        🎯 Specialty: {specialties}
                        <button onClick={() => { setSpecialties(""); fetchTeachers("", 1); }} className="ml-1 hover:text-green-600">×</button>
                      </span>
                    )}
                    {minExperience && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                        📚 Experience: {minExperience}+ years
                        <button onClick={() => { setMinExperience(undefined); fetchTeachers("", 1); }} className="ml-1 hover:text-purple-600">×</button>
                      </span>
                    )}
                    {certifications && (
                      <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                        🎓 Cert: {certifications}
                        <button onClick={() => { setCertifications(""); fetchTeachers("", 1); }} className="ml-1 hover:text-indigo-600">×</button>
                      </span>
                    )}
                    {availableAtTime && (
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                        🕐 Time: {availableAtTime}
                        <button onClick={() => { setAvailableAtTime(""); setTimeSlot(""); fetchTeachers("", 1); }} className="ml-1 hover:text-orange-600">×</button>
                      </span>
                    )}
                    {(minPrice || maxPrice) && (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full">
                        💰 Price: ${minPrice || "0"}-${maxPrice || "∞"}
                        <button onClick={() => { setMinPrice(undefined); setMaxPrice(undefined); fetchTeachers("", 1); }} className="ml-1 hover:text-emerald-600">×</button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            )}

            {/* Teacher Cards */}
            <div className="space-y-6">
              {teachers.map((teacher, index) => (
                <div key={teacher.id} className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="relative flex gap-6">
                    {/* Teacher Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="relative">
                        <img
                          src={teacher.avatar}
                          alt={teacher.fullName}
                          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-100 group-hover:ring-green-200 transition-all duration-300"
                        />
                        {/* Online status indicator */}
                        {teacher.isLive && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Available status below avatar */}
                      {teacher.isLive && (
                        <div className="mt-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full text-center font-medium shadow-lg">
                          ⚡ Available
                        </div>
                      )}
                    </div>

                    {/* Teacher Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                              {teacher.fullName}
                            </h3>
                            {/* Teacher's country flag */}
                            <div className="w-7 h-5 rounded-md overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-400">
                              <span className="text-sm">🇻🇳</span>
                            </div>
                            {/* Language flag they teach */}
                            <div className="w-7 h-5 rounded-md overflow-hidden border border-gray-200 shadow-sm bg-gradient-to-br from-blue-600 to-red-500 flex items-center justify-center">
                              <span className="text-sm">🇬🇧</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              📚 {teacher.experience} years experience
                            </span>
                            <span className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-yellow-100 px-2 py-1 rounded-lg">
                                <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">⭐</span>
                                </div>
                                <span className="font-semibold text-orange-700">{teacher.averageRating}</span>
                              </div>
                            </span>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          onClick={() => router.push(`/teachers/${teacher.id}`)}
                        >
                          👁️ View Details
                        </Button>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{teacher.bio}</p>

                      {/* Recent Review */}
                      {teacher.recentReviews.length > 0 && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white shadow-sm">
                            <img 
                              src={teacher.recentReviews[0].studentAvatar} 
                              alt={teacher.recentReviews[0].studentName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-800 mb-1">
                              💬 {teacher.recentReviews[0].studentName}
                            </div>
                            <div className="text-xs text-gray-600 line-clamp-1 italic">
                              "{teacher.recentReviews[0].comment}"
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {teacher.specialties.slice(0, 2).map((specialty, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
                            >
                              🎯 {specialty}
                            </span>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ${teacher.hourlyRate}/hour
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            📖 {teacher.totalLessons} lessons
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {teachers.length > 0 && teachers.length < totalTeachers && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700 font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                      Loading...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      👀 Show More Teachers
                    </div>
                  )}
                </Button>
              </div>
            )}

            {/* No results */}
            {!loading && teachers.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  No teachers match your search criteria. Try adjusting your filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("")
                    setTimeSlot("")
                    setFormat("")
                    setLevel("")
                    setMinRating(undefined)
                    setSpecialties("")
                    setMinExperience(undefined)
                    setAvailableOnDay(undefined)
                    setAvailableAtTime("")
                    setCertifications("")
                    setMinPrice(undefined)
                    setMaxPrice(undefined)
                    setLanguages("")
                    setCurrentPage(1)
                    fetchTeachers("", 1)
                  }}
                  className="px-6 py-3 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700 font-semibold"
                >
                  🌟 Show All Teachers
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Join CTA */}
          <div className="lg:w-80 space-y-6">
            {/* Join CTA Card */}
            <div className="bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Join Our Community</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Join our global community of teachers and create new ways of online learning.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 mb-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-3"
                  onClick={() => router.push('/register/teacher')}
                >
                  ✨ Become a Teacher
                </Button>
                
                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👥</span>
                      <span className="text-sm text-gray-600">Total Teachers:</span>
                    </div>
                    <span className="font-bold text-green-600">{totalTeachers}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Available Now:</span>
                    </div>
                    <span className="font-bold text-green-600">{teachers.filter(t => t.isLive).length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⭐</span>
                      <span className="text-sm text-gray-600">Avg Rating:</span>
                    </div>
                    <span className="font-bold text-orange-600">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🔥</span>
                </div>
                <h4 className="font-bold text-gray-900">Quick Filters</h4>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start rounded-xl text-sm py-3 h-12 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300"
                  onClick={() => {
                    setSearchQuery("English")
                    setSpecialties("English")
                    setCurrentPage(1)
                    fetchTeachers("English", 1)
                  }}
                >
                  <span className="mr-2">🇬🇧</span>
                  English Teachers
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start rounded-xl text-sm py-3 h-12 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => {
                    setSearchQuery("Business")
                    setSpecialties("Business English")
                    setMinRating(4)
                    setCurrentPage(1)
                    fetchTeachers("Business", 1)
                  }}
                >
                  <span className="mr-2">💼</span>
                  Business English
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start rounded-xl text-sm py-3 h-12 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                  onClick={() => {
                    setSearchQuery("IELTS")
                    setSpecialties("IELTS")
                    setMinExperience(2)
                    setCertifications("TESOL,TEFL")
                    setCurrentPage(1)
                    fetchTeachers("IELTS", 1)
                  }}
                >
                  <span className="mr-2">📝</span>
                  IELTS Preparation
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start rounded-xl text-sm py-3 h-12 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
                  onClick={() => {
                    setSearchQuery("Conversation")
                    setSpecialties("Conversation")
                    setAvailableAtTime("14:00")
                    setCurrentPage(1)
                    fetchTeachers("Conversation", 1)
                  }}
                >
                  <span className="mr-2">💬</span>
                  Conversation Practice
                </Button>
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
                  <span>Hotline 0877709376 /</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
                <div>cskh@antoree.com</div>
                <div className="mt-4">
                  <div>Phản hồi về dịch vụ</div>
                  <div>anh.pham2@antoree.com</div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.serviceInfo")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <Link href="/terms" className="block hover:text-white">{t("footer.terms")}</Link>
                <Link href="/privacy" className="block hover:text-white">{t("footer.privacy")}</Link>
                <Link href="/refund" className="block hover:text-white">{t("footer.refund")}</Link>
                <Link href="/faqs" className="block hover:text-white">{t("footer.faqs")}</Link>
                <Link href="/commitment" className="block hover:text-white">{t("footer.commitment")}</Link>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("footer.connect")}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <Link href="/community" className="block hover:text-white">{t("footer.community")}</Link>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-sm"
                  onClick={() => router.push('/register/teacher')}
                >
                  {t("sidebar.becomeTeacher")}
                </Button>
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
              <div>Công ty Giáo dục và Đào tạo ANTOREE INTERNATIONAL PTE. LTD. (MST: 201436962)</div>
              <div>Trụ sở chính: 10 Anson Road, #27-15, International Plaza, Singapore 079903</div>
              <div className="mt-4">
                <div>Đối tác đại diện tại Việt Nam: CÔNG TY TNHH PHÁT TRIỂN GIÁO DỤC ANTOREE (MST: 0313769851)</div>
                <div>Trụ sở chính: 15/77 Điện Biên Phủ, P. Đa Kao, Q.1, TP Hồ Chí Minh, Việt Nam</div>
                <div>
                  Văn phòng đại diện, tiếp khách và nhận thư tại TP Hồ Chí Minh: 56 GSA Trần Thái Tông, Phường 15, Quận
                  Tân Bình, Hồ Chí Minh, Việt Nam
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
              <div>© 2025 Antoree Pte Ltd</div>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-white">
                  {t("footer.privacy")}
                </Link>
                <Link href="/terms" className="hover:text-white">
                  {t("footer.terms")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
