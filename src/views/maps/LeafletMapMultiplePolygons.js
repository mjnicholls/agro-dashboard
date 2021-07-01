import React from 'react';
import { GeoJSON, MapContainer, Popup, TileLayer} from 'react-leaflet'
import { Card } from "reactstrap";

const LeafletMapMultiplePolygons = ({ polygons }) => {
  console.log("LeafletMapMultiplePolygons", polygons)
  return (
    polygons.length ?
    <div className="leaflet-map-container">
      <MapContainer center={[polygons[0].center[1], polygons[0].center[0]]} zoom={13} scrollWheelZoom={false} className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polygons.map(polygon =>
          <GeoJSON attribution="&copy; credits due..." data={polygon.geo_json} key={polygon.id}>
            <Popup>{polygon.name}</Popup>
          </GeoJSON>)}

      </MapContainer>
    </div> : <Card className="map-satellite-placeholder">Fetching ...</Card>
  )
}

export default LeafletMapMultiplePolygons