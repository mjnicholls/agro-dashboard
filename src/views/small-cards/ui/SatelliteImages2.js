import React, {useEffect, useRef} from 'react';
import {toDate} from '../../../utils/dateTime';

import {
  Card,
  CardBody,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";

import SatelliteImagePlaceholder from './SatelliteImagePlaceholder';


const SatelliteImagesList = ({ images, polygonId, selectedImage, selectImage, imagesLoading }) => {
  /** Displays a list of satellite images for selected polygon */

  const scrollRef = useRef(null);
  const imagesRefs = useRef({});
  const scrollOptions = {behavior: 'smooth', block: 'nearest'};

  useEffect (() => {
    if (selectedImage && !imagesLoading) {
      let index = images.findIndex(image => image.dt === selectedImage.dt && image.type === selectedImage.type);
      imagesRefs.current[index].scrollIntoView(scrollOptions)
    }
  }, [selectedImage])

  const onClickArrow = (direction) => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollBy(direction === 'left' ? -400 : 400, 0, scrollOptions)
    }
  }

  return (
    <Card>
      <CardBody>
        <div className='satellite-images-container'>
          <a
            className="satellite-arrow left"
            onClick={() => {onClickArrow("left")}}>
            <i className="tim-icons icon-double-left" />
          </a>
          <div ref={scrollRef} className="satellite-image-list">
            {imagesLoading ? <div className="satellite-pagination horizontal-container">
            {
              [0,0,0,0,0,0,0].map((_,index) => (
                <div key={index} className="satellite-image">
                  <SatelliteImagePlaceholder />
                </div>))
            } </div> : images.map((image, index) => (
                <div
                  className={"satellite-image " + (selectedImage ?
                    (image.dt === selectedImage.dt && image.type === selectedImage.type) ?
                      "active" : "" : "")}
                  ref={el => imagesRefs.current[index] = el}
                  key={'satellite_image_' + index}
                  onClick={() => { selectImage(image) }}
                >
                  <div>
                    <p className="card-category" style={{textAlign: "left", margin: 0}}>{toDate(image.dt)}</p>
                  </div>
                  <div className="horizontal-container" style={{margin: 0}}>
                    <i className="fas fa-cloud satellite-icon" />
                    <div className="satellite-text">{Math.round(image.cl)}%</div>
                    <i className="far fa-image satellite-icon" />
                    <div className="satellite-text">{Math.round(image.dc)}%</div>
                  </div>
                  <hr style={{marginTop: "0.3rem", marginBottom: "0.3rem"}} />
                  <div className="card-category">
                    <i className="tim-icons icon-sound-wave satellite-icon" />
                    {image.type}
                  </div>
                </div>
                ))}
          </div>
          <a
            className="satellite-arrow right"
            onClick={() => {onClickArrow("right")}}
          >
            <i className="tim-icons icon-double-right" />
          </a>
        </div>
      </CardBody>
    </Card>
    )
  }

export default SatelliteImagesList;