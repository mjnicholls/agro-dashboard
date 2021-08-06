import React from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {toDate} from "../../utils/dateTime";
import Shape from "./Shape";


const PolygonInfo = ({ polygonInFocus }) => {

  return (
    polygonInFocus ? <Card className="card-stats">
      <CardHeader>
        <Row>
           <Col xs="5">
            {/*<div className="info-icon text-center icon-primary">*/}
              {/*/!*<i className="tim-icons icon-image-02" />*!/*/}
            {/*</div>*/}
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">name</p>
              <CardTitle tag="h3">{polygonInFocus.name}</CardTitle>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="4" className="text-right">
            <div className="numbers">
              <Shape polygon={polygonInFocus} />
            </div>
          </Col>
          <Col sm="4" className="text-right">
            <div className="numbers">
              <p className="card-category">Area</p>
              <CardTitle tag="h3">{polygonInFocus.area.toFixed(2)}ha</CardTitle>
            </div>
          </Col>
          <Col sm="4" className="text-right">
            <div className="numbers">
              <p className="card-category">Created</p>
              <CardTitle tag="h3">{toDate(polygonInFocus.created_at)}</CardTitle>
            </div>
          </Col>
          <Col>
          {/*<Table>*/}
            {/*<tbody>*/}
            {/*<tr>*/}
              {/*<td>Area</td>*/}
              {/*<td>{polygonInFocus.area.toFixed(2)}ha</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
              {/*<td>Created</td>*/}
              {/*<td>{toDate(polygonInFocus.created_at)}</td>*/}
            {/*</tr>*/}
            {/*</tbody>*/}
          {/*</Table>*/}
          </Col>
        </Row>

      </CardBody>
      {/*<CardFooter>*/}
        {/*<hr />*/}
        {/*<div className="stats">*/}
          {/*/!*<i className="tim-icons icon-sound-wave" /> Last Research*!/*/}
        {/*</div>*/}
      {/*</CardFooter>*/}
    </Card> : <div>Nothing</div>
  )
}

export default PolygonInfo;