import React from 'react';
import { GeoJSON, MapContainer, TileLayer} from 'react-leaflet'
// import { createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core';
// import {TileLayer} from 'leaflet';
// import {axiosInstance} from "../../services/base";
// import WMSTileLayerWithHeaderComponent from '../../services/WMSTileLayerWithHeader'



const LeafletMapSatellite = ({ polygon }) => {
  let op = 'truecolor'
  let src = "s2"
  let dt = "1624579200"
  const url = `http://k8s-eu4.owm.io:12345/image/png?api/tiles/{z}/{x}/{y}?op=${op}&src=${src}&date=${dt}&polyid=${polygon.id}`

  console.log(url)
  //https://wp.agromonitoring.com/dashboard/api/tiles/15/17284/11582?op=truecolor&src=s2&date=1623715200&polyid=60b8bbdc380af3307b6b1569

  //api/tiles/{z}/{x}/{y}?op=truecolor&src=http://k8s-eu4.owm.io:12345/image/data?hash=10160d51c80&polyid=60b8bbdc380af3307b6b1569&date=1624579200&polyid=60b8bbdc380af3307b6b1569
  return (
    <div className="leaflet-map-container">
      {polygon ?
      <MapContainer center={[polygon.center[1], polygon.center[0]]} zoom={13} scrollWheelZoom={false} className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<WMSTileLayerWithHeaderComponent*/}
          {/*url={url} format="image/png"*/}
          {/*// headers={{ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDk2MjYzNiwianRpIjoiOTk5NWI1OGItYmU3Ny00Y2U2LWFhMGQtZjc4OTM0MjkxMTdlIiwidHlwZSI6ImFjY2VzcyIsInBhc3Nwb3J0Ijp7ImRhdGEiOnsidXNlcm5hbWUiOiJhdm9sb3Zpa0BvcGVud2VhdGhlcm1hcC5vcmciLCJhcHBpZCI6IjYzOGFjYTcyMjNkZjNjNjZmYmMzMjhmOTAyZGEyYzc4IiwidGFyaWZmIjoic21hbGwifSwibGltaXRzIjp7ImNhbGxzIjp7Im9uZV9jYWxsIjoxMDAwMCwibmR2aV9oaXN0b3J5Ijo1MDAwLCJzb2lsX2hpc3RvcnkiOjUwMDAsIndlYXRoZXJfaGlzdG9yeV9hY2N1bXVsYXRlZF90ZW1wZXJhdHVyZSI6NTAwMCwid2VhdGhlcl9oaXN0b3J5X2FjY3VtdWxhdGVkX3ByZWNpcGl0YXRpb24iOjUwMDAsIndlYXRoZXJfaGlzdG9yeSI6NTAwMH0sImhpc3RvcnkiOnsibmR2aV9oaXN0b3J5Ijp7InN0YXJ0IjoxMzU2OTk4NDAwLCJkZXB0aCI6MS4wfSwic29pbF9oaXN0b3J5Ijp7InN0YXJ0IjoxNTQ2MzAwODAwLCJkZXB0aCI6MS4wfSwid2VhdGhlcl9oaXN0b3J5X2FjY3VtdWxhdGVkX3RlbXBlcmF0dXJlIjp7InN0YXJ0IjoxNTQ2MzAwODAwLCJkZXB0aCI6MS4wfSwid2VhdGhlcl9oaXN0b3J5X2FjY3VtdWxhdGVkX3ByZWNpcGl0YXRpb24iOnsic3RhcnQiOjE1NDYzMDA4MDAsImRlcHRoIjoxLjB9LCJ3ZWF0aGVyX2hpc3RvcnkiOnsic3RhcnQiOjEzMjUzNzYwMDAsImRlcHRoIjoxLjB9fX19LCJuYmYiOjE2MjQ5NjI2MzYsImV4cCI6MTYyNDk2NjIzNn0.svVjiCDm5QDBmVYfFYUpa8Ie42uLZQtzc7mbBEyy_HQ' }}*/}
        {/*/>*/}
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

export default LeafletMapSatellite