/* eslint-disable */
import React from 'react';

import VectorMap, {
  Layer,
  Export,
  Title,
  Label,
} from 'devextreme-react/vector-map';

import { coverage } from '../../utils/coverage';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';

const projection = {
  to: ([l, lt]) => [l / 100, lt / 100],
  from: ([x, y]) => [x * 100, y * 100]
};

export default function Mapp() {
  return (
    <VectorMap
      id="vector-map"
      maxZoomFactor={2}
      projection={projection}
      style={{height: "570px"}}
    >
      <Title text="Openweather map" subtitle="with polygons"></Title>

        <Layer
        dataSource={mapsData.world}
        hoverEnabled={false}
        name="45UXA">
      </Layer>
      <Layer
        dataSource={coverage}
        hoverEnabled={false}
        name="coordinates"
        color="#bb7862">
   </Layer> 
      <Layer
        dataSource={coverage}
        customize={customizeLayer}>
        <Label enabled={true} dataField="coordinates"></Label>
      </Layer>
      <Export enabled={true}></Export>
    </VectorMap>
  );
}

function customizeLayer(elements) {
  elements.forEach((element) => {
    element.applySettings({
      //color: element.attribute('color')
    });
  });
}

