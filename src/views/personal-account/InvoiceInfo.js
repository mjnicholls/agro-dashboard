import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { invoiceEdit } from '../../services/api/personalAccountAPI';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
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


const InvoiceSettings = ({ invoiceSettings, setInvoiceSettings }) => {

  const dispatch = useDispatch();

  const [error, setError] = useState(null)
  const [countries, setCountries] = useState(countriesDefault);
  const [country, setCountry] = useState({country: "", code: ""});

  useState(() => {
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


  const handleCountryChange = (country) => {
    setCountry(country);
    handleChange('country', country.code)
  }


  const confirmInvoice = () => {
    setError(null);
    if
     (!invoiceSettings.type.length &&
      !invoiceSettings.country.length &&
      !invoiceSettings.address_line_1.length &&
      !invoiceSettings.city.length &&
      !invoiceSettings.postal_code.length &&
      !invoiceSettings.phone.length) {
       setError(true);
       dispatch(notifyError("Cannot be empty"));
       return
     }

     invoiceEdit(invoiceSettings).then(
       () => {
         dispatch(notifySuccess("Invoice updated"))
       }).catch(error => {
         dispatch(notifyError("Error updating name " + error.message))
       })

   }


  return (

    <Card>
      <CardHeader><h4>Invoice Info</h4></CardHeader>
      <CardBody>
        <FormGroup check className="form-check-radio mb-3">
            <Label check>
              <Input
                id="exampleRadios3"
                name="legalForm"
                type="radio"
                checked={invoiceSettings.type === "individual"}
                onChange={() => handleChange("type", "individual")}
              />
              <span className="form-check-sign" />
              Individual .

            </Label>

            <Label check>
              <Input
                id="exampleRadios4"
                name="legalForm"
                type="radio"
                checked={invoiceSettings.type === "organisation"}
                onChange={() => handleChange("type", "organisation")}
              />
              <span className="form-check-sign" />
              Organisation
            </Label>
          </FormGroup>

        { invoiceSettings.type === "individual" ?
          <>
            <CardTitle tag="h4">Individual</CardTitle>
            <Form className="form-horizontal">
          <Row>
            <Label md="3">Title *</Label>
            <Col md="9">
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{ color: "black" }}
                >
                  <option selected value="blank"></option>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </Input>
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
                <Input type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Label md="3">Country *</Label>
            <Col md="9">
              <FormGroup>
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
        </Form>
          </>
          :

          <>
            <CardTitle tag="h4">Organisation</CardTitle>
            <Form className="form-horizontal">
              <Row>
                <Label md="3">Organisation *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("type", e.target.value)}
                      value={invoiceSettings.type}
                      className={error ? "danger-border" : ""}
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
                      onChange={(e) => handleChange("vat_id", e.target.value)}
                      value={invoiceSettings.vat_id}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label md="3">Country *</Label>
                <Col md="9">

                  <Select
                    className="react-select info mb-3"
                    classNamePrefix="react-select"
                    name="singleSelect"
                    value={country.country}
                    onChange={(country) => {handleCountryChange(country)}}
                    options={countries}
                    placeholder={country.country}
                  />

                </Col>
              </Row>
              <Row>
                <Label md="3">Address Line 1 *</Label>
                <Col md="9">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("address_line_1", e.target.value)}
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
                      onChange={(e) => handleChange("address_line_2", e.target.value)}
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
          </>
        }
         </CardBody>
      <CardFooter>
          <Form className="form-horizontal">
            <Row>
              <Label md="3" />
              <Col md="9">
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