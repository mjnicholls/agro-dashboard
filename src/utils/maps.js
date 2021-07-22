import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {mapBoxAccessToken} from '../config'

mapboxgl.accessToken = mapBoxAccessToken;

export const basicColor = '#0080ff';
export const activeColor = '#e14eca';
const satelliteSourceId = 'satellite';


export const displayPolygons = (map, mapBounds, polygons) => {
  /** Add all polygons to the map
   * Set bounds to contain all polygons
   */
  for (let i=0; i<polygons.length; i++) {
    let polygon = polygons[i];

    if (map.getSource(polygon.id)) {
      continue
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
        'fill-color': basicColor,
        'fill-opacity': 0.5
        }
    });

    map.addLayer({
      'id': 'outline_' + polygon.id,
      'type': 'line',
      'source': polygon.id,
      'layout': {},
      'paint': {
      'line-color': basicColor,
      'line-width': 3
      }
    });
    map.on('mouseenter', "layer_" + polygon.id, function () {
      map.getCanvas().style.cursor = 'pointer';
      // setActivePolygon(polygon.id)
    });

    let polygonBbox = new mapboxgl.LngLatBounds(polygon.bbox);

    map.on('click', "layer_" + polygon.id, function (e) {
      map.fitBounds(polygonBbox, {
          padding: 20
        });
      });

    map.on('click', "outline_" + polygon.id, function (e) {
      map.fitBounds(polygonBbox, {
          padding: 20
        });
      });
    }
    if (mapBounds) {
      map.fitBounds(mapBounds, {
        padding: 20
      })
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

  map.addSource(satelliteSourceId, {
    'type': 'raster',
    'tiles': [ tileUrl ],
    'tileSize': 256
  });

  map.addLayer(
    {
      'id': satelliteSourceId,
      'type': 'raster',
      'source': satelliteSourceId,
      'paint': {}
    },
      'aeroway-line'
    );
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
  return [[minlng, minlat], [maxlng, maxlat]];

}
