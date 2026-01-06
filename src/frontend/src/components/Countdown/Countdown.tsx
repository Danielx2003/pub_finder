import { useEffect, useState } from "react";

type CountdownProps = {
    countFromDate: Date;
};

type TimeParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getTimeParts(totalSeconds: number): TimeParts {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
}

export default function Event({ countFromDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<number>(() =>
        Math.max(
            Math.floor((countFromDate.getTime() - Date.now()) / 1000),
            0
        )
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const secondsLeft = Math.max(
                Math.floor((countFromDate.getTime() - Date.now()) / 1000),
                0
            );

            setTimeLeft(secondsLeft);
            }, 1000);

        return () => clearInterval(interval);
    }, [countFromDate]);

    const { days, hours, minutes, seconds } = getTimeParts(timeLeft);

    return (
        <p data-testid="countdown">
        Days: {days} Hours: {hours} Minutes: {minutes} Seconds: {seconds}
        </p>
    );
}
