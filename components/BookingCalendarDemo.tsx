"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingCalendar } from "@/components/ui/booking-calendar"
import { QuickBookingWidget } from "@/components/ui/quick-booking-widget"
import { TimeSlotPicker } from "@/components/ui/time-slot-picker"
import { BookingConfirmation } from "@/components/ui/booking-confirmation"
import { Calendar, Clock, User, CheckCircle } from "lucide-react"

// Mock teacher data for demonstration
const mockTeacher = {
  id: "teacher-123",
  fullName: "Sarah Johnson",
  bio: "Experienced English teacher with 8+ years of expertise",
  experience: 8,
  education: "Master's in English Literature, TESOL Certified",
  certifications: ["TESOL", "IELTS Examiner", "Business English"],
  specialties: ["Business English", "IELTS Preparation", "Conversation"],
  hourlyRate: "25",
  timezone: "America/New_York",
  languages: ["English (Native)", "Spanish (Fluent)"],
  videoIntroUrl: "https://youtube.com/watch?v=example",
  status: "active",
  totalLessons: 1247,
  averageRating: "4.9",
  responseTime: 15,
  profileCompleted: true,
  verificationSubmitted: true,
  availabilitySetup: true,
  isLive: true,
  advanceNoticeHours: 24,
  maxAdvanceBookingHours: 720, // 30 days
  allowInstantBooking: true,
  bookingInstructions: "Please book at least 24 hours in advance. I look forward to our lesson!",
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-08-24T14:30:00Z",
  email: "sarah.johnson@example.com",
  avatar: "/placeholder-user.jpg",
  phone: "+1-555-0123",
  isActive: true,
  availableDays: [1, 2, 3, 4, 5], // Monday to Friday
  trialLessonRate: "12.50",
  regularLessonRate: "25.00",
  recentReviews: [],
  totalReviews: 234
}

// Mock booking confirmation data
const mockBooking = {
  id: "booking-789",
  teacherName: "Sarah Johnson",
  teacherAvatar: "/placeholder-user.jpg",
  date: "2024-08-26",
  startTime: "14:00",
  endTime: "15:00",
  lessonType: "trial" as const,
  price: 12.50,
  status: "confirmed" as const,
  meetingLink: "https://zoom.us/j/123456789",
  notes: "Trial lesson focusing on business English conversation"
}

// Mock time slots for time picker demo
const mockTimeSlots = [
  { time: "09:00", available: true, booked: false, price: 12.50 },
  { time: "10:00", available: true, booked: false, price: 12.50 },
  { time: "11:00", available: false, booked: true },
  { time: "14:00", available: true, booked: false, price: 12.50 },
  { time: "15:00", available: true, booked: false, price: 12.50 },
  { time: "16:00", available: false, booked: true },
  { time: "19:00", available: true, booked: false, price: 12.50 },
  { time: "20:00", available: true, booked: false, price: 12.50 }
]

