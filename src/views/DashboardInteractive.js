import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';

import { Col, Container, Row } from "reactstrap";

import MapBox from "./maps/MapBoxInteractive";
import PolygonInfo from './PolygonInfo';
import PolygonTable from './agro-components/PolygonTable';
import PolygonTableSmall from './small-cards/PolygonList';
import PolygonsTotalStats from './agro-components/PolygonsTotalStats';
import SatelliteImagesList from './small-cards/ui/SatelliteImages2';

import ImageStats from './small-cards/LayerStats';
import {getSatelliteImagesList} from "../services/api/polygonApi";
import Toggler from "./agro-components/Toggler";
import SatellitePage from "./SatellitePage";
import WeatherPage from "./WeatherPage";
import {userLevels} from "../config";
import WeatherCurrent from "./small-cards/WeatherCurrent";
import CurrentSoil from "./current/CurrentSoil";

const selectPolygons = state => state.polygons;
const tariffSelector = state => state.auth.user.tariff;

const Dashboard = () => {

  const [activePolygon, setActivePolygon] = useState(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState({value: "truecolor", label: "True Color"});
  const [imagesLoading, setImagesLoading] = useState(true);
  const [isSatellitePage, setIsSatellitePage] = useState(true);
  const tariff = useSelector(tariffSelector);
  const userLevel = userLevels[tariff];
  const polygons = useSelector(selectPolygons);

  useEffect(() => {
    if (selectedPolygon) {
      setImagesLoading(true)
      getSatelliteImagesList(selectedPolygon.id)
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
  }, [selectedPolygon])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="6" className="pb-5">
            {/*<div className="chart-area">*/}
              {/*{selectedPolygon &&*/}
              {/*<SatelliteLayers*/}
                {/*selectedImage={selectedImage}*/}
                {/*selectedLayer={selectedLayer}*/}
                {/*setSelectedLayer={setSelectedLayer}*/}
              {/*/>*/}
              {/*}*/}
              <MapBox
                polygons={polygons}
                activePolygon={activePolygon}
                setSelectedPolygon={setSelectedPolygon}
                selectedPolygon={selectedPolygon}
                selectedImage={selectedImage}
                selectedLayer={selectedLayer}
              />
            {/*</div>*/}
            {selectedPolygon &&
              <SatelliteImagesList
                images={images}
                polygonId={selectedPolygon.id}
                selectedImage={selectedImage}
                selectImage={setSelectedImage}
                imagesLoading={imagesLoading}
              />}
          </Col>

          {selectedPolygon ?
             <Col md="6" className="ml-auto mr-auto">
               <Container>
                <Row>
                  <Col xs="6" className="pb-5">
                    {isSatellitePage ? <ImageStats
                      images={images}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      selectedLayer={selectedLayer}
                      setSelectedLayer={setSelectedLayer}
                    /> :
                      <>
                        <WeatherCurrent selectedPolygon={selectedPolygon} />
                        <CurrentSoil polyId={selectedPolygon.id}/>
                      </>
                    }
                  </Col>
                  <Col xs="6" className="pb-5">
                    <PolygonTableSmall
                      polygons={polygons}
                      selectedPolygon={selectedPolygon}
                      setSelectedPolygon={setSelectedPolygon} />
                  </Col>
                </Row>
               </Container>
               {/*<ImageStats*/}
                 {/*images={images}*/}
                 {/*selectedImage={selectedImage}*/}
                 {/*setSelectedImage={setSelectedImage}*/}
                 {/*selectedLayer={selectedLayer}*/}
                 {/*setSelectedLayer={setSelectedLayer}*/}
               {/*/>*/}
               {/*<PolygonTableSmall*/}
                 {/*polygons={polygons}*/}
                 {/*selectedPolygon={selectedPolygon}*/}
                 {/*setSelectedPolygon={setSelectedPolygon} />*/}
              </Col>
            : <Col md="6">
              <PolygonsTotalStats polygons={polygons}/>
            </Col>}
        </Row>

           {selectedPolygon  &&
           <Row>
             <Col className="pb-4">
               <Toggler
                  isActive={isSatellitePage}
                  setIsActive={setIsSatellitePage}
                  labelOne="Satellite data"
                  labelTwo="Weather Data"
                />
             </Col>
           </Row>}

        {selectedPolygon ?
          isSatellitePage ?
        <SatellitePage
          selectedPolygon={selectedPolygon}
          userLevel={userLevel}
        /> : <WeatherPage
          polygon={selectedPolygon}
        />

          // <PolygonInfo
          //   selectedPolygon={selectedPolygon}
          // />
          :
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
