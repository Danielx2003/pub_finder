export type Event =  {
  id: number
  name: string
  sport: string
  date_time: string
}

export type EventParams = {
  id: number
  name: string
  datetime: Date
}

export type EventFilters = {
  sport: string
  date: string
  time: string
}