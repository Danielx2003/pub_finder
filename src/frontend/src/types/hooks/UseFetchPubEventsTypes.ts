import { type PubEvent } from "../pubevent/PubEventTypes"

export type UseFetchPubEventsParams = {
  event_id?: number
  pub_id?: number
  latitude?: number
  longitude?: number
  distance?: number
  page?: number
  setPubEvents: React.Dispatch<React.SetStateAction<PubEvent[]>>
}
