import {
  basicColor,
  basicOpacity,
  clusterPadding,
  POLYGON_GROUP_ID,
  polygonPadding,
  removeLayer,
  removeSource,
} from './base'

export const displayPolygonGroup = (
  map,
  mapBounds,
  polygons,
  onHover,
  onClick,
) => {
  const OUTLINE_LAYER_ID = `outline_${POLYGON_GROUP_ID}`

  removeLayer(map, OUTLINE_LAYER_ID)
  removeLayer(map, POLYGON_GROUP_ID)
  removeSource(map, POLYGON_GROUP_ID)

  const tmp = {
    type: 'FeatureCollection',
    features: polygons.map((polygon) => ({
      properties: polygon,
      type: 'Feature',
      geometry: polygon.geo_json.geometry,
    })),
  }
  map.addSource(POLYGON_GROUP_ID, {
    type: 'geojson',
    data: tmp,
  })
  map.addLayer({
    id: POLYGON_GROUP_ID,
    type: 'fill',
    source: POLYGON_GROUP_ID,
    paint: {
      'fill-color': basicColor,
      'fill-opacity': basicOpacity,
    },
  })
  map.addLayer({
    id: OUTLINE_LAYER_ID,
    type: 'line',
    source: POLYGON_GROUP_ID,
    layout: {},
    paint: {
      'line-color': basicColor,
      'line-width': 2,
    },
  })

  if (onHover) {
    map.on('mouseenter', POLYGON_GROUP_ID, (e) => {
      /* eslint-disable-next-line */
      map.getCanvas().style.cursor = 'pointer'
      const features = map.queryRenderedFeatures(e.point, {
        layers: [POLYGON_GROUP_ID, OUTLINE_LAYER_ID],
      })
      if (features.length) {
        onHover(features[0].properties)
      }
    })
    map.on('mouseleave', POLYGON_GROUP_ID, () => {
      onHover(null)
    })
  }

  map.on('click', POLYGON_GROUP_ID, (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [POLYGON_GROUP_ID, OUTLINE_LAYER_ID],
    })
    if (features.length) {
      const polygon = features[0].properties
      polygon.bbox =
        typeof polygon.bbox === 'string'
          ? JSON.parse(polygon.bbox)
          : polygon.bbox
      if (onClick) {
        polygon.geo_json =
          typeof polygon.geo_json === 'string'
            ? JSON.parse(polygon.geo_json)
            : polygon.geo_json
        polygon.center =
          typeof polygon.center === 'string'
            ? JSON.parse(polygon.center)
            : polygon.center
        polygon.pixels =
          typeof polygon.pixels === 'string'
            ? JSON.parse(polygon.pixels)
            : polygon.pixels
        onClick(polygon)
      } else {
        map.fitBounds(polygon.bbox, polygonPadding)
      }
    }
  })
  if (mapBounds) {
    if (polygons.length > 1) {
      map.fitBounds(mapBounds, clusterPadding)
    } else {
      map.setCenter(polygons[0].center)
      map.setZoom(12)
    }
  }
}
