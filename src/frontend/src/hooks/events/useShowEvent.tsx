import { useEffect, useState } from 'react'
import { getEventById } from '../../api/Events/events'

type UseShowEventParams = {
    id: string
}

type Event =  {
  id: number
  name: string
  sport: string
  date_time: string
}

export function useShowEvent(params: UseShowEventParams) {
  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    let loadingTimer: ReturnType<typeof setTimeout>

    async function fetchEventById() {
      try {
        setError(null)

        loadingTimer = setTimeout(() => {
          if (!cancelled) setShowLoading(true)
        }, 300)

        const result = await getEventById(params)

        if (!cancelled) {
          setEvent(result)
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

    if (!Number.isNaN(parseInt(params.id)))
    {
      fetchEventById()
    }
    else
    {
      setError(new Error('Invalid param'))
    }

    return () => {
      cancelled = true
      clearTimeout(loadingTimer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return { event, loading: showLoading, error }
}
