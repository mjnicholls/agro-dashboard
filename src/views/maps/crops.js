import { cropColorDict } from '../../config'
import { removeLayer, removeSource } from './base'

export const cropsSourceId = 'crops-agro'
const cropsIndexId = 'crops-index'
const maxPolygonsZoom = 10

export const displayCropLayerCropMap = (map, year, displayInfo) => {
  removeLayer(map, cropsIndexId)
  removeLayer(map, cropsSourceId)
  removeSource(map, cropsSourceId)

  map.addSource(cropsSourceId, {
    type: 'vector',
    tiles: [
      `https://api.agromonitoring.com/cropmap/prod/{z}/{x}/{y}.pbf?year=${year}`,
    ],
    minzoom: 2,
    maxzoom: 15,
    promoteId: { valid: 'id' },
  })

  map.addLayer(
    {
      id: cropsSourceId,
      type: 'fill',
      source: cropsSourceId,
      'source-layer': 'valid',
      minzoom: maxPolygonsZoom,
      maxzoom: 15,
      layout: {},
      filter: ['all', ['>', ['*', 2, ['get', 'cdpr']], ['get', 'cdsm']]],
      paint: {
        'fill-color': getCropColorCase(),
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.3,
          0.9,
        ],
      },
    },
    // onTopOfLayer ? onTopOfLayer : "", TODO
  )

  map.addLayer({
    id: cropsIndexId,
    type: 'fill',
    source: cropsSourceId,
    'source-layer': 'valid',
    minzoom: 2,
    maxzoom: maxPolygonsZoom,
    layout: {},
    paint: {
      'fill-color': '#AA00FF',
      'fill-opacity': 0.3,
    },
  })

  let hoveredStateId = null

  map.on('mousemove', cropsSourceId, (e) => {
    if (map.getZoom() < maxPolygonsZoom) return

    if (e.features.length) {
      map.getCanvas().style.cursor = 'auto'
      if (hoveredStateId) {
        map.setFeatureState(
          { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
          { hover: false },
        )
      }
      hoveredStateId = e.features[0].id
      map.setFeatureState(
        { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
        { hover: true },
      )
      if (e.features[0].properties) {
        displayInfo({
          ...e.features[0].properties,
          lat: e.lngLat.lat,
        })
      }
    }
  })

  map.on('mouseleave', cropsSourceId, () => {
    map.getCanvas().style.cursor = ''
    if (hoveredStateId && map.getSource(cropsSourceId)) {
      map.setFeatureState(
        { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
        { hover: false },
      )
    }
    hoveredStateId = null
  })

  map.on('mousemove', cropsIndexId, (e) => {
    if (e.features.length) {
      displayInfo({ message: 'Please zoom in for details' })
    }
  })

  map.on('mouseleave', cropsIndexId, () => {
    displayInfo({ message: 'No detected fields in this area' })
  })
}

export const displayCropLayerPolygonCreation = (map, drawRef, updateArea) => {
  removeLayer(map, cropsIndexId)
  removeLayer(map, cropsSourceId)
  removeSource(map, cropsSourceId)

  map.addSource(cropsSourceId, {
    type: 'vector',
    tiles: ['https://api.agromonitoring.com/cropmap/zz/{z}/{x}/{y}.pbf'],
    minzoom: 2,
    maxzoom: 15,
    promoteId: { valid: 'id' },
  })

  map.addLayer(
    {
      id: cropsSourceId,
      type: 'fill',
      source: cropsSourceId,
      'source-layer': 'valid',
      minzoom: maxPolygonsZoom,
      maxzoom: 15,
      layout: {},
      filter: ['all', ['>', ['*', 2, ['get', 'cdpr']], ['get', 'cdsm']]],
      paint: {
        'fill-color': getCropColorCase(),
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.3,
          0.9,
        ],
      },
    },
    // onTopOfLayer ? onTopOfLayer : "", TODO
  )

  map.addLayer({
    id: cropsIndexId,
    type: 'fill',
    source: cropsSourceId,
    'source-layer': 'valid',
    minzoom: 2,
    maxzoom: maxPolygonsZoom,
    layout: {},
    paint: {
      'fill-color': '#AA00FF',
      'fill-opacity': 0.3,
    },
  })

  let hoveredStateId = null

  map.on('mousemove', cropsSourceId, (e) => {
    if (map.getZoom() < maxPolygonsZoom) return

    if (e.features.length) {
      map.getCanvas().style.cursor = 'auto'
      if (hoveredStateId) {
        map.setFeatureState(
          { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
          { hover: false },
        )
      }
      hoveredStateId = e.features[0].id
      map.setFeatureState(
        { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
        { hover: true },
      )
    }
  })

  map.on('mouseleave', cropsSourceId, () => {
    map.getCanvas().style.cursor = ''
    if (hoveredStateId && map.getSource(cropsSourceId)) {
      map.setFeatureState(
        { source: cropsSourceId, sourceLayer: 'valid', id: hoveredStateId },
        { hover: false },
      )
    }
    hoveredStateId = null
  })

  map.on('click', cropsSourceId, (e) => {
    const feature = e.features[0]
    // сравнить с предыдущим слоем
    const data = drawRef.current.getAll()
    if (data.features.length) {
      // 2 варианта, либо тут тот же полигон - edit, либо другой - тогда его нужно удалить
      data.features.forEach((f) => {
        if (f.id !== feature.id) {
          // прошлый полигон - удаляем
          drawRef.current.delete(f.id)
        } else {
          // тот же полигон - редактируем
          // setMode("draw")
        }
      })
    } else {
      drawRef.current.add(feature)
    }
    updateArea()
  })
}

export const removeCropLayer = (map) => {
  removeLayer(map, cropsSourceId)
  removeSource(map, cropsSourceId)
  removeLayer(map, cropsIndexId)
  removeSource(map, cropsIndexId)
}

/* eslint-disable */
const getCropColorCase = () => {
  const c = ['case']
  for (const cid in cropColorDict) {
    // eslint-disable-line
    c.push(['==', ['get', 'cdid'], cid])
    let cl = cropColorDict[cid].color
    if (cropColorDict[cid].visible === 0) {
      cl = 'rgba(150,150,150,0)'
    }
    c.push(cl)
  }
  c.push('rgb(102, 102, 102)')
  return c
}

/* eslint-enable */

export const getCropName = (cid) =>
  cid && cropColorDict[cid] ? cropColorDict[cid].name : ''
