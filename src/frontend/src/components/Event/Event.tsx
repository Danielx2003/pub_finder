import Countdown from '../Countdown/Countdown'
import { useFetchPubEvents } from '../../hooks/pubevents/useFetchPubEvents'

import './Event.css'

type EventProps = {
  id: number
  name: string
  datetime: Date
}

export default function Event({id, name, datetime}: EventProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = datetime.toLocaleDateString("en-US", options);

 const { data: pubevents, loading, error } = useFetchPubEvents({
    event_id: id
  })

  return (
    <>
    <div className="event-container">
      <div className="event-header">
        <h2 className="event-title">{name}</h2>
        <p className="event-datetime">{date}</p>
      </div>
      <div className="event-countdown">
        <Countdown countFromDate={datetime} />
      </div>
    </div>
    <div>
      {loading && <p>{loading}</p>}
      {pubevents.map(pubevent => pubevent.pub.name)}
    </div>
    </>
  )
}