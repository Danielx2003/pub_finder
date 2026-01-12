import { useEffect, useState } from "react"

const useUserCoordinates = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
                () => {
                setError("Unable to retrieve location");
            })
        }
    }, [])

    return {latitude, longitude, error}
}

export default useUserCoordinates
