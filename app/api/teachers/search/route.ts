import { NextRequest, NextResponse } from "next/server"

// Mock teacher data that matches your expected response format
const mockTeachers = [
  {
    id: "teacher_001",
    bio: "Experienced English teacher with 8 years of teaching experience. Specialized in business English and IELTS preparation.",
    experience: 8,
    education: "Master of Arts in TESOL, University of Cambridge",
    certifications: [
      "TEFL Certificate",
      "IELTS Teaching Certificate",
      "Cambridge CELTA"
    ],
    specialties: [
      "Business English",
      "IELTS Preparation",
      "Conversational English"
    ],
    hourlyRate: "25",
    timezone: "Asia/Ho_Chi_Minh",
    languages: [
      "English (Native)",
      "Vietnamese (Intermediate)"
    ],
    videoIntroUrl: "https://example.com/intro/emily.mp4",
    status: "APPROVED",
    totalLessons: 1,
    averageRating: "5",
    responseTime: 30,
    profileCompleted: true,
    verificationSubmitted: true,
    availabilitySetup: true,
    isLive: true,
    advanceNoticeHours: 24,
    maxAdvanceBookingHours: 720,
    allowInstantBooking: true,
    bookingInstructions: "Please let me know your current English level and learning goals before our first lesson.",
    createdAt: "2025-08-22T05:54:51.573Z",
    updatedAt: "2025-08-22T05:54:51.573Z",
    fullName: "Emily Johnson",
    email: "emily.johnson@antoree.com",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    phone: "+84901234573",
    isActive: true,
    availableDays: [1, 2, 3, 4, 5, 6],
    trialLessonRate: "12.5",
    regularLessonRate: "25",
    recentReviews: [
      {
        id: "cmemf1oy90062ysmgdn3o6gd7",
        rating: 5,
        comment: "Emily's business English course is exactly what I needed. Professional, well-structured, and very practical.",
        createdAt: "2025-08-20T05:54:51.919Z",
        studentName: "Mike Wilson",
        studentAvatar: "https://randomuser.me/api/portraits/men/3.jpg"
      }
    ],
    totalReviews: 1
  },
  {
    id: "teacher_002",
    bio: "Passionate French teacher with 6 years of experience. Specialized in conversational French and business French.",
    experience: 6,
    education: "Master of Arts in French Literature, Sorbonne University",
    certifications: [
      "DELF/DALF Certificate",
      "French Teaching Certificate"
    ],
    specialties: [
      "Conversational French",
      "Business French",
      "French Literature"
    ],
    hourlyRate: "22",
    timezone: "Europe/Paris",
    languages: [
      "French (Native)",
      "English (Advanced)"
    ],
    videoIntroUrl: "https://example.com/intro/marie.mp4",
    status: "APPROVED",
    totalLessons: 45,
    averageRating: "4.8",
    responseTime: 15,
    profileCompleted: true,
    verificationSubmitted: true,
    availabilitySetup: true,
    isLive: true,
    advanceNoticeHours: 12,
    maxAdvanceBookingHours: 480,
    allowInstantBooking: true,
    bookingInstructions: "Bonjour! Please let me know your French level and what you'd like to focus on.",
    createdAt: "2025-08-20T05:54:51.573Z",
    updatedAt: "2025-08-22T05:54:51.573Z",
    fullName: "Marie Dubois",
    email: "marie.dubois@antoree.com",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    phone: "+33123456789",
    isActive: true,
    availableDays: [1, 2, 3, 4, 5],
    trialLessonRate: "11",
    regularLessonRate: "22",
    recentReviews: [
      {
        id: "cmemf1oy90062ysmgdn3o6gd8",
        rating: 5,
        comment: "Marie is an excellent French teacher. Very patient and encouraging.",
        createdAt: "2025-08-19T05:54:51.919Z",
        studentName: "Sarah Chen",
        studentAvatar: "https://randomuser.me/api/portraits/women/5.jpg"
      }
    ],
    totalReviews: 23
  },
  {
    id: "teacher_003",
    bio: "Native English speaker with 10 years of teaching experience. Specialized in English conversation and pronunciation.",
    experience: 10,
    education: "Bachelor of Education, University of Toronto",
    certifications: [
      "TESOL Certificate",
      "TEFL Certificate"
    ],
    specialties: [
      "English Conversation",
      "Pronunciation",
      "General English"
    ],
    hourlyRate: "28",
    timezone: "America/Toronto",
    languages: [
      "English (Native)",
      "Spanish (Intermediate)"
    ],
    videoIntroUrl: "https://example.com/intro/david.mp4",
    status: "APPROVED",
    totalLessons: 156,
    averageRating: "4.9",
    responseTime: 45,
    profileCompleted: true,
    verificationSubmitted: true,
    availabilitySetup: true,
    isLive: true,
    advanceNoticeHours: 48,
    maxAdvanceBookingHours: 1440,
    allowInstantBooking: false,
    bookingInstructions: "Hi! I'm excited to help you improve your English. Please share your goals with me.",
    createdAt: "2025-08-18T05:54:51.573Z",
    updatedAt: "2025-08-22T05:54:51.573Z",
    fullName: "David Smith",
    email: "david.smith@antoree.com",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    phone: "+14165551234",
    isActive: true,
    availableDays: [1, 2, 3, 4, 5, 6, 0],
    trialLessonRate: "14",
    regularLessonRate: "28",
    recentReviews: [
      {
        id: "cmemf1oy90062ysmgdn3o6gd9",
        rating: 4,
        comment: "David is very helpful and patient. My pronunciation has improved a lot!",
        createdAt: "2025-08-21T05:54:51.919Z",
        studentName: "Carlos Rodriguez",
        studentAvatar: "https://randomuser.me/api/portraits/men/8.jpg"
      }
    ],
    totalReviews: 78
  }
]

