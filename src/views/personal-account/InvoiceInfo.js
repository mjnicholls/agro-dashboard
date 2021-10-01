/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  invoiceEdit,
  confirmUserVat,
  getCountries,
  invoiceCreate,
} from '../../services/api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import classnames from 'classnames'
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
import { countriesDefault, titles } from '../../config'
import Select from 'react-select'

const InvoiceSettings = ({
  invoiceSettings,
  setInvoiceSettings,
  isNew,
  refreshData,
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
    let newObj = Object.assign({}, invoiceSettings)
    newObj[key] = value
    setInvoiceSettings(newObj)
  }

  const billingInfoCreate = () => {
    invoiceCreate(invoiceSettings)
      .then(() => {
        dispatch(notifySuccess('Billing details saved'))
        refreshData()
      })
      .catch((error) => {
        dispatch(notifyError('Error saving billing details ' + error.message))
      })
  }

  const billingInfoUpdate = () => {
    invoiceEdit(invoiceSettings)
      .then(() => {
        dispatch(notifySuccess('Billing details updated'))
      })
      .catch((error) => {
        dispatch(notifyError('Error updating billing details ' + error.message))
      })
  }

  const confirmInvoice = () => {
    setError({})
    let newError = {
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
    } else {
      if (!invoiceSettings.organisation.length) {
        newError.organisation = true
      }
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
      confirmUserVat(invoiceSettings.vat_id)
        .then(() => {
          isNew ? billingInfoCreate() : billingInfoUpdate()
        })
        .catch(() => {
          dispatch(notifyError('Incorrect VAT number'))
        })
    } else {
      isNew ? billingInfoCreate() : billingInfoUpdate()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Billing Details</CardTitle>
        <Form>
          <Label>Legal form: </Label>
          <FormGroup check className="form-check-radio">
            <Label check className="mr-3">
              <Input
                id="individualRadioButton"
                name="legalForm"
                type="radio"
                checked={invoiceSettings.type === 'individual'}
                onChange={() => handleChange('type', 'individual')}
                disabled={!isNew && invoiceSettings.type === 'organisation'}
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
                disabled={!isNew && invoiceSettings.type === 'individual'}
              />
              <span className="form-check-sign" />
              Organisation
            </Label>
          </FormGroup>
        </Form>
      </CardHeader>
      <CardBody>
        <Form className="form-horizontal">
          {invoiceSettings.type === 'individual' ? (
            <>
              <Row>
                <Col md="2">
                  <Label>Title</Label>
                </Col>
                <Col md="10">
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
                <Col md="2">
                  <Label>First Name *</Label>
                </Col>
                <Col md="10">
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
                <Col md="2">
                  <Label>Last Name *</Label>
                </Col>
                <Col md="10">
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
                <Col md="2">
                  <Label>Organisation *</Label>
                </Col>
                <Col md="10">
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
                <Col md="2">
                  <Label>VAT ID</Label>
                </Col>
                <Col md="10">
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
            <Col md="2">
              <Label>Country *</Label>
            </Col>
            <Col md="10">
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
                  placeholder={
                    invoiceSettings.country
                      ? countries.find(
                          (obj) => obj.code === invoiceSettings.country,
                        ).name
                      : ''
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Label>Address Line 1 *</Label>
            </Col>
            <Col md="10">
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
            <Col md="2">
              <Label>Address Line 2</Label>
            </Col>
            <Col md="10">
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
          </Row>
          <Row>
            <Col md="2">
              <Label>City *</Label>
            </Col>
            <Col md="10">
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
            <Col md="2">
              <Label>Postcode *</Label>
            </Col>
            <Col md="10">
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('postal_code', e.target.value)}
                  value={invoiceSettings.postal_code}
                  className={error.postal_code ? 'danger-border' : ''}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Label>State</Label>
            </Col>
            <Col md="10">
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('state', e.target.value)}
                  value={invoiceSettings.state}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Label>Phone *</Label>
            </Col>
            <Col md="10">
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
        </Form>
      </CardBody>
      <CardFooter>
        <Form className="form-horizontal">
          <Row>
            <Label md="3" />
            <Col md="9" className="text-right">
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
        </Form>
      </CardFooter>
    </Card>
  )
}

export default InvoiceSettings
