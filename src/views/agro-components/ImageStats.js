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
import SatelliteCalendar from './DatepickerSatellite';
import SatelliteLayers3 from './SatelliteLayers3';

const ImageStats = ({images, selectedImage, setSelectedImage, selectedLayer, setSelectedLayer}) => {

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
          setStats(res)
        })
        .catch(error => {
          if (typeof error === "object") {
            error = error.message || "Something went wrong"
          }
          setError(error)
        })
    }
  }, [selectedImage, selectedLayer])

  return stats ?
        <>
          {/*<Row>*/}
            {/*<Col xs="6">*/}
              {/*<SatelliteLayers3*/}
                {/*name={name}*/}
                {/*selectedImage={selectedImage}*/}
                {/*selectedLayer={selectedLayer}*/}
                {/*setSelectedLayer={setSelectedLayer}*/}
              {/*/>*/}
            {/*</Col>*/}
            {/*<Col xs="6" className="text-right">*/}
              {/*<SatelliteCalendar*/}
                {/*images={images}*/}
                {/*selectedImage={selectedImage}*/}
                {/*setSelectedImage={setSelectedImage}*/}
              {/*/>*/}
            {/*</Col>*/}
          {/*</Row>*/}
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
      </> : error ?
      <div className="chart-placeholder">{error}</div> :
      <div className="chart-placeholder">Fetching data...</div>
}

export default ImageStats;