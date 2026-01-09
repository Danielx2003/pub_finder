import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useShowEvent } from "../../hooks/events/useShowEvent";
import Event from '../Event/Event'

export default function EventWrapper() {
    const navigate = useNavigate();

    const { id } = useParams() as { id: string };

    const { event, loading, error } = useShowEvent({
        id
    })

    if (error)
    {
        navigate('/')
    }

    return (
        <>
            {loading && <p className="status-message">Loading…</p>}
            {event && 
                <Event
                    id={event.id}
                    name={event.name}
                    datetime={new Date(event.date_time)}
                />}
        </>
    )
}