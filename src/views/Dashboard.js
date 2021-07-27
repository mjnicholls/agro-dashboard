import React, {useState} from "react";
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
import PolygonTable from "./agro-components/PolygonTable"

const selectPolygons = state => state.polygons;

const Dashboard = () => {

  const [apiCallCount, setApiCallCount] = useState(0);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [activePolygon, setActivePolygon] = useState(null);

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
                activePolygon={activePolygon}
                setActivePolygon={setActivePolygon}
                selectedPolygon={selectedPolygon}
              />
            </div>
          </Col>
          {/*<Col md="4">*/}
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
                      <p className="card-category">Total polygons</p>
                      <CardTitle tag="h3">{polygons.length}</CardTitle>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="float-right">
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
      </div>
    </>
  );
};

export default Dashboard;
