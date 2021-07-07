import React from "react";
import L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

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


const MapWrapper = ({ setArea, setGeoJson, setIntersection }) => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";

    map =  L.map('map-satellite', {
      center: [lat, lng],
      zoom: 5,
      // drawControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      id: 'openstreetmap',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

     // FeatureGroup is to store editable layers
     var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     new L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: false,
          polygon: {
            metric: ['ha'],
          },
          circle: {
            metric: ['ha'],
          }, // Turns off this drawing tool
          rectangle: {
            metric: ['ha'],
          },
          marker: true
        },
        edit: {
          featureGroup: drawnItems,
          remove: true
        }}).addTo(map)

     map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }
        drawnItems.addLayer(layer);
        let areaSquareMeters = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        let areaHa = (areaSquareMeters / 10000).toFixed(2);
        setArea(areaHa);
        setIntersection(layer.intersects());
       let geoJson = layer.toGeoJSON();
       console.log(typeof geoJson, geoJson)
       setGeoJson(geoJson)
    });

  }, []);
  return <div ref={mapRef} />;
};

const FullScreenMap = ({ setArea, setGeoJson, setIntersection }) => {
  return (
      <div id="map-satellite" style={{ position: "relative", overflow: "hidden" }}>
        <MapWrapper
          setArea={setArea}
          setGeoJson={setGeoJson}
          setIntersection={setIntersection}
        />
      </div>
  );
};

export default FullScreenMap;
