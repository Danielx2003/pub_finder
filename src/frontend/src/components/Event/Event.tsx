import { useEffect, useState } from 'react'

import Countdown from '../Countdown/Countdown'
import { useFetchPubEvents } from '../../hooks/pubevents/useFetchPubEvents'
import Pub from '../Pub/Pub'
import GoogleMap from '../GoogleMap/GoogleMap'
import useUserCoordinates from '../../hooks/useUserCoordinates'

import { type PubEvent } from "../../types/pubevent/PubEventTypes"
import { type EventParams } from '../../types/events/EventTypes'
import { type UseUserCoordinatesResponse } from '../../types/hooks/UseUserCoordinatesTypes'
import { type Poi } from '../../types/googlemaps/GoogleMapTypes'

import './Event.css'

export default function Event({id, name, datetime}: EventParams) {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [page, setPage] = useState<number>(1)
  const [pubEvents, setPubEvents] = useState<PubEvent[]>([])

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = datetime.toLocaleDateString("en-US", options);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, metadata, loading, error } = useFetchPubEvents({
    page,
    event_id: id,
    setPubEvents
  })

  const { latitude, longitude, error: locationError }: UseUserCoordinatesResponse = useUserCoordinates()

  useEffect(() => {
    if (metadata == null) { return; }

    function handleScroll() {
      const root = document.getElementById('root');
      if (!root) return;

      const bottom = window.scrollY + window.innerHeight >= root.clientHeight

      if (bottom && metadata) {
        if (parseInt(metadata.current_page) + 1 <= metadata.total_pages) {
          setPage(parseInt(metadata.current_page) + 1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [metadata])

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
        <h3 className="pubs-section-title">
          Showing at  {metadata?.total_count || 0}
           {metadata?.total_count === 1 ? ' Pub' : ' Pubs'}
        </h3>

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
              {pubEvents.map(pubevent => (
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
                  locations={pubEvents.map<Poi>((pubevent) => ({
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