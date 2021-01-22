import React, { useRef, useState, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Button } from 'react-bootstrap';
import { MapContainerWrapper } from 'components/Map/Map.styles';
import image from 'media/images/pin.png';

const Map = (props: any) => {
  console.log('Data: ', props.data);
  const mapRef = useRef<null | any>(null);

  // Component States
  const [userLocation, setUserLocation]: any | null = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 4.214,
    longitude: -138.49,
    zoom: 0,
  });

  // Map function handlers
  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
  }, []);

  // Custom function handlers
  const setUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      let newViewport = {
        height: '100%',
        width: '100%',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
      };
      setViewport(newViewport);
      setUserLocation(userLocation);
    });
  };

  const fetchDataClickHandler = () => {
    props.fetchDataHandler();
  };

  return (
    <div>
      <MapContainerWrapper>
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/basic-v9"
        >
          <Button onClick={setUserLocationHandler}>My Location</Button>
          <Button onClick={fetchDataClickHandler}>Isochrone Map</Button>
          {userLocation !== null ? (
            <Marker latitude={userLocation.lat} longitude={userLocation.long} offsetLeft={-15} offsetTop={-30}>
              <img src={image} alt="marker" />
            </Marker>
          ) : null}
        </ReactMapGL>
      </MapContainerWrapper>
    </div>
  );
};

export default Map;
