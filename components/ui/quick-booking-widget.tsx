"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  Loader2,
  BookOpen,
  ArrowRight,
  X
} from "lucide-react"
import { format, addDays, isAfter, isBefore } from "date-fns"
import type { Teacher } from "@/types/api"
import { useAuth } from "@/hooks/useAuth"

interface QuickBookingWidgetProps {
  teacher: Partial<Teacher> & {
    id: string
    fullName: string
    hourlyRate: string
  }
  onBookingSuccess?: () => void
  onBookingError?: (error: string) => void
  onClose?: () => void
  showCloseButton?: boolean
}

export function QuickBookingWidget({ teacher, onBookingSuccess, onBookingError, onClose, showCloseButton = false }: QuickBookingWidgetProps) {
  const { isAuthenticated } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Generate quick available times for the next few days
  const quickAvailableTimes = useMemo(() => {
    const today = new Date()
    const nextDays = []
    
    for (let i = 1; i <= 7; i++) {
      const date = addDays(today, i)
      const dayName = format(date, 'EEE')
      const dateString = format(date, 'MMM dd')
      
      // Mock available times (this would come from API)
      const times = ['10:00', '14:00', '16:00', '19:00'].filter(() => Math.random() > 0.3)
      
      if (times.length > 0) {
        nextDays.push({
          date,
          dayName,
          dateString,
          times: times.slice(0, 2) // Show max 2 times per day
        })
      }
    }
    
    return nextDays.slice(0, 5) // Show max 5 days
  }, [])

  const handleQuickBook = (date: Date, time: string) => {
    if (!isAuthenticated) {
      onBookingError?.('Please log in to book a lesson')
      return
    }
    
    setSelectedDate(date)
    setSelectedTime(time)
    setIsBooking(true)
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      setBookingSuccess(true)
      onBookingSuccess?.()
      
      // Reset success state after a short delay
      setTimeout(() => {
        setBookingSuccess(false)
      }, 3000)
    }, 2000)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarIcon className="h-5 w-5 text-green-600" />
              Book Your Trial Lesson
            </CardTitle>
            <p className="text-sm text-gray-600">
              Select a date and time that works for you
            </p>
          </div>
          {showCloseButton && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Success Alert */}
        {bookingSuccess && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg p-4 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 animate-pulse" />
              <div>
                <p className="font-semibold text-green-800">🎉 Booking Successful!</p>
                <p className="text-sm text-green-700">Your trial lesson has been confirmed.</p>
              </div>
            </div>
          </div>
        )}
        {/* Trial Lesson Offer */}
        <div className="bg-white/70 rounded-lg p-3 border border-green-200">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              ${(parseFloat(teacher.hourlyRate) * 0.5).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">
              Trial Lesson (50% off)
            </div>
          </div>
        </div>

        {/* Quick Time Slots */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Available Soon:</h4>
          {quickAvailableTimes.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              No quick slots available
            </div>
          ) : (
            <div className="space-y-2">
              {quickAvailableTimes.map((daySlot, dayIndex) => (
                <div key={dayIndex} className="space-y-2">
                  <div className="text-xs font-medium text-gray-700">
                    {daySlot.dayName}, {daySlot.dateString}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {daySlot.times.map((time) => (
                      <Button
                        key={`${dayIndex}-${time}`}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickBook(daySlot.date, time)}
                        disabled={isBooking}
                        className="h-8 text-xs border-green-200 hover:bg-green-100 hover:border-green-300"
                      >
                        {formatTime(time)}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* More Options Button */}
        <Button
          variant="outline"
          onClick={() => setShowCalendar(true)}
          className="w-full border-green-300 text-green-700 hover:bg-green-100"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          View Full Calendar
        </Button>

        {/* Booking Status */}
        {isBooking && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-800 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Booking your lesson...</span>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Free cancellation (24h)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Video meeting link included</span>
          </div>
        </div>
      </CardContent>

      {/* Full Calendar Modal */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-green-600" />
              Choose Your Date
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date) => setSelectedDate(date || null)}
              disabled={(date) => 
                isBefore(date, new Date()) || 
                isAfter(date, addDays(new Date(), 30))
              }
              className="w-full"
            />
            
            {selectedDate && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  Available times for {format(selectedDate, 'MMM dd')}:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {['09:00', '11:00', '14:00', '16:00', '19:00'].map((time) => (
                    <Button
                      key={time}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTime(time)
                        setShowCalendar(false)
                        handleQuickBook(selectedDate, time)
                      }}
                      className="border-green-200 hover:bg-green-100"
                    >
                      {formatTime(time)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
