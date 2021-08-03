import React, {useEffect, useState} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Collapse,
} from "reactstrap";


const SatelliteLayersDropdown = ({selectedImage, selectedLayer, setSelectedLayer}) => {

  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  }

  return  (
    (selectedLayer && layers) ?
    <Col md="4" sm="4" xs="6" style={{position: 'absolute', top: '10px', right: '50px', zIndex: 1000}}>
     <Card>
        <div
          aria-multiselectable={true}
          className="card-collapse"
          id="accordion"
          role="tablist"
        >
          <Card className="card-plain">
            <CardHeader role="tab">
              <a
                aria-expanded={isOpen}
                href="#pablo"
                data-parent="#accordion"
                data-toggle="collapse"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                {selectedLayer.label}
                <i className="tim-icons icon-minimal-down" />
              </a>
            </CardHeader>
            <Collapse role="tabpanel" isOpen={isOpen}>
              <CardBody className="card">
                {layers.map((layer, index) => {
                  if (layer.value !== selectedLayer.value) {
                    return (<a
                      key={'layer_' + index}
                      aria-expanded={isOpen}
                      href="#pablo"
                      data-parent="#accordion"
                      data-toggle="collapse"
                      onClick={(e) => {
                        selectLayer(e, layer)
                      }}
                      style={{paddingLeft: 0}}
                    >{layer.label}
                    </a>)
                  }
                  return null
                })}
              </CardBody>
            </Collapse>
          </Card>
        </div>
      </Card>
    </Col> : null)
}

export default SatelliteLayersDropdown;