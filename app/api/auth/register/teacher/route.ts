import { NextRequest, NextResponse } from "next/server"
import type { TeacherRegisterRequest } from "@/types/api"

// Mock teacher storage (in real app, use a database)
const mockTeachers: any[] = []

// Mock JWT token generation
const generateMockToken = (user: any) => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJEYXZpZCIsImxhc3ROYW1lIjoiV2lsc29uIiwic3ViIjoidGVhY2hlcl8wMDEiLCJlbWFpbCI6InRlYWNoZXIuc3BlY2lmaWNAZXhhbXBsZS5jb20iLCJpZCI6InRlYWNoZXJfMDAxIiwidHlwZSI6IlRFQUNIRVIiLCJpYXQiOjE3NTU5MzUzMDYsImV4cCI6MTg1NTkzNTMwNX0.TeacherTokenExample"
}

export async function POST(request: NextRequest) {
  try {
    const body: TeacherRegisterRequest = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      bio, 
      experience, 
      education, 
      certifications, 
      specialties, 
      hourlyRate, 
      timezone, 
      languages, 
      videoIntroUrl, 
      responseTime 
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone || !bio || 
        experience === undefined || !education || !certifications || !specialties || 
        hourlyRate === undefined || !timezone || !languages || responseTime === undefined) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "All required fields must be provided",
        },
        { status: 400 }
      )
    }

    // Validate arrays are not empty
    if (certifications.length === 0 || specialties.length === 0 || languages.length === 0) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Certifications, specialties, and languages must not be empty",
        },
        { status: 400 }
      )
    }

    // Check if teacher already exists
    const existingTeacher = mockTeachers.find((t) => t.email === email)
    if (existingTeacher) {
      return NextResponse.json(
        {
          statusCode: 409,
          message: "Teacher already exists with this email",
        },
        { status: 409 }
      )
    }

    // Create new teacher
    const newTeacher = {
      id: `teacher_${Date.now()}`,
      email,
      firstName,
      lastName,
      type: "TEACHER",
      isActive: false, // Teachers need approval
      phone,
      bio,
      experience,
      education,
      certifications,
      specialties,
      hourlyRate,
      timezone,
      languages,
      videoIntroUrl,
      responseTime,
      rating: 0,
      reviewCount: 0,
      totalLessons: 0,
      profileStatus: "PENDING_APPROVAL",
      createdAt: new Date().toISOString(),
    }

    // Add to mock storage
    mockTeachers.push({ ...newTeacher, password })

    // Generate mock token
    const accessToken = generateMockToken(newTeacher)

    // Return success response
    return NextResponse.json({
      statusCode: 200,
      message: "Teacher registration successful. Your profile is pending approval.",
      data: {
        accessToken,
        user: newTeacher,
      },
    })
  } catch (error) {
    console.error("Teacher registration error:", error)
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
