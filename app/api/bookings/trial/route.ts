import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { teacherId, scheduledAt, duration, notes } = body

    // Validate required fields
    if (!teacherId || !scheduledAt || !duration) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Missing required fields: teacherId, scheduledAt, duration",
          data: null
        },
        { status: 400 }
      )
    }

    // Check authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          statusCode: 401,
          message: "Unauthorized - Bearer token required",
          data: null
        },
        { status: 401 }
      )
    }

    // Generate a mock booking ID
    const bookingId = `cmeoiii470001ysdk7st0ah7k`
    
    // Create mock response matching the expected structure
    const mockResponse = {
      statusCode: 201,
      message: "Trial lesson booked successfully",
      data: {
        id: bookingId,
        studentId: "student_001",
        teacherId: teacherId,
        courseId: null,
        scheduledAt: scheduledAt,
        duration: duration,
        notes: notes || "",
        status: "PENDING",
        isTrialLesson: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        student: {
          id: "student_001",
          user: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg"
          },
          englishLevel: "BEGINNER",
          timezone: "Asia/Ho_Chi_Minh"
        },
        teacher: {
          id: teacherId,
          user: {
            firstName: "Robert",
            lastName: "Davis",
            email: "robert.davis@antoree.com",
            avatar: "https://randomuser.me/api/portraits/men/10.jpg"
          },
          hourlyRate: "30",
          timezone: "Asia/Ho_Chi_Minh",
          averageRating: "5"
        }
      }
    }

    console.log("Trial lesson booking created:", mockResponse)

    return NextResponse.json(mockResponse, { status: 201 })
  } catch (error) {
    console.error("Error creating trial lesson booking:", error)
    
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal server error",
        data: null
      },
      { status: 500 }
    )
  }
}
