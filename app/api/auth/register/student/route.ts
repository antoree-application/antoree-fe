import { NextRequest, NextResponse } from "next/server"
import type { StudentRegisterRequest } from "@/types/api"

// Mock student storage (in real app, use a database)
const mockStudents: any[] = []

// Mock JWT token generation
const generateMockToken = (user: any) => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBbGljZSIsImxhc3ROYW1lIjoiSm9obnNvbiIsInN1YiI6InN0dWRlbnRfMDAyIiwiZW1haWwiOiJzdHVkZW50LnNwZWNpZmljQGV4YW1wbGUuY29tIiwiaWQiOiJzdHVkZW50XzAwMiIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNzU1OTM1MzA2LCJleHAiOjE4NTU5MzUzMDV9.StudentTokenExample"
}

export async function POST(request: NextRequest) {
  try {
    const body: StudentRegisterRequest = await request.json()
    const { firstName, lastName, email, password, phone, englishLevel, learningGoals, timezone } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !englishLevel || !learningGoals || !timezone) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "All required fields must be provided",
        },
        { status: 400 }
      )
    }

    // Check if student already exists
    const existingStudent = mockStudents.find((s) => s.email === email)
    if (existingStudent) {
      return NextResponse.json(
        {
          statusCode: 409,
          message: "Student already exists with this email",
        },
        { status: 409 }
      )
    }

    // Create new student
    const newStudent = {
      id: `student_${Date.now()}`,
      email,
      firstName,
      lastName,
      type: "STUDENT",
      isActive: true,
      phone,
      englishLevel,
      learningGoals,
      timezone,
      createdAt: new Date().toISOString(),
    }

    // Add to mock storage
    mockStudents.push({ ...newStudent, password })

    // Generate mock token
    const accessToken = generateMockToken(newStudent)

    // Return success response
    return NextResponse.json({
      statusCode: 200,
      message: "Student registration successful",
      data: {
        accessToken,
        user: newStudent,
      },
    })
  } catch (error) {
    console.error("Student registration error:", error)
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
