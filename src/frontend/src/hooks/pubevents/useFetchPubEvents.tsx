import { useEffect, useState } from 'react'
import { getPubEvents } from '../../api/PubEvent/pubevent'

type UseFetchPubEventsParams = {
  event_id?: number
  pub_id?: number
}

type Event =  {
  id: number
  name: string
  sport: string
  date_time: string
}

type Pub = {
    id: number
    name: string
    latitude: number
    longitude: number
}

type PubEvent = {
    id: number
    pub: Pub
    event: Event
}

export function useFetchPubEvents(params: UseFetchPubEventsParams) {
  const [data, setData] = useState<PubEvent[]>([])
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

        const result = await getPubEvents(params)

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
  }, [params.event_id, params.pub_id,])

  return { data, loading: showLoading, error }
}
