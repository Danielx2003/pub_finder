import { type PubEvent } from "../pubevent/PubEventTypes"

export type Metadata = {
  current_page: string
  page_size: number
  total_count: number
  total_pages: number
}

export type PubEventResponse = {
  data: PubEvent[]
  _metadata: Metadata | null
  loading: boolean
  error: Error | null
}
