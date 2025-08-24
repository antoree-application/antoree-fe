import { NextRequest, NextResponse } from "next/server"

// Mock user storage (in real app, use a database)
const mockUsers: any[] = []

// Mock JWT token generation
const generateMockToken = (user: any) => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJzdWIiOiJzdHVkZW50XzAwMSIsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiaWQiOiJzdHVkZW50XzAwMSIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNzU1OTM1MzA2LCJleHAiOjE4NTU5MzUzMDV9.WLbyKzJJYbqexIbi-Vl2MxD7tt166fR8WMZLmkZ45Ic"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, type = "STUDENT" } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "All fields are required",
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          statusCode: 409,
          message: "User already exists with this email",
        },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: `${type.toLowerCase()}_${Date.now()}`,
      email,
      firstName,
      lastName,
      type: type.toUpperCase(),
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    // Add to mock storage
    mockUsers.push({ ...newUser, password })

    // Generate mock token
    const accessToken = generateMockToken(newUser)

    // Return success response
    return NextResponse.json({
      statusCode: 200,
      message: "Registration successful",
      data: {
        accessToken,
        user: newUser,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
