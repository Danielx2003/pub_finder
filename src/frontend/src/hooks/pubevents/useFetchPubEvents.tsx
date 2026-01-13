import { useEffect, useState, type RefObject } from 'react'
import { getPubEvents } from '../../api/PubEvent/pubevent'

type UseFetchPubEventsParams = {
  event_id?: number
  pub_id?: number
  latitude?: number
  longitude?: number
  distance?: number
  page?: number
  setPubEvents: React.Dispatch<React.SetStateAction<PubEvent[]>>
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

type Metadata = {
  current_page: string
  page_size: number
  total_count: number
  total_pages: number
}

type PubEventResponse = {
  data: PubEvent[]
  _metadata: Metadata | null
  loading: Boolean
  error: Error | null
}

export function useFetchPubEvents(params: UseFetchPubEventsParams) {
  const [response, setResponse] = useState<PubEventResponse>({
    data: [],
    _metadata: null,
    loading: false,
    error: null
  });
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    let cancelled = false
    let loadingTimer: ReturnType<typeof setTimeout>

    async function fetchEvents() {
      try {
        setError(null)

        loadingTimer = setTimeout(() => {
          if (!cancelled) setLoading(true)
        }, 300)

        const result = await getPubEvents(params)

        if (!cancelled) {
          setResponse(result)
          params?.setPubEvents(prevItems => [...prevItems, ...result.data]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
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
  }, [params.event_id, params.pub_id, params.longitude, params.longitude, params.page, params.distance])

  return {
    data: response.data ?? [],
    metadata: response._metadata ?? null,
    loading,
    error
  }
}
