import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const LeafletDrawReact = () => {
  return (
    <div id="map-satellite" style={{ position: "relative", overflow: "hidden" }}>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    </div>
  )
}

export default LeafletDrawReact