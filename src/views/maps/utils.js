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
