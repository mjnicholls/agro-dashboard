import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { invoiceEdit, confirmUserVat, getCountries, invoiceCreate} from '../../services/api/personalAccountAPI';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
import classnames from "classnames";
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


const InvoiceSettings = ({ invoiceSettings, setInvoiceSettings, isNew, refreshData }) => {

  const dispatch = useDispatch();

  const [error, setError] = useState({ })
  const [countries, setCountries] = useState(countriesDefault);
  const [country, setCountry] = useState({country: "", code: ""});
  const titles = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
  ]

  useState(() => {

    getCountries().then((res) => {
      if (res.length) {
        setCountry(res);
      }
    })

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
  /*
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
  */

  const confirmInvoice = () => {
    setError({});

    if (invoiceSettings.type === 'individual') {

      if (!invoiceSettings.first_name.length ||
        !invoiceSettings.last_name.length){
          setError({
            first_name: invoiceSettings.first_name.length === 0,
            last_name: invoiceSettings.last_name.length === 0
          })
        }
    } 

    else {
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

    if (!invoiceSettings.address_line_1.length) {
      setError({
       address_line_1: true
     })
   }

   if (!invoiceSettings.address_line_2.length) {
    setError({
     address_line_2: true
   })
 }

 if (!invoiceSettings.city.length) {
  setError({
   city: true
 })
}

if (!invoiceSettings.city.length) {
  setError({
   city: true
 })
}

if (!invoiceSettings.postal_code.length) {
  setError({
    postal_code: true
 })
}

if (!invoiceSettings.phone.length) {
  setError({
    phone: true
 })
}
  
console.log(error)
    if (Object.keys(error).length) {
      dispatch(notifyError("Cannot be empty"));
     
      return
    }

    if (invoiceSettings.type === "organisation" && invoiceSettings.vat_id.length) {
      confirmUserVat(invoiceSettings.vat_id)
       .then(() => {
         if (isNew){
           invoiceCreate(invoiceSettings)
           .then(() => {
             dispatch(notifySuccess("Invoice created"))
             refreshData();
           })
           .catch(error => {
             dispatch(notifyError("Error creating invoice " + error.message))
           })
         }

         else {
          invoiceEdit(invoiceSettings)
          .then(() => {
            dispatch(notifySuccess("Invoice updated"))
            
          })
          .catch(error => {
            dispatch(notifyError("Error updating invoice " + error.message))
          })
         }
    
       })
       .catch(() => {
         dispatch(notifyError("Incorrect VAT number"))
       })
    } 
    
    else {
      if (isNew){
        invoiceCreate(invoiceSettings)
        .then(() => {
          dispatch(notifySuccess("Invoice created"))
          refreshData();
        })
        .catch(error => {
          dispatch(notifyError("Error creating invoice " + error.message))
        })
      }

      else {
       invoiceEdit(invoiceSettings)
       .then(() => {
         dispatch(notifySuccess("Invoice updated"))
       })
       .catch(error => {
         dispatch(notifyError("Error updating invoice " + error.message))
       })
      }
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
                disabled={!isNew && invoiceSettings.type === "organisation"}
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
                disabled={!isNew && invoiceSettings.type === "individual"}
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
              <Col md="2"><Label>Title *</Label></Col>
                <Col md="10">
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
                <Col md="2"><Label>First Name *</Label></Col>
                <Col md="10">
                  <FormGroup>
                  <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("first_name", e.target.value)
                      }
                      value={invoiceSettings.first_name}
                      className={error.first_name ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Last Name *</Label></Col>
                <Col md="10">
                  <FormGroup>
                  <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("last_name", e.target.value)
                      }
                      value={invoiceSettings.last_name}
                      className={error.last_name ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Country *</Label></Col>
                <Col md="10">
                  <FormGroup>
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
                    placeholder={invoiceSettings.country ? countries.find(obj => obj.code === invoiceSettings.country).name : ""} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Address Line 1 *</Label></Col>
                <Col md="10">
                <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("address_line_1", e.target.value)
                      }
                      value={invoiceSettings.address_line_1}
                      className={error.address_line_1 ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Address Line 2</Label></Col>
                <Col md="10">
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
              <Col md="2"><Label>City *</Label></Col>
                <Col md="10">
                  <FormGroup>
                  <Input
                      type="text"
                      onChange={(e) => handleChange("city", e.target.value)}
                      value={invoiceSettings.city}
                      className={error.city ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Postcode *</Label></Col>
                <Col md="10">
                  <FormGroup>
                  <Input
                      type="text"
                      onChange={(e) => handleChange("postal_code", e.target.value)}
                      value={invoiceSettings.postal_code}
                      className={error.postal_code ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>State</Label></Col>
                <Col md="10">
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
              <Col md="2"><Label>Phone *</Label></Col>
                <Col md="10">
                  <FormGroup>
                  <Input
                      type="text"
                      onChange={(e) => handleChange("phone", e.target.value)}
                      value={invoiceSettings.phone}
                      className={error.phone ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row></Row>
            </Form> :
            <Form className="form-horizontal">
              <Row>
              <Col md="2"><Label>Organisation *</Label></Col>
                <Col md="10">
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
              <Col md="2"><Label>VAT ID</Label></Col>
                <Col md="10">
                  <FormGroup>
                    <Input
                      type="text"
                      // onChange={(e) => checkVAT("vat_id", e.target.value)}
                      onChange={(e) => {
                        handleChange('vat_id', e.target.value);
                      }}
                      value={invoiceSettings.vat_id}
                      className={error.vat_id ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Country *</Label></Col>
                <Col md="10">
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
              <Col md="2"><Label>Address Line 1 *</Label></Col>
                <Col md="10">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("address_line_1", e.target.value)
                      }
                      value={invoiceSettings.address_line_1}
                      className={error.address_line_1 ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Address Line 2</Label></Col>
                <Col md="10">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("address_line_2", e.target.value)
                      }
                      value={invoiceSettings.address_line_2}
                      className={error.address_line_2 ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>City *</Label></Col>
                <Col md="10">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("city", e.target.value)}
                      value={invoiceSettings.city}
                      className={error.city ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>Postcode *</Label></Col>
                <Col md="10">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("postcode", e.target.value)}
                      value={invoiceSettings.postal_code}
                      className={error.postal_code ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="2"><Label>State</Label></Col>
                <Col md="10">
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
              <Col md="2"><Label>Phone *</Label></Col>
                <Col md="10">
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => handleChange("phone", e.target.value)}
                      value={invoiceSettings.phone}
                      className={error.phone ? "danger-border" : ""}
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