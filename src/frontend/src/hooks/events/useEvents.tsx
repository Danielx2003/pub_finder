import { useEffect, useState } from 'react'
import { getEvents } from '../../api/Events/events'

import { type UseEventsParams } from '../../types/hooks/UseEventTypes'
import { type UseEventResult } from '../../types/hooks/UseEventTypes'

export function useEvents(params: UseEventsParams) {
  const [response, setResponse] = useState<UseEventResult>({
    data: [],
    _metadata: {
      current_page: '0',
      total_pages: 0,
      total_count: 0,
      page_size: 5
    }
  });

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
          setResponse(result)
          params.setEvents(prevItems => {
            const existingIds = new Set(prevItems.map(event => event.id))
            const eventsToAdd = result.data.filter(event => !existingIds.has(event.id))
            return [...prevItems, ...eventsToAdd]
          })
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
  }, [params.name, params.sport, params.date, params.sortBy, params.time, params.page])

  return {
    data: response.data,
    metadata: response._metadata,
    loading: showLoading,
    error
  }
}
