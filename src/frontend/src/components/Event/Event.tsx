import Countdown from '../Countdown/Countdown'
import { useFetchPubEvents } from '../../hooks/pubevents/useFetchPubEvents'
import Pub from '../Pub/Pub'

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
    <div className="event-wrapper">
      <div className="event-container">
        <div className="event-header">
          <h2 className="event-title">{name}</h2>
          <p className="event-datetime">{date}</p>
        </div>
        <div className="event-countdown">
          <Countdown countFromDate={datetime} />
        </div>
      </div>

      <div className="pubs-section">
        <h3 className="pubs-section-title">Showing at {pubevents?.length || 0} {pubevents?.length === 1 ? 'Pub' : 'Pubs'}</h3>

        {loading && <p className="pubs-loading">Loading venues...</p>}

        {error && <p className="pubs-error">Unable to load venues</p>}

        <div className="pubs-grid">
          {pubevents?.map(pubevent => (
            <Pub
              key={pubevent.pub.id}
              name={pubevent.pub.name}
              longitude={pubevent.pub.longitude}
              latitude={pubevent.pub.latitude}
            />
          ))}
        </div>
      </div>
    </div>
  )
}