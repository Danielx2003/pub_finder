import {APIProvider, Map} from '@vis.gl/react-google-maps';
import PoiMarkers from './PoiMarkers';

type Poi = { key: number, location: google.maps.LatLngLiteral }

type GoogleMapProps = {
    userLat: number
    userLong: number
    locations: Poi[]
}

export default function GoogleMap({userLat, userLong, locations}: GoogleMapProps) {
    return (
        <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                style={{width: '100vh', height: '50vh'}}
                mapId='EventMap'
                center={{lat: userLat, lng: userLong}}
                defaultZoom={13}
                gestureHandling='greedy'
                disableDefaultUI
            >
            <PoiMarkers pois={locations} />
            </Map>
        </APIProvider>
        </>
    )
}