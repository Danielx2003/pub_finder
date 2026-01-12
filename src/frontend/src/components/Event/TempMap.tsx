import { useState } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

export default function TempMap() {
    const [longitude, setLongitude] = useState<number>(50.73);
    const [latitude, setLatitude] = useState<number>(2.51);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          console.log(latitude, longitude)
        });
    }

    return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={{lat: latitude, lng: longitude}}
        defaultZoom={11}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  );
}
