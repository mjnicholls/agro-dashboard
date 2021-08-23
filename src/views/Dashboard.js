import React, {useState} from "react";
import { useSelector } from 'react-redux';

import { Col, Row } from "reactstrap";

import MapBox from "./maps/MapBox";
import PolygonTable from './agro-components/PolygonTable';
import PolygonTableSmall from './small-cards/PolygonList';
import PolygonsTotalStats from './agro-components/PolygonsTotalStats';
import PolygonInfo from './agro-components/PolygonInfo';

import ImageStats from './small-cards/LayerStats';
import SoilCurrent from './small-cards/SoilCurrent'
import WeatherCurrent from './small-cards/WeatherCurrent'
import CombinedChart from "./charts/CombinedChart";
import NdviChart from "./charts/NdviChart";

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

const Dashboard = () => {

  const [satelliteImage, setSatelliteImage] = useState(null);
  const [satelliteLayer, setSatelliteLayer] = useState({value: "ndvi", label: "NDVI"});
  const [polygonInFocus, setPolygonInFocus] = useState(null);
  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const isSatelliteMode = useSelector(selectIsSatelliteMode);

  return (
    <>
      <div className="content">
          <Row>
            <Col lg="6" >
              <MapBox
                // activePolygon={activePolygon}
                satelliteImage={satelliteImage}
                setSatelliteImage={setSatelliteImage}
                satelliteLayer={satelliteLayer}
                isSatellitePage={isSatelliteMode}
                setPolygonInFocus={setPolygonInFocus}
              />
            </Col>

            <Col lg="3" sm="6" >
              {activePolygon ?
                isSatelliteMode ? <ImageStats
                    satelliteImage={satelliteImage}
                    satelliteLayer={satelliteLayer}
                    setSatelliteLayer={setSatelliteLayer}
                  /> :
                    <>
                      <WeatherCurrent />
                      <SoilCurrent polyId={activePolygon.id}/>
                    </> : <PolygonInfo polygonInFocus={polygonInFocus} />
              }
            </Col>

            <Col lg="3" sm="6">
              {activePolygon ?
                <PolygonTableSmall /> :
                <PolygonsTotalStats polygons={polygons} activePolygon={polygons[0]} />
              }
            </Col>
        </Row>
        <Row>
          <Col>

            {activePolygon ?
              isSatelliteMode ?
              <NdviChart polyId={activePolygon.id} />
                : <CombinedChart polyId={activePolygon.id} />
                : <PolygonTable
                  data={polygons}
                  // activePolygon={activePolygon}
                  // setActivePolygon={setActivePolygon}
                />
              }
            </Col>
          </Row>
      </div>
    </>
  );
};

export default Dashboard;
