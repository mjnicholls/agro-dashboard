import React, { useState } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'
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

import {
  updateBillingDetails,
  validateVat,
  getCountries,
  createBillingDetails,
} from '../../../api/billing'
import { countriesDefault, titles } from '../../../config'
import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'

const InvoiceSettings = ({
  invoiceSettings,
  setInvoiceSettings,
  isNew,
  refreshData,
  isActiveStripeCustomer,
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

  const confirmInvoice = () => {
    setError({})
    const newError = {
      country: !invoiceSettings.country.length,
      address_line_1: !invoiceSettings.address_line_1.length,
      address_line_2: !invoiceSettings.address_line_2.length,
      city: !invoiceSettings.address_line_2.length,
      postal_code: !invoiceSettings.postal_code.length,
      phone: !invoiceSettings.phone.length,
    }
    if (invoiceSettings.type === 'individual') {
      if (
        !invoiceSettings.first_name.length ||
        !invoiceSettings.last_name.length
      ) {
        newError.first_name = !invoiceSettings.first_name.length
        newError.last_name = !invoiceSettings.last_name.length
      }
    } else if (!invoiceSettings.organisation.length) {
      newError.organisation = true
    }
    setError(newError)

    if (Object.values(newError).filter(Boolean).length) {
      dispatch(notifyError('Please fill in required fields'))
      return
    }
    if (
      invoiceSettings.type === 'organisation' &&
      invoiceSettings.vat_id.length
    ) {
      validateVat(invoiceSettings.vat_id)
        .then(() => {
          billingInfoUpdate()
        })
        .catch(() => {
          dispatch(notifyError('Incorrect VAT number'))
        })
    } else {
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
                      isActiveStripeCustomer &&
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
                      isActiveStripeCustomer &&
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
            <Col>
              {invoiceSettings.type === 'individual' ? (
                <>
                  <Row>
                    <Col>
                      <Label>Title</Label>
                      <FormGroup>
                        <Select
                          className="react-select info mb-3"
                          classNamePrefix="react-select"
                          options={titles}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col>
                      <Label>Organisation *</Label>
                      <FormGroup>
                        <Input
                          type="text"
                          onChange={(e) =>
                            handleChange('organisation', e.target.value)
                          }
                          value={invoiceSettings.organisation}
                          className={error.organisation ? 'danger-border' : ''}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              )}
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
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Label>Country *</Label>
                  <FormGroup>
                    <Select
                      className={classnames(
                        'react-select info mb-3',
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
                      isDisabled={isActiveStripeCustomer}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Postcode *</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange('postal_code', e.target.value)
                      }
                      value={invoiceSettings.postal_code}
                      className={error.postal_code ? 'danger-border' : ''}
                    />
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
              onClick={confirmInvoice}
            >
              Save
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

InvoiceSettings.propTypes = {
  invoiceSettings: PropTypes.object,
  setInvoiceSettings: PropTypes.func,
  isNew: PropTypes.bool,
  refreshData: PropTypes.func,
  isActiveStripeCustomer: PropTypes.bool,
}

export default InvoiceSettings
