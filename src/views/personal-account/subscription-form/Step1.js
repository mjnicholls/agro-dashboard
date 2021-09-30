import React from "react";
import { Col, Form, Label, FormGroup, Input, Row } from "reactstrap";
import { titles } from "../../../config";
import Select from "react-select";

const Step1 = ({ invoiceSettings, setInvoiceSettings, isNew, error }) => {
  const handleChange = (key, value) => {
    let newObj = Object.assign({}, invoiceSettings);
    newObj[key] = value;
    setInvoiceSettings(newObj);
  };

  return (
    <div>
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
              <Col md="12" style={{ marginTop: "20px" }}>
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
                    onChange={(e) => handleChange("first_name", e.target.value)}
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
                    onChange={(e) => handleChange("last_name", e.target.value)}
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
              <Col md="12" style={{ marginTop: "20px" }}>
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
      </Form>
    </div>
  );
};

export default Step1;
