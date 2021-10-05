import React, { useEffect, useState } from 'react'

import moment from 'moment/moment'
import DatePicker from 'react-datetime'

const SatelliteCalendar = ({ images, selectedImage, setSelectedImage }) => {
  const [availableDates, setAvailableDates] = useState([])

  useEffect(() => {
    if (images && images.length) {
      setAvailableDates(
        images.map((image) => moment(image.dt * 1000).format('L')),
      )
    }
  }, [images])

  const isDateAvailable = function (current) {
    if (availableDates) {
      return availableDates.includes(current.format('L'))
    }
    return false
  }

  const onSelectDate = (moment) => {
    const index = availableDates.indexOf(moment.format('L'))
    setSelectedImage(images[index])
    // imagesRefs.current[index].scrollIntoView(scrollOptions);  // TODO
  }

  return (
    <div className="card-stats">
      <div>
        <label>
          <div className="info-icon text-center icon-primary">
            <i className="tim-icons icon-calendar-60" />
          </div>
          <div className="agro-calendar-container">
            <DatePicker
              timeFormat={false}
              value={selectedImage ? moment(selectedImage.dt * 1000) : null}
              isValidDate={isDateAvailable}
              onChange={onSelectDate}
              className="satellite-calendar calendar-right"
              closeOnSelect
              closeOnClickOutside
            />
          </div>
        </label>
      </div>
    </div>
  )
}

export default SatelliteCalendar
