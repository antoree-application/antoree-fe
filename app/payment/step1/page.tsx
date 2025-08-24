"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, CreditCard, Building2, Smartphone, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/hooks/useAuth"
import { LanguageToggle } from "@/components/LanguageToggle"
import { api } from "@/lib/api"
import type { Course, CoursePaymentResponse } from "@/types/api"

interface CourseInfo {
  courseId: string
  courseName: string
  coursePrice: string
  teacherId: string
  teacherName: string
  duration: number
  totalLessons: number
  level: string
  description: string
}

export default function PaymentPage() {
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  
  // Course and form state
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preferredStartDate: "",
    specialRequests: "",
    couponCode: "",
    bankCode: ""
  })

  // Load course info from sessionStorage on component mount
  useEffect(() => {
    const savedCourseInfo = sessionStorage.getItem('selectedCourse')
    if (savedCourseInfo) {
      try {
        const course = JSON.parse(savedCourseInfo)
        setCourseInfo(course)
      } catch (error) {
        console.error('Failed to parse course info:', error)
        router.push('/teachers')
      }
    } else {
      router.push('/teachers')
    }
    
    // Pre-fill user data if authenticated
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || ""
      }))
    }
  }, [isAuthenticated, user, router])

  // Set default start date (1 week from now)
  useEffect(() => {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const formattedDate = nextWeek.toISOString().split('T')[0]
    setFormData(prev => ({
      ...prev,
      preferredStartDate: formattedDate
    }))
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError(null)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    setError(null)
    
    // Set bank code based on payment method
    if (method === "payWithATM") {
      setFormData(prev => ({ ...prev, bankCode: "NCB" }))
    } else {
      setFormData(prev => ({ ...prev, bankCode: "" }))
    }
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.phoneNumber.trim()) return "Phone number is required"
    if (!formData.preferredStartDate) return "Preferred start date is required"
    if (!selectedPaymentMethod) return "Please select a payment method"
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address"
    
    return null
  }

  const handleSubmit = async () => {
    if (!courseInfo) {
      setError("Course information not found. Please go back and select a course.")
      return
    }

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    if (!selectedPaymentMethod) {
      setError("Please select a payment method")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const paymentData = {
        courseId: courseInfo.courseId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        preferredStartDate: formData.preferredStartDate,
        specialRequests: formData.specialRequests.trim() || "No special requests",
        couponCode: formData.couponCode.trim(),
        bankCode: formData.bankCode || "NCB",
        paymentMethod: selectedPaymentMethod as "captureWallet" | "payWithATM" | "payWithCC"
      }

      console.log("Creating payment with data:", paymentData)

      const response = await api.payment.createCoursePayment(paymentData)
      
      if (response.success && response.data) {
        const paymentResponse = response.data as CoursePaymentResponse
        
        if (paymentResponse.data?.paymentUrl) {
          console.log("Payment URL created successfully:", paymentResponse.data.paymentUrl)
          
          // Store payment info for success page
          sessionStorage.setItem('paymentInfo', JSON.stringify({
            paymentId: paymentResponse.data.paymentId,
            orderId: paymentResponse.data.orderId,
            amount: paymentResponse.data.amount,
            course: paymentResponse.data.course,
            student: paymentResponse.data.student
          }))
          
          // Navigate to payment URL
          window.location.href = paymentResponse.data.paymentUrl
        } else {
          throw new Error("Payment URL not received from server")
        }
      } else {
        throw new Error("Payment URL not received from server")
      }
    } catch (error: any) {
      console.error("Payment creation failed:", error)
      const errorMessage = error?.details?.message || error.message || "Failed to create payment. Please try again."
      setError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
              <Button variant="ghost" className="text-red-600">
                ✕
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">{t("payment.step1")}</span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-gray-600">{t("payment.step2")}</span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-600">{t("payment.step3")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Course
            </Button>

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Course Purchase</h1>
              <p className="text-gray-600 text-sm">Fill in your details and select a payment method to get started.</p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 border-red-300 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* Student Information Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+84901234567"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="preferredStartDate">Preferred Start Date *</Label>
                  <Input
                    id="preferredStartDate"
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Focus on business English and presentation skills"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                  <Input
                    id="couponCode"
                    value={formData.couponCode}
                    onChange={(e) => handleInputChange('couponCode', e.target.value)}
                    placeholder="WELCOME10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {/* MoMo E-Wallet */}
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'captureWallet' 
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handlePaymentMethodSelect('captureWallet')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-pink-100 rounded mr-3 flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">MoMo E-Wallet</h3>
                          <p className="text-sm text-gray-600">Quick and secure mobile payment</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === 'captureWallet' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  {/* ATM/Debit Card */}
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'payWithATM' 
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handlePaymentMethodSelect('payWithATM')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded mr-3 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">ATM/Debit Card</h3>
                          <p className="text-sm text-gray-600">Pay with your local bank card</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === 'payWithATM' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  {/* Credit Card */}
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'payWithCC' 
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handlePaymentMethodSelect('payWithCC')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-100 rounded mr-3 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Credit Card</h3>
                          <p className="text-sm text-gray-600">Visa, Mastercard, JCB accepted</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === 'payWithCC' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Bank Selection for ATM payments */}
                {selectedPaymentMethod === 'payWithATM' && (
                  <div className="mt-4">
                    <Label htmlFor="bankCode">Select Your Bank</Label>
                    <Select value={formData.bankCode} onValueChange={(value) => handleInputChange('bankCode', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NCB">National Citizen Bank (NCB)</SelectItem>
                        <SelectItem value="VCB">Vietcombank (VCB)</SelectItem>
                        <SelectItem value="TCB">Techcombank (TCB)</SelectItem>
                        <SelectItem value="BIDV">BIDV</SelectItem>
                        <SelectItem value="VTB">VietinBank (VTB)</SelectItem>
                        <SelectItem value="MB">MB Bank</SelectItem>
                        <SelectItem value="ACB">ACB</SelectItem>
                        <SelectItem value="TPB">TP Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="mt-8">
              <Button 
                onClick={handleSubmit}
                disabled={isProcessing || !selectedPaymentMethod}
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Course Summary */}
          <div className="lg:col-span-1">
            {courseInfo && (
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Course Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{courseInfo.courseName}</h3>
                    <p className="text-sm text-gray-600 mb-4">{courseInfo.description}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teacher:</span>
                      <span className="font-medium">{courseInfo.teacherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Lessons:</span>
                      <span className="font-medium">{courseInfo.totalLessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration per Lesson:</span>
                      <span className="font-medium">{courseInfo.duration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{courseInfo.level}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">${courseInfo.coursePrice}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✓ 30-day money-back guarantee</p>
                    <p>✓ Flexible scheduling</p>
                    <p>✓ Personal progress tracking</p>
                    <p>✓ Certificate upon completion</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">HỖ TRỢ KHÁCH HÀNG</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Hotline 0877709376 /</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
                <div>cskh@antoree.com</div>
                <div className="mt-4">
                  <div>Phản hồi về dịch vụ</div>
                  <div>anh.pham2@antoree.com</div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">THÔNG TIN DỊCH VỤ</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <a href="#" className="block hover:text-white">
                  Điều khoản sử dụng
                </a>
                <a href="#" className="block hover:text-white">
                  Chính sách bảo mật
                </a>
                <a href="#" className="block hover:text-white">
                  Chính sách hoàn tiền
                </a>
                <a href="/faqs" className="block hover:text-white">
                  FAQs
                </a>
                <a href="#" className="block hover:text-white">
                  Cam kết đầu ra
                </a>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4">KẾT NỐI VỚI ANTOREE</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Cộng đồng</div>
                <Button className="bg-green-600 hover:bg-green-700 text-sm">Trở thành giáo viên</Button>
              </div>
            </div>

            {/* Mobile Apps */}
            <div>
              <h4 className="text-lg font-semibold mb-4">TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI</h4>
              <div className="space-y-3">
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
                  Google Play
                </div>
                <div className="w-32 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">App Store</div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <div className="space-y-2">
              <div>Công ty Giáo dục và Đào tạo ANTOREE INTERNATIONAL PTE. LTD. (MST: 201436962)</div>
              <div>Trụ sở chính: 10 Anson Road, #27-15, International Plaza, Singapore 079903</div>
              <div className="mt-4">
                <div>Đối tác đại diện tại Việt Nam: CÔNG TY TNHH PHÁT TRIỂN GIÁO DỤC ANTOREE (MST: 0313769851)</div>
                <div>Trụ sở chính: 18/77 Điện Biên Phủ, P. Đa Kao, Q 1, TP Hồ Chí Minh, Việt Nam</div>
                <div>
                  Văn phòng đại diện, tiếp khách và nhận thư tại TP Hồ Chí Minh: 56 SSA Trần Thái Tông, Phường 15, Quận
                  Tân Bình, Thành phố Hồ Chí Minh, Việt Nam
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
              <div>© 2025 Antoree Pte.Ltd</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">
                  Chính sách bảo mật
                </a>
                <a href="#" className="hover:text-white">
                  Điều khoản sử dụng
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
