import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import { v4 as uuidv4 } from 'uuid';
import Locate from './Locate';
import Search from './Search';


const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '80vh'
}

const center = {
  lat: 52.52,
  lng: 13.40
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

export default function Maps() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyDak_JWRjE_pgymoWdEtUst3w0y6beBXk0",
    libraries,
  })
//
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) =>{
    setMarkers(current => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }]);
  }, []);
  const marker = {
    id: uuidv4()
  };

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) =>{
    mapRef.current = map;
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading map";
  if (!loadError) 
    return (
      <>
      <h1 className='logo'>ARCHMAPS</h1>
      <Search panTo={panTo} />
      <Locate panTo={panTo}/>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        key='map'
        >
          {markers.map((marker) => (
            <Marker 
            key={marker.id} 
            position={{lat:marker.lat, lng: marker.lng}} 
            icon={{
              url: '/mecca.svg',
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => {
              setSelected(marker);
            }}
            //
            />
          ))}
          {selected ? (<InfoWindow 
          position={{lat: selected.lat, lng: selected.lng}} 
          onCloseClick={() => {
            setSelected(null)
          }}>
            <div>
              <h2>What a beautiful landmark!</h2>
            </div>
          </InfoWindow>): null}
        </GoogleMap>
        
      </>
    )
}