export function BookingCalendarDemo() {
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeDemo, setActiveDemo] = useState("calendar")

  const handleBookingSuccess = (booking?: any) => {
    console.log("Booking successful:", booking)
    setShowConfirmation(true)
  }

  const handleBookingError = (error: string) => {
    console.error("Booking error:", error)
    alert(`Booking failed: ${error}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📅 Booking Calendar System Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interactive demonstration of the comprehensive booking calendar system. 
            Students can easily view teacher availability and book trial lessons.
          </p>
        </div>

        {/* Demo Navigation */}
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Full Calendar
            </TabsTrigger>
            <TabsTrigger value="quick" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Quick Booking
            </TabsTrigger>
            <TabsTrigger value="picker" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Picker
            </TabsTrigger>
            <TabsTrigger value="confirmation" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Confirmation
            </TabsTrigger>
          </TabsList>

          {/* Full Booking Calendar Demo */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Full Booking Calendar Component
                </CardTitle>
                <p className="text-gray-600">
                  Complete calendar interface with date selection, time slots, and booking flow.
                  Features visual availability indicators, responsive design, and integrated booking confirmation.
                </p>
              </CardHeader>
              <CardContent>
                <BookingCalendar 
                  teacher={mockTeacher}
                  onBookingSuccess={handleBookingSuccess}
                  onBookingError={handleBookingError}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Booking Widget Demo */}
          <TabsContent value="quick" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-green-600" />
                    Quick Booking Widget
                  </CardTitle>
                  <p className="text-gray-600">
                    Compact sidebar widget for instant booking. Shows upcoming available slots
                    and allows one-click booking for immediate time slots.
                  </p>
                </CardHeader>
                <CardContent>
                  <QuickBookingWidget 
                    teacher={mockTeacher}
                    onBookingSuccess={handleBookingSuccess}
                    onBookingError={handleBookingError}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Features & Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Quick Access</h4>
                        <p className="text-sm text-gray-600">Shows next 5-7 days with available slots</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">One-Click Booking</h4>
                        <p className="text-sm text-gray-600">Instant booking for immediate slots</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Trial Pricing</h4>
                        <p className="text-sm text-gray-600">Automatically shows 50% off trial rates</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Responsive Design</h4>
                        <p className="text-sm text-gray-600">Perfect for sidebar placement</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Time Slot Picker Demo */}
          <TabsContent value="picker" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-purple-600" />
                    Time Slot Picker Component
                  </CardTitle>
                  <p className="text-gray-600">
                    Standalone time picker component that can be used independently.
                    Shows available and busy time slots with clear visual indicators.
                  </p>
                </CardHeader>
                <CardContent>
                  <TimeSlotPicker 
                    slots={mockTimeSlots}
                    selectedTime={selectedTime}
                    onTimeSelect={setSelectedTime}
                    title="Available Times - Monday, Aug 26"
                    timezone="EST (UTC-5)"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Component Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Visual Indicators</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-green-200 bg-green-50 rounded"></div>
                          <span>Available time slots</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-gray-200 bg-gray-50 rounded opacity-60"></div>
                          <span>Busy/unavailable slots</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-200 bg-blue-100 rounded"></div>
                          <span>Selected time slot</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedTime && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900">Selected Time</h4>
                        <p className="text-blue-800">{selectedTime} - Trial Lesson ($12.50)</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Flexible Usage</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Can be used standalone or integrated</li>
                        <li>• Supports custom time formats</li>
                        <li>• Displays pricing information</li>
                        <li>• Responsive grid layout</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Booking Confirmation Demo */}
          <TabsContent value="confirmation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Booking Confirmation Component
                </CardTitle>
                <p className="text-gray-600">
                  Beautiful confirmation screen shown after successful booking.
                  Includes meeting details, next steps, and action buttons.
                </p>
              </CardHeader>
              <CardContent>
                <div className="max-w-md mx-auto">
                  <BookingConfirmation 
                    booking={mockBooking}
                    onClose={() => setShowConfirmation(false)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Implementation Guide */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">🚀 Implementation Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Quick Integration</h4>
                <div className="bg-white/70 rounded-lg p-3 border border-blue-200">
                  <code className="text-sm text-gray-800">
                    {`import { BookingCalendar } from "@/components/ui/booking-calendar"

<BookingCalendar 
  teacher={teacher}
  onBookingSuccess={handleSuccess}
  onBookingError={handleError}
/>`}
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Key Features</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✅ Interactive calendar with availability</li>
                  <li>✅ Real-time time slot display</li>
                  <li>✅ Authentication integration</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Booking confirmation flow</li>
                  <li>✅ Error handling & loading states</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Demo Booking Successful!</h3>
                <p className="text-gray-600 mb-4">
                  In a real application, this would create an actual booking and send confirmation emails.
                </p>
                <Button onClick={() => setShowConfirmation(false)}>
                  Close Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
