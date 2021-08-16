import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {cropColorDict, mapBoxAccessToken} from '../../config'
import {serverBaseURL} from "../../services/api/index";
import store from "../../store";
import {setActivePoly} from "../../features/state/actions";

mapboxgl.accessToken = mapBoxAccessToken;

export const defaultBBox = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(51.2867602, 51.6918741),
  new mapboxgl.LngLat(-0.5103751, 0.3340155)
);

export const basicColor = "#006400";
export const basicOpacity = 0.4;
export const basicBlueColor = '#0080ff';
export const activeColor = '#00FC00';
// export const activeColor = '#8512B0';
// export const activeColor = '#e14eca';
const satelliteSourceId = 'satellite-agro';
export const cropsSourceId = 'crops-agro';

export const initialiseMap = (mapContainer, map, mapBounds, onLoad, setPolygonInFocus) => {
  // if (map.current) return;
  const token = store.getState().auth.token;
  map.current = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    bounds: mapBounds ? mapBounds : defaultBBox,
    zoom: 9,
    accessToken: mapBoxAccessToken,
    fitBoundsOptions: { duration: 0, padding: 20 },
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
    // map.current.setPadding({left: 20, right: 20, top: 20, bottom: 100})
    for (let i=0; i<polygons.length; i++) {
      addPolygon(map.current, polygons[i], setPolygonInFocus)
    }
    if (polygons.length) {
      addClusters(map.current, polygons)
    }
    onLoad()
  })
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
      'fill-color': activeColor,
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

  // let popup = new mapboxgl.Popup({
  //   closeButton: false,
  //   closeOnMove: true,
  //   closeOnClick: true
  // })

  map.on('mouseenter', "layer_" + polygon.id, function (e) {
    map.getCanvas().style.cursor = 'pointer';
    // popup
    //   .setLngLat(e.lngLat)
    //   .setHTML(polygon.name + ', ' + polygon.area.toFixed(2) + 'ha    ')
    //   .addTo(map);
    if (setPolygonInFocus) {
      setPolygonInFocus(polygon)
    }
  });

  map.on('mouseleave', 'layer_'  + polygon.id, function () {
    map.getCanvas().style.cursor = '';
    // popup.remove();
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

export const addClusters = (map, polygons) => {

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

export const removeCropLayer = (map) => {
  removeLayer(map, cropsSourceId);
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
    maxzoom: 22
  });
}

export const renderCrop = (map) => {

  map.addSource(cropsSourceId, {
    type: 'vector',
    tiles: ['https://api.agromonitoring.com/cropmap/zz/{z}/{x}/{y}.pbf'],
    // tiles: [tileUrl],
    minzoom: 9,
    maxzoom: 15,
    promoteId: {valid: "id"}
  })
  map.addLayer({
    id: cropsSourceId,
    type: 'fill',
    source: cropsSourceId,
    "source-layer": 'valid',
        // 'maxzoom' : 15,
    layout: {},
    paint: {
      // 'fill-color': getCropColorCase(),
      'fill-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        basicBlueColor, getCropColorCase()
      ],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.7, 0.9
      ]
    },
  });

  let hoveredStateId = null;

  map.on('mousemove', cropsSourceId, function (e) {
    if (map.getZoom()<9)
        return;

    if (e.features.length > 0) {
      map.getCanvas().style.cursor = 'auto';
      if (hoveredStateId) {
        map.setFeatureState(
          { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
        { hover: true }
      );
    }
  });

  map.on('mouseleave', cropsSourceId, function () {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId) {
      map.setFeatureState(
        { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });

  // map.on('click', cropsSourceId, function (e) {
  //   let feature = e.features[0].geometry;
  //   console.log("click", feature) //
  // })

}

const getCropColorCase = () => {
  let c = ['case'];
  for (let cid in cropColorDict) {
      c.push(['==', ['get', 'cdid'], cid]);
      let cl = cropColorDict[cid]['color'];
      if ( cropColorDict[cid]['visible'] === 0 ){
          cl = "rgba(150,150,150,0)";
      }
      c.push(cl);
  }
  c.push("rgb(102, 102, 102)");
  return c;
}