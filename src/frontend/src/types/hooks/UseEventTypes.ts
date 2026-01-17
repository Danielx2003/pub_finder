import { type Metadata } from "../api/GetPubEventsTypes"
import { type Event } from "../events/EventTypes"

export type UseEventsParams = {
  name?: string
  sport?: string
  date?: string
  time?: string
  sortBy?: string
  page: number
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
}

export type UseEventResult = {
  _metadata: Metadata
  data: Event[]
}