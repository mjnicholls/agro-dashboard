import { createSelector } from 'reselect'

const getTotalBbox = (bboxes) => {
  const minlng = Math.min.apply(
    null,
    bboxes.map((x) => x[0][0]),
  )
  const minlat = Math.min.apply(
    null,
    bboxes.map((x) => x[0][1]),
  )
  const maxlng = Math.max.apply(
    null,
    bboxes.map((x) => x[1][0]),
  )
  const maxlat = Math.max.apply(
    null,
    bboxes.map((x) => x[1][1]),
  )
  return [
    [minlng, minlat],
    [maxlng, maxlat],
  ]
}

export const getMapBounds = createSelector(
  // First, pass one or more "input selector" functions:
  (state) => state.polygons.data,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (data) =>
    data.length ? getTotalBbox(data.map((polygon) => polygon.bbox)) : null,
)
