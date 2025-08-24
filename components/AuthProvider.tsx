"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { User, AuthTokens } from "@/types/api"

interface AuthContextType {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  refreshToken: () => Promise<boolean>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
