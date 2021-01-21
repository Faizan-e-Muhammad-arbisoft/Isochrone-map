import React, { useRef, useState, useCallback } from "react";
import ReactMapGL from "react-map-gl";
import { MapContainerWrapper } from "components/Map/Map.styles";

const Map = (props: any) => {
  const mapRef = useRef<null | any>(null);

  // Component States
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  // Map function handlers
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
    <div>
      <MapContainerWrapper>
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/basic-v9"
        />
      </MapContainerWrapper>
    </div>
  );
};

export default Map;