// Helper function to filter teachers based on search criteria
function filterTeachers(teachers: any[], searchParams: URLSearchParams) {
  let filteredTeachers = [...teachers]

  // Search filter - check bio, specialties, languages, and fullName
  const search = searchParams.get('search')?.toLowerCase()
  if (search) {
    filteredTeachers = filteredTeachers.filter(teacher => 
      teacher.bio.toLowerCase().includes(search) ||
      teacher.specialties.some((specialty: string) => specialty.toLowerCase().includes(search)) ||
      teacher.languages.some((language: string) => language.toLowerCase().includes(search)) ||
      teacher.fullName.toLowerCase().includes(search)
    )
  }

  // Minimum rating filter
  const minRating = searchParams.get('minRating')
  if (minRating) {
    const minRatingNum = parseFloat(minRating)
    filteredTeachers = filteredTeachers.filter(teacher => 
      parseFloat(teacher.averageRating) >= minRatingNum
    )
  }

  // Specialties filter
  const specialties = searchParams.get('specialties')
  if (specialties) {
    const specialtyList = specialties.split(',').map(s => s.trim().toLowerCase())
    filteredTeachers = filteredTeachers.filter(teacher =>
      specialtyList.some(specialty =>
        teacher.specialties.some((teacherSpecialty: string) =>
          teacherSpecialty.toLowerCase().includes(specialty)
        )
      )
    )
  }

  // Minimum experience filter
  const minExperience = searchParams.get('minExperience')
  if (minExperience) {
    const minExp = parseInt(minExperience)
    filteredTeachers = filteredTeachers.filter(teacher => 
      teacher.experience >= minExp
    )
  }

  // Maximum experience filter
  const maxExperience = searchParams.get('maxExperience')
  if (maxExperience) {
    const maxExp = parseInt(maxExperience)
    filteredTeachers = filteredTeachers.filter(teacher => 
      teacher.experience <= maxExp
    )
  }

  // Timezone filter
  const timezone = searchParams.get('timezone')
  if (timezone) {
    filteredTeachers = filteredTeachers.filter(teacher =>
      teacher.timezone === timezone
    )
  }

  // Available on day filter (0 = Sunday, 1 = Monday, etc.)
  const availableOnDay = searchParams.get('availableOnDay')
  if (availableOnDay) {
    const dayNum = parseInt(availableOnDay)
    filteredTeachers = filteredTeachers.filter(teacher =>
      teacher.availableDays.includes(dayNum)
    )
  }

  // Available at time filter
  const availableAtTime = searchParams.get('availableAtTime')
  if (availableAtTime) {
    // For mock data, we'll assume all teachers are available at the requested time
    // In a real implementation, you'd check against their actual schedule
    console.log(`Filtering by available time: ${availableAtTime}`)
  }

  // Certifications filter
  const certifications = searchParams.get('certifications')
  if (certifications) {
    const certList = certifications.split(',').map(c => c.trim().toLowerCase())
    filteredTeachers = filteredTeachers.filter(teacher =>
      certList.some(cert =>
        teacher.certifications.some((teacherCert: string) =>
          teacherCert.toLowerCase().includes(cert)
        )
      )
    )
  }

  // Price range filters
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  if (minPrice || maxPrice) {
    filteredTeachers = filteredTeachers.filter(teacher => {
      const hourlyRate = parseFloat(teacher.hourlyRate)
      const meetsMin = !minPrice || hourlyRate >= parseFloat(minPrice)
      const meetsMax = !maxPrice || hourlyRate <= parseFloat(maxPrice)
      return meetsMin && meetsMax
    })
  }

  // Languages filter
  const languages = searchParams.get('languages')
  if (languages) {
    const langList = languages.split(',').map(l => l.trim().toLowerCase())
    filteredTeachers = filteredTeachers.filter(teacher =>
      langList.some(lang =>
        teacher.languages.some((teacherLang: string) =>
          teacherLang.toLowerCase().includes(lang)
        )
      )
    )
  }

  // Format filter (online/offline)
  const format = searchParams.get('format')
  if (format) {
    // For mock data, we'll assume all teachers support both formats
    // In a real implementation, you'd have a format field in the teacher data
    console.log(`Filtering by format: ${format}`)
  }

  // Level filter (beginner/intermediate/advanced)
  const level = searchParams.get('level')
  if (level) {
    // For mock data, we'll assume teachers can teach all levels
    // In a real implementation, you'd check against their supported levels
    console.log(`Filtering by level: ${level}`)
  }

  // Sort by specified field
  const sortBy = searchParams.get('sortBy') || 'averageRating'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  
  filteredTeachers.sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    // Handle numeric values
    if (sortBy === 'averageRating' || sortBy === 'hourlyRate' || sortBy === 'experience') {
      aValue = parseFloat(aValue)
      bValue = parseFloat(bValue)
    }

    // Handle string values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder === 'desc') {
      return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    }
  })

  return filteredTeachers
}

// Helper function to paginate results
function paginateResults(teachers: any[], page: number, limit: number) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTeachers = teachers.slice(startIndex, endIndex)
  
  return {
    teachers: paginatedTeachers,
    total: teachers.length,
    page,
    limit,
    totalPages: Math.ceil(teachers.length / limit)
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters with defaults
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Page must be greater than 0",
        },
        { status: 400 }
      )
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Limit must be between 1 and 100",
        },
        { status: 400 }
      )
    }

    // Filter teachers based on search criteria
    const filteredTeachers = filterTeachers(mockTeachers, searchParams)

    // Paginate the results
    const paginatedResults = paginateResults(filteredTeachers, page, limit)

    // Return response in the specified format
    return NextResponse.json({
      statusCode: 200,
      message: "",
      data: paginatedResults
    })

  } catch (error) {
    console.error("Teachers search error:", error)
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
