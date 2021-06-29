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
// nodejs library that concatenates classes
import classNames from "classnames";
import { useDispatch, useSelector } from 'react-redux'
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// react plugin for creating vector maps
import GoogleMap from "../../views/maps/GoogleMap"
import LeafletMapSatellite from "../../views/maps/LeafletMapSatellite"
import {NdviChart, SoilChart} from '../../views/charts/index'
import SatelliteImagesList from '../../views/agro-components/SatelliteImagesList'
// reactstrap components

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import {
  useParams
} from "react-router-dom";
import {fetchPolygons} from "./actions";


const selectPolygons = state => state.polygons;
const selectPolygon = polygonId => state => {
  return state.polygons.find(polygon => polygon.id === polygonId)
}


const PolygonSatellite = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const polygon = useSelector(selectPolygon(id));
  const [apiCallCount, setApiCallCount] = React.useState(0);
  if (!polygon && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }
  const polygons = useSelector(selectPolygons);

  const [selectedPolygon, setSelectedPolygon] = React.useState(polygon);

  React.useEffect(() => {
    setSelectedPolygon(polygon)
  }, [polygon])

  let now = new Date();
  let monthAgo = new Date(now.getTime());
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  monthAgo.setHours(0, 0, 0, 0);
  let startDate = Math.round(monthAgo.getTime() / 1000)
  let endDate = Math.round(now.getTime() / 1000)

  const [bigChartData, setbigChartData] = React.useState("data1");

  const setBgChartData = (name) => {
    setbigChartData(name);
  };


  return ( selectedPolygon ?
    <>
      <div className="content">
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{selectedPolygon.name}</CardTitle>
                <p className="card-category">Satellite data</p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="8">
                    {/*<GoogleMap polygon={selectedPolygon} />*/}
                    <LeafletMapSatellite polygon={selectedPolygon} />
                  </Col>
                  <Col className="ml-auto mr-auto" md="4">
                    <Table responsive>
                      <tbody>
                        {polygons.map(polygon => (
                          <tr onClick={() => {setSelectedPolygon(polygon)}} key={`polygon_${polygon.id}`}>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/US.png").default}
                                />
                              </div>
                            </td>
                            <td>{polygon.name}</td>
                            <td className="text-right">{polygon.area}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <SatelliteImagesList
            id={selectedPolygon.id}
            defaultStartDate={startDate}
            defaultEndDate={endDate} />
        </Row>

        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">{selectedPolygon.name}</h5>
                    <CardTitle tag="h2">Historical NDVI</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        color="info"
                        id="0"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <NdviChart
                    id={selectedPolygon.id}
                    defaultStartDate={startDate}
                    defaultEndDate={endDate}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">{selectedPolygon.name}</h5>
                    <CardTitle tag="h2">Soil data</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        color="info"
                        id="0"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <SoilChart
                    id={selectedPolygon.id}
                    defaultStartDate={startDate}
                    defaultEndDate={endDate}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </> :
    <>
      <div className="content">
        <Row>
          <Col lg="12">Fetching...</Col>
        </Row>
      </div>
    </>
  );
};

export default PolygonSatellite;
