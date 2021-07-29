import { createSelector } from 'reselect';

const getTotalBbox = (bboxes) => {
  let minlng = Math.min.apply(null, bboxes.map(x =>x[0][0]));
  let minlat = Math.min.apply(null, bboxes.map(x =>x[0][1]));
  let maxlng = Math.max.apply(null, bboxes.map(x =>x[1][0]));
  let maxlat = Math.max.apply(null, bboxes.map(x =>x[1][1]));
  return [[minlng, minlat], [maxlng, maxlat]];
}

export const getMapBounds = createSelector(
  // First, pass one or more "input selector" functions:
  state => state.polygons,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  polygons => polygons.length ? getTotalBbox(polygons.map(polygon => polygon.bbox)) : null
)
