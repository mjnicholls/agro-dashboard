import React, {useEffect, useState} from 'react';
import axios from "axios/index";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

import ChartContainer from '../charts/ui/ChartContainer';
import SatelliteLayerDropdown from './ui/SatelliteLayers';
import {getImageStats} from '../../services/api/polygonApi';
import {toDate} from "../../utils/dateTime";

const ImageStats = ({satelliteImage, satelliteLayer, setSatelliteLayer }) => {

  const [stats, setStats] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelToken = axios.CancelToken.source();

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
      getImageStats(url, cancelToken)
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
    return () => {
      cancelToken.cancel()
    }
  }, [satelliteImage, satelliteLayer])
  return (
    <Card className="small-card mb-5">
      <CardHeader>
        <Row>
          <Col>
            <SatelliteLayerDropdown
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