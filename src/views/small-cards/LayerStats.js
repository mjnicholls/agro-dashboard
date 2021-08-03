import React, {useEffect, useState} from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

import {getImageStats} from '../../services/api/polygonApi';
import ChartContainer from '../charts/ui/ChartContainer';
import SatelliteCalendar from './ui/DatepickerSatellite';
import SatelliteLayers3 from './ui/SatelliteLayers3';
import {toDate} from "../../utils/dateTime";

const ImageStats = ({images, selectedImage, setSelectedImage, selectedLayer, setSelectedLayer}) => {

  const [stats, setStats] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedImage && selectedLayer) {
      let url = selectedImage.stats[selectedLayer.value];
      if (!url) {
        url = selectedImage.stats.ndvi;
        setName("ndvi")
      } else {
        setName(selectedLayer.value)
      }
      setIsLoading(true);
      setError(null);
      setStats(null);
      getImageStats(url)
        .then(res => {
          setStats(res)
        })
        .catch(error => {
          if (typeof error === "object") {
            error = error.message || "Something went wrong"
          }
          setError(error)
        })
        .finally(() => {setIsLoading(false)})
    }
  }, [selectedImage, selectedLayer])
  return (
    <Card style={{height: "100%"}}>
      <ChartContainer
        isLoading={isLoading}
        error={error}
      >
        {stats ? <div>
          <CardHeader>
            <Row>
              <Col xs="8">
                <SatelliteLayers3
                  name={name}
                  selectedImage={selectedImage}
                  selectedLayer={selectedLayer}
                  setSelectedLayer={setSelectedLayer}
                />
              </Col>
              <Col xs="4" className="text-right">
                <SatelliteCalendar
                  images={images}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="current-card">
            <Table>
            <thead>
              <tr>
                <th>{toDate(selectedImage.dt)}</th>
                <th>{name.toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>max</td>
                <td>{stats.max.toFixed(2)}</td>
              </tr>
              <tr>
                <td>mean</td>
                <td>{stats.mean.toFixed(2)}</td>
              </tr>
              <tr>
                 <td>median</td>
                 <td>{stats.median.toFixed(2)}</td>
               </tr>
               <tr>
                 <td>min</td>
                 <td>{stats.min.toFixed(2)}</td>
               </tr>
               <tr>
                 <td>deviation</td>
                 <td>{stats.std.toFixed(2)}</td>
               </tr>
               <tr>
                 <td>num</td>
                 <td>{stats.num}</td>
               </tr>
             </tbody>
          </Table>
          </CardBody>
        </div> : null}
    </ChartContainer>
  </Card>)
}

export default ImageStats;