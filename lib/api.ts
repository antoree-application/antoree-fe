import type { ApiResponse } from "@/types/api"

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : "http://localhost:3002/api")
const API_TIMEOUT = 30000 // 30 seconds

// Custom error class for API errors
export class ApiException extends Error {
  statusCode: number
  details?: any

  constructor(message: string, statusCode: number, details?: any) {
    super(message)
    this.name = "ApiException"
    this.statusCode = statusCode
    this.details = details
  }
}

// Request configuration interface
interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  timeout?: number
  cache?: RequestCache
}

// Main API client class
export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`
  }

  // Remove authentication token
  removeAuthToken() {
    delete this.defaultHeaders["Authorization"]
  }

  // Clear authentication token (alias for removeAuthToken)
  clearAuthToken() {
    this.removeAuthToken()
  }

  // Set language header
  setLanguage(language: string) {
    this.defaultHeaders["Accept-Language"] = language
  }

  // Main request method
  async request<T = any>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = "GET", headers = {}, body, timeout = API_TIMEOUT, cache = "default" } = config

    const url = `${this.baseURL}${endpoint}`
    const requestHeaders = { ...this.defaultHeaders, ...headers }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const requestConfig: RequestInit = {
        method,
        headers: requestHeaders,
        signal: controller.signal,
        cache,
      }

      // Add body for non-GET requests
      if (body && method !== "GET") {
        requestConfig.body = JSON.stringify(body)
      }

      console.log(`[v0] API Request: ${method} ${url}`)

      const response = await fetch(url, requestConfig)

      clearTimeout(timeoutId)

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type")
      let responseData: any

      if (contentType?.includes("application/json")) {
        responseData = await response.json()
      } else {
        responseData = await response.text()
      }

      console.log(`[v0] API Response: ${response.status}`, responseData)

      // Handle HTTP errors
      if (!response.ok) {
        throw new ApiException(
          responseData?.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          responseData,
        )
      }

      // Return standardized response
      return {
        success: true,
        data: responseData,
        statusCode: response.status,
      }
    } catch (error) {
      clearTimeout(timeoutId)

      console.error("[v0] API Error:", error)

      if (error instanceof ApiException) {
        throw error
      }

      // Handle network errors
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiException("Request timeout", 408)
        }
        throw new ApiException(error.message, 0)
      }

      throw new ApiException("Unknown error occurred", 0)
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, config?: Omit<RequestConfig, "method">) {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  async post<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, "method" | "body">) {
    return this.request<T>(endpoint, { ...config, method: "POST", body })
  }

  async put<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, "method" | "body">) {
    return this.request<T>(endpoint, { ...config, method: "PUT", body })
  }

  async patch<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, "method" | "body">) {
    return this.request<T>(endpoint, { ...config, method: "PATCH", body })
  }

  async delete<T>(endpoint: string, config?: Omit<RequestConfig, "method">) {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }
}

// Create default API client instance
export const apiClient = new ApiClient()

// Utility functions for common API operations
export const api = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) => apiClient.post("/auth/login", credentials),
    register: (userData: { firstName: string; lastName: string; email: string; password: string; type?: string }) =>
      apiClient.post("/auth/register", userData),
    logout: () => apiClient.post("/auth/logout"),
    refreshToken: () => apiClient.post("/auth/refresh"),
    forgotPassword: (email: string) => apiClient.post("/auth/forgot-password", { email }),
    resetPassword: (token: string, password: string) => apiClient.post("/auth/reset-password", { token, password }),
  },

  // Teachers
  teachers: {
    search: (filters: {
      search?: string;
      minRating?: number;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
      specialties?: string;
      minExperience?: number;
      maxExperience?: number;
      timezone?: string;
      availableOnDay?: number;
      availableAtTime?: string;
      certifications?: string;
      minPrice?: number;
      maxPrice?: number;
      languages?: string;
      format?: string;
      level?: string;
    } = {}) => {
      const params = new URLSearchParams()
      
      // Add query parameters
      if (filters.search) params.append('search', filters.search)
      if (filters.minRating !== undefined) params.append('minRating', filters.minRating.toString())
      if (filters.page !== undefined) params.append('page', filters.page.toString())
      if (filters.limit !== undefined) params.append('limit', filters.limit.toString())
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
      if (filters.specialties) params.append('specialties', filters.specialties)
      if (filters.minExperience !== undefined) params.append('minExperience', filters.minExperience.toString())
      if (filters.maxExperience !== undefined) params.append('maxExperience', filters.maxExperience.toString())
      if (filters.timezone) params.append('timezone', filters.timezone)
      if (filters.availableOnDay !== undefined) params.append('availableOnDay', filters.availableOnDay.toString())
      if (filters.availableAtTime) params.append('availableAtTime', filters.availableAtTime)
      if (filters.certifications) params.append('certifications', filters.certifications)
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.languages) params.append('languages', filters.languages)
      if (filters.format) params.append('format', filters.format)
      if (filters.level) params.append('level', filters.level)
      
      const queryString = params.toString()
      const endpoint = `/teachers/search${queryString ? `?${queryString}` : ''}`
      
      return apiClient.get(endpoint)
    },
    getById: (id: string) => apiClient.get(`/teachers/${id}`),
    getAvailability: (id: string) => apiClient.get(`/teachers/${id}/availability`),
    getCourses: (id: string) => apiClient.get(`/teachers/${id}/courses`),
  },

  // Reviews
  reviews: {
    getAll: (page = 1, limit = 10) => apiClient.get(`/reviews?page=${page}&limit=${limit}`),
    getByTeacher: (teacherId: string) => apiClient.get(`/reviews/teacher/${teacherId}`),
    create: (reviewData: any) => apiClient.post("/reviews", reviewData),
  },

  // Contact
  contact: {
    submit: (formData: any) => apiClient.post("/contact", formData),
  },

  // Payment
  payment: {
    getMethods: () => apiClient.get("/payment/methods"),
    processPayment: (paymentData: any) => apiClient.post("/payment/process", paymentData),
    createCoursePayment: (paymentData: {
      courseId: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      preferredStartDate: string;
      specialRequests?: string;
      couponCode?: string;
      bankCode?: string;
      paymentMethod: "captureWallet" | "payWithATM" | "payWithCC";
    }) => apiClient.post("/payments/simple/course", paymentData),
  },

  // Bookings
  bookings: {
    createTrial: (bookingData: {
      teacherId: string;
      scheduledAt: string;
      duration: number;
      notes: string;
    }) => apiClient.post("/bookings/trial", bookingData),
    getAll: (page = 1, limit = 10) => apiClient.get(`/bookings?page=${page}&limit=${limit}`),
    getById: (id: string) => apiClient.get(`/bookings/${id}`),
    update: (id: string, data: any) => apiClient.put(`/bookings/${id}`, data),
    cancel: (id: string) => apiClient.delete(`/bookings/${id}`),
  },
}
