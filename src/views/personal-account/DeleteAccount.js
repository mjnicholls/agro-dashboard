/* eslint-disable */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { deleteAcct } from "../../services/api/personalAccountAPI";
import {
  notifyError,
  notifySuccess,
} from "../../features/notifications/actions";


const userSubscriptionSelector = state => state.auth.user.tariff;

const DeleteAccount = ({ close, refreshData }) => {
  
  const dispatch = useDispatch();

  const subscription = useSelector(userSubscriptionSelector);

  const confirmDeleteAcct = () => {
    let data = {};

    deleteAcct(data)
      .then(() => {
        refreshData();
        dispatch(notifySuccess("Account deleted"));
      })
      .catch((error) => {
        dispatch(notifyError("Error deleting account" + error.message));
      });
    close();
  };

  return (
    subscription === "free" ? 
    <div>
    <Row>
      <Col className="mb-3">
        <p>
          If you delete your account all your API keys will be blocked.
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="mb-3">
        <p>
          If you have any questions, please reach out to our friendly
          support team by emailing us at <a href="mailto:info@openweathermap.org" target="_blank">info@openweathermap.org</a>
        </p>
      </Col>
    </Row>
      <Row>
        <Col className="mb-3">
          <p>We are sad to see you leave. Please share with us the reason why you are deleting your account:</p>
        </Col></Row>
    <div className="agro-pop-up-footer">

    <Label md="3">Reason *</Label>
    <Col md="9">
      <FormGroup>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          style={{ color: "black", marginBottom:"25px" }}
        >
          <option selected value="blank"></option>
          <option value="bad">Bad service</option>
          <option value="another">I found another company</option>
          <option value="price">Price</option>
          <option value="service">I don&#39;t use this service</option>
          <option value="email">Wrong email</option>
        </Input>
      </FormGroup>
    </Col>
    <Row>
      <Col className="mb-3">
       
      </Col>
    </Row>
    <Button
      className="btn-neutral"
      color="default"
      type="button"
      onClick={close}
    >
      Cancel
    </Button>
    <Button
      className="btn-danger"
      color="danger"
      data-dismiss="modal"
      type="button"
      onClick={confirmDeleteAcct}
    >
      Delete
    </Button>
  </div>
</div>
    
    :

    <div>
    <Row>
          <Col className="mb-3">
            <p>
              Please <NavLink to='/dashboard/billing-plans'>cancel your subscriptions</NavLink> before deleting your account.
            </p>
            <p>If you have a paid subscription and delete your account, <b>your money will not be returned.</b></p>
          </Col>
        </Row>
        {/* <Row>
          </Row>
          <Row>
          <Col className="mb-3">
              <li>If you have a subscription Agriculture API, please unsubscribe <a href = "">here.</a></li>
          </Col>
        </Row> */}
        <div className="agro-pop-up-footer">
        <Button
      className="btn-neutral"
      color="default"
      type="button"
      onClick={close}
    >
      Cancel
    </Button>
    {/* <Button
      className="btn-danger"
      color="danger"
      data-dismiss="modal"
      type="button"
      onClick={confirmDeleteAcct}
    >
      Delete
    </Button> */}
    </div>
        </div>
  
   
  );
};

export default DeleteAccount;
