import React, {useEffect, useState} from 'react';

import {
  Col,
  Row,
} from "reactstrap";
import Select from "react-select";


import {availableLayers} from '../../../config'

const SatelliteLayers = ({satelliteImage, satelliteLayer, setSatelliteLayer}) => {
  /**
   * Dropdown that contains satellite layer options for selected satellite image
   * */

  const [layers, setLayers] = useState([]);

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      minHeight: "290px",
    }),
    menuList: (provided) => ({
      ...provided,
      minHeight: "270px",
    }),
};

  useEffect(() => {
    if (satelliteImage) {
      let newLayers = availableLayers.filter(layer => satelliteImage.tile[layer.value])
      setLayers(newLayers)
      /** In case previously selected layer does not exist for this satellite image
       * select another layer
       * */
      let index = newLayers.findIndex(layer => layer.value === satelliteLayer);
      if (index === -1) {
        setSatelliteLayer(newLayers[0])
      }
    }
  }, [satelliteImage, satelliteLayer])

  const getPlaceholder = () => {
    let res = 'Statistics';
    if (layers) {
      let currentLayer = layers.find(layer => layer.value === satelliteLayer)
      if (currentLayer) {
        res = currentLayer.label;
      }
    }
    return res
  }

  return  (
      <>
        <h2 className="card-category">Layer</h2>
        <Row>
          <Col>
              <Select
                className="react-select info agro-layer-select"
                classNamePrefix="react-select"
                name="singleSelect"
                value={satelliteLayer}
                onChange={(layer) => setSatelliteLayer(layer.value)}
                options={layers.filter(layer => layer.value !== satelliteLayer)}
                placeholder={getPlaceholder()}
                styles={customStyles}
              />
          </Col>
        </Row>
      </>
    )
}

export default SatelliteLayers;