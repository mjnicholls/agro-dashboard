import React from "react";
import L from 'leaflet'
import { useSelector } from 'react-redux'
import { Card } from "reactstrap";

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

const MapWrapper = ({ polygon, imageURL}) => {

  const mapRef = React.useRef(null);
  const token = useSelector(authTokenSelector);
  const [map, setMap] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [bounds, setBounds] = React.useState(null);

  React.useEffect(() => {
    let mapInstance = mapRef.current;
    if (!map) {
      mapInstance =  L.map('map-satellite', {
        center: [polygon.center[1], polygon.center[0]],
        zoom: 5,
      });
      setMap(mapInstance);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      id: 'openstreetmap',
      tileSize: 512,
      zoomOffset: -1,
  }).addTo(mapInstance);
    addNewPolygon(mapInstance, polygon)
  }, []);


  React.useEffect(() => {
    /** Change satellite image for the same polygon */
    if (image) {
      map.removeLayer(image)
      let imageInstance =  L.tileLayer(imageURL, {
        bounds: bounds,
        id: "feature"
      }, [{ header: 'Authorization', value: 'Bearer ' + token}, {header: "Content-Type", value: "image/png" }]
      ).addTo(map)
      setImage(imageInstance)
      }
  }, [imageURL])

  React.useEffect(() => {
    /** Display a new polygon */
    if (image) {
      map.removeLayer(image)
      addNewPolygon(map, polygon)
    }
  }, [polygon])

  const addNewPolygon = (mapInstance, polygonInstance) => {
    let geoJson = L.geoJson(polygonInstance.geo_json, {
      style: {
        "weight": 2,
        "opacity": 0.5
      }
    }).addTo(mapInstance);
    let boundsLocal = geoJson.getBounds();
    mapInstance.fitBounds(boundsLocal);
    let imageInstance = L.tileLayer(imageURL,
      {
        bounds: boundsLocal,
      },
      [{ header: 'Authorization', value: 'Bearer ' + token}, {header: "Content-Type", value: "image/png" }]
    ).addTo(mapInstance);
    setBounds(boundsLocal);
    setImage(imageInstance);
  }
  return <div ref={mapRef}/>;
};

const LeafletMapSatellite = ({polygon, selectedImage, selectedLayer}) => {
  return (
    <div id="map-satellite">
      {(polygon && selectedImage && selectedLayer) ?
        <MapWrapper polygon={polygon} imageURL={selectedImage.tile[selectedLayer.value]}/> :
        <Card className="map-satellite-placeholder">Fetching ...</Card>
      }
    </div>
  );
};

export default LeafletMapSatellite;
