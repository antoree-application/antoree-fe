import { apiClient } from "./api"

// Helper to set up API client with current language
export function setupApiClient() {
  // This would typically be called in a provider or layout
  const language = localStorage.getItem("language") || "vi"
  apiClient.setLanguage(language)

  // Set auth token if available
  const token = localStorage.getItem("authToken")
  if (token) {
    apiClient.setAuthToken(token)
  }
}

// Helper for handling authentication
export const authHelpers = {
  setToken: (token: string) => {
    localStorage.setItem("authToken", token)
    apiClient.setAuthToken(token)
  },

  removeToken: () => {
    localStorage.removeItem("authToken")
    apiClient.removeAuthToken()
  },

  getToken: () => {
    return localStorage.getItem("authToken")
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },
}

// Helper for error handling
export function handleApiError(error: any) {
  console.error("[v0] API Error Handler:", error)

  // You can add toast notifications here
  if (error.statusCode === 401) {
    // Handle unauthorized - redirect to login
    authHelpers.removeToken()
    window.location.href = "/login"
  } else if (error.statusCode === 403) {
    // Handle forbidden
    console.error("Access forbidden")
  } else if (error.statusCode >= 500) {
    // Handle server errors
    console.error("Server error occurred")
  }

  return error.message || "An error occurred"
}

// Helper for query string building
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}
