import React from 'react';
import { GeoJSON, MapContainer, Popup, TileLayer} from 'react-leaflet'
import { Card } from "reactstrap";
import { Link } from 'react-router-dom';

const LeafletMapMultiplePolygons = ({ polygons }) => {
  return (
    <div id='map-satellite' className="leaflet-map-container">
      {polygons.length ?
      <MapContainer center={[polygons[0].center[1], polygons[0].center[0]]} zoom={13} scrollWheelZoom={false} className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polygons.map(polygon =>
          <GeoJSON
            attribution="&copy; credits due..."
            data={polygon.geo_json}
            key={polygon.id}
            onclick={() => console.log("click :0")}
          >
            <Popup>
              <Link to={"/admin/polygon/" + polygon.id}>{polygon.name}</Link>
            </Popup>
          </GeoJSON>)}
      </MapContainer> : <Card className="map-satellite-placeholder">Fetching ...</Card>}
    </div>
  )
}

export default LeafletMapMultiplePolygons