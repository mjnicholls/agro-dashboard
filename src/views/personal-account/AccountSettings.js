import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getMailPrefs,
  deleteAcct,
} from "../../services/api/personalAccountAPI";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import UserSettings from "./UserSettings";
import UserPassword from "./UserPassword";
import PrivacySettings from "./PrivacySettings";
import InvoiceSettings from "./InvoiceInfo";
import DeleteAccount from "./DeleteAccount";
import ReactBSAlert from "react-bootstrap-sweetalert";
import UnitsRadioButtons from "../agro-components/UnitsRadioButtons";

const userSubscriptionSelector = (state) => state.auth.user.tariff;

const AccountSettings = ({}) => {
  const subscription = useSelector(userSubscriptionSelector);

  const [data, setData] = useState([]);
  const [alert, setAlert] = React.useState(null);

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
    vat_id: "",
  });

  const [isNew, setIsNew] = useState(true);

  const [mailSettings, setMailSettings] = useState({
    news: false,
    product: false,
    system: false,
  });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const hideAlert = () => {
    setAlert(null);
  };

  const refreshData = () => {
    getMailPrefs().then((res) => {
      setName(res.user.full_name);
      setUsername(res.user.username);
      setEmail(res.user.email);
      setMailSettings(res.mailing);
      if (Object.keys(res.invoice_info).length) {
        setInvoiceSettings(res.invoice_info);
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    });
  };

  const htmlAlert = (acctNo) => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title={"Are you sure you want to delete your account?"}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
      >
        {<DeleteAccount acctNo={acctNo} close={hideAlert} />}
      </ReactBSAlert>
    );
  };

  return (
    <>
      {alert}
      <div className="content">
        <Row>
          <Col>
            <h1>Account Settings</h1>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <UserSettings
              name={name}
              setName={setName}
              username={username}
              setUserName={setUsername}
              email={email}
            />
          </Col>
          <Col md="4">
            <UserPassword />
          </Col>
          <Col md="4">
            <PrivacySettings
              mailSettings={mailSettings}
              setMailSettings={setMailSettings}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="8">
            <InvoiceSettings
              invoiceSettings={invoiceSettings}
              setInvoiceSettings={setInvoiceSettings}
              isNew={isNew}
              refreshData={refreshData}
            />
          </Col>
          <Col lg="4">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Dashboard Settings</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <UnitsRadioButtons />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Delete Your Account</CardTitle>
                  </CardHeader>
                  <CardBody className="text-right">
                    <Button
                      className="btn-fill"
                      color="danger"
                      type="button"
                      title="Delete"
                      disabled={data.length === 1}
                      onClick={(e) => {
                        htmlAlert(false);
                        e.stopPropagation();
                      }}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AccountSettings;
