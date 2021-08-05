import React from 'react';
import { NdviChart } from './charts'

import {
  Row,
  Col,
} from "reactstrap";

const SatellitePage = ({selectedPolygon}) => {

  return (
    <Row>
      <Col>
        <NdviChart
          id={selectedPolygon.id}
         />
      </Col>
    </Row>

  )
}

export default SatellitePage;