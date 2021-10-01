/* eslint-disable */

// import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-unresolved

import { mapBoxAccessToken } from '../../config'
import { serverBaseURL } from '../../services/api/index'
import store from '../../store'
import { displayClusters } from './clusters'
import { displayPolygonGroup } from './polygons'

mapboxgl.accessToken = mapBoxAccessToken

export const defaultBBox = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(51.2867602, 51.6918741),
  new mapboxgl.LngLat(-0.5103751, 0.3340155),
)

const SATELLITE_SOURCE_ID = 'satellite-agro'
export const POLYGON_GROUP_ID = 'polygon-group'

export const clusterPadding = { padding: 40 }
export const polygonPadding = {
  padding: { left: 20, right: 20, top: 20, bottom: 100 },
}
const purple = '#8965e0'
// const pink = "#f3a4b5";
const red = '#f5365c'
// const orange = "#fb6340";
export const basicBlueColor = '#0080ff'

export const basicColor = purple
export const activeColor = red
export const basicOpacity = 0.4
export const activeOpacity = 0.8

class AllPolygonsControl {
  constructor(mapBounds) {
    this.mapBounds = mapBounds
  }

  onAdd(map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    this.container.id = 'all-polygons-control'
    const button = this._createButton()
    this.container.appendChild(button)
    return this.container
  }

  onRemove() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
  }

  _createButton() {
    const el = window.document.createElement('button')
    el.className = 'all-polygons-control'
    el.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"/>'
    const { map } = this
    const { mapBounds } = this
    el.addEventListener(
      'click',
      (e) => {
        map.fitBounds(mapBounds, clusterPadding)
        e.stopPropagation()
      },
      false,
    )
    return el
  }
}

export const initialiseMap = (
  mapContainer,
  map,
  mapBounds,
  onLoad,
  onHover,
  onClick,
) => {
  // if (map.current) return;
  const { token } = store.getState().auth
  map.current = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
    bounds: mapBounds || defaultBBox,
    zoom: 9,
    accessToken: mapBoxAccessToken,
    fitBoundsOptions: { duration: 0, ...clusterPadding },

    transformRequest: (url) => {
      // eslint-disable-line
      if (
        url.indexOf(serverBaseURL) > -1 ||
        url.indexOf('http://k8s-eu4.owm.io') > -1
      ) {
        return {
          // eslint-disable-line
          url,
          headers: { Authorization: `Bearer ${token}` },
        }
      }
    },
  })
  map.current.addControl(
    new mapboxgl.NavigationControl({
      showCompass: false,
    }),
    'top-right',
  )
  const allPolygons = new AllPolygonsControl(mapBounds)
  map.current.addControl(allPolygons, 'top-right')

  map.current.on('load', function () {
    const { polygons } = store.getState()
    if (polygons.length) {
      displayPolygonGroup(map.current, mapBounds, polygons, onHover, onClick)
      displayClusters(map.current, polygons, onHover)
    }
    onLoad()
  })
  map.current.on('error', (e) => {
    // Hide those annoying non-error errors
    if (e && e.error.status !== 421) console.error(e)
  })
}

export const removeLayer = (map, layerId) => {
  if (map && map.getLayer(layerId)) {
    map.removeLayer(layerId)
  }
}

export const removeSource = (map, sourceId) => {
  if (map && map.getSource(sourceId)) {
    map.removeSource(sourceId)
  }
}

export const removeSatelliteLayer = (map) => {
  removeLayer(map, SATELLITE_SOURCE_ID)
  removeSource(map, SATELLITE_SOURCE_ID)
}

export const renderSatelliteImage = (map, tileUrl) => {
  removeSatelliteLayer(map)
  map.addLayer({
    id: SATELLITE_SOURCE_ID,
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [tileUrl],
      tileSize: 256,
    },
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'raster-opacity': 1,
    },
  })
}

export const deletePreviousAreas = (drawRef) => {
  if (drawRef && drawRef.current) {
    const data = drawRef.current.getAll()
    if (data.features.length) {
      if (drawRef.current.getMode() === 'draw_polygon') {
        const oldPolygonIds = []
        const newPolygonId = data.features[data.features.length - 1].id
        data.features.forEach((f) => {
          // f.geometry.type === 'Polygon' &&
          if (f.id !== newPolygonId) {
            oldPolygonIds.push(f.id)
          }
        })
        if (oldPolygonIds.length) {
          drawRef.current.delete(oldPolygonIds)
        }
      } else {
        drawRef.current.deleteAll()
      }
    }
  }
}
