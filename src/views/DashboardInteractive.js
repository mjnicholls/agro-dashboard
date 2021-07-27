import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {fetchPolygons} from '../features/polygons/actions'

import {
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
import PolygonInfo from './PolygonInfo';
import PolygonTable from './agro-components/PolygonTable';
import PolygonsTable from './agro-components/PolygonsTable';
import SatelliteImagesList from './agro-components/SatelliteImages';

import {toDate} from "../utils/dateTime";
import classNames from "classnames";
import {totalArea} from '../utils/utils'

const selectPolygons = state => state.polygons;

const Dashboard = () => {

  const [activePolygon, setActivePolygon] = useState(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
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
                setSelectedPolygon={setSelectedPolygon}
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
                            "highlight-background": polygon.id === selectedPolygon.id,
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
          <PolygonInfo
            selectedPolygon={selectedPolygon}
          /> :
          <Row>
            <Col>
              <PolygonTable
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
