"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Video,
  Mail,
  MessageCircle,
  Download
} from "lucide-react"
import { format } from "date-fns"

interface BookingConfirmationProps {
  booking: {
    id: string
    teacherName: string
    teacherAvatar: string
    date: string
    startTime: string
    endTime: string
    lessonType: 'trial' | 'regular'
    price: number
    status: 'confirmed' | 'pending' | 'cancelled'
    meetingLink?: string
    notes?: string
  }
  onClose?: () => void
}

export function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Success Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🎉 Lesson Booked!
            </h3>
            <p className="text-gray-600">
              Your trial lesson has been successfully scheduled
            </p>
            <Badge className={`mt-3 ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          {/* Booking Details */}
          <div className="bg-white/70 rounded-lg p-4 border border-green-200 space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Lesson Details</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Teacher:</span>
                <span className="font-medium text-gray-900">{booking.teacherName}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {format(new Date(booking.date), 'EEEE, MMMM dd, yyyy')}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Time:</span>
                <span className="font-medium text-gray-900">
                  {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-800">
                  {booking.lessonType === 'trial' ? 'Trial Lesson' : 'Regular Lesson'}
                </Badge>
                <span className="font-bold text-green-600">${booking.price.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Meeting Information */}
          {booking.meetingLink && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Meeting Information
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-blue-800">
                  Your video lesson will take place on Zoom. The meeting link has been sent to your email.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => window.open(booking.meetingLink, '_blank')}
                >
                  <Video className="h-3 w-3 mr-1" />
                  Join Meeting
                </Button>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">📋 What's Next?</h4>
            <ul className="text-sm text-purple-800 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Check your email for confirmation and meeting details</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Prepare any questions you'd like to ask your teacher</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Join the meeting 5 minutes early to test your connection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Free cancellation up to 24 hours before the lesson</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <Mail className="h-3 w-3 mr-1" />
                View Email
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Add to Calendar
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Message Teacher
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Download className="h-3 w-3 mr-1" />
                Download Receipt
              </Button>
            </div>
          </div>

          {/* Booking ID */}
          <div className="text-center pt-4 border-t border-green-200">
            <p className="text-xs text-gray-500">
              Booking ID: <span className="font-mono font-medium">{booking.id}</span>
            </p>
          </div>

          {/* Close Button */}
          {onClose && (
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full mt-4"
            >
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
