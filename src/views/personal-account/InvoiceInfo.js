import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { invoiceEdit, confirmUserVat } from '../../services/api/personalAccountAPI';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
import classnames from "classnames";


// reactstrap components
import { Button,
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
 } from "reactstrap";
import {countriesDefault} from '../../config';
import Select from "react-select";
import { confirmVat, getVat } from '../../services/api';


const InvoiceSettings = ({ invoiceSettings, setInvoiceSettings }) => {

  const dispatch = useDispatch();

  const [error, setError] = useState({

  })
  const [countries, setCountries] = useState(countriesDefault);
  const [country, setCountry] = useState({country: "", code: ""});
  const [vat, setVat] = useState({message:"", code:""})
  const titles = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
  ]

  useState(() => {
    // get request for country
    // if we have the result setCountries(result)
    if (invoiceSettings.country) {
      let country = countries.find(obj => obj.code === invoiceSettings.country)
      setCountry(country)
    }
  }, [invoiceSettings])

  const handleChange = (key, value) => {
    let newObj = Object.assign({}, invoiceSettings);
    newObj[key] = value;
    setInvoiceSettings(newObj);
}

  // check VAT

  const checkVAT = () => {

    setError(null);
    if
     (!invoiceSettings.vat_id.length) {
       setError(true);
       dispatch(notifyError("VAT does not match"));
       return
     }

     getVat(invoiceSettings.vat_id).then(
        () => {
          dispatch(notifySuccess("VAT updated"))
        }).catch(error => {
          dispatch(notifyError("Error updating VAT " + error.message))
        })
  }

  const confirmInvoice = () => {
    setError(null);

    if (invoiceSettings.type === 'individual') {
      // first name
      // last name
    } else {
      if (!invoiceSettings.organisation.length) {
      setError({
        organisation: true
      })
    }
    }

    if (!invoiceSettings.country.length) {
       setError({
        country: true
      })
    }
    // address, city, postcode, phone


    if (Object.keys(error).length) {
      dispatch(notifyError("Cannot be empty"));
      return
    }

    if (invoiceSettings.type === "organisation" && invoiceSettings.vat_id.length) {
      confirmUserVat(invoiceSettings.vat_id)
       .then(() => {
         invoiceEdit(invoiceSettings)
           .then(() => {
             dispatch(notifySuccess("Invoice updated"))
           })
           .catch(error => {
             dispatch(notifyError("Error updating name " + error.message))
           })
       })
       .catch(() => {
         dispatch(notifyError("Incorrect VAT number"))
       })
    } else {
      invoiceEdit(invoiceSettings)
       .then(() => {
         dispatch(notifySuccess("Invoice updated"))
       })
       .catch(error => {
         dispatch(notifyError("Error updating name " + error.message))
       })
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
                checked={invoiceSettings.type === "individual"}
                onChange={() => handleChange("type", "individual")}
              />
              <span className="form-check-sign" />
              Individual
            </Label>
            <Label check>
              <Input
                id="organisationRadioButton"
                name="legalForm"
                type="radio"
                checked={invoiceSettings.type === "organisation"}
                onChange={() => handleChange("type", "organisation")}
              />
              <span className="form-check-sign" />
              Organisation
            </Label>
          </FormGroup>
        </Form>
      </CardHeader>
      <CardBody>
        {invoiceSettings.type === "individual" ?
            <Form className="form-horizontal">
              <Row>
                <Label md="3">Title *</Label>
                <Col md="9">
                  <FormGroup>
                    <Select
                      className="react-select info mb-3"
                      classNamePrefix="react-select"
                      options={titles}
                    >
                    </Select>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">First Name *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Last Name *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Country *</Label>
                <Col md="9">
                  <FormGroup>
                  <Select
                    className="react-select info mb-3"
                    classNamePrefix="react-select"
                    onChange={country => {
                      handleChange('country', country.code);
                    }}
                    options={countries}
                    getOptionLabel={(option)=>option.name}
                    getOptionValue={(option)=>option.code}
                    placeholder={invoiceSettings.country ? countries.find(obj => obj.code === invoiceSettings.country).name : ""}
                  />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Address Line 1 *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Address Line 2</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">City *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Postcode *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">State</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Phone *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row></Row>
            </Form> :
            <Form className="form-horizontal">
              <Row>
                <Label md="3">Organisation *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("organisation", e.target.value)}
                      value={invoiceSettings.organisation}
                      className={error.organisation ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">VAT ID</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      // onChange={(e) => checkVAT("vat_id", e.target.value)}
                      onChange={(e) => {
                        handleChange('vat_id', e.target.value);
                      }}
                      value={invoiceSettings.vat_id}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Country *</Label>
                <Col md="9">
                  <Select
                    // className="react-select info mb-3"
                    className={classnames("react-select info mb-3", error.country ? 'danger-border' : "")}
                    classNamePrefix="react-select"
                    onChange={country => {
                      handleChange('country', country.code);
                    }}
                    options={countries}
                    getOptionLabel={(option)=>option.name}
                    getOptionValue={(option)=>option.code}
                    placeholder={invoiceSettings.country ? countries.find(obj => obj.code === invoiceSettings.country).name : ""}
                  />
                </Col>
              </Row>
              <Row>
                <Label md="3">Address Line 1 *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("address_line_1", e.target.value)
                      }
                      value={invoiceSettings.address_line_1}
                      className={error ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Address Line 2</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("address_line_2", e.target.value)
                      }
                      value={invoiceSettings.address_line_2}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">City *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("city", e.target.value)}
                      value={invoiceSettings.city}
                      className={error ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Postcode *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("postcode", e.target.value)}
                      value={invoiceSettings.postal_code}
                      className={error ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">State</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("state", e.target.value)}
                      value={invoiceSettings.state}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Phone *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("phone", e.target.value)}
                      value={invoiceSettings.phone}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
        }
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
  );
}


export default InvoiceSettings;