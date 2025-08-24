'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Clock, BookOpen, Search, Filter, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Teacher, TeacherSearchResponse } from '@/types/api'
import Link from 'next/link'

export default function TeachersPage() {
  const { t } = useLanguage()
  const router = useRouter()
  
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useState({
    search: '',
    minRating: 0,
    page: 1,
    limit: 12,
    sortBy: 'averageRating',
    sortOrder: 'desc' as 'asc' | 'desc'
  })
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0
  })

  const fetchTeachers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.teachers.search({
        ...searchParams,
        search: searchParams.search || undefined,
        minRating: searchParams.minRating || undefined
      })
      const data = response.data as TeacherSearchResponse
      setTeachers(data.data.teachers)
      setPagination({
        total: data.data.total,
        page: data.data.page,
        limit: data.data.limit,
        totalPages: data.data.totalPages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch teachers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [searchParams])

  const handleSearch = () => {
    setSearchParams(prev => ({ ...prev, search: searchQuery, page: 1 }))
  }

  const handleRatingFilter = (minRating: number) => {
    setSearchParams(prev => ({ ...prev, minRating, page: 1 }))
  }

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSearchParams(prev => ({ ...prev, sortBy, sortOrder, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-green-600">
                antoree
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Find Teachers</h1>
            </div>
            <Button variant="ghost" onClick={() => router.push('/')} className="text-gray-600 hover:text-gray-900">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search teachers by name, specialties, or language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="h-12 text-base"
                  />
                </div>
                <Button onClick={handleSearch} className="h-12 px-6 bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <Select value={searchParams.minRating.toString()} onValueChange={(value) => handleRatingFilter(Number(value))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">⭐ 3+ Stars</SelectItem>
                      <SelectItem value="4">⭐ 4+ Stars</SelectItem>
                      <SelectItem value="5">⭐ 5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={searchParams.sortBy} onValueChange={(value) => handleSort(value, searchParams.sortOrder)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="averageRating">Rating</SelectItem>
                      <SelectItem value="hourlyRate">Price</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="totalLessons">Lessons Taught</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                  <Select value={searchParams.sortOrder} onValueChange={(value) => handleSort(searchParams.sortBy, value as 'asc' | 'desc')}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">High to Low</SelectItem>
                      <SelectItem value="asc">Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Teachers</h2>
            <p className="text-gray-600 mt-1">
              {loading ? 'Loading...' : `${pagination.total} teachers available`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Teachers Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {teachers.map((teacher) => (
                <Card key={teacher.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => router.push(`/teachers/${teacher.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={teacher.avatar}
                          alt={teacher.fullName}
                          className="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-green-200 transition-all duration-300"
                        />
                        {teacher.isLive && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                          {teacher.fullName}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-yellow-100 px-2 py-1 rounded-lg">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-orange-700">{teacher.averageRating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({teacher.totalLessons} lessons)</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {teacher.experience} years
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            ~{teacher.responseTime}min
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {teacher.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {teacher.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {teacher.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{teacher.specialties.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ${teacher.hourlyRate}/hour
                      </div>
                      {teacher.isLive && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          Available
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? "default" : "outline"}
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2"
                >
                  Next
                </Button>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} teachers
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && !error && teachers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters to find more teachers.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("")
                setSearchParams(prev => ({ ...prev, search: '', minRating: 0, page: 1 }))
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              🌟 Show All Teachers
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
