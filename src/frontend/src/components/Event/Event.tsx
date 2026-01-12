import { useState } from 'react'

import Countdown from '../Countdown/Countdown'
import { useFetchPubEvents } from '../../hooks/pubevents/useFetchPubEvents'
import Pub from '../Pub/Pub'
import GoogleMap from '../GoogleMap/GoogleMap'

import './Event.css'

type Poi = { key: number, location: google.maps.LatLngLiteral }

type EventProps = {
  id: number
  name: string
  datetime: Date
}

export default function Event({id, name, datetime}: EventProps) {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = datetime.toLocaleDateString("en-US", options);

  const { data: pubevents, loading, error } = useFetchPubEvents({
    event_id: id
  })

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }

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

        <div>
          <GoogleMap
            userLat={latitude}
            userLong={longitude}
            locations={pubevents.map<Poi>((pubevent) => ({
              key: pubevent.id,
              location: {
                lat: pubevent.pub.latitude,
                lng: pubevent.pub.longitude,
              },
            }))}
          />
        </div>
      </div>
    </div>
  )
}