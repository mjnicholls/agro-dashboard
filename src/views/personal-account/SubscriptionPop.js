import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  invoiceEdit,
  confirmUserVat,
  getCountries,
  invoiceCreate,
} from "../../services/api/personalAccountAPI";
import {
  notifyError,
  notifySuccess,
} from "../../features/notifications/actions";
import classnames from "classnames";
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
} from "reactstrap";
import { countriesDefault, titles } from "../../config";
import Select from "react-select";
import { getMailPrefs } from '../../services/api/personalAccountAPI';


const InvoiceSettings = ({ close }) => {

  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [countries, setCountries] = useState(countriesDefault);
  const [isNew, setIsNew] = useState(true);

  const [invoiceSettings, setInvoiceSettings] = useState({
    type: "individual",
    organisation: "",
    title: "",
    first_name: "",
    last_name: "",
    country: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    postal_code: "",
    state: "",
    phone: "",
    vat_id: ""
  });

  useEffect(() => {
    refreshData();
   }, [])

   const refreshData = () => {
    getMailPrefs()
    .then(res => {

      if (Object.keys(res.invoice_info).length) {
        setInvoiceSettings(res.invoice_info)
        setIsNew(false)
      }
      else {
        setIsNew(true);
      }
     })
   }

  useState(() => {
    getCountries().then((res) => {
      if (res.length) {
        setCountries(res);
      }
    });
  }, [invoiceSettings]);

  const handleChange = (key, value) => {
    let newObj = Object.assign({}, invoiceSettings);
    newObj[key] = value;
    setInvoiceSettings(newObj);
  };

  const billingInfoCreate = () => {
    invoiceCreate(invoiceSettings)
      .then(() => {
        dispatch(notifySuccess("Billing details saved"));
        refreshData();
      })
      .catch((error) => {
        dispatch(
          notifyError("Error saving billing details " + error.message)
        );
      });

  }

  const billingInfoUpdate = () => {
    invoiceEdit(invoiceSettings)
      .then(() => {
        dispatch(notifySuccess("Billing details updated"));
      })
      .catch((error) => {
        dispatch(
          notifyError("Error updating billing details " + error.message)
        );
      });
  }

  const confirmInvoice = () => {
    setError({});
    let newError = {
      country: !invoiceSettings.country.length,
      address_line_1: !invoiceSettings.address_line_1.length,
      address_line_2: !invoiceSettings.address_line_2.length,
      city: !invoiceSettings.address_line_2.length,
      postal_code: !invoiceSettings.postal_code.length,
      phone: !invoiceSettings.phone.length
    }

    if (invoiceSettings.type === "individual") {
      if (
        !invoiceSettings.first_name.length ||
        !invoiceSettings.last_name.length
      ) {
        newError.first_name = !invoiceSettings.first_name.length;
        newError.last_name = !invoiceSettings.last_name.length
      }
    } else {
      if (!invoiceSettings.organisation.length) {
        newError.organisation = true
      }
    }
    setError(newError);

    if (Object.values(newError).filter(Boolean).length) {
      dispatch(notifyError("Please fill in required fields"));
      return;
    }

    if (
      invoiceSettings.type === "organisation" &&
      invoiceSettings.vat_id.length
    ) {
      confirmUserVat(invoiceSettings.vat_id)
        .then(() => {
          isNew ? billingInfoCreate() : billingInfoUpdate()
        })
        .catch(() => {
          dispatch(notifyError("Incorrect VAT number"));
        });
    } else {
      isNew ? billingInfoCreate() : billingInfoUpdate();
    }
  };

  return (
      <div>
          <h2>Subscribe</h2>
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
     
        <Form className="form-horizontal">
          {invoiceSettings.type === "individual" ? (
            <>
            
              <Row>
        
                <Col md="12" style={{marginTop: "20px"}}>
                <Label>Title *</Label>
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
                
                <Col md="12">
                <Label>First Name *</Label>
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
              
                <Col md="12">
                <Label>Last Name *</Label>
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
            </>
          ) : (
            <>
              <Row>
               
              <Col md="12" style={{marginTop: "20px"}}>
                <Label>Organisation *</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleChange("organisation", e.target.value)
                      }
                      value={invoiceSettings.organisation}
                      className={error.organisation ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              
                <Col md="12">
                <Label>VAT ID</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={(e) => {
                        handleChange("vat_id", e.target.value);
                      }}
                      value={invoiceSettings.vat_id}
                      className={error.vat_id ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}
          <Row>
         
            <Col md="12">
            <Label>Country *</Label>
              <FormGroup>
                <Select
                  className={classnames(
                    "react-select info mb-3",
                    error.country ? "danger-border" : ""
                  )}
                  classNamePrefix="react-select"
                  onChange={(country) => {
                    handleChange("country", country.code);
                  }}
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.code}
                  placeholder={
                    invoiceSettings.country
                      ? countries.find(
                          (obj) => obj.code === invoiceSettings.country
                        ).name
                      : ""
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
           
            <Col md="12">
            <Label>Address Line 1 *</Label>
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
           
            <Col md="12">
            <Label>Address Line 2</Label>
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
           
            <Col md="12">
            <Label>City *</Label>
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
       
            <Col md="12">
            <Label>Postcode *</Label>
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
            
            <Col md="12">
            <Label>State</Label>
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
         
            <Col md="12" style={{marginBottom: "20px"}}>
            <Label>Phone *</Label>
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
 
        <Form className="form-horizontal">
          <Row>
            <Label md="3" />
            <Col md="12" className="text-right">
              <Button
                className="btn-fill"
                color="primary"
                type="button"
                onClick={confirmInvoice}
              
              >
                Subscribe
              </Button>
              <Button
      className="btn-neutral"
      color="default"
      type="button"
      onClick={close}
    >
      Cancel
    </Button>
            </Col>
          </Row>
        </Form>

    </div>
  );
};

export default InvoiceSettings;
