import React from 'react';
import {toDate} from '../../utils/DateTime'
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";

const SatelliteImagesList = ({ id, images, selectImage }) => {
  /** Displays a list of satellite images for selected polygon */

  return (
    <div className="horizontal-container" style={{marginTop: "20px"}} >
      {/*<Pagination>*/}
                    {/*<PaginationItem>*/}
                      {/*<PaginationLink*/}
                        {/*aria-label="Previous"*/}
                        {/*href="#pablo"*/}
                        {/*onClick={(e) => e.preventDefault()}*/}
                      {/*>*/}
                        <span aria-hidden={true}>
                          <i
                            aria-hidden={true}
                            className="tim-icons icon-double-left"
                          />
                        </span>
                      {/*</PaginationLink>*/}
                    {/*</PaginationItem>*/}
      <div className="satellite-images-container">
      {images.map((image, index) => (
        <Col lg="3" md="5" key={`satellite_image_${index}`} onClick={() => selectImage(image)}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                      <div className="horizontal-container">
                        <i className="fas fa-cloud" />
                        <div>{Math.round(image.cl)}%</div>
                      </div>
                      <div className="horizontal-container">
                        <i className="far fa-image" />
                        <div>{Math.round(image.dc)}%</div>
                      </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">{toDate(image.dt)}</p>
                      {/*<CardTitle tag="h3">+45k</CardTitle>*/}
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
      </div>
      <span aria-hidden={true}>
        <i
          aria-hidden={true}
          className="tim-icons icon-double-right"
        />
      </span>
  </div>)
}

export default SatelliteImagesList;