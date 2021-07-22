import React, {useEffect, useRef, useState} from 'react';
import {toDate} from '../../utils/dateTime';
import moment from 'moment';

import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import DatePicker from "react-datetime";
import {getSatelliteImagesList} from "../../services/api/polygonApi";

const SatelliteImagesList = ({ polygonId, selectedImage, selectImage }) => {
  /** Displays a list of satellite images for selected polygon */

  const scrollRef = useRef(null);
  const imagesRefs = useRef({});
  const [images, setImages] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const scrollOptions = {behavior: 'smooth', block: 'nearest'};

  useEffect(() => {
    if (polygonId) {
      getSatelliteImagesList(polygonId)
        .then(response => {
          if (response && response.length) {
            response.reverse();
            setImages(response);
            selectImage(response[0]);
            let availableDates = response.map(image => moment(image.dt * 1000).format('L'));
            setAvailableDates(availableDates);
          }
        })
        .catch(err => {console.log(err)})
    }
  }, [polygonId])

  const onClickArrow = (direction) => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollBy(direction === 'left' ? -400 : 400, 0, scrollOptions)
    }
  }

  var isDateAvailable = function( current ){
    if (availableDates) {
      return availableDates.includes(current.format('L'))
    }
    return false
  };

  const onSelectDate = (moment) => {
    let index = availableDates.indexOf(moment.format('L'));
    selectImage(images[index]);
    imagesRefs.current[index].scrollIntoView(scrollOptions);
  }

  return ( images.length ?
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
      {availableDates.length &&
      <div className="card-stats">
        <div >
          <label>
            <div
              className="info-icon text-center icon-primary"
              style={{position: "relative", cursor: "pointer"}}
            >
              <i className="tim-icons icon-calendar-60" />
            </div>
            <DatePicker
              timeFormat={false}
              value={moment(selectedImage.dt * 1000)}
              isValidDate={ isDateAvailable }
              onChange={onSelectDate}
              className="satellite-calendar"
              closeOnSelect
              closeOnClickOutside
            /></label>
        </div>
      </div>}
    </div> : null)
}

export default SatelliteImagesList;