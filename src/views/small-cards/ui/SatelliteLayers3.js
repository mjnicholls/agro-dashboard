import React, {useEffect, useState} from 'react';

import {
  Col,
  DropdownItem,
  DropdownMenu,
  Row,
} from "reactstrap";
import classnames from "classnames";

const SatelliteLayersDropdown = ({selectedImage, selectedLayer, setSelectedLayer}) => {

  const [layers, setLayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

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
        <h2 className="card-category">Layer</h2>
        <Row>
          <Col>
            <div className={classnames("dropdown agro-dropdown", {
              "show": isOpen,
            })}>
              <div className="dropdown horizontal-container justify"
                aria-expanded={false}
                aria-haspopup={true}
                data-toggle="dropdown"
                id="dropdownMenuButton"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                <h2 className="mb-0">{selectedLayer.label}</h2>
                <i className="tim-icons icon-minimal-down dropdown-caret"/>
              </div>
              <DropdownMenu aria-labelledby="dropdownMenuButton">
                {layers.map((layer, index) => {
                  if (layer.value !== selectedLayer.value) {
                    return (<DropdownItem
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedLayer(layer);
                        // selectLayer(e, layer)
                        setIsOpen(false)
                      }}
                      key={"layer_" + index}
                    >
                      {layer.label}
                    </DropdownItem>)
                  }
                  return null
                })}
              </DropdownMenu>
            </div>
          </Col>
        </Row>
      </> : null
    )
}

export default SatelliteLayersDropdown;