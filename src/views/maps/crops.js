import {basicBlueColor, removeLayer} from "./base";
import {cropColorDict} from "../../config";

export const cropsSourceId = 'crops-agro';
const cropsIndexId = 'crops-index';

export const displayCropLayer = (map) => {

  map.addSource(cropsSourceId, {
    type: 'vector',
    tiles: ['https://api.agromonitoring.com/cropmap/zz/{z}/{x}/{y}.pbf'],
    minzoom: 9,
    maxzoom: 15,
    promoteId: {valid: "id"}
  })
  map.addLayer({
    id: cropsSourceId,
    type: 'fill',
    source: cropsSourceId,
    "source-layer": 'valid',
    layout: {},
    paint: {
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

  displayCropIndexLayer(map);
  // map.on('click', cropsSourceId, function (e) {
  //   let feature = e.features[0].geometry;
  //   console.log("click", feature) //
  // })

}

const displayCropIndexLayer = (map) => {

  map.addSource(cropsIndexId, {
        'type': 'vector',
        'tiles': ['https://api.agromonitoring.com/cropmap/index/{z}/{x}/{y}.pbf'],
        'minzoom': 2,
        'maxzoom': 8,
        "promoteId": {"valid": "id"}
    });

    map.addLayer({
        'id': cropsIndexId,
        'type': 'fill',
        'source': cropsIndexId,
        'source-layer': 'valid',
        'maxzoom' : 9,
        'layout': {},
        'paint': {
            'fill-color': '#AA00FF',
            'fill-opacity': 0.3
        },
    }, 'clusters');
}

export const removeCropLayer = (map) => {
  removeLayer(map, cropsSourceId);
  removeLayer(map, cropsIndexId);
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