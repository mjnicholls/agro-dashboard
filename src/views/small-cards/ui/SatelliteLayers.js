import React, {useEffect, useState} from 'react';

import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from "reactstrap";

const SatelliteLayers = ({satelliteImage, satelliteLayer, setSatelliteLayer}) => {
  /**
   * Dropdown that contains satellite layer options for selected satellite image
   * */

  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (satelliteImage) {
      let newLayers = Object.keys(satelliteImage.tile).map(layer => ({
          label: (layer === 'truecolor') ? 'True Color' : (layer === 'falsecolor') ? 'False Color' : layer.toUpperCase(),
          value: layer
        })
      )
      setLayers(newLayers)
      /** In case previously selected layer does not exist for this satellite image
       * select another layer
       * */
      let index = newLayers.findIndex(layer => layer.value === satelliteLayer.value);
      if (index === -1) {
        setSatelliteLayer(newLayers[0])
      }
    }
  }, [satelliteImage, satelliteLayer])

  const selectLayer = (e, layer) => {
    e.preventDefault();
    setSatelliteLayer(layer);
  }

  return  (
      <>
        <h2 className="card-category">Layer</h2>
        <Row>
          <Col>
              {satelliteImage ?
                <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  className="btn-link btn-icon"
                  color="default"
                  data-toggle="dropdown"
                  style={{width: "100%", display: "flex", alignItems: "center"}}
                  >
                    <h2 className="mb-0"
                      style={{fontWeight: 100}}
                    >
                      {satelliteLayer.label}
                      {/*{satelliteLayer ? satelliteLayer.label : "NDVI"}*/}
                      </h2>
                  </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
              {layers.map((layer, index) => {
                if (layer.value !== satelliteLayer.value) {
                  return (<DropdownItem
                    key={"layer_" + index}
                    onClick={(e) => {
                      selectLayer(e, layer)
                    }}
                  >
                    {layer.label}
                  </DropdownItem>)
                }
                return null
              })}
                </DropdownMenu></UncontrolledDropdown> : null
            }
          </Col>
        </Row>
      </>
    )
}

export default SatelliteLayers;