"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function ForgotPasswordPage() {
  const [activeTab, setActiveTab] = useState("forgot")
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  })
  const [resetPasswordData, setResetPasswordData] = useState({
    token: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const { isLoading, error, clearError } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  // Clear errors when switching tabs or changing form data
  useEffect(() => {
    clearError()
    setValidationErrors({})
    setSuccessMessage("")
  }, [activeTab, clearError])

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const validateForgotPasswordForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!forgotPasswordData.email) {
      errors.email = "Email is required"
    } else if (!validateEmail(forgotPasswordData.email)) {
      errors.email = "Please enter a valid email address"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateResetPasswordForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!resetPasswordData.token) {
      errors.token = "Reset token is required"
    }

    if (!resetPasswordData.newPassword) {
      errors.newPassword = "New password is required"
    } else if (!validatePassword(resetPasswordData.newPassword)) {
      errors.newPassword = "Password must be at least 6 characters"
    }

    if (!resetPasswordData.confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password"
    } else if (resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateChangePasswordForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!changePasswordData.currentPassword) {
      errors.currentPassword = "Current password is required"
    }

    if (!changePasswordData.newPassword) {
      errors.newPassword = "New password is required"
    } else if (!validatePassword(changePasswordData.newPassword)) {
      errors.newPassword = "Password must be at least 6 characters"
    }

    if (!changePasswordData.confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password"
    } else if (changePasswordData.newPassword !== changePasswordData.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForgotPasswordForm()) {
      return
    }

    try {
      // TODO: Implement forgot password API call
      console.log("Forgot password data:", forgotPasswordData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage("Password reset instructions have been sent to your email.")
      setActiveTab("reset")
    } catch (error) {
      console.error("Forgot password error:", error)
    }
  }

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateResetPasswordForm()) {
      return
    }

    try {
      // TODO: Implement reset password API call
      console.log("Reset password data:", resetPasswordData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage("Your password has been successfully reset. You can now login with your new password.")
      
      // Redirect to login after successful reset
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      console.error("Reset password error:", error)
    }
  }

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateChangePasswordForm()) {
      return
    }

    try {
      // TODO: Implement change password API call
      console.log("Change password data:", changePasswordData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage("Your password has been successfully changed.")
      
      // Clear form
      setChangePasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      })
    } catch (error) {
      console.error("Change password error:", error)
    }
  }

  const handleForgotPasswordInputChange = (field: keyof typeof forgotPasswordData, value: string) => {
    setForgotPasswordData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleResetPasswordInputChange = (field: keyof typeof resetPasswordData, value: string) => {
    setResetPasswordData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleChangePasswordInputChange = (field: keyof typeof changePasswordData, value: string) => {
    setChangePasswordData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-3xl font-bold text-green-400 hover:text-green-300 transition-colors">
            antoree
          </Link>
          <LanguageToggle />
        </div>

        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-2">
              <Link 
                href="/login" 
                className="absolute left-6 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <CardTitle className="text-3xl text-white">
                {activeTab === "forgot" ? "Forgot Password" : 
                 activeTab === "reset" ? "Reset Password" : 
                 "Change Password"}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              {activeTab === "forgot" ? "Enter your email to receive reset instructions" : 
               activeTab === "reset" ? "Enter your new password" : 
               "Update your account password"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                <TabsTrigger value="forgot" className="data-[state=active]:bg-green-600 text-xs">
                  Forgot
                </TabsTrigger>
                <TabsTrigger value="reset" className="data-[state=active]:bg-green-600 text-xs">
                  Reset
                </TabsTrigger>
                <TabsTrigger value="change" className="data-[state=active]:bg-green-600 text-xs">
                  Change
                </TabsTrigger>
              </TabsList>

              {/* Global Error Display */}
              {error && (
                <Alert className="bg-red-900/20 border-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {successMessage && (
                <Alert className="bg-green-900/20 border-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription className="text-green-400">{successMessage}</AlertDescription>
                </Alert>
              )}

              {/* Forgot Password Tab */}
              <TabsContent value="forgot" className="space-y-4">
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={forgotPasswordData.email}
                        onChange={(e) => handleForgotPasswordInputChange("email", e.target.value)}
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

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending Instructions...</span>
                      </div>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Reset Password Tab */}
              <TabsContent value="reset" className="space-y-4">
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Enter reset token from email"
                      value={resetPasswordData.token}
                      onChange={(e) => handleResetPasswordInputChange("token", e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                        validationErrors.token ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {validationErrors.token && (
                      <p className="text-red-400 text-sm">{validationErrors.token}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={resetPasswordData.newPassword}
                        onChange={(e) => handleResetPasswordInputChange("newPassword", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.newPassword ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.newPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.newPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={resetPasswordData.confirmNewPassword}
                        onChange={(e) => handleResetPasswordInputChange("confirmNewPassword", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.confirmNewPassword ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.confirmNewPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.confirmNewPassword}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Resetting Password...</span>
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Change Password Tab */}
              <TabsContent value="change" className="space-y-4">
                <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Current Password"
                        value={changePasswordData.currentPassword}
                        onChange={(e) => handleChangePasswordInputChange("currentPassword", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.currentPassword ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.currentPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.currentPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={changePasswordData.newPassword}
                        onChange={(e) => handleChangePasswordInputChange("newPassword", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.newPassword ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.newPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.newPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={changePasswordData.confirmNewPassword}
                        onChange={(e) => handleChangePasswordInputChange("confirmNewPassword", e.target.value)}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10 pr-10 ${
                          validationErrors.confirmNewPassword ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {validationErrors.confirmNewPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.confirmNewPassword}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Changing Password...</span>
                      </div>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Additional Links */}
            <div className="text-center space-y-2 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                Remember your password?{" "}
                <Link href="/login" className="text-green-400 hover:text-green-300 font-medium">
                  Back to Login
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                Protected by industry-standard encryption
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
