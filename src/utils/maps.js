import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {mapBoxAccessToken} from '../config'

mapboxgl.accessToken = mapBoxAccessToken;

export const basicColor = "#006400";
export const basicOpacity = 0.4;
// export const basicColor = '#0080ff';
export const activeColor = '#00FC00';
// export const activeColor = '#8512B0';
// export const activeColor = '#e14eca';
const satelliteSourceId = 'satellite';


export const displayPolygons = (map, mapBounds, polygons, onClick) => {
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

    map.on('click', "layer_" + polygon.id, function (e) {
      map.fitBounds(polygonBbox, {
          padding: 20
        });
      onClick(polygon);
      });

    map.on('click', "outline_" + polygon.id, function (e) {
      map.fitBounds(polygonBbox, {
          padding: 20
        });
      onClick(polygon);
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

  // map.addSource(satelliteSourceId, {
  //   'type': 'raster',
  //   'tiles': [ tileUrl ],
  //   'tileSize': 256
  // });
  //
  // map.addLayer(
  //   {
  //     'id': satelliteSourceId,
  //     'type': 'raster',
  //     'source': satelliteSourceId,
  //     'paint': {}
  //   }
  // );


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
  return [[minlng, minlat], [maxlng, maxlat]];

}
