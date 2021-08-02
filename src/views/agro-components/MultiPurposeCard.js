import React, {useState} from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";

import ImageStats from "./ImageStats";
import PolygonTableSmall from "./PolygonTableSmall";
import Toggler from './Toggler';
import SatelliteLayers3 from "./SatelliteLayers3";
import SatelliteCalendar from "./DatepickerSatellite";

const MultiPurposeCard = (
  {images, polygons, selectedImage, setSelectedImage, selectedLayer, setSelectedLayer, selectedPolygon, setSelectedPolygon}) => {

  console.log("selected image ", selectedImage)

  const [isLayers, setIsLayers] = useState(true);
  const [name, setName] = useState('');
  return (
    selectedImage ?
    <Card>
      <CardHeader>
      <Row>
        <Col xs="6">
          <SatelliteLayers3
            name={name}
            selectedImage={selectedImage}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
            setName={setName}
          />
        </Col>
        <Col xs="6" className="text-right">
          <SatelliteCalendar
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </Col>
      </Row>
      </CardHeader>

      <CardHeader>
        <Toggler isActive={isLayers} setIsActive={setIsLayers} labelOne="Layers" labelTwo="Polygons"/>
      </CardHeader>
      <CardBody>
        {isLayers ?
          <ImageStats
           images={images}
           selectedImage={selectedImage}
           setSelectedImage={setSelectedImage}
           selectedLayer={selectedLayer}
           setSelectedLayer={setSelectedLayer}
         /> :
         <PolygonTableSmall
           polygons={polygons}
           selectedPolygon={selectedPolygon}
           setSelectedPolygon={setSelectedPolygon} />
        }
      </CardBody>
    </Card> : null)
}

export default MultiPurposeCard;