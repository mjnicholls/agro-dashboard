import React, {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
} from "reactstrap";
import {toDate} from "../../utils/dateTime";


const SatelliteLayersDropdown = ({name, selectedImage, selectedLayer, setSelectedLayer}) => {

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
    <Card style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1}}>
      <div
        aria-multiselectable={true}
        className="card-collapse"
        id="accordion"
        role="tablist"
      >
      <Card className="card-plain"  >
        <CardHeader role="tab" style={{paddingTop: 0, backgroundColor: "none"}}>
          <h5 className="card-category">{toDate(selectedImage.dt)}</h5>
          <a
            className="horizontal-container justify"
            style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
            aria-expanded={isOpen}
            href="#pablo"
            data-parent="#accordion"
            data-toggle="collapse"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
          >
            <h2 style={{marginBottom: 0}}>{selectedLayer.label}</h2>
            <i className="tim-icons icon-minimal-down" style={{color: "rgba(255, 255, 255, 0.8)"}}/>
          </a>
        </CardHeader>
        <Collapse role="tabpanel" isOpen={isOpen}  style={{zIndex: 1}}>
          <CardBody className="card" style={{zIndex: 1}}>
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
  </Card> : null)
}

export default SatelliteLayersDropdown;