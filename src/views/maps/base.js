import React from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import {mapBoxAccessToken} from '../../config'
import {serverBaseURL} from "../../services/api/index";
import store from "../../store";
import {setActivePoly} from "../../features/state/actions";


mapboxgl.accessToken = mapBoxAccessToken;

export const defaultBBox = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(51.2867602, 51.6918741),
  new mapboxgl.LngLat(-0.5103751, 0.3340155)
);

export const clusterPadding = {padding: 40};
export const polygonPadding = {padding: {left: 20, right: 20, top: 20, bottom: 100}};
// green
// export const basicColor = "#006400";
// export const activeColor = '#00FC00';
const blue = "#5e72e4";
const indigo = "#5603ad";
const purple = "#8965e0";
const pink = "#f3a4b5";
const red = "#f5365c";
const orange = "#fb6340";

export const basicColor = purple;
export const activeColor = red;
export const basicOpacity = 0.4;
export const activeOpacity = 0.8;

export const basicBlueColor = '#0080ff';
const satelliteSourceId = 'satellite-agro';

class allPolygonsControl {

  constructor(mapBounds) {
    this.mapBounds = mapBounds;
  }

  onAdd(map){
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    const button = this._createButton()
    this.container.appendChild(button);
    return this.container;
  }
  onRemove(){
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
  _createButton() {
    const el = window.document.createElement('button');
    el.className = "all-polygons-control";
    el.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"/>';
    let map = this.map;
    let mapBounds = this.mapBounds;
    el.addEventListener('click',(e) => {
      map.fitBounds(mapBounds, clusterPadding)
      e.stopPropagation()
    },false )
    return el;
  }
}

export const initialiseMap = (mapContainer, map, mapBounds, onLoad, setPolygonInFocus) => {
  // if (map.current) return;
  const token = store.getState().auth.token;
  map.current = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    bounds: mapBounds ? mapBounds : defaultBBox,
    zoom: 9,
    accessToken: mapBoxAccessToken,
    fitBoundsOptions: { duration: 0, ...clusterPadding },
    transformRequest: (url) => {
      if (url.indexOf(serverBaseURL) > -1 || url.indexOf("http://k8s-eu4.owm.io") > -1) {
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
  const allPolygons = new allPolygonsControl(mapBounds);
  map.current.addControl(allPolygons, 'top-right');

  map.current.on('load', function () {
    const polygons = store.getState().polygons;
    if (polygons.length) {
      for (let i=0; i<polygons.length; i++) {
        addPolygon(map.current, polygons[i], setPolygonInFocus)
      }
      displayClusters(map.current, polygons)
    }


    onLoad()
  })
}

export const displayPolygons = (map, mapBounds, polygons, onClick) => {
  /** Add all polygons to the map
   * Set bounds to contain all polygons
   */
  for (let i=0; i<polygons.length; i++) {
    addPolygon(map, polygons[i], onClick)
  }
  if (mapBounds) {
    map.fitBounds(mapBounds, clusterPadding)
  }
}

export const displayClusters = (map, polygons) => {

  const CLUSTER_SOURCE_ID = 'polygon_clusters';

  let ids = [
    'clusters',
    'cluster-count',
    'unclustered-point',
    'uncluster-count'
  ]
  for (let i=0; i<ids.length; i++) {
     if (map.getLayer(ids[i])) {
       map.removeLayer(ids[i])
     }
  }
  if (map.getSource(CLUSTER_SOURCE_ID)) {
    map.removeSource(CLUSTER_SOURCE_ID);
  }

  // if (map.getSource(CLUSTER_SOURCE_ID)) {
  //   return
  // }

  let tmp = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    },
    features: polygons.map(polygon =>
       ({
         type: "Feature",
         geometry: {
           type: "Point",
           coordinates: polygon.center
         },
         properties: {
           bbox: polygon.bbox
         }
      })
    )
  }

  map.addSource(CLUSTER_SOURCE_ID, {
    type: 'geojson',
    data: tmp,
    cluster: true,
    clusterMaxZoom: 11, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  })

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: CLUSTER_SOURCE_ID,
    // filter: ['has', 'point_count'],
    paint: {
    'circle-color':
      [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        10,
        '#f1f075',
        20,
        '#f28cb1'  // '#e14eca'
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,
      100,
      30,
      750,
      40
    ]
    },
    maxzoom: 11
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: CLUSTER_SOURCE_ID,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    },
    maxzoom: 11
  });

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: CLUSTER_SOURCE_ID,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#51bbd6',
      'circle-radius': 20,
    },
    maxzoom: 11
  });

  map.addLayer({
      id: 'uncluster-count',
      type: 'symbol',
      source: CLUSTER_SOURCE_ID,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': '1',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      maxzoom: 11
    });

  map.on('click', 'clusters', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource(CLUSTER_SOURCE_ID).getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
      if (err) return;

    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
      });
      }
    );});

  map.on('click', 'unclustered-point', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['unclustered-point']
    });
    let polygonBbox = new mapboxgl.LngLatBounds(JSON.parse(features[0].properties.bbox))

    map.fitBounds(polygonBbox, {padding: 165});
      }
    );
}

