import React from 'react';
import {toDate} from '../../utils/DateTime';
import moment from 'moment';

import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import DatePicker from "react-datetime";

const SatelliteImagesList = ({ images, selectedImage, selectImage }) => {
  /** Displays a list of satellite images for selected polygon */

  const scrollRef = React.useRef(null);
  const imagesRefs = React.useRef({});
  const [availableDates, setAvailableDates] = React.useState([]);
  const [selectedWithImageDate, setSelectedWithImageDate] = React.useState();
  const scrollOptions = {behavior: 'smooth', block: 'nearest'};

  React.useEffect(() => {
    let newAvailableDates = images.map(image => moment(image.dt * 1000).format('L'));
    setAvailableDates(newAvailableDates);
  }, [images])

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
    setSelectedWithImageDate(null);
  }

  const onSelectImage = (image, index) => {
    setSelectedWithImageDate(availableDates[index]);
    selectImage(image);
  }

  const preSelectedDate = () => {
    // TODO doesn't work as only taken at start, need to be managed via value
    let res = selectedWithImageDate || availableDates[0];
    return res
  }

  return (
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
              e.preventDefault()
              onSelectImage(image, index)}
            }
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
              isValidDate={ isDateAvailable }
              onChange={onSelectDate}
              className="satellite-calendar"
              initialValue={preSelectedDate()}
              closeOnSelect
              closeOnClickOutside
            /></label>
        </div>
      </div>}
    </div>)
}

export default SatelliteImagesList;