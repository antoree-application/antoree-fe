"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, X } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
  booked: boolean
  price?: number
}

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  selectedTime?: string
  onTimeSelect: (time: string) => void
  title?: string
  timezone?: string
}

export function TimeSlotPicker({ 
  slots, 
  selectedTime, 
  onTimeSelect, 
  title = "Available Times",
  timezone = "Local Time"
}: TimeSlotPickerProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  const availableSlots = slots.filter(slot => slot.available && !slot.booked)
  const unavailableSlots = slots.filter(slot => !slot.available || slot.booked)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600">{timezone}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Available Time Slots */}
        {availableSlots.length > 0 && (
          <div>
            <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Available ({availableSlots.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  onClick={() => onTimeSelect(slot.time)}
                  className={`h-auto p-3 transition-all duration-200 ${
                    selectedTime === slot.time
                      ? "bg-green-600 hover:bg-green-700 border-green-600"
                      : "border-green-200 hover:bg-green-50 hover:border-green-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">
                      {formatTime(slot.time)}
                    </div>
                    {slot.price && (
                      <div className="text-xs mt-1 opacity-80">
                        ${slot.price.toFixed(0)}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Unavailable Time Slots */}
        {unavailableSlots.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-500 mb-3 flex items-center gap-2">
              <X className="h-4 w-4" />
              Unavailable ({unavailableSlots.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {unavailableSlots.map((slot) => (
                <div
                  key={slot.time}
                  className="p-3 border border-gray-200 rounded-md bg-gray-50 opacity-60 text-center"
                >
                  <div className="font-medium text-gray-500 line-through">
                    {formatTime(slot.time)}
                  </div>
                  <div className="text-xs text-red-600 mt-1">
                    {slot.booked ? 'Booked' : 'Unavailable'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No slots available */}
        {slots.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p>No time slots available</p>
            <p className="text-sm mt-1">Please select a different date</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
