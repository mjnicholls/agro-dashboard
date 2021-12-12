import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import Select from 'react-select'
import { Button, ButtonGroup } from 'reactstrap'
import { Link } from 'react-router-dom'

import { tariffError } from '../../config'
import ContactUsButton from '../components/ContactUsButton'
import { useSelector } from 'react-redux'

const selectYears = (state) => state.auth.limits.maps.crop

const YearSelector = ({ activeYear, setActiveYear }) => {
  const years = useSelector(selectYears)
  const [options, setOptions] = useState(years)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    setActiveYear(years.find((year) => year.status === 3))
    const newOptions = options.map((option) => ({
      ...option,
      id: option.year,
      label: option.year,
    }))
    setOptions(newOptions)
  }, [years])

  const customStyles = {
    input: (provided) => ({
      ...provided,
      width: '80px',
    }),
  }

  const buttonOnClick = (year) => {
    if (year.status === 3) {
      setActiveYear(year)
    } else {
      setAlert(
        <ReactBSAlert
          customClass="agro-alert-dark-crop"
          confirmBtnText={year.status === 1 ? 'Subscription plans' : 'Contact'}
          title={
            year.status === 1
              ? tariffError
              : `If you'd like to request data for the year ${year.year}, please contact our Sales department`
          }
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          showConfirm={false}
          showCloseButton
        >
          <div className="mt-3 text-center">
            {year.status === 1 ? (
              <SubscriptionPlansButton />
            ) : (
              <ContactUsButton />
            )}
          </div>
        </ReactBSAlert>,
      )
    }
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const SubscriptionPlansButton = () => (
    <Link to="/users/billing-plans" role="button" className="btn btn-primary">
      Subscription plans
    </Link>
  )

  return (
    <>
      {alert}
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
                yearInArray.year !== activeYear.year && yearInArray.status < 3,
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
    </>
  )
}

YearSelector.propTypes = {
  activeYear: PropTypes.shape({
    year: PropTypes.number,
    status: PropTypes.number,
  }),
  setActiveYear: PropTypes.func,
}

export default YearSelector