const addPolygon = (map, polygon, setPolygonInFocus) => {

  if (map.getSource(polygon.id)) {
    return
  }

  map.addSource(polygon.id, {
    type: 'geojson',
    data: polygon.geo_json,
  })

  map.addLayer({
    id: "layer_" + polygon.id,
    type: 'fill',
    source: polygon.id,
    layout: {},
    paint: {
      'fill-color': basicColor,
      'fill-opacity': basicOpacity
    },
  });

  map.addLayer({
    id: 'outline_' + polygon.id,
    type: 'line',
    source: polygon.id,
    layout: {},
    paint: {
      'line-color': basicColor,
      'line-width': 2
    },
  });

  map.on('mouseenter', "layer_" + polygon.id, function (e) {
    map.getCanvas().style.cursor = 'pointer';
    if (setPolygonInFocus) {
      setPolygonInFocus(polygon)
    }
  });

  map.on('mouseleave', 'layer_'  + polygon.id, function () {
    map.getCanvas().style.cursor = '';
    if (setPolygonInFocus) {
      setPolygonInFocus(null)
    }
  });

  let polygonBbox = new mapboxgl.LngLatBounds(polygon.bbox);

  map.on('click', "layer_" + polygon.id, () => {
    map.fitBounds(polygonBbox);
    store.dispatch(setActivePoly(polygon))
  });

  map.on('click', "outline_" + polygon.id, () => {
    map.fitBounds(polygonBbox);
    });
  }

export const removeLayer = (map, sourceId) => {
  if (map) {
    if (map.getLayer(sourceId)) {
      map.removeLayer(sourceId);
    }
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }
  }
}

export const removeSatelliteLayer = (map) => {
  removeLayer(map, satelliteSourceId)
}

export const renderSatelliteImage = (map, tileUrl) => {
  removeSatelliteLayer(map);
  map.addLayer({
    id: satelliteSourceId,
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [tileUrl],
    },
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'raster-opacity': 1
    }
  });
}

export const deletePreviousAreas = (drawRef) => {
  if (drawRef && drawRef.current) {
    const data = drawRef.current.getAll();
    if (data.features.length) {
      if (drawRef.current.getMode() === 'draw_polygon') {
        let oldPolygonIds = []
        const newPolygonId = data.features[data.features.length - 1].id;
        data.features.forEach((f) => {
          // f.geometry.type === 'Polygon' &&
          if (f.id !== newPolygonId) {
            oldPolygonIds.push(f.id)
          }
        })
        console.log(data.features);
        console.log("oldPolygonIds", oldPolygonIds)
        if (oldPolygonIds.length) {
          drawRef.current.delete(oldPolygonIds);
        }
      } else {
        drawRef.current.deleteAll()
      }
    }


  }
}



