import React, { useState } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { Col, Form, Label, FormGroup, Input, Row } from 'reactstrap'
import { countriesDefault } from '../../../config'
import PropTypes from 'prop-types'

const Step2 = ({ invoiceSettings, setInvoiceSettings, error }) => {

  const [countries, setCountries] = useState(countriesDefault)

  const handleChange = (key, value) => {
    const newObj = {...invoiceSettings}
    newObj[key] = value
    setInvoiceSettings(newObj)
  }

  return (
    <div>
      <Form>
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
                placeholder={
                  invoiceSettings.country
                    ? countries.find(
                        (obj) => obj.code === invoiceSettings.country,
                      ).name
                    : ''
                }
              />
              <div
                className={classnames(
                  'invalid-feedback ',
                  error.country ? 'd-block' : '',
                )}
              >{error.country}</div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Address Line 1 *</Label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => handleChange('address_line_1', e.target.value)}
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
                onChange={(e) => handleChange('address_line_2', e.target.value)}
                value={invoiceSettings.address_line_2}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
        </Row>
        <Row>
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

          <Col>
            {(invoiceSettings.type === "organisation") &&
            <>
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
            </>}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

Step2.propTypes = {
  error: PropTypes.func,
  invoiceSettings: PropTypes.object,
  setInvoiceSettings: PropTypes.func,
}

export default Step2
