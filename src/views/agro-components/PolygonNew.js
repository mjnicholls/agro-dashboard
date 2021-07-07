import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
} from "reactstrap";
import LeafletMapTest from '../maps/LeafletMapTest'
import LeafletDrawReact from '../maps/LeafletDrawReact'

const PolygonNew = () => {
  /** Draw a new polygon, give it a name */

  return (
     <>
      <div className="content">
        <Row>
          {/*<LeafletMapTest />*/}
          <LeafletDrawReact />
        </Row>
      </div>
     </>
  )

}

export default PolygonNew