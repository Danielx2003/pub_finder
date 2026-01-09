import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import EventSearch from './components/EventSearch/EventSearch'
import EventWrapper from './components/EventWrapper/EventWrapper'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<h1>Hello World</h1>}
        />
        <Route
          path='/events'
          element={<EventSearch />}
        />
        <Route
          path='/events/:id'
          element={<EventWrapper />}
        />
      </Routes>
    </BrowserRouter>
    </>
  )
};
