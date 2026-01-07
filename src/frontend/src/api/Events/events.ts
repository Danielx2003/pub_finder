type GetEventsParams = {
  name?: string
  sport?: string
}

export async function getEvents(params: GetEventsParams) {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/api/v1/event`
  )

  if (params.name) {
    url.searchParams.append('name', params.name)
  }

  if (params.sport) {
    url.searchParams.append('sport', params.sport)
  }

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}
