/* eslint-disable */ 
import React, { useEffect, useState } from "react";
import {  updatePassword, updateUserName, updateMailing } from '../../services/api/personalAccountAPI';
import { useDispatch } from 'react-redux';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
import ReCAPTCHA from 'react-google-recaptcha';


const RegisterForm = () => {

  const [error, setError] = useState(null);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mailSettings, setMailSettings] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const dispatch = useDispatch();

  const createUser = () => {

    setError(null);

    // username & email

    if
     (!username.length && !email.length && pass.length && confirmPass.length) {
       setError(true);
       dispatch(notifyError("Cannot be empty"));
       return
     }

     let data = {

        "user": {
            "email": email,
            "password": pass,
            "username": username,
        },
        "mailing": {
            "news": true,
            "product": false,
            "system": false
        }
     }

     createNewUser(data).then(
         () => {
           dispatch(console.log("User cretated"))
         }).catch(error => {
           dispatch(notifyError("Error updating name " + error.message))
         })

         handleCheckBoxClick = (key, value) => {
          // eslint-disable-next-line
          let newObj = Object.assign({}, mailSettings);
          newObj[key] = value;
          setMailSettings(newObj);
        };

  

    }



      const onChange = (value) => {
        console.log('Captcha value:', value);
      }

  
    
    
    return (
      <div className="content">
      <Container>
        <Row>
          <Col className="ml-auto" md="5">
            <div className="info-area info-horizontal mt-5">
              <div className="icon icon-warning">
                <i className="tim-icons icon-wifi" />
              </div>
              <div className="description">
                <h3 className="info-title">Marketing</h3>
                <p className="description">
                  We've created the marketing campaign of the website. It was
                  a very interesting collaboration.
                </p>
              </div>
            </div>
            <div className="info-area info-horizontal">
              <div className="icon icon-primary">
                <i className="tim-icons icon-triangle-right-17" />
              </div>
              <div className="description">
                <h3 className="info-title">Fully Coded in HTML5</h3>
                <p className="description">
                  We've developed the website with HTML5 and CSS3. The client
                  has access to the code using GitHub.
                </p>
              </div>
            </div>
            <div className="info-area info-horizontal">
              <div className="icon icon-info">
                <i className="tim-icons icon-trophy" />
              </div>
              <div className="description">
                <h3 className="info-title">Built Audience</h3>
                <p className="description">
                  There is also a Fully Customizable CMS Admin Dashboard for
                  this product.
                </p>
              </div>
            </div>
          </Col>
          <Col className="mr-auto" md="7">
            <Card className="card-register card-white">
              <CardHeader>
                <CardImg
                  alt="..."
                  src={require('assets/img/card-primary.png').default}
                />
                <CardTitle tag="h4">Register</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form">
                <InputGroup
                //</Form> className={classnames({
                //     'input-group-focus': state.nameFocus,
                  // })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      className={error ? "danger-border" : ""}
                      onChange={(e) => setEmail(e.target.value)}
                     // onBlur={(e) => setState({ ...state, nameFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                //</Form> className={classnames({
                //     'input-group-focus': state.nameFocus,
                  // })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      className={error ? "danger-border" : ""}
                      onChange={(e) => setUsername(e.target.value)}
                     // onBlur={(e) => setState({ ...state, nameFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                   //</Form> className={classnames({
                    //  'input-group-focus': state.emailFocus,
                   // })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
               type="password"
               autoComplete="off"
              onChange={(e) => setPass(e.target.value)}
         
               className={error ? "danger-border" : ""}
                    />
                  </InputGroup>
                  <InputGroup
                 //</Form>   className={classnames({
                  //    'input-group-focus': state.passFocus,
                  //  })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                            type="password"
                            autoComplete="off"
                           onChange={(e) => setConfirmPass(e.target.value)}
                        
                            className={error ? "danger-border" : ""}
                            style={{marginBottom:"22px" }}
                    />
                  </InputGroup>
                  <FormGroup check className="text-left">
                  <Label check className="mr-3">
              <Input
                id="individualRadioButton"
                name="legalForm"
                type="radio"
                checked="true"
              />
              <span className="form-check-sign" />
              I am 16 years old and over
            </Label>
                  </FormGroup>
                  <FormGroup check className="text-left">
                  <Label check>
              <Input
                id="organisationRadioButton"
                name="legalForm"
                type="radio"
                checked="true"
              />
              <span className="form-check-sign" />
              I agree with <a
                          href="https://agromonitoring.com/privacy-policy"
                          target="_blank"> Privacy Policy
                        </a>, <a
                          href="https://agromonitoring.com/storage/app/media/Terms/ExtremeElectronics_terms_and_conditions_of_sale.pdf"
                          target="_blank"> Terms and conditions of sale
                        </a> and <a
                          href="https://agromonitoring.com/storage/app/media/Terms/ExtremeElectronics_website_terms_and_conditions_of_use.pdf"
                          target="_blank"> Websites terms and conditions of use
                        </a>
            </Label>
                  </FormGroup>
                </Form>

                <Form className="form">
               
                  <FormGroup check className="text-left">
                  <Label check className="mr-3">
              <Input
                id="individualRadioButton"
                name="legalForm"
                type="radio"
                onChange={(e) => {
                  handleCheckBoxClick("news", e.target.checked);
                }}
              />
              <span className="form-check-sign" />
              System news (API usage alert, system update, temporary system shutdown, etc)
            </Label>
                  </FormGroup>
                  <FormGroup check className="text-left">
                  <Label check>
              <Input
                id="organisationRadioButton"
                name="legalForm"
                type="radio"
                onChange={(e) => {
                  handleCheckBoxClick("system", e.target.checked);
                }}
              />
              <span className="form-check-sign" />
              Product news (change to price, new product features, etc)
            </Label>
                  </FormGroup>
                  <FormGroup check className="text-left">
                  <Label>
              <Input
                id="organisationRadioButton"
                name="legalForm"
                type="radio"
                onChange={(e) => {
                  handleCheckBoxClick("product", e.target.checked);
                }}
              />
              <span className="form-check-sign" />
              Corporate news (our life, the launch of a new service, etc)
            </Label>
                  </FormGroup>
                </Form>



              </CardBody>
              <CardFooter>
                <Button
                  className="btn-round"
                  color="primary"
                  href="#pablo"
                  onClick={createUser}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            <Form>
            <ReCAPTCHA
        sitekey="6Ler3aocAAAAADwkBRcUEZYnjE7KEJChWn1P_Hu4"
        onChange={onChange}
      />
            </Form>
{/* Secret Key: 6Ler3aocAAAAABa_3uUTRkSIfyiJrxd9MYiXshEU */}
          </Col>
        </Row>
      </Container>
    </div>
        
      )
    }

export default RegisterForm;