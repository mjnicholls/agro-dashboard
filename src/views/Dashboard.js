import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {fetchPolygons} from '../features/polygons/actions'

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import MapBox from "./maps/MapBox";
import PolygonsTable from "./agro-components/PolygonsTable"

const selectPolygons = state => state.polygons;

const Dashboard = () => {

  const [apiCallCount, setApiCallCount] = useState(0);
  const [polygon, setPolygon] = useState(null);

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
        <Row style={{marginBottom: "30px"}}>
          <Col md="8">
            <div className="chart-area">
              <MapBox
                selectedPolygon={polygon}
                selectPolygon={setPolygon}
              />
            </div>
          </Col>
          {/*<Col md="6">*/}
            {/*<PolygonsTable*/}
              {/*data={polygons}*/}
              {/*polygon={polygon}*/}
              {/*setPolygon={setPolygon}*/}
            {/*/>*/}
          {/*</Col>*/}

          <Col md="4">
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
        </Row>
        <Row>
          <Col>
            <PolygonsTable
              data={polygons}
              polygon={polygon}
              setPolygon={setPolygon}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
