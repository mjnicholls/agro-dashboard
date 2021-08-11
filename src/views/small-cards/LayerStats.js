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
import SatelliteLayers3 from './ui/SatelliteLayers';
import {toDate} from "../../utils/dateTime";

const ImageStats = ({satelliteImage, satelliteLayer, setSatelliteLayer }) => {

  const [stats, setStats] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (satelliteImage && satelliteLayer) {
      let url = satelliteImage.stats[satelliteLayer.value];
      if (!url) {
        url = satelliteImage.stats.ndvi;
        setName("ndvi")
      } else {
        setName(satelliteLayer.value)
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
  }, [satelliteImage, satelliteLayer])
  return (
    <Card className="small-card">
      <CardHeader>
        <Row>
          <Col>
            <SatelliteLayers3
              name={name}
              satelliteImage={satelliteImage}
              satelliteLayer={satelliteLayer}
              setSatelliteLayer={setSatelliteLayer}
            />
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
      <ChartContainer
        isLoading={isLoading}
        error={error}
      >
        {stats ? <div>
            <Table>
            <thead>
              <tr>
                <th>{toDate(satelliteImage.dt)}</th>
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
        </div> : null}
      </ChartContainer>
    </CardBody>
  </Card>)
}

export default ImageStats;