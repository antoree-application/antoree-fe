export interface BookingSlot {
  id: string
  teacherId: string
  date: string // YYYY-MM-DD format
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isAvailable: boolean
  isBooked: boolean
  studentId?: string
  bookingId?: string
  lessonType: 'trial' | 'regular'
  price: number
}

export interface BookingCalendarData {
  selectedDate: Date | null
  availableSlots: BookingSlot[]
  busySlots: BookingSlot[]
  selectedSlot: BookingSlot | null
  teacher: {
    id: string
    name: string
    timezone: string
    trialLessonRate: string
    regularLessonRate: string
    advanceNoticeHours: number
    maxAdvanceBookingHours: number
  }
}

export interface TimeSlotOption {
  time: string
  isAvailable: boolean
  isBooked: boolean
  slot?: BookingSlot
}

export interface BookingRequest {
  teacherId: string
  date: string
  startTime: string
  endTime: string
  lessonType: 'trial' | 'regular'
  notes?: string
}

export interface BookingConfirmation {
  bookingId: string
  teacherId: string
  teacherName: string
  studentId: string
  date: string
  startTime: string
  endTime: string
  lessonType: 'trial' | 'regular'
  price: number
  status: 'confirmed' | 'pending' | 'cancelled'
  meetingLink?: string
  notes?: string
  createdAt: string
}
