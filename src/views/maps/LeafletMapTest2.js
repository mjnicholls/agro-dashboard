import React from "react";
import L from 'leaflet'
import { useSelector } from 'react-redux'

const polygon = {
    "area":13.8839,
    "center":[
       9.894248750000001,
       46.56530325
    ],
    "created_at":1622719452,
    "geo_json":{
       "geometry":{
          "coordinates":[
             [
                [
                   9.891234,
                   46.566417
                ],
                [
                   9.891999,
                   46.563182
                ],
                [
                   9.897606,
                   46.564541
                ],
                [
                   9.896156,
                   46.567073
                ],
                [
                   9.891234,
                   46.566417
                ]
             ]
          ],
          "type":"Polygon"
       },
       "properties":{

       },
       "type":"Feature"
    },
    "id":"60b8bbdc380af3307b6b1569",
    "name":"New name",
    "user_id":"5e0f048dc49613000875b174"
 }

 async function fetchImage(url, callback, headers, abort) {
  let _headers = {};
  if (headers) {
    headers.forEach(h => {
      _headers[h.header] = h.value;
    });
  }
  const controller = new AbortController();
  const signal = controller.signal;
  if (abort) {
    abort.subscribe(() => {
      controller.abort();
    });
  }
  const f = await fetch(url, {
    method: "GET",
    headers: _headers,
    mode: "cors",
    signal: signal
  });
  const blob = await f.blob();
  callback(blob);
}

L.TileLayerWithHeaders = L.TileLayer.extend({
  initialize: function (url, options, headers, abort) {
    L.TileLayer.prototype.initialize.call(this, url, options);
    this.headers = headers;
    this.abort = abort;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");
    img.setAttribute("role", "presentation");

    fetchImage(
      url,
      resp => {
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
        };
        reader.readAsDataURL(resp);
        done(null, img);
      },
      this.headers,
      this.abort
    );
    return img;
  }
});

L.tileLayer = function (url, options, headers, abort) {
  return new L.TileLayerWithHeaders(url, options, headers, abort);
};

const authTokenSelector = state => state.auth.token;


const MapWrapper = () => {
  const mapRef = React.useRef(null);
  const token = useSelector(authTokenSelector);
  React.useEffect(() => {
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";

    map =  L.map('map', {
      center: [polygon.center[1], polygon.center[0]],
      zoom: 5,
      zoomControl: false
    });

    L.control.zoom({
      position: 'topleft',
    }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      id: 'openstreetmap',
      tileSize: 512,
      zoomOffset: -1,
  }).addTo(map);

    var feature = L.geoJson(polygon.geo_json).addTo(map);
    map.fitBounds(feature.getBounds());
    let url = 'http://k8s-eu4.owm.io:12345/tile/{z}/{x}/{y}?hash=00060da6280&polyid=60b8bbdc380af3307b6b1569'
    L.tileLayer(url, {
      bounds: feature.getBounds()
		}, [{ header: 'Authorization', value: 'Bearer ' + token}, {header: "Content-Type", value: "image/png" }]
    ).addTo(map);

  }, []);
  return <div ref={mapRef} />;
};

const FullScreenMap = () => {
  return (
    <div className="content">
      <div id="map" style={{ position: "relative", overflow: "hidden" }}>
        <MapWrapper />
      </div>
    </div>
  );
};

export default FullScreenMap;
