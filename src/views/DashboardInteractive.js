import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Col, Container, Row } from "reactstrap";

import MapBox from "./maps/MapBoxInteractive";
import PolygonInfo from './PolygonInfo';
import PolygonTable from './agro-components/PolygonTable';
import PolygonTableSmall from './small-cards/PolygonList';
import PolygonsTotalStats from './agro-components/PolygonsTotalStats';
import SatelliteImagesList from './agro-components/SatelliteImagesList';

import ImageStats from './small-cards/LayerStats';
import {getSatelliteImagesList} from "../services/api/polygonApi";
import TogglerTwo from "./agro-components/TogglerTwo";
import TogglerThree from "./agro-components/TogglerThree";
import SatellitePage from "./SatellitePage";
import WeatherPage from "./WeatherPage";
import {userLevels} from "../config";

import CombinedWeatherSoilCurrent from './small-cards/CombinedWeatherSoilCurrent'
import CurrentSoil from "./small-cards/SoilCurrent";
import WeatherCurrent from "./small-cards/WeatherCurrent";
import CombinedChart from "./charts/CombinedChart";
import NdviChart from "./charts/NdviChart";

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

const Dashboard = () => {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState({value: "truecolor", label: "True Color"});
  const [imagesLoading, setImagesLoading] = useState(true);

  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const isSatelliteMode = useSelector(selectIsSatelliteMode);

  useEffect(() => {
    if (activePolygon) {
      setImagesLoading(true)
      getSatelliteImagesList(activePolygon.id)
        .then(response => {
          if (response && response.length) {
            response.reverse();
            setImages(response);
            setSelectedImage(response[0]);
          }
        })
        .catch(err => {console.log(err)})
        .finally(() => setImagesLoading(false))
    }
  }, [activePolygon])

  return (
    <>
      <div className="content">
          <Row className="map-row mb-4">
            <Col md="6" >
              <MapBox
                // activePolygon={activePolygon}
                selectedImage={selectedImage}
                selectedLayer={selectedLayer}
                images={images}
                selectImage={setSelectedImage}
                imagesLoading={imagesLoading}
                isSatellitePage={isSatelliteMode}
              />
            </Col>

            <Col md="6">
              {/*<Row className="mb-4">*/}
                {/*<Col>*/}
                  {/*<TogglerThree*/}
                    {/*activePage={activePage}*/}
                    {/*setActivePage={setActivePage}*/}
                    {/*setIsSatellitePage={setIsSatellitePage}*/}
                    {/*labelOne="Home"*/}
                    {/*labelTwo="Satellite"*/}
                    {/*labelThree="Weather"*/}
                  {/*/>*/}
                {/*</Col>*/}
              {/*</Row>*/}
              <Row>

            {activePolygon ?
              <>
                <Col md="6">
                  {isSatelliteMode ? <ImageStats
                    images={images}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    selectedLayer={selectedLayer}
                    setSelectedLayer={setSelectedLayer}
                  /> :
                    <>
                      <CombinedWeatherSoilCurrent selectedPolygon={activePolygon} />
                      {/*<WeatherCurrent selectedPolygon={activePolygon} />*/}
                      {/*<CurrentSoil polyId={activePolygon.id}/>*/}
                    </>
                  }
                </Col>
                <Col md="6">
                  <PolygonTableSmall />
                </Col>
              </>
          : <Col>
            <PolygonsTotalStats polygons={polygons}/>
          </Col>}
              </Row>
            </Col>
        </Row>
      {/*</Container>*/}
           {/*{activePolygon  &&*/}
           {/*<Row>*/}
             {/*<Col className="pb-4">*/}
               {/*<TogglerTwo*/}
                  {/*isActive={isSatellitePage}*/}
                  {/*setIsActive={setIsSatellitePage}*/}
                  {/*labelOne="Satellite data"*/}
                  {/*labelTwo="Weather Data"*/}
                {/*/>*/}
             {/*</Col>*/}
           {/*</Row>}*/}
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
