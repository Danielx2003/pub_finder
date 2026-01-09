type GetPubEventsParams = {
  event_id?: number
  pub_id?: number
}

export async function getPubEvents(params: GetPubEventsParams) {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/api/v1/pub-event`
  )

  if (params.event_id) {
    url.searchParams.append('event_id', params.event_id.toString())
  }

  if (params.pub_id) {
    url.searchParams.append('pub_id', params.pub_id.toString())
  }

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}