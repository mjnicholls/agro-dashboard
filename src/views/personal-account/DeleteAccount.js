import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAcct } from "../../services/api/personalAccountAPI";
import {
  notifyError,
  notifySuccess,
} from "../../features/notifications/actions";
// reactstrap components
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

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
          <option value="service">I don't use this service</option>
          <option value="email">Wrong email</option>
        </Input>
      </FormGroup>
    </Col>
    <Row>
      <Col className="mb-3">
       
      </Col>
    </Row>
    <Button
      className="btn-primary"
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
            Please cancel your subscriptions before deleting your account. 
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <p>
              If you have a paid subscription and delete your account, <b>your money will not be returned.</b>
            </p>
          </Col>
          </Row>
          <Row>
          <Col className="mb-3">
         
              <li>If you have a subscription to weather services (Weather API or Weather Historical Data), kindly please unsubscribe <a href = "">here.</a></li>

              <li>If you have a subscription Agriculture API, kindly please unsubscribe <a href = "">here.</a></li>
            
          </Col>
        </Row>
        <div className="agro-pop-up-footer">
        <Button
      className="btn-primary"
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
  
   
  );
};

export default DeleteAccount;
