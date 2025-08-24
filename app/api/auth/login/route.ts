import { NextRequest, NextResponse } from "next/server"

// Mock user data
const mockUsers = [
  {
    id: "student_001",
    email: "john.doe@gmail.com",
    password: "password123", // In real app, this would be hashed
    firstName: "John",
    lastName: "Doe",
    type: "STUDENT",
    isActive: true,
  },
  {
    id: "teacher_001",
    email: "jane.teacher@gmail.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    type: "TEACHER",
    isActive: true,
  },
]

// Mock JWT token (in real app, use proper JWT library)
const generateMockToken = (user: any) => {
  const header = { alg: "HS256", typ: "JWT" }
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    sub: user.id,
    email: user.email,
    id: user.id,
    type: user.type,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  }
  
  // This is just a mock token for demo purposes
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJzdWIiOiJzdHVkZW50XzAwMSIsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiaWQiOiJzdHVkZW50XzAwMSIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNzU1OTM1MzA2LCJleHAiOjE4NTU5MzUzMDV9.WLbyKzJJYbqexIbi-Vl2MxD7tt166fR8WMZLmkZ45Ic"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Email and password are required",
        },
        { status: 400 }
      )
    }

    // Find user
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        {
          statusCode: 401,
          message: "Invalid email or password",
        },
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Generate mock token
    const accessToken = generateMockToken(user)

    // Return success response matching the specified format
    return NextResponse.json({
      statusCode: 200,
      message: "Login successful",
      data: {
        accessToken,
        user: userWithoutPassword,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
