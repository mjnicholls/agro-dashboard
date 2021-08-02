import React, {useEffect, useState} from 'react';

import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import {toDate} from "../../utils/dateTime";


const SatelliteLayersDropdown = ({selectedImage, selectedLayer, setSelectedLayer}) => {

  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      let newLayers = Object.keys(selectedImage.tile).map(layer => ({
          label: (layer === 'truecolor') ? 'True Color' : (layer === 'falsecolor') ? 'False Color' : layer.toUpperCase(),
          value: layer
        })
      )
      setLayers(newLayers)
      /** In case previously selected layer does not exist for this satellite image
       * select another layer
       * */
      let index = newLayers.findIndex(layer => layer.value === selectedLayer.value);
      if (index === -1) {
        setSelectedLayer(newLayers[0])
      }
    }
  }, [selectedImage])

  const selectLayer = (e, layer) => {
    e.preventDefault();
    setSelectedLayer(layer);
  }

  return  (
    selectedImage ?
      <>
        <h5 className="card-category">{toDate(selectedImage.dt)}</h5>
        <Row>
          <Col>
            <UncontrolledDropdown>
              <DropdownToggle
                aria-expanded={false}
                aria-haspopup={true}
                caret
                className="btn-block"
                color="primary"
                data-toggle="dropdown"
                id="dropdownMenuButton"
                type="button"
              >
                {selectedLayer.label}
              </DropdownToggle>
              <DropdownMenu aria-labelledby="dropdownMenuButton">
                {layers.map((layer, index) => {
                  if (layer.value !== selectedLayer.value) {
                    return (<DropdownItem
                      href="#pablo"
                      onClick={(e) => selectLayer(e, layer)}
                    >
                      {layer.label}
                    </DropdownItem>)
                  }
                  return null
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </> : null
    )
}

export default SatelliteLayersDropdown;