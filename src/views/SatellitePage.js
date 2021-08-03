import React from 'react';
import { AccumulatedChart, NdviChart, SoilChart } from './charts'

import {
  Row,
  Col,
} from "reactstrap";

const SatellitePage = ({selectedPolygon, userLevel}) => {

  return (
    <>
      <Row>
        <Col>
          <NdviChart
            id={selectedPolygon.id}
           />
        </Col>
      </Row>
        { userLevel && <Row>
          <Col>
            <SoilChart id={selectedPolygon.id} />
          </Col>
        </Row> }
        { userLevel && <Row>
          <Col>
            <AccumulatedChart id={selectedPolygon.id} />
          </Col>
        </Row> }
    </>
  )
}

export default SatellitePage;