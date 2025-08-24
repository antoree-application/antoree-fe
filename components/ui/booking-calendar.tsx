"use client"

import { useState, useEffect, useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Loader2,
  Globe,
  BookOpen,
  DollarSign,
  User,
  MessageCircle
} from "lucide-react"
import { format, isAfter, isBefore, addDays, startOfDay, parseISO, formatISO } from "date-fns"
import type { BookingSlot, TimeSlotOption, BookingRequest } from "@/types/booking"
import type { Teacher } from "@/types/api"
import { api } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"

interface BookingCalendarProps {
  teacher: Partial<Teacher> & {
    id: string
    fullName: string
    timezone: string
    hourlyRate: string
    advanceNoticeHours: number
    maxAdvanceBookingHours: number
  }
  onBookingSuccess?: (booking: any) => void
  onBookingError?: (error: string) => void
}

export function BookingCalendar({ teacher, onBookingSuccess, onBookingError }: BookingCalendarProps) {
  const { user, isAuthenticated } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null)
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)

  // Generate date range (today + advance notice to max advance booking)
  const dateRange = useMemo(() => {
    const today = new Date()
    const minDate = addDays(today, Math.ceil(teacher.advanceNoticeHours / 24))
    const maxDate = addDays(today, Math.ceil(teacher.maxAdvanceBookingHours / 24))
    return { minDate, maxDate }
  }, [teacher.advanceNoticeHours, teacher.maxAdvanceBookingHours])

  // Generate mock available slots based on teacher's weekly availability
  const generateAvailableSlots = (date: Date): BookingSlot[] => {
    const dayOfWeek = date.getDay()
    const dateString = format(date, 'yyyy-MM-dd')
    const slots: BookingSlot[] = []

    // Common time slots (this would normally come from teacher's availability API)
    const commonTimeSlots = [
      { start: '08:00', end: '09:00' },
      { start: '09:00', end: '10:00' },
      { start: '10:00', end: '11:00' },
      { start: '11:00', end: '12:00' },
      { start: '14:00', end: '15:00' },
      { start: '15:00', end: '16:00' },
      { start: '16:00', end: '17:00' },
      { start: '17:00', end: '18:00' },
      { start: '19:00', end: '20:00' },
      { start: '20:00', end: '21:00' },
    ]

    // Generate slots based on day of week (mock teacher availability)
    const availableOnWeekends = dayOfWeek === 0 || dayOfWeek === 6
    const weekdaySlots = commonTimeSlots.slice(0, 8)
    const weekendSlots = commonTimeSlots.slice(2, 6)
    
    const timeSlotsForDay = availableOnWeekends ? weekendSlots : weekdaySlots

    timeSlotsForDay.forEach((timeSlot, index) => {
      const isBooked = Math.random() < 0.3 // 30% chance of being booked
      const isAvailable = !isBooked

      slots.push({
        id: `${dateString}-${timeSlot.start}-${timeSlot.end}`,
        teacherId: teacher.id,
        date: dateString,
        startTime: timeSlot.start,
        endTime: timeSlot.end,
        isAvailable,
        isBooked,
        lessonType: 'trial',
        price: parseFloat(teacher.hourlyRate) * 0.5, // Trial lesson is 50% off
        ...(isBooked && {
          studentId: 'mock-student-id',
          bookingId: `booking-${index}`
        })
      })
    })

    return slots
  }

  // Load available slots for selected date
  useEffect(() => {
    if (!selectedDate) return

    setLoading(true)
    setError(null)

    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        const slots = generateAvailableSlots(selectedDate)
        setAvailableSlots(slots)
      } catch (err) {
        setError('Failed to load available slots')
      } finally {
        setLoading(false)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [selectedDate, teacher.id])

  // Check if date is disabled
  const isDateDisabled = (date: Date) => {
    return isBefore(date, dateRange.minDate) || isAfter(date, dateRange.maxDate)
  }

  // Check if date has available slots
  const hasAvailableSlots = (date: Date) => {
    const slots = generateAvailableSlots(date)
    return slots.some(slot => slot.isAvailable)
  }

  // Handle slot selection
  const handleSlotSelect = (slot: BookingSlot) => {
    if (!slot.isAvailable) return
    setSelectedSlot(slot)
    setShowBookingDialog(true)
  }

  // Handle booking confirmation
  const handleBookingConfirm = async () => {
    if (!selectedSlot || !isAuthenticated || !user) {
      onBookingError?.('Please log in to book a lesson')
      return
    }

    setBookingLoading(true)
    setError(null)

    try {
      const bookingData: BookingRequest = {
        teacherId: teacher.id,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        lessonType: selectedSlot.lessonType,
        notes: 'Trial lesson booking via calendar'
      }

      // Convert to ISO format for API
      const scheduledAt = parseISO(`${selectedSlot.date}T${selectedSlot.startTime}:00`)
      const duration = 60 // 1 hour lesson

      const response = await api.bookings.createTrial({
        teacherId: teacher.id,
        scheduledAt: formatISO(scheduledAt),
        duration,
        notes: bookingData.notes || ''
      })

      if (response.success) {
        onBookingSuccess?.(response.data)
        setShowBookingDialog(false)
        setSelectedSlot(null)
        // Refresh slots
        if (selectedDate) {
          const updatedSlots = generateAvailableSlots(selectedDate)
          setAvailableSlots(updatedSlots)
        }
      }
    } catch (err: any) {
      const errorMessage = err?.details?.message || err.message || 'Failed to book lesson'
      setError(errorMessage)
      onBookingError?.(errorMessage)
    } finally {
      setBookingLoading(false)
    }
  }

  // Format time display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  // Group slots by availability
  const groupedSlots = useMemo(() => {
    const available = availableSlots.filter(slot => slot.isAvailable)
    const busy = availableSlots.filter(slot => !slot.isAvailable)
    return { available, busy }
  }, [availableSlots])

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Book Your Trial Lesson
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select a date and time that works for you. Trial lessons are 50% off!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Teacher Info Summary */}
          <div className="bg-white/60 rounded-lg p-4 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700">{teacher.timezone.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">{teacher.advanceNoticeHours}h advance notice</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-orange-600" />
                <span className="text-gray-700">Trial: ${(parseFloat(teacher.hourlyRate) * 0.5).toFixed(0)}/hour</span>
              </div>
            </div>
          </div>

          {/* Calendar and Time Slots Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                📅 Choose Date
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => setSelectedDate(date || null)}
                  disabled={isDateDisabled}
                  modifiers={{
                    hasSlots: (date) => hasAvailableSlots(date),
                    noSlots: (date) => !hasAvailableSlots(date) && !isDateDisabled(date)
                  }}
                  modifiersStyles={{
                    hasSlots: { 
                      backgroundColor: '#dcfce7', 
                      color: '#166534',
                      fontWeight: 'bold'
                    },
                    noSlots: { 
                      backgroundColor: '#fef2f2', 
                      color: '#dc2626',
                      textDecoration: 'line-through'
                    }
                  }}
                  className="w-full"
                />
                
                {/* Legend */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span className="text-gray-600">Available dates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                    <span className="text-gray-600">No availability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded"></div>
                    <span className="text-gray-600">Too early/late to book</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                ⏰ Available Times
                {selectedDate && (
                  <span className="text-sm font-normal text-gray-600">
                    - {format(selectedDate, 'EEEE, MMM dd')}
                  </span>
                )}
              </h3>
              
              {!selectedDate ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Select a date to see available times</p>
                </div>
              ) : loading ? (
                <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                  <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-3 animate-spin" />
                  <p className="text-gray-600">Loading available times...</p>
                </div>
              ) : error ? (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 max-h-96 overflow-hidden">
                  <ScrollArea className="h-96 p-4">
                    {groupedSlots.available.length === 0 && groupedSlots.busy.length === 0 ? (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">No time slots available</p>
                        <p className="text-sm text-gray-500 mt-1">Try selecting a different date</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Available Slots */}
                        {groupedSlots.available.length > 0 && (
                          <div>
                            <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Available ({groupedSlots.available.length})
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {groupedSlots.available.map((slot) => (
                                <Button
                                  key={slot.id}
                                  variant="outline"
                                  onClick={() => handleSlotSelect(slot)}
                                  className="h-auto p-3 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                                >
                                  <div className="text-center">
                                    <div className="font-medium text-gray-900">
                                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">
                                      ${slot.price.toFixed(0)} (Trial)
                                    </div>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Busy Slots */}
                        {groupedSlots.busy.length > 0 && (
                          <div>
                            <Separator className="my-4" />
                            <h4 className="font-medium text-gray-500 mb-3 flex items-center gap-2">
                              <X className="h-4 w-4" />
                              Unavailable ({groupedSlots.busy.length})
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {groupedSlots.busy.map((slot) => (
                                <div
                                  key={slot.id}
                                  className="p-3 border border-gray-200 rounded-md bg-gray-50 opacity-60"
                                >
                                  <div className="text-center">
                                    <div className="font-medium text-gray-500 line-through">
                                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                    </div>
                                    <div className="text-xs text-red-600 mt-1">
                                      {slot.isBooked ? 'Booked' : 'Unavailable'}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>

          {/* Booking Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              📋 Booking Instructions
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Trial lessons are {teacher.hourlyRate ? '50% off' : 'discounted'} regular price</li>
              <li>• Book at least {teacher.advanceNoticeHours} hours in advance</li>
              <li>• Free cancellation up to 24 hours before the lesson</li>
              <li>• You'll receive a confirmation email with meeting details</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Confirm Trial Lesson
            </DialogTitle>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4">
              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Teacher</span>
                  <span className="font-medium">{teacher.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="font-medium">{format(parseISO(selectedSlot.date), 'EEEE, MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Time</span>
                  <span className="font-medium">
                    {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-medium">1 hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lesson Type</span>
                  <Badge className="bg-green-100 text-green-800">Trial Lesson</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Total Price</span>
                  <span className="text-lg font-bold text-green-600">${selectedSlot.price.toFixed(0)}</span>
                </div>
              </div>

              {/* Authentication Check */}
              {!isAuthenticated ? (
                <Alert className="border-orange-200 bg-orange-50">
                  <User className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Please log in to complete your booking.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center gap-2 text-green-800 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Ready to book as {user?.firstName} {user?.lastName}</span>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBookingDialog(false)}
                  className="flex-1"
                  disabled={bookingLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBookingConfirm}
                  disabled={!isAuthenticated || bookingLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </div>

              {/* Additional Info */}
              <div className="text-xs text-gray-500 text-center">
                By booking, you agree to our terms of service and cancellation policy
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
