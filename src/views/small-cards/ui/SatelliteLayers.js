import React, {useEffect, useState} from 'react';

import {
  Col,
  DropdownItem,
  DropdownMenu,
  Row,
} from "reactstrap";
import classnames from "classnames";

const SatelliteLayers = ({satelliteImage, satelliteLayer, setSatelliteLayer}) => {
  /**
   * Dropdown that contains satellite layer options for selected satellite image
   * */

  const [layers, setLayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

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
    setIsOpen(false);
  }

  return  (
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
                <h2
                  className="mb-0"
                  style={{fontWeight: 100}}
                >{satelliteLayer ? satelliteLayer.label : "True color"}</h2>
                <i className="tim-icons icon-minimal-down dropdown-caret"/>
              </div>
              {
                satelliteImage ? <DropdownMenu aria-labelledby="dropdownMenuButton">
                {layers.map((layer, index) => {
                  if (layer.value !== satelliteLayer.value) {
                    return (<DropdownItem
                      // href="#pablo"
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
              </DropdownMenu> : null
              }

            </div>
          </Col>
        </Row>
      </>
    )
}

export default SatelliteLayers;