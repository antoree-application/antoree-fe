"use client";

import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Teacher, TeacherSearchResponse } from "@/types/api";

export default function TeachersPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  // State for search and teachers
  const [searchQuery, setSearchQuery] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalTeachers, setTotalTeachers] = useState(0);

  // Fetch teachers function
  const fetchTeachers = async (search = "") => {
    setLoading(true);
    try {
      const filters = {
        search: search || undefined,
        page: 1,
        limit: 10,
        sortBy: 'averageRating',
        sortOrder: 'desc' as const
      };

      const response = await api.teachers.search(filters);
      const data = response.data as TeacherSearchResponse;
      
      setTeachers(data.data.teachers);
      setTotalTeachers(data.data.total);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial teachers
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle search
  const handleSearch = () => {
    fetchTeachers(searchQuery);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">antoree</div>
              <div className="ml-2 text-xs text-gray-500">LEARN ENGLISH ONLINE 1-ON-1</div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/teachers" className="text-gray-700 hover:text-green-600">
                Teachers
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-600">
                Community
              </Link>
            </nav>

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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Find Your Perfect English Teacher
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn with qualified, experienced teachers from around the world
          </p>

          {/* Simple Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Teachers List */}
          <div>
            {loading && teachers.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <img
                        src={teacher.avatar}
                        alt={teacher.fullName}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {teacher.fullName}
                      </h3>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{teacher.averageRating}</span>
                        <span className="text-gray-500">({teacher.totalLessons} lessons)</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {teacher.bio}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ${teacher.hourlyRate}/hour
                        </span>
                        <Button
                          onClick={() => router.push(`/teachers/${teacher.id}`)}
                          size="sm"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && teachers.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria.</p>
                <Button onClick={() => {
                  setSearchQuery("");
                  fetchTeachers("");
                }}>
                  Show All Teachers
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
