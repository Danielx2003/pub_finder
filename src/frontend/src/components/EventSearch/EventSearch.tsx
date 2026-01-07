import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import useDebounce from '../../hooks/useDebounce'
import { useEvents } from '../../hooks/events/useEvents'
import './EventSearch.css'

export default function EventSearch() {
  const [searchValue, setSearchValue] = useState('')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [filters, setFilters] = useState({
    sport: '',
    date: ''
  })
  const [sort, setSort] = useState('-date_time')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const { data: events, loading, error } = useEvents({
    name: debouncedSearchValue,
    sport: filters.sport,
    date: filters.date,
    sortBy: sort
  })

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return (
    <div className="event-search-container">
      <div className='search-bar-wrapper'>
        <SearchBar
          className='search-bar'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search for an event"
        />
      </div>

      <div className="event-main">
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Sport</label>
            <select
              value={filters.sport}
              onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
            >
              <option value="">All</option>
              <option value="boxing">Boxing</option>
              <option value="darts">Darts</option>
              <option value="football">Football</option>
              <option value="golf">Golf</option>
              <option value="tennis">Tennis</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>

          <h3>Sort By</h3>
          <div className="sort-group">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="date_time">Upcoming</option>
              <option value="-date_time">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </aside>

        <main className="events-content">
          <div className="view-toggle">
            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
            >
              List View
            </button>
            <button
              className={view === 'map' ? 'active' : ''}
              onClick={() => setView('map')}
            >
              Map View
            </button>
          </div>

          {loading && <p className="status">Loading…</p>}
          {error && <p className="status error">{error.message}</p>}

          {view === 'list' && (
            <div className="events-list">
              {events.map((event) => (
                <div className="event-card" key={event.id}>
                  <div className="event-info">
                    <div className="event-name">{event.name}</div>
                    <div className="event-time">
                      {new Date(event.date_time).toLocaleDateString("en-US", options)}
                    </div>
                  </div>
                  <button
                    className="view-button"
                    onClick={() => console.log('View', event.id)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}

          {view === 'map' && (
            <div className="map-view">
              <p>Map view coming soon…</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
