"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, GraduationCap, BookOpen, Clock, DollarSign, Globe, Video, AlertCircle, Plus, X } from "lucide-react"
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
import type { TeacherRegisterRequest } from "@/types/api"

// Pre-defined options
const commonCertifications = ["TEFL", "TESOL", "CELTA", "IELTS Teacher Training", "TOEIC Teacher Training", "DELTA", "Trinity CertTESOL"]
const commonSpecialties = ["Business English", "IELTS Preparation", "TOEFL Preparation", "Conversation Skills", "Academic Writing", "Pronunciation", "Grammar", "General English", "Kids & Teens", "Test Preparation"]
const commonLanguages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Arabic"]

// Timezone options
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

export default function TeacherRegisterPage() {
  const [formData, setFormData] = useState<TeacherRegisterRequest & { confirmPassword: string; acceptTerms: boolean }>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    experience: 0,
    education: "",
    certifications: [],
    specialties: [],
    hourlyRate: 25.00,
    timezone: "Europe/London",
    languages: ["English"],
    videoIntroUrl: "",
    responseTime: 120,
    acceptTerms: false,
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [newCertification, setNewCertification] = useState("")
  const [newSpecialty, setNewSpecialty] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  
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

  const validateUrl = (url: string): boolean => {
    if (!url) return true // Optional field
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
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

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
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

    if (!formData.bio.trim()) {
      errors.bio = "Bio is required"
    } else if (formData.bio.trim().length < 50) {
      errors.bio = "Bio must be at least 50 characters"
    }

    if (formData.experience < 0) {
      errors.experience = "Experience cannot be negative"
    }

    if (!formData.education.trim()) {
      errors.education = "Education information is required"
    }

    if (formData.certifications.length === 0) {
      errors.certifications = "At least one certification is required"
    }

    if (formData.specialties.length === 0) {
      errors.specialties = "At least one specialty is required"
    }

    if (formData.hourlyRate < 5 || formData.hourlyRate > 200) {
      errors.hourlyRate = "Hourly rate must be between $5 and $200"
    }

    if (formData.languages.length === 0) {
      errors.languages = "At least one language is required"
    }

    if (formData.videoIntroUrl && !validateUrl(formData.videoIntroUrl)) {
      errors.videoIntroUrl = "Please enter a valid URL"
    }

    if (formData.responseTime < 30 || formData.responseTime > 1440) {
      errors.responseTime = "Response time must be between 30 minutes and 24 hours"
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "You must accept the terms of service"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData, value: string | number | boolean | string[]) => {
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

  const addToArray = (field: "certifications" | "specialties" | "languages", value: string) => {
    if (value && !formData[field].includes(value)) {
      handleInputChange(field, [...formData[field], value])
    }
  }

  const removeFromArray = (field: "certifications" | "specialties" | "languages", value: string) => {
    handleInputChange(field, formData[field].filter(item => item !== value))
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
      const requestData: TeacherRegisterRequest = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        bio: formData.bio,
        experience: formData.experience,
        education: formData.education,
        certifications: formData.certifications,
        specialties: formData.specialties,
        hourlyRate: formData.hourlyRate,
        timezone: formData.timezone,
        languages: formData.languages,
        ...(formData.videoIntroUrl && { videoIntroUrl: formData.videoIntroUrl }),
        responseTime: formData.responseTime,
      }

      const response = await apiClient.post("/auth/register/teacher", requestData)

      if (response.success) {
        // Registration successful
        router.push("/login?message=registration-success&type=teacher")
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-3xl font-bold text-green-400 hover:text-green-300 transition-colors">
            antoree
          </Link>
          <LanguageToggle />
        </div>

        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl text-white mb-2">
              Teacher Registration
            </CardTitle>
            <CardDescription className="text-gray-400">
              Join our community of expert English teachers and share your knowledge
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Global Error Display */}
            {error && (
              <Alert className="bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-400" />
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
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                      validationErrors.phone ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {validationErrors.phone && (
                    <p className="text-red-400 text-sm">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-400" />
                  Account Security
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                  Professional Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Bio *</label>
                    <Textarea
                      placeholder="Tell students about yourself, your teaching experience, methodology, and what makes you a great teacher..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none ${
                        validationErrors.bio ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.bio && (
                      <p className="text-red-400 text-sm">{validationErrors.bio}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      {formData.bio.length}/1000 characters (minimum 50)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 font-medium">Years of Experience *</label>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", parseInt(e.target.value) || 0)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                          validationErrors.experience ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      {validationErrors.experience && (
                        <p className="text-red-400 text-sm">{validationErrors.experience}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 font-medium">Hourly Rate (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="25.00"
                          min="5"
                          max="200"
                          step="0.01"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", parseFloat(e.target.value) || 0)}
                          className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 ${
                            validationErrors.hourlyRate ? "border-red-500" : ""
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.hourlyRate && (
                        <p className="text-red-400 text-sm">{validationErrors.hourlyRate}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Education *</label>
                    <Textarea
                      placeholder="Describe your educational background, degrees, and relevant qualifications..."
                      value={formData.education}
                      onChange={(e) => handleInputChange("education", e.target.value)}
                      rows={3}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none ${
                        validationErrors.education ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.education && (
                      <p className="text-red-400 text-sm">{validationErrors.education}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Teaching Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-green-400" />
                  Teaching Details
                </h3>
                
                <div className="space-y-4">
                  {/* Certifications */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Certifications *</label>
                    <div className="flex gap-2">
                      <Select
                        value=""
                        onValueChange={(value) => {
                          addToArray("certifications", value)
                        }}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Add certification" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonCertifications.map((cert) => (
                            <SelectItem key={cert} value={cert} disabled={formData.certifications.includes(cert)}>
                              {cert}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Or type custom certification"
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (newCertification.trim()) {
                              addToArray("certifications", newCertification.trim())
                              setNewCertification("")
                            }
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary" className="bg-green-600 text-white">
                          {cert}
                          <button
                            type="button"
                            onClick={() => removeFromArray("certifications", cert)}
                            className="ml-2 hover:text-red-300"
                            disabled={isLoading}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {validationErrors.certifications && (
                      <p className="text-red-400 text-sm">{validationErrors.certifications}</p>
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Teaching Specialties *</label>
                    <div className="flex gap-2">
                      <Select
                        value=""
                        onValueChange={(value) => {
                          addToArray("specialties", value)
                        }}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Add specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonSpecialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty} disabled={formData.specialties.includes(specialty)}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Or type custom specialty"
                          value={newSpecialty}
                          onChange={(e) => setNewSpecialty(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (newSpecialty.trim()) {
                              addToArray("specialties", newSpecialty.trim())
                              setNewSpecialty("")
                            }
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-blue-600 text-white">
                          {specialty}
                          <button
                            type="button"
                            onClick={() => removeFromArray("specialties", specialty)}
                            className="ml-2 hover:text-red-300"
                            disabled={isLoading}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {validationErrors.specialties && (
                      <p className="text-red-400 text-sm">{validationErrors.specialties}</p>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 font-medium">Languages Spoken *</label>
                    <div className="flex gap-2">
                      <Select
                        value=""
                        onValueChange={(value) => {
                          addToArray("languages", value)
                        }}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Add language" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonLanguages.map((language) => (
                            <SelectItem key={language} value={language} disabled={formData.languages.includes(language)}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Or type custom language"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (newLanguage.trim()) {
                              addToArray("languages", newLanguage.trim())
                              setNewLanguage("")
                            }
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-purple-600 text-white">
                          {language}
                          {language !== "English" && (
                            <button
                              type="button"
                              onClick={() => removeFromArray("languages", language)}
                              className="ml-2 hover:text-red-300"
                              disabled={isLoading}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {validationErrors.languages && (
                      <p className="text-red-400 text-sm">{validationErrors.languages}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Availability & Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-400" />
                  Availability & Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="text-sm text-gray-300 font-medium">Response Time (minutes) *</label>
                    <Input
                      type="number"
                      placeholder="120"
                      min="30"
                      max="1440"
                      value={formData.responseTime}
                      onChange={(e) => handleInputChange("responseTime", parseInt(e.target.value) || 120)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                        validationErrors.responseTime ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.responseTime && (
                      <p className="text-red-400 text-sm">{validationErrors.responseTime}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Video Introduction URL (Optional)</label>
                  <div className="relative">
                    <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=your-intro-video"
                      value={formData.videoIntroUrl}
                      onChange={(e) => handleInputChange("videoIntroUrl", e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 ${
                        validationErrors.videoIntroUrl ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.videoIntroUrl && (
                    <p className="text-red-400 text-sm">{validationErrors.videoIntroUrl}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    A short video introduction helps students get to know you better
                  </p>
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
                    <Link href="/terms" className="text-green-400 hover:text-green-300">
                      Terms of Service
                    </Link>,{" "}
                    <Link href="/privacy" className="text-green-400 hover:text-green-300">
                      Privacy Policy
                    </Link>, and{" "}
                    <Link href="/teacher-agreement" className="text-green-400 hover:text-green-300">
                      Teacher Agreement
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
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Teacher Account...</span>
                  </div>
                ) : (
                  "Create Teacher Account"
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="text-center space-y-3 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-green-400 hover:text-green-300 font-medium">
                  Sign in here
                </Link>
              </div>
              <div className="text-sm text-gray-400">
                Want to learn instead?{" "}
                <Link href="/register/student" className="text-green-400 hover:text-green-300 font-medium">
                  Register as a Student
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                All teacher profiles are reviewed before activation
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
