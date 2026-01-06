import Countdown from '../Countdown/Countdown'

type EventProps = {
    name: string,
    datetime: Date
}

export default function Event({name, datetime}: EventProps) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = datetime.toLocaleDateString("en-US", options);

    return (
        <>
            <h1>{name}</h1>
            <h2>{date}</h2>
            <Countdown countFromDate={datetime}/>
        </>
    )
}