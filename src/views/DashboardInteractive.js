import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';

import { Col, Row } from "reactstrap";

import MapBox from "./maps/MapBoxInteractive";
import PolygonInfo from './PolygonInfo';
import PolygonTable from './agro-components/PolygonTable';
// import SatelliteLayers from './agro-components/SatelliteLayers';
import MultiPurposeCard from './agro-components/MultiPurposeCard';
import PolygonTableSmall from './agro-components/PolygonTableSmall';
import PolygonsTotalStats from './agro-components/PolygonsTotalStats';
import SatelliteImagesList from './agro-components/SatelliteImages';

import ImageStats from './agro-components/ImageStats';
import {getSatelliteImagesList} from "../services/api/polygonApi";

const selectPolygons = state => state.polygons;

const Dashboard = () => {

  const [activePolygon, setActivePolygon] = useState(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState({value: "truecolor", label: "True Color"});
  const [imagesLoading, setImagesLoading] = useState(true);


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
        <Row style={{marginBottom: "30px"}}>
          <Col md="8">
            <div className="chart-area">
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
            </div>
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
             <Col md="4" className="ml-auto mr-auto">
               <MultiPurposeCard
                 images={images}
                 selectedImage={selectedImage}
                 setSelectedImage={setSelectedImage}
                 selectedLayer={selectedLayer}
                 setSelectedLayer={setSelectedLayer}
                 polygons={polygons}
                 selectedPolygon={selectedPolygon}
                 setSelectedPolygon={setSelectedPolygon}
               />
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
            : <Col md="4">
              <PolygonsTotalStats polygons={polygons}/>
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
