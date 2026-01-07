import { useEffect, useState } from 'react'
import { getEvents } from '../../api/Events/events'

type UseEventsParams = {
  name?: string
  sport?: string
}

export function useEvents(params: UseEventsParams) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    let loadingTimer: ReturnType<typeof setTimeout>

    async function fetchEvents() {
      try {
        setLoading(true)
        setError(null)

        loadingTimer = setTimeout(() => {
          if (!cancelled) setShowLoading(true)
        }, 300)

        const result = await getEvents(params)

        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
          setShowLoading(false)
          clearTimeout(loadingTimer)
        }
      }
    }

    fetchEvents()

    return () => {
      cancelled = true
      clearTimeout(loadingTimer)
    }
  }, [params.name, params.sport])

  return { data, loading: showLoading, error }
}
