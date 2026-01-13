type GetPubEventsParams = {
  event_id?: number
  pub_id?: number
  latitude?: number
  longitude?: number
  distance?: number
  page?: number
}

export async function getPubEvents(params: GetPubEventsParams) {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/api/v1/pub-event`
  )

  if (params.event_id) {
    url.searchParams.append('event_id', params.event_id.toString())
  }

  if (params.latitude) {
    url.searchParams.append('latitude', params.latitude.toString())
  }

  if (params.longitude) {
    url.searchParams.append('longitude', params.longitude.toString())
  }

  if (params.distance) {
    url.searchParams.append('distance', params.distance.toString())
  }

  if (params.page) {
    url.searchParams.append('page', params.page.toString())
  }

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}