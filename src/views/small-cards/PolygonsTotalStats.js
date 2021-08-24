import React from 'react';
import {totalArea} from "../../utils/utils";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";


const PolygonsTotalStats = ({polygons}) => {

  return (
    <Card className="card-stats d-none d-lg-block mb-5">
      <CardHeader>
         <Row>
          <Col xs="4">
            <div className="info-icon text-center icon-primary">
              <i className="tim-icons icon-shape-star" />
            </div>
          </Col>
          <Col xs="8">
            <div className="numbers">
              <p className="card-category">Statistics</p>
              <CardTitle tag="h3">Total</CardTitle>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <hr />
        <br />
        <div className="card-category">
          <Row>
            <Col xs="6">Polygons</Col>
            <Col xs="6"><CardTitle tag="h3" className="text-right">{polygons.length}</CardTitle></Col>
          </Row>
          <Row>
            <Col xs="4">Area</Col>
            <Col xs="8"><CardTitle tag="h3" className="text-right">{totalArea(polygons)}ha</CardTitle></Col>
          </Row>
        </div>
      </CardBody>
      {/*<CardFooter>*/}
        {/*/!*<div className="stats">*!/*/}
          {/*/!*<i className="tim-icons icon-sound-wave" /> Last Research*!/*/}
        {/*/!*</div>*!/*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

export default PolygonsTotalStats;