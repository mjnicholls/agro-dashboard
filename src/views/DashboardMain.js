/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import GoogleMapAllPolygons from "./maps/GoogleMapAllPolygons";
import LeafletMapMultiplePolygons from "./maps/LeafletMapMultiplePolygons";
import PolygonsTable from "./agro-components/PolygonsTable"
// import PolygonsReactTable from "./agro-components/PolygonsReactTable"

import { useSelector, useDispatch } from 'react-redux'
import {fetchPolygons} from '../features/polygons/actions'

const selectPolygons = state => state.polygons;

const DashboardMain = () => {

  const [apiCallCount, setApiCallCount] = React.useState(0);
  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();
  if (!polygons.length && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }

  const polygonsArea = () => {
    if (polygons.length) {
      let x = polygons.reduce((a,b) => ({area: a.area + b.area}))
      return x.area.toFixed(2)
    }
    return 0
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">My polygons</h5>
                    <CardTitle tag="h2">All polygons</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <LeafletMapMultiplePolygons polygons={polygons} />
                  {/*<GoogleMapAllPolygons data={polygons}/>*/}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">All Polygons</CardTitle>
              </CardHeader>
              <CardBody>
                <PolygonsTable data={polygons}/>
                {/*<PolygonsReactTable data={polygons}/>*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-warning">
                      <i className="tim-icons icon-chat-33" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total polygons</p>
                      <CardTitle tag="h3">{polygons.length}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="tim-icons icon-refresh-01" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
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
                      <p className="card-category">Total area</p>
                      <CardTitle tag="h3">{polygonsArea()}ha</CardTitle>
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
          </Col>

        </Row>
      </div>
    </>
  );
};

export default DashboardMain;
