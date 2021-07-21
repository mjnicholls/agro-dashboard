import React from 'react';
import { AccumulatedChart, NdviChart, SoilChart } from './charts/index'

import {
  Row,
  Col,
} from "reactstrap";

const SatellitePage = ({selectedPolygon, startDate, endDate, userLevel}) => {

  return (
    <>
      <Row>
        <Col>
          {(selectedPolygon && startDate && endDate) &&
          <NdviChart
            id={selectedPolygon.id}
            name={selectedPolygon.name}
            defaultStartDate={startDate}
            defaultEndDate={endDate}
           />}
        </Col>
      </Row>
        { (userLevel && startDate && endDate) && <Row>
          <Col>
            <SoilChart
              id={selectedPolygon.id}
              defaultStartDate={startDate}
              defaultEndDate={endDate}
              userLevel={userLevel}
            />
          </Col>
        </Row> }
        { userLevel && <Row>
          <Col>
            <AccumulatedChart
              id={selectedPolygon.id}
            />
          </Col>
        </Row> }
    </>
  )
}

export default SatellitePage;