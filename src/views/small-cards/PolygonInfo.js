import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {toDate} from "../../utils/dateTime";
import Shape from "../agro-components/Shape";

const PolygonInfo = ({ polygonInFocus }) => {

  console.log("polygonInFocus", polygonInFocus)

  return (
    <Card className="card-stats d-none d-lg-block mb-5">
      {(polygonInFocus && polygonInFocus.id) ?
        <>
          <CardHeader>
            <Row>
              <Col xs="4">
                <Shape polygon={polygonInFocus} />
              </Col>
              <Col xs="8">
                <div className="numbers">
                  <p className="card-category">polygon</p>
                  <CardTitle tag="h3">{polygonInFocus.name}</CardTitle>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <hr />
            <br />
            <div className="card-category" style={{height: "120px"}}>
              <Row>
                <Col xs="6">Area</Col>
                <Col xs="6"><CardTitle tag="h3" className="text-right">{polygonInFocus.area.toFixed(2)}ha</CardTitle></Col>
              </Row>
              <Row>
                <Col xs="4">Created</Col>
                <Col xs="8"><CardTitle tag="h3" className="text-right">{toDate(polygonInFocus.created_at)}</CardTitle></Col>
              </Row>
            </div>
          </CardBody>
        </> : <>
          <CardHeader>
            <Row>
              <Col>
               <div className="numbers text-right">
                  <p className="card-category">polygon</p>
                  <CardTitle tag="h3">Information</CardTitle>
               </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <hr />
            <br />
            <div className="card-category" style={{height: "120px"}}>
                <Row>
                  <Col>
                  <p className="mb-3">Hover over a polygon for more information</p>
                  <p>Click on a polygon to see its detailed satellite and weather data</p>
                  </Col>
                </Row>
              </div>
          </CardBody>
        </>
      }

      {/*<CardFooter>*/}
        {/*<hr />*/}
        {/*<div className="stats">*/}
          {/*/!*<i className="tim-icons icon-sound-wave" /> Last Research*!/*/}
        {/*</div>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

export default PolygonInfo;