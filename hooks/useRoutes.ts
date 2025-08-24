"use client"

import { useState, useCallback } from "react"
import { routeHandler, type RouteHandler } from "../lib/routeHandler"
import type { RequestOptions } from "../lib/routes"

export interface UseRouteState<T = any> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useRoutes() {
  const [states, setStates] = useState<Record<string, UseRouteState>>({})

  const updateState = useCallback((key: string, update: Partial<UseRouteState>) => {
    setStates((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...update },
    }))
  }, [])

  const executeRoute = useCallback(
    async <T = any, R = any>(
      category: keyof RouteHandler,
      action: string,
      data?: T,
      options?: RequestOptions,
    ): Promise<R | null> => {
      const key = `${String(category)}_${action}`

      updateState(key, { loading: true, error: null })

      try {
        const handler = routeHandler[category] as Function
        if (!handler) {
          throw new Error(`Route category ${String(category)} not found`)
        }

        const result = await handler(action, data, options)
        updateState(key, { data: result, loading: false })
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        updateState(key, { error: errorMessage, loading: false })
        return null
      }
    },
    [updateState],
  )

  // Convenience methods
  const auth = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("auth", action, data, options)
    },
    [executeRoute],
  )

  const teachers = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("teachers", action, data, options)
    },
    [executeRoute],
  )

  const students = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("students", action, data, options)
    },
    [executeRoute],
  )

  const bookings = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("bookings", action, data, options)
    },
    [executeRoute],
  )

  const schedule = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("schedule", action, data, options)
    },
    [executeRoute],
  )

  const reviews = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("reviews", action, data, options)
    },
    [executeRoute],
  )

  const contact = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("contact", action, data, options)
    },
    [executeRoute],
  )

  const payments = useCallback(
    <T = any, R = any>(action: string, data?: T, options?: RequestOptions) => {
      return executeRoute<T, R>("payments", action, data, options)
    },
    [executeRoute],
  )

  const getState = useCallback(
    (category: string, action: string): UseRouteState => {
      const key = `${category}_${action}`
      return states[key] || { data: null, loading: false, error: null }
    },
    [states],
  )

  return {
    // Route executors
    auth,
    teachers,
    students,
    bookings,
    schedule,
    reviews,
    contact,
    payments,

    // State management
    getState,
    states,

    // Direct route execution
    executeRoute,
  }
}
