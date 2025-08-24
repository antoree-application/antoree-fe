"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, GraduationCap, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function RegisterPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            antoree
          </Link>
          <LanguageToggle />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Join the Antoree Community
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Whether you want to learn English or share your expertise as a teacher, 
            we have the perfect registration path for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Student Registration */}
          <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-full group-hover:bg-blue-500 transition-colors">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                I'm a Student
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Ready to start your English learning journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What you'll get:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Access to qualified English teachers worldwide
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Personalized learning plans based on your goals
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Flexible scheduling in your timezone
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Progress tracking and achievement badges
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Community features and study groups
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => router.push("/register/student")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg group-hover:bg-blue-500 transition-colors"
              >
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Takes 3-5 minutes to complete
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Teacher Registration */}
          <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-600 p-4 rounded-full group-hover:bg-green-500 transition-colors">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                I'm a Teacher
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Share your expertise and earn teaching online
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What you'll get:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Reach students from around the world
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Set your own schedule and hourly rates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Professional development resources
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    24/7 platform support and community
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => router.push("/register/teacher")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg group-hover:bg-green-500 transition-colors"
              >
                Start Teaching Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Takes 8-12 minutes to complete
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="text-center mt-12 space-y-4">
          <div className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in here
            </Link>
          </div>
          <div className="text-xs text-gray-500">
            Your data is protected with industry-standard encryption
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <User className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Trusted Community</h3>
            <p className="text-gray-400 text-sm">
              Join thousands of students and teachers in our verified, safe learning environment
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quality Education</h3>
            <p className="text-gray-400 text-sm">
              All teachers are verified and experienced professionals dedicated to your success
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <ArrowRight className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Fast & Easy</h3>
            <p className="text-gray-400 text-sm">
              Get started in minutes with our streamlined registration process
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
