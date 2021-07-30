import React, {useEffect, useState} from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

import {getImageStats} from '../../services/api/polygonApi';
import {toDate} from '../../utils/dateTime';
import SatelliteCalendar from './DatepickerSatellite';

const ImageStats = ({images, selectedImage, selectedLayer, setSelectedImage}) => {

  const [stats, setStats] = useState(null);
  const [name, setName] = useState('');
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
      getImageStats(url)
        .then(res => {
          console.log("res", res)
          setStats(res)
        })
        .catch(error => {
          if (typeof error === "object") {
            error = error.message || "Something went wrong"
          }
          setError(error)
        })
    }
  },[selectedImage, selectedLayer])


  return (
    <Card className="card-stats">
      {stats ?
        <>
        <CardHeader>
          <Row>
            <Col className="text-left" xs="6" sm="8">
              <h5 className="card-category">Statistics</h5>
              <CardTitle tag="h2">{toDate(selectedImage.dt)}</CardTitle>
            </Col>
            <Col sm="4" className="float-right">
              <SatelliteCalendar images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
           <Table>
             <thead>
              <tr>
                <th></th>
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
                 <td>min</td>
                 <td>{stats.min.toFixed(2)}</td>
               </tr>
               <tr>
                 <td>median</td>
                 <td>{stats.median.toFixed(2)}</td>
               </tr>
               <tr>
                 <td>p25</td>
                 <td>{stats.p25.toFixed(2)}</td>
               </tr>
               <tr>
                 <td>p75</td>
                 <td>{stats.p75.toFixed(2)}</td>
               </tr>
             <tr>
                <td>std</td>
                <td>{stats.std.toFixed(2)}</td>
              </tr>
             </tbody>
          </Table>
        </CardBody>
      </> : <div className="chart-placeholder">Fetching data...</div>}
    </Card>)
}

export default ImageStats;