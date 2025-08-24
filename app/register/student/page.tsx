"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, Globe, Target, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"
import { apiClient } from "@/lib/api"
import type { StudentRegisterRequest } from "@/types/api"

// Timezone options (common ones)
const timezones = [
  { value: "America/New_York", label: "Eastern Time (New York)" },
  { value: "America/Chicago", label: "Central Time (Chicago)" },
  { value: "America/Denver", label: "Mountain Time (Denver)" },
  { value: "America/Los_Angeles", label: "Pacific Time (Los Angeles)" },
  { value: "Europe/London", label: "Greenwich Mean Time (London)" },
  { value: "Europe/Berlin", label: "Central European Time (Berlin)" },
  { value: "Europe/Madrid", label: "Central European Time (Madrid)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (Tokyo)" },
  { value: "Asia/Shanghai", label: "China Standard Time (Shanghai)" },
  { value: "Asia/Seoul", label: "Korea Standard Time (Seoul)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (Sydney)" },
  { value: "Asia/Kolkata", label: "India Standard Time (Mumbai)" },
]

export default function StudentRegisterPage() {
  const [formData, setFormData] = useState<StudentRegisterRequest & { confirmPassword: string; acceptTerms: boolean }>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    englishLevel: "INTERMEDIATE",
    learningGoals: "",
    timezone: "America/New_York",
    acceptTerms: false,
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  
  const { t } = useLanguage()
  const router = useRouter()

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 8 characters with uppercase, lowercase, and number"
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!formData.learningGoals.trim()) {
      errors.learningGoals = "Please describe your learning goals"
    } else if (formData.learningGoals.trim().length < 20) {
      errors.learningGoals = "Please provide more detailed learning goals (at least 20 characters)"
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "You must accept the terms of service"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field-specific error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }))
    }
    
    // Clear general error
    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Prepare request data
      const requestData: StudentRegisterRequest = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        ...(formData.phone && { phone: formData.phone }),
        englishLevel: formData.englishLevel,
        learningGoals: formData.learningGoals,
        timezone: formData.timezone,
      }

      const response = await apiClient.post("/auth/register/student", requestData)

      if (response.success) {
        // Registration successful
        router.push("/login?message=registration-success&type=student")
      } else {
        setError("Registration failed")
      }
    } catch (error: any) {
      setError(error?.details?.message || error.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            antoree
          </Link>
          <LanguageToggle />
        </div>

        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl text-white mb-2">
              Student Registration
            </CardTitle>
            <CardDescription className="text-gray-400">
              Join thousands of students learning English with expert teachers
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Global Error Display */}
            {error && (
              <Alert className="bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-400" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                        validationErrors.firstName ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-400 text-sm">{validationErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                        validationErrors.lastName ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-400 text-sm">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 ${
                        validationErrors.email ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-400 text-sm">{validationErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-blue-400" />
                  Account Security
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password *"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.password ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className="text-red-400 text-sm">{validationErrors.password}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Must be at least 8 characters with uppercase, lowercase, and number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password *"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.confirmPassword ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-400" />
                  Learning Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">English Level *</label>
                    <Select
                      value={formData.englishLevel}
                      onValueChange={(value: "BEGINNER" | "INTERMEDIATE" | "ADVANCED") => 
                        handleInputChange("englishLevel", value)
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Timezone *</label>
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) => handleInputChange("timezone", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Learning Goals *</label>
                    <Textarea
                      placeholder="Describe your English learning goals, what you want to achieve, and why you want to learn English..."
                      value={formData.learningGoals}
                      onChange={(e) => handleInputChange("learningGoals", e.target.value)}
                      rows={4}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none ${
                        validationErrors.learningGoals ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.learningGoals && (
                      <p className="text-red-400 text-sm">{validationErrors.learningGoals}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      {formData.learningGoals.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", !!checked)}
                    className={`border-gray-600 mt-1 ${validationErrors.acceptTerms ? "border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {validationErrors.acceptTerms && (
                  <p className="text-red-400 text-sm">{validationErrors.acceptTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Student Account"
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="text-center space-y-3 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign in here
                </Link>
              </div>
              <div className="text-sm text-gray-400">
                Want to teach instead?{" "}
                <Link href="/register/teacher" className="text-blue-400 hover:text-blue-300 font-medium">
                  Register as a Teacher
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                Your data is protected with industry-standard encryption
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
