import Countdown from '../Countdown/Countdown'

import './Event.css'

type EventProps = {
  name: string,
  datetime: Date
}

export default function Event({name, datetime}: EventProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = datetime.toLocaleDateString("en-US", options);

  return (
    <div className="event-container">
      <div className="event-header">
        <h2 className="event-title">{name}</h2>
        <p className="event-datetime">{date}</p>
      </div>
      <div className="event-countdown">
        <Countdown countFromDate={datetime} />
      </div>
    </div>
  )
}