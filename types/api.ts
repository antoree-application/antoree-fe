export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

export interface ApiError {
  message: string
  statusCode: number
  details?: any
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Teacher related types
export interface Teacher {
  id: string
  bio: string
  experience: number
  education: string
  certifications: string[]
  specialties: string[]
  hourlyRate: string
  timezone: string
  languages: string[]
  videoIntroUrl?: string
  status: string
  totalLessons: number
  averageRating: string
  responseTime: number
  profileCompleted: boolean
  verificationSubmitted: boolean
  availabilitySetup: boolean
  isLive: boolean
  advanceNoticeHours: number
  maxAdvanceBookingHours: number
  allowInstantBooking: boolean
  bookingInstructions: string
  createdAt: string
  updatedAt: string
  fullName: string
  email: string
  avatar: string
  phone: string
  isActive: boolean
  availableDays: number[]
  trialLessonRate: string
  regularLessonRate: string
  recentReviews: TeacherReview[]
  totalReviews: number
}

export interface TeacherReview {
  id: string
  rating: number
  comment: string
  createdAt: string
  studentName: string
  studentAvatar: string
}

export interface TeacherSearchFilters {
  search?: string
  minRating?: number
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  specialties?: string
  minExperience?: number
  maxExperience?: number
  timezone?: string
  availableOnDay?: number
  availableAtTime?: string
  certifications?: string
  minPrice?: number
  maxPrice?: number
  languages?: string
  format?: string
  level?: string
}

export interface TeacherSearchResponse {
  statusCode: number
  message: string
  data: {
    teachers: Teacher[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface TimeSlot {
  day: string
  startTime: string
  endTime: string
}

export interface TeacherAvailability {
  id: string
  teacherId: string
  dayOfWeek: number // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  startTime: string // Format: "09:00"
  endTime: string // Format: "12:00"
  isActive: boolean
  createdAt: string
}

// Review related types
export interface Review {
  id: string
  studentId: string
  studentName: string
  studentAvatar?: string
  teacherId: string
  teacherName: string
  teacherAvatar?: string
  rating: number
  comment: string
  courseType: string
  createdAt: string
  ratings: {
    teachingMethod: number
    courseContent: number
    satisfaction: number
  }
}

// Search related types
export interface SearchFilters {
  query?: string
  timeSlot?: string
  format?: "online" | "offline"
  level?: "beginner" | "intermediate" | "advanced"
  minPrice?: number
  maxPrice?: number
  rating?: number
  page?: number
  limit?: number
}

// Contact form types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Booking related types
export interface Booking {
  id: string
  teacherId: string
  studentId: string
  scheduledAt: string
  duration: number
  lessonType: 'trial' | 'regular'
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  price: number
  meetingLink?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BookingRequest {
  teacherId: string
  scheduledAt: string
  duration: number
  notes?: string
}

export interface BookingResponse {
  booking: Booking
  teacher: {
    id: string
    name: string
    avatar: string
  }
  student: {
    id: string
    name: string
    email: string
  }
}

// Payment related types
export interface PaymentMethod {
  id: string
  name: string
  type: "card" | "bank" | "ewallet"
  icon?: string
  description?: string
}

export interface CoursePaymentResponse {
  statusCode: number
  message: string
  data: {
    paymentUrl: string
    qrCodeUrl: string
    deeplink: string
    paymentId: string
    orderId: string
    amount: number
    paymentMethod: string
    course: {
      id: string
      name: string
      description: string
      price: string
      totalLessons: number
      duration: number
      teacher: {
        id: string
        name: string
        avatar: string
      }
    }
    student: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      isNewUser: boolean
    }
  }
}

// Authentication related types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  type: "STUDENT" | "TEACHER" | "ADMIN"
  phone?: string
  phoneNumber?: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  statusCode: number
  message: string
  data: {
    accessToken: string
    user: User
  }
}

export interface StudentRegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  englishLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  learningGoals: string
  timezone: string
}

export interface TeacherRegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  bio: string
  experience: number
  education: string
  certifications: string[]
  specialties: string[]
  hourlyRate: number
  timezone: string
  languages: string[]
  videoIntroUrl?: string
  responseTime: number
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  type?: "STUDENT" | "TEACHER"
  phone?: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface RefreshTokenRequest {
  refreshToken: string
}

// Course related types
export interface Course {
  id: string
  teacherId: string
  name: string
  description: string
  duration: number
  totalLessons: number
  price: string
  level: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CourseResponse {
  statusCode: number
  message: string
  data: Course[]
}
