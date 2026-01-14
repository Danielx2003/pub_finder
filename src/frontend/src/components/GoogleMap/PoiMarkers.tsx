import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

import { type Poi } from "../../types/googlemaps/GoogleMapTypes";

export default function PoiMarkers(props: {pois: Poi[]}) {
    return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
}