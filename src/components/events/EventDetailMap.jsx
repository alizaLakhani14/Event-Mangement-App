import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "antd";

const EventDetailMap = ({ latitude, longitude }) => {
  const center = [latitude, longitude];
  const zoom = 11;

  const Marker = () => (
    <Icon
      type="environment"
      style={{
        color: "red",
        fontSize: "40px"
      }}
    />
  );
  return (
    <div>
      <div style={{ height: "400px", width: "50%", margin: "1em" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3bAtv0hxR8NC4AVX1WwzoeX8BOZ2zNSk" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={latitude} lng={longitude} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default EventDetailMap;
