import React, { useState } from 'react'

import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
  Row,
} from 'reactstrap'

import {countriesDefault, noBlank, titles} from '../../../config'
import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'
import {
  updateBillingDetails,
  validateVat,
  getCountries,
  createBillingDetails,
} from '../../../api/billingAPI'
import {
  validatePhoneNumber
} from '../../../utils/validation'

import PropTypes from 'prop-types'

const BillingInfo = ({
  invoiceSettings,
  setInvoiceSettings,
  isNew,
  refreshData,
  user
}) => {
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const [countries, setCountries] = useState(countriesDefault)

  useState(() => {
    getCountries().then((res) => {
      if (res.length) {
        setCountries(res)
      }
    })
  }, [invoiceSettings])

  const handleChange = (key, value) => {
    const newObj = { ...invoiceSettings }
    newObj[key] = value
    setInvoiceSettings(newObj)
  }

  const getCountryName = () => {
    const country = countries.find(
      (obj) => obj.code === invoiceSettings.country,
    )
    return country ? country.name : ''
  }

  const billingInfoUpdate = () => {
    if (isNew) {
      createBillingDetails(invoiceSettings)
        .then(() => {
          dispatch(notifySuccess('Billing details saved'))
          refreshData()
        })
        .catch((err) => {
          dispatch(notifyError(`Error saving billing details ${err.message}`))
        })
    } else {
      updateBillingDetails(invoiceSettings)
        .then(() => {
          dispatch(notifySuccess('Billing details updated'))
        })
        .catch((err) => {
          dispatch(notifyError(`Error saving billing details ${err.message}`))
        })
    }
  }


  const saveBillingInfo = () => {
    setError({})
    const newError = {}
    const mandatoryFields = ['country', 'address_line_1', 'city', 'postal_code', 'phone']
    if (invoiceSettings.type === 'individual') {
      mandatoryFields.push('first_name')
      mandatoryFields.push('last_name')
    } else {
      mandatoryFields.push('organisation')
    }
    for (let i=0; i<mandatoryFields.length; i+=1) {
      if (!invoiceSettings[mandatoryFields[i]]) {
        newError[mandatoryFields[i]] = noBlank
      }
    }
    if (invoiceSettings.phone) {
      const phoneValidation = validatePhoneNumber(invoiceSettings.phone)
      if (phoneValidation) {
        newError.phone = phoneValidation
      }
    }
    if (invoiceSettings.type === "organisation" && invoiceSettings.country) {
      validateVat(invoiceSettings.vat_id, invoiceSettings.country)
        .then(() => {})
        .catch(() => {newError.vat_id = 'VAT ID is not valid'})
        .finally(() => {
          if (Object.keys(newError).length) {
            setError(newError)
            return
          }
          billingInfoUpdate()
        })
    }
    else {
      if (Object.keys(newError).length) {
        setError(newError)
        return
      }
      billingInfoUpdate()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Billing Details</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col>
              <h3>Details</h3>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Label>Legal form: </Label>
              <FormGroup check className="form-check-radio">
                <Label check className="mr-3">
                  <Input
                    id="individualRadioButton"
                    name="legalForm"
                    type="radio"
                    checked={invoiceSettings.type === 'individual'}
                    onChange={() => handleChange('type', 'individual')}
                    disabled={
                      user.active_stripe_customer &&
                      invoiceSettings.type === 'organisation'
                    }
                  />
                  <span className="form-check-sign" />
                  Individual
                </Label>
                <Label check>
                  <Input
                    id="organisationRadioButton"
                    name="legalForm"
                    type="radio"
                    checked={invoiceSettings.type === 'organisation'}
                    onChange={() => handleChange('type', 'organisation')}
                    disabled={
                      user.active_stripe_customer &&
                      invoiceSettings.type === 'individual'
                    }
                  />
                  <span className="form-check-sign" />
                  Organisation
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {invoiceSettings.type === 'individual' ? (
              <>
                <Col>
                  <Label>Title</Label>
                  <FormGroup>
                    <Select
                      className="react-select info"
                      classNamePrefix="react-select"
                      options={titles}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <Label>First Name *</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange('first_name', e.target.value)
                      }
                      value={invoiceSettings.first_name}
                      className={error.first_name ? 'danger-border' : ''}
                    />
                    <div
                      className={classnames(
                        'invalid-feedback ',
                        error.first_name ? 'd-block' : '',
                      )}
                    >{error.first_name}</div>
                  </FormGroup>

                </Col>
                <Col>
                  <Label>Last Name *</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange('last_name', e.target.value)
                      }
                      value={invoiceSettings.last_name}
                      className={error.last_name ? 'danger-border' : ''}
                    />
                    <div
                    className={classnames(
                      'invalid-feedback ',
                      error.last_name ? 'd-block' : '',
                    )}
                  >{error.last_name}</div>
                  </FormGroup>

                </Col>
              </>
            ) : (
              <>
                <Col>
                  <Label>Organisation name *</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange('organisation', e.target.value)
                      }
                      value={invoiceSettings.organisation}
                      className={error.organisation ? 'danger-border' : ''}
                    />
                    <div
                      className={classnames(
                        'invalid-feedback ',
                        error.organisation ? 'd-block' : '',
                      )}
                    >{error.organisation}</div>
                  </FormGroup>
                </Col>
                <Col>
                  <Label>VAT ID</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => {
                        handleChange('vat_id', e.target.value)
                      }}
                      value={invoiceSettings.vat_id}
                      className={error.vat_id ? 'danger-border' : ''}
                    />
                    <div
                      className={classnames(
                        'invalid-feedback ',
                        error.vat_id ? 'd-block' : '',
                      )}
                    >{error.vat_id}</div>
                  </FormGroup>
                </Col>
              </>
            )}
          </Row>

          <Row>
            <Col>
              <Label>Phone *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('phone', e.target.value)}
                  value={invoiceSettings.phone}
                  className={error.phone ? 'danger-border' : ''}
                />
                <div
                      className={classnames(
                        'invalid-feedback ',
                        error.phone ? 'd-block' : '',
                      )}
                    >{error.phone}</div>
              </FormGroup>
            </Col>
            <Col>
              <Label>Email</Label>
              <FormGroup>
                <Input type="text" value={user.email} disabled />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <h3>Address</h3>
            </Col>
          </Row>

          <Row>
            <Col>
              <Label>Country *</Label>
              <FormGroup>
                <Select
                  className={classnames(
                    'react-select info',
                    error.country ? 'danger-border' : '',
                  )}
                  classNamePrefix="react-select"
                  onChange={(country) => {
                    handleChange('country', country.code)
                  }}
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.code}
                  placeholder={getCountryName()}
                  isDisabled={user.active_stripe_customer}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.country ? 'd-block' : '',
                  )}
                >{error.country}</div>
              </FormGroup>
            </Col>
            <Col>
              <Label>Address Line 1 *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) =>
                    handleChange('address_line_1', e.target.value)
                  }
                  value={invoiceSettings.address_line_1}
                  className={error.address_line_1 ? 'danger-border' : ''}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.address_line_1 ? 'd-block' : '',
                  )}
                >{error.address_line_1}</div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Address Line 2</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) =>
                    handleChange('address_line_2', e.target.value)
                  }
                  value={invoiceSettings.address_line_2}
                />
              </FormGroup>
            </Col>
            <Col>
              <Label>City *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('city', e.target.value)}
                  value={invoiceSettings.city}
                  className={error.city ? 'danger-border' : ''}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.city ? 'd-block' : '',
                  )}
                >{error.city}</div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Postcode *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('postal_code', e.target.value)}
                  value={invoiceSettings.postal_code}
                  className={error.postal_code ? 'danger-border' : ''}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.postal_code ? 'd-block' : '',
                  )}
                >{error.postal_code}</div>
              </FormGroup>
            </Col>
            <Col>
              <Label>State</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('state', e.target.value)}
                  value={invoiceSettings.state}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <CardFooter>
        <Row>
          <Col className="text-right">
            <Button
              className="btn-fill"
              color="primary"
              type="button"
              onClick={saveBillingInfo}
            >
              Save
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

BillingInfo.propTypes = {
  invoiceSettings: PropTypes.object,
  setInvoiceSettings: PropTypes.func,
  isNew: PropTypes.bool,
  refreshData: PropTypes.func,
  user: PropTypes.objectOf({
    full_name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    active_stripe_customer: PropTypes.bool
  }),
}

export default BillingInfo
