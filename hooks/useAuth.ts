"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api"
import type { User, AuthTokens, LoginRequest, RegisterRequest, LoginResponse, ApiResponse } from "@/types/api"

interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<boolean>
  register: (userData: RegisterRequest) => Promise<boolean>
  logout: () => void
  refreshToken: () => Promise<boolean>
  clearError: () => void
  loading?: boolean // Add for backward compatibility
}

const TOKEN_STORAGE_KEY = "antoree_tokens"
const USER_STORAGE_KEY = "antoree_user"

export function useAuth(): AuthState & AuthActions {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Add loading getter for backward compatibility
  const loading = state.isLoading

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY)
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)

        if (storedTokens && storedUser) {
          const tokens: AuthTokens = JSON.parse(storedTokens)
          const user: User = JSON.parse(storedUser)

          // Set auth headers and update state
          apiClient.setAuthToken(tokens.accessToken)
          setState((prev) => ({
            ...prev,
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
          }))
        } else {
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error("[Auth] Initialization error:", error)
        clearAuthData()
      }
    }

    initializeAuth()
  }, [])

  const storeAuthData = (user: User, tokens: AuthTokens) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
    apiClient.setAuthToken(tokens.accessToken)
  }

  const clearAuthData = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    apiClient.clearAuthToken()
    setState((prev) => ({
      ...prev,
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
    }))
  }

  const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", credentials)

      if (response.success && response.data) {
        const { data } = response.data
        const { user, accessToken } = data
        
        const tokens: AuthTokens = { accessToken }
        
        storeAuthData(user, tokens)
        setState((prev) => ({
          ...prev,
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }))
        return true
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Login failed",
        }))
        return false
      }
    } catch (error: any) {
      const errorMessage = error?.details?.message || error.message || "Login failed"
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      return false
    }
  }, [])

  const register = useCallback(async (userData: RegisterRequest): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await apiClient.post<LoginResponse>("/auth/register", userData)

      if (response.success && response.data) {
        const { data } = response.data
        const { user, accessToken } = data
        
        const tokens: AuthTokens = { accessToken }
        
        storeAuthData(user, tokens)
        setState((prev) => ({
          ...prev,
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }))
        return true
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Registration failed",
        }))
        return false
      }
    } catch (error: any) {
      const errorMessage = error?.details?.message || error.message || "Registration failed"
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      return false
    }
  }, [])

  const logout = useCallback(() => {
    clearAuthData()
  }, [])

  const refreshToken = useCallback(async (): Promise<boolean> => {
    if (!state.tokens?.refreshToken) {
      return false
    }

    setState((prev) => ({ ...prev, isLoading: true }))
    
    try {
      const response = await apiClient.post<LoginResponse>("/auth/refresh", {
        refreshToken: state.tokens.refreshToken,
      })

      if (response.success && response.data) {
        const { data } = response.data
        const { user, accessToken } = data
        
        const tokens: AuthTokens = { accessToken }
        
        storeAuthData(user, tokens)
        setState((prev) => ({
          ...prev,
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }))
        return true
      }
      return false
    } catch (error) {
      console.error("[Auth] Token refresh failed:", error)
      clearAuthData()
      return false
    }
  }, [state.tokens?.refreshToken])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    loading, // Add loading for backward compatibility
    login,
    register,
    logout,
    refreshToken,
    clearError,
  }
}
