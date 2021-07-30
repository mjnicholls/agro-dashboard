import React from 'react';
import {totalArea} from "../../utils/utils";

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const PolygonsTotalStats = ({polygons}) => {

  return (
    <Card className="card-stats">
      <CardBody>
        <Row>
          <Col xs="5">
            <div className="info-icon text-center icon-primary">
              <i className="tim-icons icon-shape-star" />
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">Total polygons</p>
              <CardTitle tag="h3">{polygons.length}</CardTitle>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="float-right">
            <div className="numbers">
              <p className="card-category">Total area</p>
              <CardTitle tag="h3">{totalArea(polygons)}ha</CardTitle>
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="stats">
          <i className="tim-icons icon-sound-wave" /> Last Research
        </div>
      </CardFooter>
    </Card>
  )
}

export default PolygonsTotalStats;