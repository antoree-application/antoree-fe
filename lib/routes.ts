export interface RouteConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  requiresAuth?: boolean
  middleware?: string[]
  rateLimit?: {
    requests: number
    windowMs: number
  }
}

export interface RouteHandler<T = any, R = any> {
  config: RouteConfig
  handler: (data?: T, options?: RequestOptions) => Promise<R>
}

export interface RequestOptions {
  headers?: Record<string, string>
  params?: Record<string, string | number>
  query?: Record<string, string | number>
}

// Route definitions organized by feature
export const ROUTES = {
  // Authentication routes
  AUTH: {
    LOGIN: {
      method: "POST" as const,
      path: "/auth/login",
      requiresAuth: false,
    },
    REGISTER: {
      method: "POST" as const,
      path: "/auth/register",
      requiresAuth: false,
    },
    REFRESH: {
      method: "POST" as const,
      path: "/auth/refresh",
      requiresAuth: false,
    },
    LOGOUT: {
      method: "POST" as const,
      path: "/auth/logout",
      requiresAuth: true,
    },
    PROFILE: {
      method: "GET" as const,
      path: "/auth/profile",
      requiresAuth: true,
    },
  },

  // Teacher routes
  TEACHERS: {
    LIST: {
      method: "GET" as const,
      path: "/teachers",
      requiresAuth: false,
    },
    GET_BY_ID: {
      method: "GET" as const,
      path: "/teachers/:id",
      requiresAuth: false,
    },
    UPDATE_PROFILE: {
      method: "PUT" as const,
      path: "/teachers/profile",
      requiresAuth: true,
    },
    GET_AVAILABILITY: {
      method: "GET" as const,
      path: "/teachers/:id/availability",
      requiresAuth: false,
    },
    UPDATE_AVAILABILITY: {
      method: "PUT" as const,
      path: "/teachers/availability",
      requiresAuth: true,
    },
  },

  // Student routes
  STUDENTS: {
    LIST: {
      method: "GET" as const,
      path: "/students",
      requiresAuth: true,
    },
    GET_BY_ID: {
      method: "GET" as const,
      path: "/students/:id",
      requiresAuth: true,
    },
    UPDATE_PROFILE: {
      method: "PUT" as const,
      path: "/students/profile",
      requiresAuth: true,
    },
  },

  // Booking routes
  BOOKINGS: {
    LIST: {
      method: "GET" as const,
      path: "/bookings",
      requiresAuth: true,
    },
    CREATE: {
      method: "POST" as const,
      path: "/bookings",
      requiresAuth: true,
    },
    GET_BY_ID: {
      method: "GET" as const,
      path: "/bookings/:id",
      requiresAuth: true,
    },
    UPDATE: {
      method: "PUT" as const,
      path: "/bookings/:id",
      requiresAuth: true,
    },
    CANCEL: {
      method: "DELETE" as const,
      path: "/bookings/:id",
      requiresAuth: true,
    },
    CONFIRM: {
      method: "POST" as const,
      path: "/bookings/:id/confirm",
      requiresAuth: true,
    },
  },

  // Schedule routes
  SCHEDULE: {
    GET_TEACHER_SCHEDULE: {
      method: "GET" as const,
      path: "/schedule/teacher",
      requiresAuth: true,
    },
    GET_STUDENT_SCHEDULE: {
      method: "GET" as const,
      path: "/schedule/student",
      requiresAuth: true,
    },
    CREATE_SLOT: {
      method: "POST" as const,
      path: "/schedule/slots",
      requiresAuth: true,
    },
    UPDATE_SLOT: {
      method: "PUT" as const,
      path: "/schedule/slots/:id",
      requiresAuth: true,
    },
  },

  // Review routes
  REVIEWS: {
    LIST: {
      method: "GET" as const,
      path: "/reviews",
      requiresAuth: false,
    },
    CREATE: {
      method: "POST" as const,
      path: "/reviews",
      requiresAuth: true,
    },
    GET_BY_ID: {
      method: "GET" as const,
      path: "/reviews/:id",
      requiresAuth: false,
    },
    UPDATE: {
      method: "PUT" as const,
      path: "/reviews/:id",
      requiresAuth: true,
    },
    DELETE: {
      method: "DELETE" as const,
      path: "/reviews/:id",
      requiresAuth: true,
    },
  },

  // Contact routes
  CONTACT: {
    SUBMIT: {
      method: "POST" as const,
      path: "/contact",
      requiresAuth: false,
    },
  },

  // Payment routes
  PAYMENTS: {
    CREATE_INTENT: {
      method: "POST" as const,
      path: "/payments/create-intent",
      requiresAuth: true,
    },
    CONFIRM: {
      method: "POST" as const,
      path: "/payments/confirm",
      requiresAuth: true,
    },
    GET_HISTORY: {
      method: "GET" as const,
      path: "/payments/history",
      requiresAuth: true,
    },
  },
} as const

// Helper function to build URL with parameters
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value))
    })
  }

  return url
}

// Helper function to build query string
export function buildQueryString(query?: Record<string, string | number>): string {
  if (!query || Object.keys(query).length === 0) {
    return ""
  }

  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    params.append(key, String(value))
  })

  return `?${params.toString()}`
}

// Route validation helper
export function validateRoute(route: RouteConfig): boolean {
  return !!(route.method && route.path)
}

// Get all routes as flat array
export function getAllRoutes(): RouteConfig[] {
  const routes: RouteConfig[] = []

  function extractRoutes(obj: any) {
    Object.values(obj).forEach((value: any) => {
      if (value.method && value.path) {
        routes.push(value as RouteConfig)
      } else if (typeof value === "object") {
        extractRoutes(value)
      }
    })
  }

  extractRoutes(ROUTES)
  return routes
}
