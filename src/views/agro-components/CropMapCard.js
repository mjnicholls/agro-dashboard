import React, { useState, useEffect } from 'react'

import classNames from 'classnames'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import Select from 'react-select'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap'

import { tariffError } from '../../config'
import { getCropName } from '../maps/crops'

const CropMapCard = ({ years, activeYear, setActiveYear, info, setAlert }) => {
  const [options, setOptions] = useState(years)

  useEffect(() => {
    const newOptions = options.map((option) => ({
      ...option,
      id: option.year,
      label: option.year,
    }))
    setOptions(newOptions)
  }, [])

  const calculateArea = () => {
    const metersPerPx =
      (156543.03392 * Math.cos((info.lat * Math.PI) / 180)) / 2 ** 14
    return `${((info.area * metersPerPx) / 10000).toFixed(2)}ha`
  }

  const customStyles = {
    input: (provided) => ({
      ...provided,
      width: '80px',
    }),
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const buttonOnClick = (year) => {
    if (year.status === 3) {
      setActiveYear(year)
    } else {
      setAlert(
        <ReactBSAlert
          customClass="agro-alert"
          confirmBtnText={year.status === 1 ? 'Subscription plans' : 'Contact'}
          title={
            year.status === 1
              ? tariffError
              : `If you'd like to request data for the year ${year.year}, please contact our sales department`
          }
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          showConfirm={false}
        >
          <div className="mt-3 text-center">
            <a
              role="button"
              target="_blank"
              href={
                year.status === 1
                  ? 'https://home.agromonitoring.com/subscriptions'
                  : 'mailto:info@openweathermap.org'
              }
              className="btn btn-primary"
            >
              {year.status === 1 ? 'Subscription plans' : 'Contact'}
            </a>
          </div>
        </ReactBSAlert>,
      )
    }
  }

  return (
    <Card
      className="crop-map-card"
      style={activeYear.status < 3 ? { boxShadow: 'none' } : {}}
    >
      <CardHeader className="d-flex align-items-center pb-3">
        <ButtonGroup className="d-none d-lg-block">
          {options.map((yearInArray) => (
            <Button
              color="github"
              id={yearInArray.year}
              size="sm"
              tag="label"
              key={yearInArray.year}
              className={classNames('btn-simple btn-link pl-0 pb-0', {
                'disabled-year':
                  yearInArray.year !== activeYear.year &&
                  yearInArray.status < 3,
                'active-year': yearInArray.year === activeYear.year,
              })}
              onClick={() => buttonOnClick(yearInArray)}
            >
              <span style={{ fontSize: '14px' }}>{yearInArray.label}</span>
            </Button>
          ))}
        </ButtonGroup>
        <Select
          className="react-select info d-lg-none"
          classNamePrefix="react-select"
          name="singleSelect"
          value={activeYear.year}
          onChange={(tab) => buttonOnClick(tab)}
          options={options}
          placeholder={activeYear.year}
          styles={customStyles}
        />
      </CardHeader>
      {info && activeYear.status === 3 && (
        <CardBody className="mt-0 pt-1">
          {info.message ? (
            <Row>
              <Col>
                <p className="p-1">{info.message}</p>
              </Col>
            </Row>
          ) : (
            <>
              <Row>
                <Col>
                  <h4>
                    <b>{getCropName(info.cdid)}</b>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col sm="5">
                  <p>Area:</p>
                </Col>
                <Col sm="7">
                  <p>{calculateArea()}</p>
                </Col>
              </Row>
              <Row>
                <Col sm="5">
                  <p>NDVI min:</p>
                </Col>
                <Col sm="7">
                  <p>{info.ndvi_low.toFixed(2)}</p>
                </Col>
              </Row>
              <Row>
                <Col sm="5">
                  <p>NDVI max:</p>
                </Col>
                <Col sm="7">
                  <p>{info.ndvi_high.toFixed(2)}</p>
                </Col>
              </Row>
            </>
          )}
        </CardBody>
      )}
    </Card>
  )
}

export default CropMapCard