"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, CheckCircle, Download, Calendar, User, ArrowLeft, MessageCircle, Clock, Star, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import Link from "next/link"

interface PaymentInfo {
  paymentId: string
  orderId: string
  amount: number
  course: {
    id: string
    name: string
    description: string
    price: string
    totalLessons: number
    duration: number
    teacher: {
      id: string
      name: string
      avatar: string
    }
  }
  student: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    isNewUser: boolean
  }
}

export default function PaymentSuccessPage() {
  const { t } = useLanguage()
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)

  useEffect(() => {
    const savedPaymentInfo = sessionStorage.getItem('paymentInfo')
    if (savedPaymentInfo) {
      try {
        const info = JSON.parse(savedPaymentInfo)
        setPaymentInfo(info)
      } catch (error) {
        console.error('Failed to parse payment info:', error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">antoree</div>
              <div className="ml-2 text-xs text-gray-500">LEARN ENGLISH ONLINE 1-ON-1</div>
            </div>

            {/* Top right info */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-green-600" />
                <span>0877709376</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">?</span>
                <span>{t("footer.faqs")}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps - All Complete */}
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">{t("payment.step1")}</span>
            </div>
            <div className="w-16 h-px bg-green-600"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">{t("payment.step2")}</span>
            </div>
            <div className="w-16 h-px bg-green-600"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">{t("payment.step3")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-sm">🎉</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Welcome to your English learning journey, {paymentInfo?.student.firstName}!
          </p>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to {paymentInfo?.student.email}
          </p>
          
          {/* Success Badge */}
          <div className="mt-6 inline-flex items-center px-6 py-3 bg-green-100 border border-green-200 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">Course Successfully Enrolled</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course & Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Information Card */}
            {paymentInfo?.course && (
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                    Your Course Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-white shadow-md flex items-center justify-center">
                      <img
                        src={paymentInfo.course.teacher.avatar}
                        alt={paymentInfo.course.teacher.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {paymentInfo.course.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {paymentInfo.course.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <Badge className="bg-blue-100 text-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {paymentInfo.course.duration} min/lesson
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800">
                          <Calendar className="h-3 w-3 mr-1" />
                          {paymentInfo.course.totalLessons} lessons
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          <User className="h-3 w-3 mr-1" />
                          {paymentInfo.course.teacher.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Details Card */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Order ID</label>
                      <p className="text-lg font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {paymentInfo?.orderId || "#ANT-2025-001234"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Amount Paid</label>
                      <p className="text-2xl font-bold text-green-600">
                        ${paymentInfo?.amount || paymentInfo?.course.price || "0"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Date</label>
                      <p className="text-lg text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Method</label>
                      <div className="flex items-center">
                        <span className="text-lg text-gray-900 mr-2">MoMo E-Wallet</span>
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Primary Actions */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-lg text-center">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Go to My Courses
                  </Button>
                </Link>
                
                <Link href="/teachers" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 text-base font-semibold transition-all duration-300"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Browse More Teachers
                  </Button>
                </Link>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Teacher
                </Button>
              </CardContent>
            </Card>

            {/* Secondary Actions */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-4 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                
                <Link href="/contact-us" className="block">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps Timeline */}
        <Card className="mt-12 shadow-lg border-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Your Learning Journey Starts Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Check Your Email</h3>
                <p className="text-gray-600">
                  Course materials and access instructions have been sent to your inbox.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Teacher Will Contact You</h3>
                <p className="text-gray-600">
                  Your teacher will reach out within 24 hours to schedule your first lesson.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Start Learning</h3>
                <p className="text-gray-600">
                  Begin your personalized 1-on-1 English learning experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <div className="mt-12 text-center bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help? We're Here for You!
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to help you with any questions or concerns.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Phone Support</div>
                <div className="text-green-600 font-semibold">0877709376</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Email Support</div>
                <div className="text-blue-600 font-semibold">cskh@antoree.com</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
