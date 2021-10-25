import React, { useState } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { Col, Form, Label, FormGroup, Input, Row } from 'reactstrap'
import { countriesDefault } from '../../../config'
import PropTypes from 'prop-types'

const Step2 = ({ invoiceSettings, setInvoiceSettings, error }) => {
  const [countries, setCountries] = useState(countriesDefault)

  const handleChange = (key, value) => {
    // eslint-disable-next-line
    let newObj = Object.assign({}, invoiceSettings)
    newObj[key] = value
    setInvoiceSettings(newObj)
  }

  return (
    <div>
      <Form>
        <Row>
          <Col md="12">
            <Label>Address Line 1 *</Label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => handleChange('address_line_1', e.target.value)}
                value={invoiceSettings.address_line_1}
                className={error.address_line_1 ? 'danger-border' : ''}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Label>Address Line 2</Label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => handleChange('address_line_2', e.target.value)}
                value={invoiceSettings.address_line_2}
              />
            </FormGroup>
          </Col>
          <Col md="6">
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
          <Col md="6">
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

          <Col md="6">
            <Label>Postcode *</Label>
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
          <Col md="6">
            <Label>State</Label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => handleChange('state', e.target.value)}
                value={invoiceSettings.state}
              />
            </FormGroup>
          </Col>

          <Col md="6" style={{ marginBottom: '20px' }}>

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
