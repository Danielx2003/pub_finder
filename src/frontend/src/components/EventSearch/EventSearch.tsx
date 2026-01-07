import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import useDebounce from '../../hooks/useDebounce'
import { useEvents } from '../../hooks/events/useEvents'
import './EventSearch.css'

export default function EventSearch() {
  const [searchValue, setSearchValue] = useState('')
  const [view, setView] = useState<'list' | 'map'>('list')

  const dateNow = new Date()

  const [filters, setFilters] = useState({
    sport: '',
    date: `${dateNow.getFullYear()}-` + 
          `${(dateNow.getMonth() + 1).toString().padStart(2, "0")}-` +
          `${dateNow.getDate().toString().padStart(2, "0")}`,
    time: `${dateNow.getUTCHours()}:${dateNow.getMinutes()}`
  })

  const [sort, setSort] = useState('date_time')
  
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
      <div className="header">
        <h1 className="main-title">Discover Events</h1>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search for an event"
          className="main-search"
        />
      </div>
      
      <div className="content-wrapper">
        <aside className="sidebar">
          <div className="filter-section">
            <h3 className="section-title">Filters</h3>
            
            <div className="filter-group">
              <label className="filter-label">Sport</label>
              <select
                className="filter-select"
                value={filters.sport}
                onChange={(e) =>
                  setFilters({ ...filters, sport: e.target.value })
                }
              >
                <option value="">All Sports</option>
                <option value="BOXING">Boxing</option>
                <option value="DARTS">Darts</option>
                <option value="FOOTBALL">Football</option>
                <option value="GOLF">Golf</option>
                <option value="TENNIS">Tennis</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Date</label>
              <input
                className="filter-input"
                type="date"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h3 className="section-title">Sort By</h3>
            <select 
              className="filter-select" 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="date_time">Upcoming</option>
              <option value="-date_time">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </aside>
        
        <main className="main-content">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/>
                <rect x="2" y="8" width="14" height="2" rx="1" fill="currentColor"/>
                <rect x="2" y="13" width="14" height="2" rx="1" fill="currentColor"/>
              </svg>
              List View
            </button>
            <button 
              className={`toggle-btn ${view === 'map' ? 'active' : ''}`}
              onClick={() => setView('map')}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 6l5-3v12l-5 3V6zM12 3l5 3v12l-5-3V3zM6 3l6 3v12l-6-3V3z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Map View
            </button>
          </div>
          
          {loading && <p className="status-message">Loading…</p>}
          {error && <p className="status-message error">{error.message}</p>}
          
          {view === 'list' && (
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-info">
                    <h3 className="event-name">{event.name}</h3>
                    <p className="event-date">
                      {new Date(event.date_time).toLocaleDateString(
                        'en-US',
                        options
                      )}
                    </p>
                  </div>
                  <button 
                    className="view-btn"
                    onClick={() => console.log('View', event.id)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {view === 'map' && (
            <div className="map-placeholder">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M10 25l20-10v50l-20 10V25zM50 15l20 10v50l-20-10V15zM30 15l20 10v50l-20-10V15z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Map view coming soon…</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}