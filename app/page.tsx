"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to /home
    router.replace('/home')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  )
}
