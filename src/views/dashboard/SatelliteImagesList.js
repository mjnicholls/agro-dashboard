import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import classNames from 'classnames'
import moment from 'moment/moment'
import DatePicker from 'react-datetime'
import { useSelector } from 'react-redux'
import { Card, CardBody, Label } from 'reactstrap'

import { getSatelliteImagesList } from '../../api/polygon'
import { toDate } from '../../utils/dateTime'
import SatelliteImagePlaceholder from './SatelliteImagePlaceholder'
const selectActivePoly = (state) => state.state.polygon

const SatelliteImagesList = ({
  satelliteImage,
  setSatelliteImage,
  isSatellitePage,
}) => {
  /** Displays a list of satellite images for selected polygon */

  const scrollRef = useRef(null)
  const imagesRefs = useRef({})
  const scrollOptions = { behavior: 'smooth', block: 'nearest' }
  const [availableDates, setAvailableDates] = useState([])
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const activePolygon = useSelector(selectActivePoly)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    let isMounted = true
    if (activePolygon) {
      setIsLoading(true)
      setError(null)
      setSatelliteImage(null)
      getSatelliteImagesList(activePolygon.id, cancelToken)
        .then((response) => {
          if (response && response.length && isMounted) {
            response.reverse()
            setImages(response)
            setSatelliteImage(response[0])
            setAvailableDates(
              response.map((image) => moment(image.dt * 1000).format('L')),
            )
          }
        })
        .catch(() => {
          setSatelliteImage(null)
        })
        .finally(() => setIsLoading(false))
    } else {
      setSatelliteImage(null)
    }
    return () => {
      isMounted = false
      if (cancelToken) {
        cancelToken.cancel()
      }
    }
  }, [activePolygon])

  const isDateAvailable = (current) => {
    if (availableDates) {
      return availableDates.includes(current.format('L'))
    }
    return false
  }

  const onSelectDate = (selectedMoment) => {
    const index = availableDates.indexOf(selectedMoment.format('L'))
    setSatelliteImage(images[index])
    const imageSelected = imagesRefs.current[index]
    const offset = 110
    scrollRef.current.scrollTo({
      left: imageSelected.getBoundingClientRect().left - offset,
      behavior: 'smooth',
    })
  }

  const onClickArrow = (direction) => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollBy(
        direction === 'left' ? -400 : 400,
        0,
        scrollOptions,
      )
    }
  }

  const Content = () => {
    let res = null
    if (isLoading) {
      res = (
        <div className="satellite-pagination horizontal-container">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
            <div key={val} className="satellite-image">
              <SatelliteImagePlaceholder />
            </div>
          ))}{' '}
        </div>
      )
    } else if (error) {
      res = <div>{error}</div>
    } else {
      res = images.map((image, index) => (
        <button
          type="button"
          className={classNames('satellite-image py-1 px-3', {
            active:
              satelliteImage &&
              image.dt === satelliteImage.dt &&
              image.type === satelliteImage.type,
          })}
          // eslint-disable-next-line
          ref={(el) => (imagesRefs.current[index] = el)}
          key={`satellite_image_${image.dt} ${image.type}`}
          onClick={() => {
            setSatelliteImage(image)
          }}
        >
          <p className="card-category text-left m-0">{toDate(image.dt)}</p>
          <div className="card-category horizontal-container m-0">
            <i className="fas fa-cloud satellite-icon" />
            <div className="satellite-text">{Math.round(image.cl)}%</div>
            <i className="far fa-image satellite-icon" />
            <div className="satellite-text">{Math.round(image.dc)}%</div>
          </div>
          <hr className="my-1" />
          <p className="card-category text-left">
            <i className="tim-icons icon-sound-wave satellite-icon" />
            {image.type}
          </p>
        </button>
      ))
    }

    return res
  }

  return (
    <Card
      className={classNames('satellite-images-container mb-0 ', {
        'd-none': !isSatellitePage,
      })}
    >
      <CardBody className="p-1">
        <div className="satellite-images-list">
          <button
            type="button"
            className="satellite-arrow-button left"
            onClick={() => {
              onClickArrow('left')
            }}
          >
            <i className="tim-icons icon-double-left" />
          </button>
          <Label>
            <div className="info-icon text-center calendar-icon">
              <i className="tim-icons icon-calendar-60" />
            </div>
            <div>
              <DatePicker
                timeFormat={false}
                value={satelliteImage ? moment(satelliteImage.dt * 1000) : null}
                isValidDate={isDateAvailable}
                onChange={onSelectDate}
                className="satellite-calendar agro-datepicker"
                closeOnSelect
                closeOnClickOutside
              />
            </div>
          </Label>
          <div ref={scrollRef} className="satellite-image-list">
            <Content />
          </div>
          <button
            type="button"
            className="satellite-arrow-button right"
            onClick={() => {
              onClickArrow('right')
            }}
          >
            <i className="tim-icons icon-double-right" />
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

export default SatelliteImagesList
