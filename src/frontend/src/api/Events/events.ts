import { type UseEventResult } from '../../types/hooks/UseEventTypes'

type GetEventsParams = {
  name?: string
  sport?: string
  date?: string
  time?: string
  sortBy?: string
  page: number
}

export async function getEvents(params: GetEventsParams): Promise<UseEventResult>  {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/api/v1/event`
  )

  if (params.name) {
    url.searchParams.append('name', params.name)
  }

  if (params.sport) {
    url.searchParams.append('sport', params.sport)
  }

  if (params.sortBy)
  {
    url.searchParams.append('sort_by', params.sortBy)
  }

  if (params.date) {
    const time = params.time ?? '00:00'
    url.searchParams.append('start', `${params.date} ${time}`)
  }

  url.searchParams.append('page', `${params.page}`)

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}

type getEventByIdParams = {
  id: string
}

export async function getEventById(params: getEventByIdParams) {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/api/v1/event/${params.id}`
  )

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error(`Failed to find event with id: ${params.id}`)
  }

  return res.json()
}
