"use client"

import { useState, useEffect, useCallback } from "react"
import type { ApiResponse, ApiError } from "@/types/api"
import { ApiException } from "@/lib/api"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
}

// Generic hook for API calls
export function useApi<T = any>(apiCall: () => Promise<ApiResponse<T>>, options: UseApiOptions = {}) {
  const { immediate = false, onSuccess, onError } = options

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiCall()
      setState({
        data: response.data || null,
        loading: false,
        error: null,
      })

      if (onSuccess && response.data) {
        onSuccess(response.data)
      }

      return response
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof ApiException ? error.message : "An error occurred",
        statusCode: error instanceof ApiException ? error.statusCode : 0,
        details: error instanceof ApiException ? error.details : undefined,
      }

      setState({
        data: null,
        loading: false,
        error: apiError,
      })

      if (onError) {
        onError(apiError)
      }

      throw error
    }
  }, [apiCall, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  return {
    ...state,
    execute,
    refetch: execute,
  }
}

// Hook for mutations (POST, PUT, DELETE)
export function useMutation<T = any, P = any>(
  mutationFn: (params: P) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {},
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (params: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await mutationFn(params)
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        })

        if (options.onSuccess && response.data) {
          options.onSuccess(response.data)
        }

        return response
      } catch (error) {
        const apiError: ApiError = {
          message: error instanceof ApiException ? error.message : "An error occurred",
          statusCode: error instanceof ApiException ? error.statusCode : 0,
          details: error instanceof ApiException ? error.details : undefined,
        }

        setState({
          data: null,
          loading: false,
          error: apiError,
        })

        if (options.onError) {
          options.onError(apiError)
        }

        throw error
      }
    },
    [mutationFn, options],
  )

  return {
    ...state,
    mutate,
  }
}
