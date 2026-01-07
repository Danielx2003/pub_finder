import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import useDebounce from '../../hooks/useDebounce'
import { useEvents } from '../../hooks/events/useEvents'
import './EventSearch.css'

export default function EventSearch() {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const { data: events, loading, error } = useEvents({
    name: debouncedSearchValue
  })

  return (
    <div className="event-search">
      <div>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search for an event"
          className='search-bar-wrapper'
        />
      </div>

      {loading && <p className="status">Loading…</p>}
      {error && <p className="status error">{error.message}</p>}

      <div className="events-list">
        {events.map(event => (
          <div className="event-card" key={event.id}>
            <div className="event-info">{event.name}</div>

            <div className="event-meta">
              <div className="event-time">11:30</div>
              <button className="view-button" onClick={() => console.log('View', event.id)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
