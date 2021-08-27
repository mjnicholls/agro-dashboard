import {removeLayer, removeSource} from "./base";

const CLUSTER_SOURCE_ID = 'polygon_clusters';

export const displayClusters = (map, polygons, onHover) => {

  const CLUSTER_MAX_ZOOM = 12;

  let ids = [
    'clusters',
    'cluster-count',
    'unclustered-point',
    'uncluster-count'
  ]

  ids.forEach((id) => {removeLayer(map, id)})
  removeSource(map, CLUSTER_SOURCE_ID)

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
         properties: polygon,
         polygonProperties: polygon
      })
    )
  }

  map.addSource(CLUSTER_SOURCE_ID, {
    type: 'geojson',
    data: tmp,
    cluster: true,
    clusterMaxZoom: CLUSTER_MAX_ZOOM, // Max zoom to cluster points on
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
    maxzoom: CLUSTER_MAX_ZOOM
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
    maxzoom: CLUSTER_MAX_ZOOM
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
    maxzoom: CLUSTER_MAX_ZOOM
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
      maxzoom: CLUSTER_MAX_ZOOM
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
      if (!zoom) return;

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
    let bbox = features[0].properties.bbox;
    let bounds = typeof bbox === "string" ? JSON.parse(bbox) : bbox;
    map.fitBounds(bounds, {padding: 165});
    }
  );

  if (onHover) {
    map.on('mouseenter', 'unclustered-point', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      let features = map.queryRenderedFeatures(e.point, {layers: ['unclustered-point']});
      onHover(features[0].properties)
    });

    map.on('mouseenter', 'clusters', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      let features = map.queryRenderedFeatures(e.point, {layers: ['clusters']});
      let clusterId = features[0].properties.cluster_id;
      let pointCount = features[0].properties.point_count
      let clusterSource = map.getSource(CLUSTER_SOURCE_ID);
      clusterSource.getClusterLeaves(clusterId, pointCount, 0, function(err, aFeatures){
        if (aFeatures) {
          let res = aFeatures.map(leaf => leaf.properties)
          onHover(res)
        }
      })
    });

    // map.on('mouseleave', 'unclustered-point', function () {
    //   onHover(null)
    // })
    //
    // map.on('mouseleave', 'clusters', function () {
    //   onHover(null)
    // })
  }
}
