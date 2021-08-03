import React, {useEffect, useRef} from 'react';
import {toDate} from '../../../utils/dateTime';

import {
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
    imagesLoading ?
      <div className="satellite-pagination horizontal-container">
        {
          [0,0,0,0,0,0,0].map((_,index) => (
            <div key={index} className="satellite-images-pagination-link">
            <SatelliteImagePlaceholder />
          </div>))
        }
      </div> :
      <div>
        <Pagination className='satellite-pagination' style={{alignItems: "center"}}>
          <PaginationItem
            className="active satellite-pagination-arrow left"
            onClick={(e) => {
              e.preventDefault()
              onClickArrow("left")}
            }
          >
              <PaginationLink>
                <span aria-hidden={true}>
                  <i aria-hidden={true}
                    className="tim-icons icon-double-left" />
                </span>
              </PaginationLink>
            </PaginationItem>
          <div className="satellite-images-container" ref={scrollRef}>
            {images.map((image, index) => (
            <div
              className={"page-item " + (selectedImage ?
                (image.dt === selectedImage.dt && image.type === selectedImage.type) ?
                  "active" : "" : "")}
              ref={el => imagesRefs.current[index] = el}
              key={'satellite_image_' + index}
            >
              <PaginationLink
                className="satellite-images-pagination-link"
                onClick={(e) => {
                  e.preventDefault();
                  selectImage(image)
                }}
              >
                <Row>
                  <Col>
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
                  </Col>
                </Row>
              </PaginationLink>
            </div>
            ))}
          </div>
          <PaginationItem className="active active satellite-pagination-arrow right">
            <PaginationLink
              onClick={(e) => {
                e.preventDefault()
                onClickArrow("right")}
              }
            >
              <span aria-hidden={true}>
                <i
                  aria-hidden={true}
                  className="tim-icons icon-double-right"
                />
              </span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    )
  }

export default SatelliteImagesList;