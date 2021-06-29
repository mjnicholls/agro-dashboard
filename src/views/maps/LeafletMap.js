import React from 'react';
import { GeoJSON, MapContainer, TileLayer} from 'react-leaflet'

const LeafletMap = ({ polygon }) => {
  return (
    <div className="leaflet-map-container">
      {polygon ?
      <MapContainer center={[polygon.center[1], polygon.center[0]]} zoom={13} scrollWheelZoom={false} className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<Marker position={[51.505, -0.09]}>*/}
          {/*/!*<Popup>*!/*/}
            {/*/!*A pretty CSS3 popup. <br /> Easily customizable.*!/*/}
          {/*/!*</Popup>*!/*/}
        {/*</Marker>*/}
        <GeoJSON attribution="&copy; credits due..." data={polygon.geo_json} />
      </MapContainer> : <div>Fetching</div>}
    </div>
  )
}

export default LeafletMap