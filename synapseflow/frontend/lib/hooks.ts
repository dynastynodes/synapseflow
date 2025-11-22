import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, type ResearchQuery, type ResearchResult, type Paper, SSEClient } from './api-client'
import { useEffect, useState, useCallback } from 'react'

/**
 * Hook for performing research queries
 */
export function useResearch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (query: ResearchQuery) => api.research(query),
    onSuccess: () => {
      // Invalidate and refetch stats after successful research
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    },
  })
}

/**
 * Hook for vector similarity search
 */
export function useSearch(query: string, limit: number = 10, enabled: boolean = true) {
  return useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => api.search(query, limit),
    enabled: enabled && query.length > 0,
  })
}

/**
 * Hook for getting system statistics
 */
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getStats(),
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

/**
 * Hook for health check
 */
export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.health(),
    refetchInterval: 60000, // Refetch every minute
  })
}

/**
 * Hook for generating embeddings
 */
export function useEmbeddings() {
  return useMutation({
    mutationFn: ({ text, model }: { text: string; model?: string }) =>
      api.getEmbeddings(text, model),
  })
}

/**
 * Hook for SSE real-time streaming
 */
export function useSSEStream() {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [sseClient] = useState(() => new SSEClient())

  const connect = useCallback(() => {
    sseClient.connect(
      (data) => {
        setMessages((prev) => [...prev, data])
        setIsConnected(true)
      },
      (err) => {
        setError(new Error('SSE connection failed'))
        setIsConnected(false)
      }
    )
  }, [sseClient])

  const disconnect = useCallback(() => {
    sseClient.disconnect()
    setIsConnected(false)
  }, [sseClient])

  const sendQuery = useCallback(
    async (query: ResearchQuery) => {
      await sseClient.sendQuery(query)
    },
    [sseClient]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sseClient.disconnect()
    }
  }, [sseClient])

  return {
    isConnected,
    messages,
    error,
    connect,
    disconnect,
    sendQuery,
    clearMessages,
  }
}

/**
 * Hook for local state management using Zustand (if needed)
 */
import { create } from 'zustand'

interface ResearchStore {
  currentQuery: ResearchQuery | null
  results: ResearchResult | null
  isLoading: boolean
  error: Error | null
  setQuery: (query: ResearchQuery) => void
  setResults: (results: ResearchResult) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  reset: () => void
}

export const useResearchStore = create<ResearchStore>((set) => ({
  currentQuery: null,
  results: null,
  isLoading: false,
  error: null,
  setQuery: (query) => set({ currentQuery: query }),
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ currentQuery: null, results: null, isLoading: false, error: null }),
}))

/**
 * Hook for dark mode toggle
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled on mount
    const darkModeEnabled = document.documentElement.classList.contains('dark')
    setIsDark(darkModeEnabled)
  }, [])

  const toggle = useCallback(() => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      setIsDark(false)
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      setIsDark(true)
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  return { isDark, toggle }
}

/**
 * Utility hook for debouncing values (useful for search)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
