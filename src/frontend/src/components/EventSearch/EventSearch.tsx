import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import SearchBar from '../SearchBar/SearchBar'
import useDebounce from '../../hooks/useDebounce'
import { useEvents } from '../../hooks/events/useEvents'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

import { type Event, type EventFilters } from '../../types/events/EventTypes'

import './EventSearch.css'

const SCREEN_ID = 'events-list'

export default function EventSearch() {
  const navigator = useNavigate();

  const [searchValue, setSearchValue] = useState<string>('')
  const [page, setPage] = useState<number>(1);
  const [events, setEvents] = useState<Event[]>([])

  const dateNow = new Date()

  const [filters, setFilters] = useState<EventFilters>({
    sport: '',
    date: `${dateNow.getFullYear()}-` + 
          `${(dateNow.getMonth() + 1).toString().padStart(2, "0")}-` +
          `${dateNow.getDate().toString().padStart(2, "0")}`,
    time: `${dateNow.getUTCHours()}:${dateNow.getMinutes()}`
  })

  const [sort, setSort] = useState('date_time')
  
  const debouncedSearchValue = useDebounce(searchValue, 500)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, metadata, loading, error } = useEvents({
    name: debouncedSearchValue,
    sport: filters.sport,
    date: filters.date,
    sortBy: sort,
    page,
    setEvents
  })

  useInfiniteScroll({
    trigger: setPage,
    currentPage: metadata ? parseInt(metadata.current_page) : undefined,
    maxPage: metadata?.total_pages,
    screenId: SCREEN_ID,
    loading
  });

  useEffect(() => {
    const ev = localStorage.getItem('events') ?? ''
    setEvents(JSON.parse(ev))
    const scrollHeight = localStorage.getItem('event-search-scroll-height') ?? '0';

    setTimeout(() => {
      document.getElementById(SCREEN_ID)?.scrollTo({
        top: parseInt(scrollHeight)
      })
    }, 250)
  }, [])

  const handleViewDetails = (eventId: number) => e => {
    const scrollHeight = document?.getElementById(SCREEN_ID)?.scrollTop ?? 0
    localStorage.setItem('event-search-scroll-height', `${scrollHeight}`)
    localStorage.setItem('events', JSON.stringify(events))
    navigator(`/events/${eventId}`)
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
          {loading && <p className="status-message">Loading…</p>}
          {error && <p className="status-message error">{error.message}</p>}
          
            <div className="events-list" id={SCREEN_ID}>
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-info">
                    <h3 className="event-name">{event.name}</h3>
                    <p className="event-date">
                      {new Date(event.date_time).toLocaleDateString(
                        'en-US',
                        {
                          hour: 'numeric',
                          minute: 'numeric',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }
                      )}
                    </p>
                  </div>
                  <button onClick={handleViewDetails(event.id)}>View Details</button>
                </div>
              ))}
            </div>
        </main>
      </div>
    </div>
  )
}