import React, { useRef, useState, useCallback } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator, Source, Layer } from 'react-map-gl';
import { isoLayer } from 'components/Map/layers';
import { Button, Form } from 'react-bootstrap';
import { MapContainerWrapper, FormWrapper } from 'components/Map/Map.styles';
import image from 'media/images/pin.png';

const Map = (props: any) => {
  console.log('Data: ', props.data);
  const mapRef = useRef<null | any>(null);
  const inputRef = useRef<null | any>(null);

  // Component States
  const [userLocation, setUserLocation]: any | null = useState(null);
  const [travelMode, setTravelMode]: any | null = useState(null);
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
        lng: position.coords.longitude,
      };
      let newViewport = {
        height: '100%',
        width: '100%',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12,
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator(),
      };
      setViewport(newViewport);
      setUserLocation(userLocation);
    });
  };

  const travelModeChangeHandler = (val: any) => {
    setTravelMode(val.target.value);
  };

  const fetchDataClickHandler = (e: any) => {
    e.preventDefault();
    let profile = travelMode;
    let minutes = inputRef.current.value;
    props.fetchDataHandler(profile, userLocation.lng, userLocation.lat, minutes);
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
          <FormWrapper>
            {/* userlocation button */}
            <Button onClick={setUserLocationHandler}>My Location</Button>

            {/* Isochrone api form */}
            <Form onSubmit={(e) => fetchDataClickHandler(e)}>
              <Form.Group>
                <Form.Label>Duration in minutes</Form.Label>
                <Form.Control type="number" defaultValue={10} min={1} ref={inputRef} />
              </Form.Group>
              <Form.Group controlId="travelModeRadio">
                <Form.Check
                  inline
                  type="radio"
                  label="Walking"
                  id="walkingRadio"
                  value="walking"
                  name="radio"
                  onChange={travelModeChangeHandler}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Cycling"
                  id="cyclingRadio"
                  value="cycling"
                  name="radio"
                  onChange={travelModeChangeHandler}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Driving"
                  id="drivingRadio"
                  value="driving"
                  name="radio"
                  onChange={travelModeChangeHandler}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" disabled={userLocation === null || travelMode === null}>
                  Isochrone Api
                </Button>
              </Form.Group>
            </Form>
          </FormWrapper>

          {/* user location marker */}
          {userLocation !== null ? (
            <Marker latitude={userLocation.lat} longitude={userLocation.lng} offsetLeft={-15} offsetTop={-30}>
              <img src={image} alt="marker" />
            </Marker>
          ) : null}

          {/* isochrone layer */}
          <Source id="iso" type="geojson" data={props.data}>
            <Layer {...isoLayer} />
          </Source>
        </ReactMapGL>
      </MapContainerWrapper>
    </div>
  );
};

export default Map;
