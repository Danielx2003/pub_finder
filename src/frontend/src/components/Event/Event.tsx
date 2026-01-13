import { useState } from 'react'

import Countdown from '../Countdown/Countdown'
import { useFetchPubEvents } from '../../hooks/pubevents/useFetchPubEvents'
import Pub from '../Pub/Pub'
import GoogleMap from '../GoogleMap/GoogleMap'
import useUserCoordinates from '../../hooks/useUserCoordinates'

import './Event.css'

type Poi = { key: number, location: google.maps.LatLngLiteral }

type EventProps = {
  id: number
  name: string
  datetime: Date
}

type UseUserCoordinatesReturn = {
  latitude: number
  longitude: number
  error: string | null
}

export default function Event({id, name, datetime}: EventProps) {
  const [view, setView] = useState<'list' | 'map'>('list')

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = datetime.toLocaleDateString("en-US", options);

  const { data: pubevents, loading, error } = useFetchPubEvents({
    event_id: id
  })

  const { latitude, longitude, error: locationError }: UseUserCoordinatesReturn = useUserCoordinates()

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

        <div className="view-toggle">
          <button
            className={`view-toggle-button ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            List View
          </button>
          <button
            className={`view-toggle-button ${view === 'map' ? 'active' : ''}`}
            onClick={() => setView('map')}
          >
            Map View
          </button>
        </div>

        <div className="pubs-content">
          {view === 'list' && (
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
          )}

          {view === 'map' && (
            <div className="map-container">
              {locationError && (
                <p className="location-error">Error occurred fetching location</p>
              )}
              <div className="map-wrapper">
                <GoogleMap
                  userLat={latitude}
                  userLong={longitude}
                  locations={pubevents?.map<Poi>((pubevent) => ({
                    key: pubevent.id,
                    location: {
                      lat: pubevent.pub.latitude,
                      lng: pubevent.pub.longitude,
                    },
                  }))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}