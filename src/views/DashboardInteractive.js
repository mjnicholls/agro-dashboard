import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {fetchPolygons} from '../features/polygons/actions'

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

import MapBox from "./maps/MapBoxInteractive";
import PolygonsTable from "./agro-components/PolygonsTable";
import SatelliteImagesList from './agro-components/SatelliteImages';

import {toDate} from "../utils/DateTime";
import classNames from "classnames";
import {totalArea} from '../utils/Utils'

const selectPolygons = state => state.polygons;

const Dashboard = () => {

  const [activePolygon, setActivePolygon] = useState(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [isSatellitePage, setIsSatellitePage] = useState(true);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState({value: "truecolor", label: "True Color"});



  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();
  if (!polygons.length && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }

  return (
    <>
      <div className="content">
        <Row style={{marginBottom: "30px"}}>
          <Col md="8">
            <div className="chart-area">
              <MapBox
                polygons={polygons}
                activePolygon={activePolygon}
                setActivePolygon={setActivePolygon}
                selectedPolygon={selectedPolygon}
                selectedImage={selectedImage}
                selectedLayer={selectedLayer}
              />
            </div>
            {selectedPolygon && <SatelliteImagesList
                polygonId={selectedPolygon.id}
                selectedImage={selectedImage}
                selectImage={setSelectedImage}
              />}
          </Col>
          {selectedPolygon ?
             <Col md="4" className="ml-auto mr-auto">
                <Card>
                  <CardHeader style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>All polygons</div>
                    <a onClick={() => setSelectedPolygon(null)}>
                      <i className="tim-icons icon-bullet-list-67 text-info" />
                    </a>
                  </CardHeader>
                  <CardBody style={{maxHeight: "450px", overflow: "scroll", marginBottom: "10px"}}>
                    <Table responsive>
                    <tbody>
                      {polygons.map(polygon => (
                        <tr
                          className={classNames("clickable-table-row", {
                            "table-danger": polygon.id === selectedPolygon.id,
                          })}
                          onClick={() => {setSelectedPolygon(polygon)}}
                          key={`polygon_${polygon.id}`} >
                          <td>{polygon.name}</td>
                          <td className="text-right">{polygon.area.toFixed(1)}ha</td>
                          <td>{toDate(polygon.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  </CardBody>
                </Card>
              </Col>
            : <Col md="4">
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
            </Col>}
        </Row>
        {selectedPolygon ?
          <>
            <Row>
          <Col sm="6">
            <CardTitle tag="h2">{selectedPolygon.name}, {selectedPolygon.area.toFixed(2)}ha</CardTitle>
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
                    active: isSatellitePage,
                  })}
                  onClick={() => setIsSatellitePage(true)}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Satellite
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
                    active: !isSatellitePage,
                  })}
                  onClick={() => setIsSatellitePage(false)}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Weather
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-gift-2" />
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
        </Row>
          </>

          : <Row>
            <Col>
              <PolygonsTable
                data={polygons}
                activePolygon={activePolygon}
                setActivePolygon={setActivePolygon}
                setSelectedPolygon={setSelectedPolygon}
              />
            </Col>
          </Row>
        }
      </div>
    </>
  );
};

export default Dashboard;
