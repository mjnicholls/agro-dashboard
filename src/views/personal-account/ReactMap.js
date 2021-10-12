/* eslint-disable */
import React from 'react';

import Map, {
  Export,
  Label,
  Layer,
  Legend,
  Source,
  Subtitle,
  Title,
  Tooltip,
  Size
} from 'devextreme-react/vector-map';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import { countriesGDP } from './data';
import TooltipTemplate from './tooltip';

const colorGroups = [0, 10000, 50000, 100000, 500000, 1000000, 10000000, 50000000, 10000000000];
const mapBounds = [-180, 85, 180, -60];
function customizeLayer(elements) {
  elements.forEach((element) => {
    const countryGDPData = countriesGDP[element.attribute('name')];
    element.attribute('total', countryGDPData && countryGDPData.total || 0);
  });
}


function Mapp() {
  return (
    <Map bounds={mapBounds}>
      <Size height={500} />
      <Layer
        name="areas"
        dataSource={mapsData.world}
        colorGroups={colorGroups}
        colorGroupingField="total"
        customize={customizeLayer}
      >
        <Label dataField="name" enabled={true} />
      </Layer>

      <Title text="Nominal GDP">
        <Subtitle text="(in millions of US dollars)" />
      </Title>

      <Tooltip enabled={true}
        contentRender={TooltipTemplate} />
      <Export enabled={true} />
    </Map>
  );
}
export default Mapp;