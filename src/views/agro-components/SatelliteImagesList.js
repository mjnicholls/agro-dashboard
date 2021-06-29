import React from 'react';
import {getSatelliteImagesList} from '../../services/api/polygonApi'
import {toDate} from '../../utils/DateTime'
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const SatelliteImagesList = ({ id, defaultStartDate, defaultEndDate }) => {
  /** Displays a list of satellite images for selected polygon */
  // TODO dates?
  let [data, setData] = React.useState([]);

  React.useEffect(() => {
    getSatelliteImagesList(id, defaultStartDate, defaultEndDate)
      .then(response => {
        if (response) {
          response.reverse()
          console.log("image list", response)
          setData(response)
        }
      })
      .catch(err => {console.log(err)})
  }, [defaultStartDate, defaultEndDate])

  return (<div className="satellite-images-container" >
    {data.map((image, index) => (
      <Col lg="3" md="6" key={`satellite_image_${index}`}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-primary">
                      <div className="horizontal-container">
                        <i className="fas fa-cloud" />
                        <div>{Math.round(image.cl)}%</div>
                      </div>
                      <div className="horizontal-container">
                        <i className="far fa-image" />
                        <div>{Math.round(image.dc)}%</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">{toDate(image.dt)}</p>
                      <CardTitle tag="h3">+45k</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="tim-icons icon-sound-wave" />{image.type}
                </div>
              </CardFooter>
            </Card>
          </Col>
      ))}
  </div>)
}

export default SatelliteImagesList;