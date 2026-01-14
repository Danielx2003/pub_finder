import { type Pub } from "../pub/PubTypes"

export type PubEvent = {
  id: number
  pub: Pub
  event: Event
}