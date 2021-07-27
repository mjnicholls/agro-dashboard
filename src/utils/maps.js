import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {mapBoxAccessToken} from '../config'
import {serverBaseURL} from "../services/api";
import store from "../store";

mapboxgl.accessToken = mapBoxAccessToken;

//["51.2867602","51.6918741","-0.5103751","0.3340155"]
export const defaultBBox = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(51.2867602, 51.6918741),
  new mapboxgl.LngLat(-0.5103751, 0.3340155)
);

export const basicColor = "#006400";
export const basicOpacity = 0.4;
// export const basicColor = '#0080ff';
export const activeColor = '#00FC00';
// export const activeColor = '#8512B0';
// export const activeColor = '#e14eca';
const satelliteSourceId = 'satellite-agro';

export const initialiseMap = (mapContainer, map, mapBounds, onLoad, onClick) => {
  // if (map.current) return;
  const token = store.getState().auth.token;
  map.current = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    bounds: mapBounds ? mapBounds : defaultBBox,
    zoom: 9,
    accessToken: mapBoxAccessToken,
    fitBoundsOptions: { duration: 0 },
    transformRequest: (url) => {
      if (url.indexOf(serverBaseURL) > -1) {
        return {
          url: url,
          headers: { 'Authorization': 'Bearer ' + token },
        }
      }
    },
  });
  map.current.addControl(new mapboxgl.NavigationControl({
    showCompass: false
  }), 'top-right');
  map.current.on('load', function () {
    const polygons = store.getState().polygons;
    for (let i=0; i<polygons.length; i++) {
      addPolygon(map.current, polygons[i], onClick)
    }
    onLoad()
  })
}

const addPolygon = (map, polygon, onClick=null) => {

  if (map.getSource(polygon.id)) {
    return
  }

  map.addSource(polygon.id, {
    type: 'geojson',
    data: polygon.geo_json
  })

  map.addLayer({
    'id': "layer_" + polygon.id,
    'type': 'fill',
    'source': polygon.id,
    'layout': {},
    'paint': {
      'fill-color': activeColor,
      'fill-opacity': basicOpacity
    }
  });

  map.addLayer({
    'id': 'outline_' + polygon.id,
    'type': 'line',
    'source': polygon.id,
    'layout': {},
    'paint': {
    'line-color': basicColor,
    'line-width': 2
    }
  });

  let popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnMove: true,
    closeOnClick: true
  })

  map.on('mouseenter', "layer_" + polygon.id, function (e) {
    map.getCanvas().style.cursor = 'pointer';
    popup
      .setLngLat(e.lngLat)
      .setHTML(polygon.name + ', ' + polygon.area.toFixed(2) + 'ha    ')
      .addTo(map);
  });

  map.on('mouseleave', 'layer_'  + polygon.id, function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  let polygonBbox = new mapboxgl.LngLatBounds(polygon.bbox);

  map.on('click', "layer_" + polygon.id, () => {
    map.fitBounds(polygonBbox, { padding: 20 });
    if (onClick) {
      onClick(polygon);
    }
  });

  map.on('click', "outline_" + polygon.id, () => {
    map.fitBounds(polygonBbox, { padding: 20 });
    if (onClick) {
      onClick(polygon);
    }
    });
  }


export const displayPolygons = (map, mapBounds, polygons, onClick) => {
  /** Add all polygons to the map
   * Set bounds to contain all polygons
   */
  for (let i=0; i<polygons.length; i++) {
    addPolygon(map, polygons[i], onClick)
  }
  if (mapBounds) {
    map.fitBounds(mapBounds, { padding: 20 })
  }
}

export const removeSatelliteTile = (map) => {
  if (map.getLayer(satelliteSourceId)) {
      map.removeLayer(satelliteSourceId);
  }

  if (map.getSource(satelliteSourceId)) {
    map.removeSource(satelliteSourceId);
  }
}

export const renderTile = (map, tileUrl) => {
  removeSatelliteTile(map);
  map.addLayer({
    id: satelliteSourceId,
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [tileUrl],
    },
    minzoom: 0,
    maxzoom: 22
  });
}

export const calculateTotalBbox = (polygons) => {

  let minlngs = polygons.map(polygon => polygon.bbox[0][0]);
  let minlats = polygons.map(polygon => polygon.bbox[0][1]);
  let maxlngs = polygons.map(polygon => polygon.bbox[1][0]);
  let maxlats = polygons.map(polygon => polygon.bbox[1][1]);

  let minlng = Math.min.apply(null, minlngs);
  let minlat = Math.min.apply(null, minlats);

  let maxlng = Math.max.apply(null, maxlngs);
  let maxlat = Math.max.apply(null, maxlats);

  let southWest = new mapboxgl.LngLat(minlng, minlat);
  let northEast = new mapboxgl.LngLat(maxlng, maxlat);

  return new mapboxgl.LngLatBounds(southWest, northEast);

}
