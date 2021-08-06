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


const PolygonsTotalStats = ({polygons, activePolygon}) => {

  return (
    <Card className="card-stats">
      <CardHeader>
         <Row>
          <Col xs="5">
            <div className="info-icon text-center icon-primary">
              <i className="tim-icons icon-shape-star" />
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">Statistics</p>
              <CardTitle tag="h3">Total</CardTitle>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>

        {/*{activePolygon && <Row>*/}
          {/*<Col sm="4" className="text-right">*/}
            {/*<div className="numbers">*/}
              {/*<Shape polygon={activePolygon} />*/}
            {/*</div>*/}
          {/*</Col>*/}
          {/*<Col sm="4" className="text-right">*/}
            {/*<div className="numbers">*/}
              {/*<p className="card-category">Area</p>*/}
              {/*<CardTitle tag="h3">{activePolygon.area.toFixed(2)}ha</CardTitle>*/}
            {/*</div>*/}
          {/*</Col>*/}
          {/*<Col sm="4" className="text-right">*/}
            {/*<div className="numbers">*/}
              {/*<p className="card-category">Created</p>*/}
              {/*<CardTitle tag="h3">{toDate(activePolygon.created_at)}</CardTitle>*/}
            {/*</div>*/}
          {/*</Col>*/}
        {/*</Row>}*/}

        <hr />
        <br />
        <Row>
          <Col sm="4" className="text-right"></Col>
          <Col sm="4" className="text-right">
            <div className="numbers">
              <p className="card-category">Polygons</p>
                <CardTitle tag="h3">{polygons.length}</CardTitle>
            </div>
          </Col>
          <Col sm="4" className="text-right">
            <div className="numbers">
              <p className="card-category">Area</p>
              <CardTitle tag="h3">{totalArea(polygons)}ha</CardTitle>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/*<CardFooter>*/}
        {/*<hr />*/}
        {/*<Row>*/}
          {/*<Col sm="4" className="text-right"></Col>*/}
          {/*<Col sm="4" className="text-right">*/}
            {/*<div className="numbers">*/}
              {/*<p className="card-category">Total polygons</p>*/}
                {/*<CardTitle tag="h3">{polygons.length}</CardTitle>*/}
            {/*</div>*/}
          {/*</Col>*/}
          {/*<Col sm="4" className="text-right">*/}
            {/*<div className="numbers">*/}
              {/*<p className="card-category">Total area</p>*/}
              {/*<CardTitle tag="h3">{totalArea(polygons)}ha</CardTitle>*/}
            {/*</div>*/}
          {/*</Col>*/}
        {/*</Row>*/}
        {/*/!*<div className="stats">*!/*/}
          {/*/!*<i className="tim-icons icon-sound-wave" /> Last Research*!/*/}
        {/*/!*</div>*!/*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

export default PolygonsTotalStats;