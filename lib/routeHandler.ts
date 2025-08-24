import { ApiClient } from "./api"
import { ROUTES, type RouteConfig, type RequestOptions, buildUrl, buildQueryString } from "./routes"

export interface MiddlewareContext {
  route: RouteConfig
  data?: any
  options?: RequestOptions
  headers: Record<string, string>
}

export type Middleware = (context: MiddlewareContext) => Promise<MiddlewareContext> | MiddlewareContext

export class RouteHandler {
  private apiClient: ApiClient
  private middlewares: Map<string, Middleware> = new Map()

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
    this.setupDefaultMiddlewares()
  }

  // Register middleware
  registerMiddleware(name: string, middleware: Middleware): void {
    this.middlewares.set(name, middleware)
  }

  // Setup default middlewares
  private setupDefaultMiddlewares(): void {
    // Authentication middleware
    this.registerMiddleware("auth", async (context) => {
      if (context.route.requiresAuth) {
        const token = this.apiClient.getAuthToken()
        if (!token) {
          throw new Error("Authentication required")
        }
        context.headers.Authorization = `Bearer ${token}`
      }
      return context
    })

    // Rate limiting middleware (client-side tracking)
    this.registerMiddleware("rateLimit", (context) => {
      if (context.route.rateLimit) {
        const key = `rate_limit_${context.route.path}`
        const now = Date.now()
        const windowMs = context.route.rateLimit.windowMs
        const maxRequests = context.route.rateLimit.requests

        const requests = JSON.parse(localStorage.getItem(key) || "[]")
        const validRequests = requests.filter((timestamp: number) => now - timestamp < windowMs)

        if (validRequests.length >= maxRequests) {
          throw new Error("Rate limit exceeded")
        }

        validRequests.push(now)
        localStorage.setItem(key, JSON.stringify(validRequests))
      }
      return context
    })

    // Logging middleware
    this.registerMiddleware("logging", (context) => {
      console.log(`[RouteHandler] ${context.route.method} ${context.route.path}`, {
        data: context.data,
        options: context.options,
      })
      return context
    })
  }

  // Execute route with middleware chain
  async executeRoute<T = any, R = any>(route: RouteConfig, data?: T, options?: RequestOptions): Promise<R> {
    // Initialize context
    let context: MiddlewareContext = {
      route,
      data,
      options,
      headers: { ...options?.headers } || {},
    }

    // Apply middlewares
    const middlewareNames = route.middleware || ["auth", "rateLimit", "logging"]
    for (const middlewareName of middlewareNames) {
      const middleware = this.middlewares.get(middlewareName)
      if (middleware) {
        context = await middleware(context)
      }
    }

    // Build final URL
    const url = buildUrl(context.route.path, context.options?.params)
    const queryString = buildQueryString(context.options?.query)
    const fullUrl = `${url}${queryString}`

    // Execute API call
    switch (context.route.method) {
      case "GET":
        return this.apiClient.get<R>(fullUrl, { headers: context.headers })
      case "POST":
        return this.apiClient.post<R>(fullUrl, context.data, { headers: context.headers })
      case "PUT":
        return this.apiClient.put<R>(fullUrl, context.data, { headers: context.headers })
      case "DELETE":
        return this.apiClient.delete<R>(fullUrl, { headers: context.headers })
      case "PATCH":
        return this.apiClient.patch<R>(fullUrl, context.data, { headers: context.headers })
      default:
        throw new Error(`Unsupported HTTP method: ${context.route.method}`)
    }
  }

  // Convenience methods for common routes
  async auth<T = any, R = any>(action: keyof typeof ROUTES.AUTH, data?: T, options?: RequestOptions): Promise<R> {
    const route = ROUTES.AUTH[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async teachers<T = any, R = any>(
    action: keyof typeof ROUTES.TEACHERS,
    data?: T,
    options?: RequestOptions,
  ): Promise<R> {
    const route = ROUTES.TEACHERS[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async students<T = any, R = any>(
    action: keyof typeof ROUTES.STUDENTS,
    data?: T,
    options?: RequestOptions,
  ): Promise<R> {
    const route = ROUTES.STUDENTS[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async bookings<T = any, R = any>(
    action: keyof typeof ROUTES.BOOKINGS,
    data?: T,
    options?: RequestOptions,
  ): Promise<R> {
    const route = ROUTES.BOOKINGS[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async schedule<T = any, R = any>(
    action: keyof typeof ROUTES.SCHEDULE,
    data?: T,
    options?: RequestOptions,
  ): Promise<R> {
    const route = ROUTES.SCHEDULE[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async reviews<T = any, R = any>(action: keyof typeof ROUTES.REVIEWS, data?: T, options?: RequestOptions): Promise<R> {
    const route = ROUTES.REVIEWS[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async contact<T = any, R = any>(action: keyof typeof ROUTES.CONTACT, data?: T, options?: RequestOptions): Promise<R> {
    const route = ROUTES.CONTACT[action]
    return this.executeRoute<T, R>(route, data, options)
  }

  async payments<T = any, R = any>(
    action: keyof typeof ROUTES.PAYMENTS,
    data?: T,
    options?: RequestOptions,
  ): Promise<R> {
    const route = ROUTES.PAYMENTS[action]
    return this.executeRoute<T, R>(route, data, options)
  }
}

// Create singleton instance
let routeHandlerInstance: RouteHandler | null = null

export function getRouteHandler(): RouteHandler {
  if (!routeHandlerInstance) {
    const apiClient = new ApiClient()
    routeHandlerInstance = new RouteHandler(apiClient)
  }
  return routeHandlerInstance
}

// Export convenience function
export const routeHandler = getRouteHandler()
