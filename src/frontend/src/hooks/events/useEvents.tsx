import { useEffect, useState } from 'react'
import { getEvents } from '../../api/Events/events'

type UseEventsParams = {
  name?: string
  sport?: string
}

type Event =  {
  id: number,
  name: string,
  sport: string
}

export function useEvents(params: UseEventsParams) {
  const [data, setData] = useState<Event[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    let loadingTimer: ReturnType<typeof setTimeout>

    async function fetchEvents() {
      try {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name, params.sport])

  return { data, loading: showLoading, error }
}
