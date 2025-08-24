import { NextRequest, NextResponse } from "next/server"

// Mock teacher data that matches your expected response format
const mockTeachers = [
  {
    id: "teacher_001",
    bio: "Experienced English teacher with 8 years of teaching experience. Specialized in business English and IELTS preparation. I have helped hundreds of students achieve their language goals and improve their confidence in speaking English.",
    experience: 8,
    education: "Master of Arts in TESOL, University of Cambridge",
    certifications: [
      "TESOL International Certificate - Teaching English to Speakers of Other Languages",
      "IELTS Preparation Specialist Certificate - Advanced Level Training",
      "Business English Communication Certificate - Professional Development",
      "Cambridge CELTA - Certificate in English Language Teaching to Adults"
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
    bookingInstructions: "Please let me know your current English level and learning goals before our first lesson. I prefer to understand your needs so I can prepare materials that are most relevant to you.",
    createdAt: "2025-08-22T05:54:51.573Z",
    updatedAt: "2025-08-22T05:54:51.573Z",
    fullName: "Emily Johnson",
    email: "emily.johnson@antoree.com",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    phone: "+84901234573",
    isActive: true
  },
  {
    id: "teacher_002",
    bio: "Native English speaker from the UK with expertise in academic English and pronunciation training. I have been teaching for over 12 years and have worked with students from all levels, from complete beginners to advanced learners preparing for university studies.",
    experience: 12,
    education: "Bachelor of Education, Oxford University",
    certifications: [
      "PGCE - Postgraduate Certificate in Education from Oxford University",
      "Trinity College London Certificate in Teaching English to Speakers of Other Languages",
      "Cambridge Assessment English Teaching Qualification",
      "Professional Development Certificate in Academic Writing Instruction"
    ],
    specialties: [
      "Academic English",
      "Pronunciation",
      "Grammar"
    ],
    hourlyRate: "30",
    timezone: "Asia/Ho_Chi_Minh",
    languages: [
      "English (Native)",
      "French (Fluent)"
    ],
    videoIntroUrl: "https://example.com/intro/robert.mp4",
    status: "APPROVED",
    totalLessons: 1,
    averageRating: "5",
    responseTime: 15,
    profileCompleted: true,
    verificationSubmitted: true,
    availabilitySetup: true,
    isLive: true,
    advanceNoticeHours: 12,
    maxAdvanceBookingHours: 1440,
    allowInstantBooking: false,
    bookingInstructions: "I focus on systematic improvement. Please be prepared with specific questions or topics you want to work on.",
    createdAt: "2025-08-22T05:54:51.573Z",
    updatedAt: "2025-08-22T05:54:51.573Z",
    fullName: "Robert Davis",
    email: "robert.davis@antoree.com",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    phone: "+84901234574",
    isActive: true
  },
  {
    id: "teacher_003",
    bio: "Native English speaker with 10 years of teaching experience. Specialized in English conversation and pronunciation. I believe learning should be fun and engaging, which is why I use interactive methods and real-life scenarios in my lessons.",
    experience: 10,
    education: "Bachelor of Education, University of Toronto",
    certifications: [
      "TESOL Certificate - University of Toronto Professional Development",
      "Advanced TEFL Certificate with Practical Teaching Experience",
      "Conversational English Specialist Certificate",
      "Online Teaching Methodology Certificate - Digital Learning Excellence"
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
    bookingInstructions: "Hi! I'm excited to help you improve your English. Please share your goals with me before our first lesson so I can prepare accordingly.",
    createdAt: "2025-08-18T05:54:51.573Z",
    updatedAt: "2025-08-22T05:54:51.573Z",
    fullName: "David Smith",
    email: "david.smith@antoree.com",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    phone: "+14165551234",
    isActive: true
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { teacherId: string } }
) {
  try {
    const { teacherId } = params

    // Find the teacher by ID
    const teacher = mockTeachers.find(t => t.id === teacherId)

    if (!teacher) {
      return NextResponse.json(
        {
          statusCode: 404,
          message: "Teacher not found",
        },
        { status: 404 }
      )
    }

    // Return the teacher data in the specified format
    return NextResponse.json({
      statusCode: 200,
      message: "",
      data: teacher
    })

  } catch (error) {
    console.error("Get teacher error:", error)
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
