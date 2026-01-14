import { APIProvider, Map } from '@vis.gl/react-google-maps';
import PoiMarkers from './PoiMarkers';

import { type GoogleMapProps } from '../../types/googlemaps/GoogleMapTypes';

export default function GoogleMap({userLat, userLong, locations}: GoogleMapProps) {
    return (
        <>
        <APIProvider apiKey={''}>
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