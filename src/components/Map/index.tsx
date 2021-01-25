import React, { useRef, useState, useCallback } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator, Source, Layer } from 'react-map-gl';
import { isoLayer } from 'components/Map/layers';
import { Button, Form, Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { MapContainerWrapper } from 'components/Map/Map.styles';
import image from 'media/images/pin.png';

const Map = (props: any) => {
  console.log('Data: ', props.data);
  const mapRef = useRef<null | any>(null);
  const inputRef = useRef<null | any>(null);

  // Component States
  const [userLocation, setUserLocation]: any | null = useState(null);
  const [travelMode, setTravelMode] = useState('walking');
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

  const travelModeChangeHandler = (val: any) => setTravelMode(val);

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
          {/* userlocation button */}
          <Button onClick={setUserLocationHandler}>My Location</Button>

          {/* Isochrone api form */}
          <Form onSubmit={(e) => fetchDataClickHandler(e)}>
            <Form.Group as={Row} controlId="minutes">
              <Form.Label column sm={2}>
                Duration in minutes
              </Form.Label>
              <Col sm={2}>
                <Form.Control type="number" placeholder="10" ref={inputRef} />
              </Col>
            </Form.Group>
            <ToggleButtonGroup
              type="radio"
              name="travelModeRadio"
              defaultValue={travelMode}
              onChange={travelModeChangeHandler}
            >
              <ToggleButton value={'walking'}>Walking</ToggleButton>
              <ToggleButton value={'cycling'}>Cycling</ToggleButton>
              <ToggleButton value={'driving'}>Driving</ToggleButton>
            </ToggleButtonGroup>
            <Form.Group as={Row}>
              <Col sm={{ span: 5, offset: 0 }}>
                <Button type="submit">Isochrone Api</Button>
              </Col>
            </Form.Group>
          </Form>

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
