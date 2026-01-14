import { useEffect, useState } from 'react'
import { getPubEvents } from '../../api/PubEvent/pubevent'

import { type UseFetchPubEventsParams } from '../../types/hooks/UseFetchPubEventsTypes'
import { type PubEventResponse } from '../../types/api/GetPubEventsTypes';

export function useFetchPubEvents(params: UseFetchPubEventsParams) {
  const [response, setResponse] = useState<PubEventResponse>({
    data: [],
    _metadata: null,
    loading: false,
    error: null
  });
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
