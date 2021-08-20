import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import DatePicker from "react-datetime";
import moment from "moment/moment";
import axios from 'axios';

import {
  Card,
  CardBody,
} from "reactstrap";

import SatelliteImagePlaceholder from './SatelliteImagePlaceholder';
import {toDate} from '../../utils/dateTime';
import {getSatelliteImagesList} from "../../services/api/polygonApi";
const selectActivePoly = state => state.state.polygon;


const SatelliteImagesList = ({satelliteImage, setSatelliteImage}) => {
  /** Displays a list of satellite images for selected polygon */

  const scrollRef = useRef(null);
  const imagesRefs = useRef({});
  const scrollOptions = {behavior: 'smooth', block: 'nearest'};
  const [availableDates, setAvailableDates] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const activePolygon = useSelector(selectActivePoly);
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    let isMounted = true;
    if (activePolygon) {
      setIsLoading(true);
      setError(null);
      getSatelliteImagesList(activePolygon.id, cancelToken)
        .then(response => {
          if (response && response.length) {
            if (isMounted) {
              response.reverse();
              setImages(response);
              setAvailableDates(response.map(image => moment(image.dt * 1000).format('L')));
              setSatelliteImage(response[0]);
            }
          }
        })
        .catch(err => {console.log(err)})
        .finally(() => setIsLoading(false))
    }
    return () => {
      isMounted = false;
      if (cancelToken) {
        cancelToken.cancel()
      }
    }
  }, [activePolygon])

  const isDateAvailable = function( current ){
    if (availableDates) {
      return availableDates.includes(current.format('L'))
    }
    return false
  };

  const onSelectDate = (moment) => {
    let index = availableDates.indexOf(moment.format('L'));
    setSatelliteImage(images[index]);
    let imageSelected = imagesRefs.current[index];
    let offset = 110;
    scrollRef.current.scrollTo({left: imageSelected.getBoundingClientRect().left - offset, behavior: 'smooth'})
  }

  const onClickArrow = (direction) => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollBy(direction === 'left' ? -400 : 400, 0, scrollOptions)
    }
  }

  return (
    <Card className="satellite-images-container mb-0">
      <CardBody style={{padding: "5px"}}>
        <div className='satellite-images-list'>
          <a
            className="satellite-arrow left"
            onClick={() => {onClickArrow("left")}}>
            <i className="tim-icons icon-double-left" />
          </a>
          <label>
            <div
              className="info-icon text-center calendar-icon"
            >
              <i className="tim-icons icon-calendar-60" />
            </div>
            <div>
              <DatePicker
                timeFormat={false}
                value={satelliteImage ? moment(satelliteImage.dt * 1000) : null}
                isValidDate={ isDateAvailable }
                onChange={onSelectDate}
                className="satellite-calendar agro-datepicker"
                closeOnSelect
                closeOnClickOutside
              />
            </div>
          </label>

          <div ref={scrollRef} className="satellite-image-list">
            {isLoading ? <div className="satellite-pagination horizontal-container">
            {
              [0,0,0,0,0,0,0,0,0].map((_,index) => (
                <div key={index} className="satellite-image">
                  <SatelliteImagePlaceholder />
                </div>))
            } </div> : error ? <div>{error}</div> : images.map((image, index) => (
                <div
                  className={"satellite-image " + (satelliteImage ?
                    (image.dt === satelliteImage.dt && image.type === satelliteImage.type) ?
                      "active" : "" : "")}
                  ref={el => imagesRefs.current[index] = el}
                  key={'satellite_image_' + index}
                  onClick={() => { setSatelliteImage(image) }}
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