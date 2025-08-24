"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Star,
  Clock,
  Globe,
  Award,
  BookOpen,
  MessageCircle,
  Calendar,
  Video,
  MapPin,
  CheckCircle,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import type { TeacherAvailability, Teacher, Course } from "@/types/api";
import Link from "next/link";
import CertificateModal from "@/components/CertificateModal";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { QuickBookingWidget } from "@/components/ui/quick-booking-widget";

export default function TeacherDetailPage() {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const teacherId = params.teacherId as string;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [availability, setAvailability] = useState<TeacherAvailability[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    name: string;
    image: string;
    issueDate: string;
    certificateId: string;
    description?: string;
  } | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Booking related state
  const [isBookingTrial, setIsBookingTrial] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [hasBookedTrial, setHasBookedTrial] = useState(false);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true);

        // Fetch teacher details
        const teacherResponse = await api.teachers.getById(teacherId);
        setTeacher((teacherResponse.data as any).data);

        // Fetch teacher availability
        setAvailabilityLoading(true);
        try {
          const availabilityResponse = await api.teachers.getAvailability(
            teacherId
          );
          setAvailability((availabilityResponse.data as any).data || []);
        } catch (availErr) {
          console.error("Failed to fetch availability:", availErr);
          // Don't show error for availability, just log it
        } finally {
          setAvailabilityLoading(false);
        }

        // Fetch teacher courses
        setCoursesLoading(true);
        try {
          const coursesResponse = await api.teachers.getCourses(teacherId);
          setCourses((coursesResponse.data as any).data || []);
        } catch (coursesErr) {
          console.error("Failed to fetch courses:", coursesErr);
          // Don't show error for courses, just log it
        } finally {
          setCoursesLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch teacher:", err);
        setError("Teacher not found");
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacherData();
    }
  }, [teacherId]);

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showVideoModal) {
        setShowVideoModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showVideoModal]);

  // Helper function to get day name from dayOfWeek number
  const getDayName = (dayOfWeek: number) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayOfWeek] || "Unknown";
  };

  // Helper function to format time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Group availability by day
  const groupedAvailability = availability.reduce((acc, slot) => {
    const dayName = getDayName(slot.dayOfWeek);
    if (!acc[dayName]) {
      acc[dayName] = [];
    }
    acc[dayName].push(slot);
    return acc;
  }, {} as Record<string, TeacherAvailability[]>);

  // Sort days in proper order
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const sortedDays = dayOrder.filter((day) => groupedAvailability[day]);

  // Video URL - This could come from teacher data in the future
  const introVideoUrl = "https://www.youtube.com/watch?v=f2JIrV82n8Y";

  // Extract YouTube video ID for embedding
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(introVideoUrl);

  // Function to handle trial lesson booking
  const handleTrialLessonBooking = async () => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      setBookingError("Please log in to book a trial lesson.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    try {
      setIsBookingTrial(true);
      setBookingError(null);
      setBookingSuccess(false);

      // Get current date and add 2 days for the trial lesson
      const currentDate = new Date();
      const scheduledDate = new Date(currentDate);
      scheduledDate.setDate(currentDate.getDate() + 2);
      scheduledDate.setHours(14, 0, 0, 0); // Set to 2:00 PM

      const bookingData = {
        teacherId: teacherId,
        scheduledAt: scheduledDate.toISOString(),
        duration: 20,
        notes: "I want to improve my pronunciation and speaking confidence",
      };

      console.log("Booking trial lesson with data:", bookingData);

      const response = await api.bookings.createTrial(bookingData);

      console.log("Trial lesson booking response:", response);

      if (response.success) {
        setBookingSuccess(true);
        setBookingError(null);
        setHasBookedTrial(true); // Permanent state to track booking

        // Hide success modal after 8 seconds but keep the booked state
        setTimeout(() => {
          setBookingSuccess(false);
        }, 8000); // Hide success modal after 8 seconds
      }
    } catch (error: any) {
      console.error("Error booking trial lesson:", error);
      const errorMessage =
        error?.details?.message ||
        error.message ||
        "Failed to book trial lesson. Please try again.";
      setBookingError(errorMessage);
      setBookingSuccess(false);
    } finally {
      setIsBookingTrial(false);
    }
  };

  // Function to handle video play
  const handleVideoPlay = () => {
    // Show video in modal at center of screen
    setShowVideoModal(true);
  };

  // Alternative function for new tab (if needed)
  const handleVideoPlayNewTab = () => {
    window.open(introVideoUrl, "_blank", "noopener,noreferrer");
  };

  // Function to handle course purchase
  const handleCoursePurchase = (course: Course) => {
    // Navigate to payment page with course info
    const courseInfo = {
      courseId: course.id,
      courseName: course.name,
      coursePrice: course.price,
      teacherId: course.teacherId,
      teacherName: teacher?.fullName,
      duration: course.duration,
      totalLessons: course.totalLessons,
      level: course.level,
      description: course.description,
    };

    // Store course info in sessionStorage for payment page
    sessionStorage.setItem("selectedCourse", JSON.stringify(courseInfo));

    // Navigate to payment page
    router.push("/payment/step1");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Teacher Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The teacher you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/teachers")}
            className="bg-green-600 hover:bg-green-700"
          >
            Back to Teachers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <div className="ml-4">
              <Link href="/" className="text-2xl font-bold text-green-600">
                antoree
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Teacher Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Teacher Header Card */}
            <Card className="overflow-hidden shadow-xl border-0">
              <CardContent className="p-0">
                {/* Professional Header Background */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 h-32"></div>
                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* Top Status Badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-orange-500 text-white rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1 shadow-lg">
                      ⭐ Top Rated
                    </div>
                    {teacher.isLive && (
                      <div className="bg-green-500 text-white rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1 shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Online Now
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative px-8 pb-8 bg-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-6 sm:space-y-0 sm:space-x-8 -mt-16">
                    {/* Professional Avatar Section */}
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-2 ring-gray-100">
                        <AvatarImage
                          src={teacher.avatar}
                          alt={teacher.fullName}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {teacher.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Verification Badge */}
                      <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-blue-600 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Teacher Information */}
                    <div className="flex-1 min-w-0 space-y-4">
                      {/* Name and Main Info */}
                      <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                          {teacher.fullName}
                        </h1>

                        {/* Rating and Reviews - Clean Layout */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full shadow-sm">
                            <Star className="h-4 w-4 fill-white" />
                            <span className="font-bold">
                              {teacher.averageRating}
                            </span>
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">
                              ({teacher.totalLessons} reviews)
                            </span>
                          </div>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            <span className="font-semibold">98% positive</span>
                          </div>
                        </div>
                      </div>

                      {/* Clean Key Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {teacher.experience}
                          </div>
                          <div className="text-sm text-gray-500">
                            Years Exp.
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {teacher.totalLessons}
                          </div>
                          <div className="text-sm text-gray-500">Lessons</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            ~{teacher.responseTime}min
                          </div>
                          <div className="text-sm text-gray-500">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {teacher.timezone.split("/")[1] || "Local"}
                          </div>
                          <div className="text-sm text-gray-500">Location</div>
                        </div>
                      </div>

                      {/* Clean Specialties */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Specialties
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {teacher.specialties
                              .slice(0, 4)
                              .map((specialty, index) => (
                                <Badge
                                  key={index}
                                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 px-3 py-1"
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            {teacher.specialties.length > 4 && (
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                              >
                                +{teacher.specialties.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Languages
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {teacher.languages.map((language, index) => (
                              <Badge
                                key={index}
                                className="bg-green-100 text-green-800 hover:bg-green-200 border-0 px-3 py-1"
                              >
                                <Globe className="h-3 w-3 mr-1" />
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Tabs Navigation */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-2 shadow-lg gap-1">
                <TabsTrigger
                  value="info"
                  className="relative overflow-hidden rounded-lg px-3 py-3 font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:transform data-[state=active]:scale-105 hover:bg-gray-100 text-gray-600"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">About</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="relative overflow-hidden rounded-lg px-3 py-3 font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:transform data-[state=active]:scale-105 hover:bg-gray-100 text-gray-600"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">Education</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="relative overflow-hidden rounded-lg px-3 py-3 font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:transform data-[state=active]:scale-105 hover:bg-gray-100 text-gray-600"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Schedule</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="relative overflow-hidden rounded-lg px-3 py-3 font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:transform data-[state=active]:scale-105 hover:bg-gray-100 text-gray-600"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                    <Star className="h-4 w-4" />
                    <span className="hidden sm:inline">Reviews</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="info" className="mt-6 space-y-6">
                {/* Enhanced About Me Card */}
                <Card className="border-l-4 border-l-green-500 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      About Me
                      <Badge className="ml-auto bg-green-100 text-green-800">
                        Professional
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {teacher.bio}
                      </p>
                    </div>

                    {/* Teaching Philosophy */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        🎯 My Teaching Philosophy
                      </h4>
                      <p className="text-blue-800 leading-relaxed">
                        "I believe every student has unique potential. My goal
                        is to create a supportive, interactive environment where
                        learning feels natural and enjoyable. I focus on
                        practical communication skills that you can use
                        immediately in real-world situations."
                      </p>
                    </div>

                    {/* Why Choose Me */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: "🎨",
                          title: "Creative Methods",
                          desc: "Interactive lessons with real-world scenarios",
                        },
                        {
                          icon: "📈",
                          title: "Proven Results",
                          desc: "Average 40% improvement in 3 months",
                        },
                        {
                          icon: "🤝",
                          title: "Patient Support",
                          desc: "Encouraging environment for all skill levels",
                        },
                        {
                          icon: "⚡",
                          title: "Fast Progress",
                          desc: "Structured curriculum for rapid learning",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="text-2xl">{item.icon}</div>
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              {item.title}
                            </h5>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Specialties & Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        🎓 Teaching Specialties
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {teacher.specialties.map((specialty, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-900">
                              {specialty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        🌍 Languages I Speak
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {teacher.languages.map((language, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                          >
                            <Globe className="h-5 w-5 text-green-600" />
                            <div>
                              <span className="font-medium text-green-900">
                                {language}
                              </span>
                              <div className="text-sm text-green-700">
                                {index === 0
                                  ? "Native"
                                  : index === 1
                                  ? "Fluent"
                                  : "Advanced"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Teaching Approach Card */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                      My Teaching Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-white/60 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                        📋 Booking Instructions
                      </h4>
                      <p className="text-purple-800 leading-relaxed">
                        {teacher.bookingInstructions}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/60 rounded-lg p-4 text-center border border-blue-200">
                        <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h5 className="font-semibold text-blue-900 mb-1">
                          Advance Notice
                        </h5>
                        <p className="text-blue-700 text-sm">
                          {teacher.advanceNoticeHours} hours minimum
                        </p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-4 text-center border border-green-200">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h5 className="font-semibold text-green-900 mb-1">
                          Instant Booking
                        </h5>
                        <p className="text-green-700 text-sm">
                          {teacher.allowInstantBooking
                            ? "Available"
                            : "Contact first"}
                        </p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-4 text-center border border-purple-200">
                        <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h5 className="font-semibold text-purple-900 mb-1">
                          Flexible Schedule
                        </h5>
                        <p className="text-purple-700 text-sm">
                          7 days a week available
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Enhanced Education Tab */}
              <TabsContent value="education" className="mt-6 space-y-6">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      Education & Qualifications
                      <Badge className="ml-auto bg-blue-100 text-blue-800">
                        Verified
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {/* Academic Background */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          🎓 Academic Education
                        </h4>
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                              <Award className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-900 text-lg mb-2">
                                Academic Credentials
                              </h5>
                              <p className="text-gray-700 leading-relaxed">
                                {teacher.education}
                              </p>
                              <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span className="font-medium">
                                  Verified by Academic Institution
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Certifications */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          📜 Professional Certifications
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {teacher.certifications.map((cert, index) => {
                            // Map certifications to certificate images
                            const certificateImages = [
                              "/antoree-teacher-certificate.svg",
                              "/tesol-certificate.svg",
                              "/ielts-certificate.svg",
                              "/business-english-certificate.svg",
                            ];
                            const certificateImage =
                              certificateImages[
                                index % certificateImages.length
                              ];

                            const certificateData = {
                              name: cert,
                              image: certificateImage,
                              issueDate: "August 23, 2024",
                              certificateId: `CRT-2024-${(
                                1000 + index
                              ).toString()}`,
                              description: `This certificate validates professional competency in ${cert.toLowerCase()}. The certification program includes comprehensive training, practical assessments, and ongoing professional development requirements.`,
                            };

                            return (
                              <div key={index} className="group relative">
                                <div
                                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 cursor-pointer"
                                  onClick={() => {
                                    setSelectedCertificate(certificateData);
                                    setShowCertificateModal(true);
                                  }}
                                >
                                  {/* Certificate Image */}
                                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                    <img
                                      src={certificateImage}
                                      alt={`${cert} Certificate`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                                    {/* Certificate Status Badge */}
                                    <div className="absolute top-3 right-3">
                                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                        <CheckCircle className="h-3 w-3" />
                                        Verified
                                      </div>
                                    </div>

                                    {/* View Certificate Button */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm font-semibold flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        View Certificate
                                      </div>
                                    </div>
                                  </div>

                                  {/* Certificate Details */}
                                  <div className="p-4">
                                    <h5 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                      {cert}
                                    </h5>
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm text-gray-600">
                                        <div className="flex items-center gap-1 mb-1">
                                          <Calendar className="h-3 w-3" />
                                          <span>Issued: Aug 2024</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <CheckCircle className="h-3 w-3 text-green-500" />
                                          <span className="text-green-600 font-medium">
                                            Valid
                                          </span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xs text-gray-500">
                                          Certificate ID
                                        </div>
                                        <div className="text-xs font-mono text-gray-700">
                                          CRT-{(1000 + index).toString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Additional Qualifications */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          ⚡ Additional Qualifications
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Teaching Experience",
                              value: `${teacher.experience} years`,
                              icon: "👨‍🏫",
                              bgColor: "bg-blue-50",
                              borderColor: "border-blue-200",
                              textColor: "text-blue-600",
                            },
                            {
                              title: "Lessons Completed",
                              value: `${teacher.totalLessons}+`,
                              icon: "📚",
                              bgColor: "bg-green-50",
                              borderColor: "border-green-200",
                              textColor: "text-green-600",
                            },
                            {
                              title: "Student Success Rate",
                              value: "94%",
                              icon: "🎯",
                              bgColor: "bg-orange-50",
                              borderColor: "border-orange-200",
                              textColor: "text-orange-600",
                            },
                            {
                              title: "Language Proficiency",
                              value:
                                teacher.languages.length > 1
                                  ? "Multilingual"
                                  : "Native",
                              icon: "🌍",
                              bgColor: "bg-purple-50",
                              borderColor: "border-purple-200",
                              textColor: "text-purple-600",
                            },
                          ].map((qual, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 ${qual.borderColor} ${qual.bgColor}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{qual.icon}</div>
                                <div>
                                  <h5 className="font-semibold text-gray-900">
                                    {qual.title}
                                  </h5>
                                  <p
                                    className={`${qual.textColor} font-bold text-lg`}
                                  >
                                    {qual.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Professional Development */}
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          📈 Continuous Professional Development
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Advanced Teaching Methodologies Workshop (2024)",
                            "Digital Learning Platforms Certification (2024)",
                            "Student Assessment and Feedback Training (2023)",
                            "Cross-Cultural Communication Seminar (2023)",
                          ].map((development, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-white/60 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-gray-700">
                                {development}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="mt-6 space-y-6">
                {/* Booking Calendar Component */}
                <BookingCalendar
                  teacher={teacher}
                  onBookingSuccess={(booking) => {
                    setBookingSuccess(true);
                    setBookingError(null);
                    setHasBookedTrial(true); // Set permanent booking state
                    console.log("Booking successful:", booking);
                  }}
                  onBookingError={(error) => {
                    setBookingError(error);
                    setBookingSuccess(false);
                  }}
                />

                {/* Original Schedule Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Weekly Schedule & Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Teacher Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Timezone
                          </h4>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Globe className="h-4 w-4" />
                            <span>{teacher.timezone.replace("_", " ")}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Response Time
                          </h4>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="h-4 w-4" />
                            <span>
                              Usually responds within {teacher.responseTime}{" "}
                              minutes
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Booking Window
                          </h4>
                          <p className="text-gray-700">
                            {teacher.advanceNoticeHours} hours to{" "}
                            {Math.floor(teacher.maxAdvanceBookingHours / 24)}{" "}
                            days in advance
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Instant Booking
                          </h4>
                          <div className="flex items-center gap-2">
                            {teacher.allowInstantBooking ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-gray-700">
                              {teacher.allowInstantBooking
                                ? "Available"
                                : "Not available"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        📅 Weekly Availability
                      </h4>

                      {availabilityLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                        </div>
                      ) : availability.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {sortedDays.map((dayName) => (
                            <div
                              key={dayName}
                              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  {dayName}
                                </h5>
                                <Badge
                                  variant="outline"
                                  className="text-green-700 border-green-300 bg-green-50"
                                >
                                  {groupedAvailability[dayName].length} slot
                                  {groupedAvailability[dayName].length !== 1
                                    ? "s"
                                    : ""}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {groupedAvailability[dayName]
                                  .sort((a, b) =>
                                    a.startTime.localeCompare(b.startTime)
                                  )
                                  .map((slot) => (
                                    <div
                                      key={slot.id}
                                      className="bg-white border border-green-200 rounded-lg p-3 hover:bg-green-50 transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Clock className="h-4 w-4 text-green-600" />
                                          <span className="font-medium text-gray-900">
                                            {formatTime(slot.startTime)} -{" "}
                                            {formatTime(slot.endTime)}
                                          </span>
                                        </div>
                                        {slot.isActive ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                                        )}
                                      </div>
                                      <div className="mt-2 text-sm text-gray-600">
                                        Duration:{" "}
                                        {(() => {
                                          const [startHour, startMin] =
                                            slot.startTime
                                              .split(":")
                                              .map(Number);
                                          const [endHour, endMin] = slot.endTime
                                            .split(":")
                                            .map(Number);
                                          const durationHours =
                                            endHour -
                                            startHour +
                                            (endMin - startMin) / 60;
                                          return `${durationHours} hour${
                                            durationHours !== 1 ? "s" : ""
                                          }`;
                                        })()}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <h4 className="font-semibold text-gray-600 mb-2">
                            No Schedule Available
                          </h4>
                          <p className="text-gray-500 text-sm">
                            The teacher hasn't set up their availability yet.
                            Please contact them directly to schedule a lesson.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quick Stats */}
                    {availability.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">
                            {sortedDays.length}
                          </div>
                          <div className="text-sm text-blue-700">
                            Days Available
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                          <div className="text-2xl font-bold text-green-600">
                            {availability.length}
                          </div>
                          <div className="text-sm text-green-700">
                            Time Slots
                          </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600">
                            {(() => {
                              const totalHours = availability.reduce(
                                (total, slot) => {
                                  const [startHour, startMin] = slot.startTime
                                    .split(":")
                                    .map(Number);
                                  const [endHour, endMin] = slot.endTime
                                    .split(":")
                                    .map(Number);
                                  return (
                                    total +
                                    (endHour -
                                      startHour +
                                      (endMin - startMin) / 60)
                                  );
                                },
                                0
                              );
                              return Math.round(totalHours);
                            })()}
                          </div>
                          <div className="text-sm text-purple-700">
                            Hours/Week
                          </div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                          <div className="text-2xl font-bold text-orange-600">
                            {teacher.timezone.replace("_", " ").split("/")[1] ||
                              "Local"}
                          </div>
                          <div className="text-sm text-orange-700">
                            Timezone
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        📅 Ready to Schedule?
                      </h4>
                      <p className="text-blue-700 mb-3">
                        Book a trial lesson to experience this teacher's
                        teaching style and see if it's a good fit for your
                        learning goals.
                      </p>
                      <div className="flex gap-3">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          View Available Times
                        </Button>
                        <Button
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-100"
                        >
                          Contact Teacher
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-green-600" />
                      Student Reviews ({teacher.totalLessons} reviews)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Overall Rating Summary */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-4xl font-bold text-gray-900">
                              {teacher.averageRating}
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-6 w-6 ${
                                    star <=
                                    Math.floor(
                                      parseFloat(teacher.averageRating)
                                    )
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">
                            Based on {teacher.totalLessons} student reviews
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            98%
                          </div>
                          <p className="text-sm text-gray-600">Recommend</p>
                        </div>
                      </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        {[
                          { label: "Teaching Quality", rating: 4.9 },
                          { label: "Communication", rating: 4.8 },
                          { label: "Punctuality", rating: 5.0 },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">
                              {item.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{
                                    width: `${(item.rating / 5) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium w-8">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "Lesson Preparation", rating: 4.7 },
                          { label: "Helpfulness", rating: 4.9 },
                          { label: "Value for Money", rating: 4.8 },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">
                              {item.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{
                                    width: `${(item.rating / 5) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium w-8">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {[
                        {
                          name: "Sarah Chen",
                          avatar: "/placeholder-user.jpg",
                          rating: 5,
                          date: "2 weeks ago",
                          lessons: 24,
                          comment:
                            "Absolutely amazing teacher! My English has improved dramatically since I started lessons with them. The teaching style is engaging and patient, making complex grammar easy to understand. Highly recommend for anyone serious about learning!",
                          helpful: 12,
                        },
                        {
                          name: "Miguel Rodriguez",
                          avatar: "/placeholder-user.jpg",
                          rating: 5,
                          date: "1 month ago",
                          lessons: 18,
                          comment:
                            "Professional, punctual, and passionate about teaching. The lessons are well-structured and tailored to my learning pace. I especially appreciate the practical conversation practice and real-world examples.",
                          helpful: 8,
                        },
                        {
                          name: "Emma Thompson",
                          avatar: "/placeholder-user.jpg",
                          rating: 5,
                          date: "3 weeks ago",
                          lessons: 32,
                          comment:
                            "This teacher has been instrumental in helping me prepare for my IELTS exam. The feedback is detailed and constructive, and I always feel motivated after each lesson. Worth every penny!",
                          helpful: 15,
                        },
                        {
                          name: "Kevin Park",
                          avatar: "/placeholder-user.jpg",
                          rating: 4,
                          date: "1 week ago",
                          lessons: 6,
                          comment:
                            "Great teacher with excellent communication skills. The lessons are interactive and fun. Only reason it's not 5 stars is because I wish we had more time in each session!",
                          helpful: 5,
                        },
                        {
                          name: "Lisa Johnson",
                          avatar: "/placeholder-user.jpg",
                          rating: 5,
                          date: "5 days ago",
                          lessons: 41,
                          comment:
                            "I've been studying with this teacher for over 6 months now, and my confidence in speaking English has skyrocketed. They create a comfortable learning environment where mistakes are seen as learning opportunities.",
                          helpful: 9,
                        },
                      ].map((review, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-6 bg-white"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={review.avatar}
                                alt={review.name}
                              />
                              <AvatarFallback className="bg-gray-200 text-gray-700">
                                {review.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {review.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {review.lessons} lessons completed
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {review.date}
                                  </p>
                                </div>
                              </div>

                              <p className="text-gray-700 leading-relaxed mb-3">
                                {review.comment}
                              </p>

                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                  <CheckCircle className="h-4 w-4" />
                                  Helpful ({review.helpful})
                                </button>
                                <span>•</span>
                                <span>Verified Purchase</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Load More Reviews */}
                    <div className="text-center mt-8">
                      <Button variant="outline" className="px-8">
                        Load More Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Professional Video Demo Card */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      🎥 Meet Your Teacher
                    </h3>
                    <p className="text-sm text-gray-600">
                      Watch a personal introduction from{" "}
                      {teacher.fullName.split(" ")[0]}
                    </p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">
                      Click to play video here
                    </p>
                  </div>

                  <div
                    className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl overflow-hidden group cursor-pointer"
                    onClick={handleVideoPlay}
                  >
                    {/* Video Thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={teacher.avatar}
                        alt={teacher.fullName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                      />
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-xl">
                        <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                      </div>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        2:45 - Introduction Video
                      </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        HD
                      </div>
                    </div>

                    {/* Click to Play Indicator */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        Play Here
                      </div>
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white/60 rounded-lg p-2">
                      <div className="text-sm font-semibold text-gray-900">
                        94%
                      </div>
                      <div className="text-xs text-gray-600">
                        Positive Response
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2">
                      <div className="text-sm font-semibold text-gray-900">
                        2.1k
                      </div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2">
                      <div className="text-sm font-semibold text-gray-900">
                        4.9⭐
                      </div>
                      <div className="text-xs text-gray-600">Video Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Card */}
              <Card className="border-2 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="bg-green-50 rounded-xl p-4 mb-4">
                      <div className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-1">
                        Special Offer - Limited Time
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        <span className="line-through text-xl text-gray-400">
                          ${(parseFloat(teacher.hourlyRate) * 1.2).toFixed(0)}
                        </span>{" "}
                        ${teacher.hourlyRate}
                        <span className="text-lg font-normal text-gray-500">
                          /hour
                        </span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Save 20% on first lesson
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Regular lesson price
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Success Message */}
                    {bookingSuccess && (
                      <Alert className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-in fade-in zoom-in duration-500 border-2">
                        <CheckCircle className="h-5 w-5 text-green-600 animate-pulse" />
                        <AlertDescription className="text-green-800 font-semibold">
                          🎉 Trial lesson booked successfully!
                          <br />
                          <span className="text-sm font-normal">
                            Check your email for confirmation details and lesson
                            link.
                          </span>
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Error Message */}
                    {bookingError && (
                      <Alert className="border-red-300 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg animate-in fade-in zoom-in duration-500 border-2">
                        <AlertDescription className="text-red-800 font-semibold">
                          ❌ {bookingError}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={() => setShowBookingModal(true)}
                      disabled={hasBookedTrial}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:from-gray-500 disabled:to-gray-600"
                    >
                      {hasBookedTrial ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Trial Lesson Booked ✅
                        </>
                      ) : (
                        <>
                          🎯 Book Trial Lesson
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {hasBookedTrial && (
                      <div className="space-y-3">
                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 font-medium">
                            🎉 Your trial lesson is confirmed!
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Check your email for the meeting link and
                            instructions.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-xs border-green-300 text-green-700 hover:bg-green-100"
                            onClick={() => setShowBookingModal(true)}
                          >
                            📅 Book Regular Lesson
                          </Button>
                        </div>

                        {/* Course Purchase Section */}
                        {coursesLoading ? (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-center py-4">
                              <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                              <span className="text-sm text-blue-700">
                                Loading courses...
                              </span>
                            </div>
                          </div>
                        ) : courses.length > 0 ? (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-1">
                              🎓 Ready for the next step?
                            </h4>
                            <p className="text-xs text-blue-700 mb-3">
                              Enroll in a complete course and accelerate your
                              learning journey!
                            </p>

                            {courses.slice(0, 2).map((course) => (
                              <div key={course.id} className="mb-3 last:mb-0">
                                <div className="bg-white/70 rounded-lg p-3 border border-blue-200">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <h5 className="text-sm font-semibold text-gray-900 mb-1">
                                        {course.name}
                                      </h5>
                                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                        {course.description}
                                      </p>
                                      <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span>
                                          📚 {course.totalLessons} lessons
                                        </span>
                                        <span>⏱️ {course.duration}h total</span>
                                        <span className="capitalize">
                                          📈 {course.level.toLowerCase()}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right ml-3">
                                      <div className="text-lg font-bold text-blue-600">
                                        ${course.price}
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => handleCoursePurchase(course)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs h-8"
                                  >
                                    🛒 Buy This Course
                                  </Button>
                                </div>
                              </div>
                            ))}

                            {courses.length > 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs border-blue-300 text-blue-700 hover:bg-blue-100 mt-2"
                                onClick={() => setActiveTab("courses")}
                              >
                                View All {courses.length} Courses
                              </Button>
                            )}
                          </div>
                        ) : null}
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full h-12 text-lg border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                    >
                      💬 Send Message
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-blue-700">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verified Teacher</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-700">
                        <CheckCircle className="h-4 w-4" />
                        <span>Background Check</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        Trial lesson (50% off)
                      </span>
                      <span className="font-medium text-green-600">
                        ${(parseFloat(teacher.hourlyRate) * 0.5).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Regular lesson</span>
                      <span className="font-medium">${teacher.hourlyRate}</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>✅ Free cancellation</span>
                        <span>24h before lesson</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>🔒 Secure payment</span>
                        <span>Money-back guarantee</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>📞 Free support</span>
                        <span>24/7 available</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Stats Card */}
              <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Teacher Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg text-center border border-yellow-200">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {teacher.averageRating}
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {teacher.totalLessons}
                      </div>
                      <div className="text-xs text-gray-600">Lessons</div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {teacher.experience}
                      </div>
                      <div className="text-xs text-gray-600">Years Exp.</div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        ~{teacher.responseTime}
                      </div>
                      <div className="text-xs text-gray-600">Min Response</div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Achievements
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Award className="h-3 w-3 text-yellow-600" />
                        </div>
                        <span className="text-gray-700">Top Rated Teacher</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">
                          Verified Professional
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-gray-700">Student Favorite</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Video Introduction Card */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-indigo-600" />
                    Teaching Style Preview
                  </CardTitle>
                  <p className="text-xs text-indigo-600 font-medium mt-1">
                    Click to watch video here
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    className="aspect-video bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-xl overflow-hidden relative group cursor-pointer"
                    onClick={handleVideoPlay}
                  >
                    {/* Video Preview Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="relative mb-4">
                        <img
                          src={teacher.avatar}
                          alt={teacher.fullName}
                          className="w-20 h-20 rounded-full object-cover border-3 border-white/30"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <Video className="h-3 w-3 text-white" />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">
                        Sample Lesson
                      </h3>
                      <p className="text-sm text-white/80 text-center px-4 mb-4">
                        See {teacher.fullName.split(" ")[0]}'s teaching method
                        in action
                      </p>

                      {/* Play Button */}
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                    </div>

                    {/* Video Duration */}
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                      3:24
                    </div>

                    {/* Video Quality */}
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      HD
                    </div>

                    {/* Click to Play Indicator */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        Play Here
                      </div>
                    </div>
                  </div>

                  {/* Video Features */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-sm font-semibold text-gray-900">
                        Interactive
                      </div>
                      <div className="text-xs text-gray-600">
                        Teaching Style
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-sm font-semibold text-gray-900">
                        Personalized
                      </div>
                      <div className="text-xs text-gray-600">Approach</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Stories Card */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Success Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-white/60 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        127
                      </div>
                      <div className="text-sm text-gray-600">
                        Students Improved
                      </div>
                      <div className="text-xs text-gray-500">
                        their English skills
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 bg-white/60 rounded">
                        <div className="text-lg font-bold text-gray-900">
                          89%
                        </div>
                        <div className="text-xs text-gray-600">Pass Rate</div>
                      </div>
                      <div className="p-2 bg-white/60 rounded">
                        <div className="text-lg font-bold text-gray-900">
                          4.2x
                        </div>
                        <div className="text-xs text-gray-600">
                          Faster Learning
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-300 text-green-700 hover:bg-green-100"
                      >
                        View Student Success
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Video Modal */}
      {showVideoModal && videoId && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Video className="h-6 w-6 text-blue-600" />
                  Teacher Introduction Video
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get to know {teacher.fullName} and their teaching style
                </p>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Video Container */}
            <div className="relative bg-black">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Teacher Introduction Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage
                        src={teacher.avatar}
                        alt={teacher.fullName}
                      />
                      <AvatarFallback>
                        {teacher.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {teacher.fullName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {teacher.experience} years experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">
                      {teacher.averageRating}
                    </span>
                    <span className="text-gray-500">
                      ({teacher.totalLessons} lessons)
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowVideoModal(false)}
                    className="px-6"
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 px-6"
                    onClick={() => {
                      setShowVideoModal(false);
                      // Could scroll to booking section or open booking modal
                    }}
                  >
                    Book Trial Lesson
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          isOpen={showCertificateModal}
          onClose={() => {
            setShowCertificateModal(false);
            setSelectedCertificate(null);
          }}
        />
      )}

      {/* Floating Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-md p-0 bg-transparent border-0 shadow-none">
          <QuickBookingWidget
            teacher={teacher}
            onBookingSuccess={() => {
              setBookingSuccess(true);
              setBookingError(null);
              setHasBookedTrial(true); // Set permanent booking state
              setShowBookingModal(false);
            }}
            onBookingError={(error) => {
              setBookingError(error);
              setBookingSuccess(false);
            }}
            onClose={() => setShowBookingModal(false)}
            showCloseButton={true}
          />
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={bookingSuccess} onOpenChange={setBookingSuccess}>
        <DialogContent className="max-w-md p-0 bg-white border-0 shadow-2xl">
          <div className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🎉 Booking Confirmed!
            </h3>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Your trial lesson with{" "}
              <span className="font-semibold text-green-700">
                {teacher.fullName}
              </span>{" "}
              has been successfully booked!
            </p>

            <div className="bg-white/70 rounded-lg p-4 mb-6 border border-green-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Lesson Date:</span>
                <span className="font-semibold">
                  {new Date(
                    Date.now() + 2 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">2:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">50 minutes</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setBookingSuccess(false)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                ✅ Got it!
              </Button>

              <p className="text-xs text-gray-500">
                📧 Check your email for the meeting link and detailed
                instructions.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
