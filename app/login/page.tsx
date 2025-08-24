"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { login, isLoading, error, clearError } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  // Clear errors when changing form data
  useEffect(() => {
    clearError()
    setValidationErrors({})
  }, [clearError])

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const validateLoginForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!loginData.email) {
      errors.email = "Email is required"
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!loginData.password) {
      errors.password = "Password is required"
    } else if (!validatePassword(loginData.password)) {
      errors.password = "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateLoginForm()) {
      return
    }

    const success = await login(loginData)
    if (success) {
      // Redirect based on user type - this will be handled by the auth response
      router.push("/dashboard")
    }
  }

  const handleLoginInputChange = (field: keyof typeof loginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }))
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
            <CardTitle className="text-3xl text-white mb-2">
              {t("auth.login.title")}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {t("auth.login.subtitle")}
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

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder={t("auth.email")}
                    value={loginData.email}
                    onChange={(e) => handleLoginInputChange("email", e.target.value)}
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
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.password")}
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange("password", e.target.value)}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-gray-600" />
                  <label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-green-400 hover:text-green-300">
                  {t("auth.forgotPassword")}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{t("auth.login.loading")}</span>
                  </div>
                ) : (
                  t("auth.login.button")
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="text-center space-y-2 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                {t("auth.noAccount")}{" "}
                <Link href="/register" className="text-green-400 hover:text-green-300 font-medium">
                  {t("auth.register.link")}
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                Protected by industry-standard encryption
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials (for testing) */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Demo Credentials:</h3>
          <div className="text-xs text-gray-400 space-y-1">
            <div>Email: john.doe@gmail.com</div>
            <div>Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  )
}
