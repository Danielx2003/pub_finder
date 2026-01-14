export type Poi = { 
    key: number, 
    location: google.maps.LatLngLiteral 
}

export type GoogleMapProps = {
    userLat: number
    userLong: number
    locations: Poi[]
}
