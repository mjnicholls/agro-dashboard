import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Collapse,
} from "reactstrap";


const LayersDropdown = ({selectedLayer, layers, setLayer}) => {

  const [openedCollapse, setopenedCollapse] = React.useState(false);

  const selectLayer = (e, layer) => {
    e.preventDefault();
    setLayer(layer);
    setopenedCollapse(false);
  }

  return  (
    (selectedLayer && layers) ?
    <Col md="4" sm="4" xs="6" style={{position: 'absolute', top: '10px', right: '5px', zIndex: 1000}}>
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
                aria-expanded={openedCollapse}
                href="#pablo"
                data-parent="#accordion"
                data-toggle="collapse"
                onClick={(e) => {
                  e.preventDefault();
                  setopenedCollapse(!openedCollapse);
                }}
              >
                {selectedLayer.label}
                <i className="tim-icons icon-minimal-down" />
              </a>
            </CardHeader>
            <Collapse role="tabpanel" isOpen={openedCollapse}>
              <CardBody className="card">
                {layers.map((layer, index) => {
                  if (layer.value !== selectedLayer.value) {
                    return (<a
                      key={'layer_' + index}
                      aria-expanded={openedCollapse}
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

export default LayersDropdown;