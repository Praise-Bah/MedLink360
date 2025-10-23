import { useState, useEffect } from "react"

interface UseApiOptions {
  immediate?: boolean
}

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: () => Promise<void>
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFunction()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.immediate])

  return { data, loading, error, execute }
}
