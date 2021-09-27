import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  deleteAcct } from '../../services/api/personalAccountAPI';
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
  FormGroup,
  Input,
  Label,
  Row
 } from "reactstrap";
 


 const DeleteAccount = ({ acctNo, close, refreshData }) => {

    const dispatch = useDispatch();

    const confirmDeleteAcct = () => {
      let data = {
      
        };

        deleteAcct(data).then(() => {
          refreshData();
          dispatch(notifySuccess("Account deleted"))
        }).catch(error => {
          dispatch(notifyError("Error deleting account" + error.message))
        })
      close();
    }

 


  return (

    <Card>
    <Row>
            <Col className="mb-3">
              <p>Are you sure you want to delete your account?</p>
            </Col>
            <Col className="mb-3">
              <p>If you delete your personal account all your API keys will be blocked.</p>
              <p>If you have any questions, please reach out to our friendly support team by emailing us at: info@openweathermap.org.</p>
            </Col>
            <Label md="3">Country *</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    style={{ color: "black" }}
                  >
                   <option selected value="blank"></option>
                    <option value="bad">Bad service</option>
                    <option value="another">I found another company</option>
                    <option value="price">Price</option>
                    <option value="service">I don't use this service</option>
                    <option value="email">Wrong email</option>
                 
                  </Input>
                </FormGroup>
              </Col>
          </Row>

          <div className="agro-pop-up-footer">
            <Button
              className="btn-neutral"
              color="default"
              type="button"
              //onClick={close}
            >
              Cancel
            </Button>
            <Button
              className="btn-neutral"
              color="default"
              data-dismiss="modal"
              type="button"
              //onClick={confirmDeleteAcct}
            >
              Delete
            </Button>
          </div>
  </Card>
  );
}


export default DeleteAccount;