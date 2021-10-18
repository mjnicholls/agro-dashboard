import React, { useState } from 'react'

import classnames from 'classnames'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch } from 'react-redux'
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
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import { updateMailing } from '../../api/personalAccountAPI'

// import { createNewUser } from '../../services/api/personalAccountAPI'

const RegisterForm = () => {

  const [state, setState] = React.useState({})
  const [error, setError] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [checkAge, setCheckAge] = useState(false)
  const [checkTerms, setCheckTerms] = useState(false)
  const dispatch = useDispatch()
    const [mailSettings, setMailSettings] = useState({
    news: false,
    product: false,
    system: false,
  })
  

  const createUser = () => {
    setError({})

    // username & email

    const newError = {}

    if (
      !username.length ||
      !email.length ||
      !pass.length ||
      !confirmPass.length
    ) {
      newError.username = !username.length
      newError.email = !email.length
      newError.pass = !pass.length
      newError.confirmPass = !confirmPass.length
      dispatch(notifyError('Cannot be empty'))
      setError(newError)
      return
    }

    // password conditions

    if (pass.length < 8 || confirmPass.length < 8) {
      newError.pass = pass.length < 8
      newError.confirmPass = confirmPass.length < 8
      dispatch(notifyError('Must be eight characters or more'))
      setError(newError)
      return
    }

    if (pass !== confirmPass) {
      newError.pass = true
      newError.confirmPass = true
      dispatch(notifyError('Passwords do not match'))
      setError(newError)
      return
    }

    if (checkAge === false) {
      newError.checkAge = true
      dispatch(notifyError('Please confirm you are 16 years or over'))
      setError(newError)
      return
    }

    if (checkTerms === false) {
      newError.checkTerms = true
      dispatch(notifyError('Please agree to the privacy policy'))
      setError(newError)
      return
    }

    // create user
    const data = {
      user: {
        email,
        pass,
        username,
      },
      mailing: mailSettings
    }

    // eslint-disable-next-line
    // createNewUser(data)
    //   .then(() => {
    //     dispatch(notifySuccess('Registration complete'))
    //   })
    //   // eslint-disable-next-line
    //   .catch((error) => {
    //     dispatch(
    //       notifyError(`Error registering ... please try again ${error.message}`),
    //     )
    //   })
  }

  const handleCheckBoxClick = (key, value) => {
    const newObj = {...mailSettings}
    newObj[key] = value
    setMailSettings(newObj)
  }

  updateMailing(mailSettings)
  .then(() => {
   // dispatch(notifySuccess("Mail settings saved"))
  })
  // eslint-disable-next-line
  .catch((error) => {
    dispatch(notifyError(`Error updating settings: ${error.message}`))
  })


  const onChange = (value) => {
    console.log('Captcha value:', value)
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
                  We&#39;ve created the marketing campaign of the website. It
                  was a very interesting collaboration.
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
                  We&#39;ve developed the website with HTML5 and CSS3. The
                  client has access to the code using GitHub.
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
                  // eslint-disable-next-line
                  src={require('assets/img/card-primary.png').default}
                  style={{ top: '-70px' }}
                />
                <CardTitle tag="h4">Register</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form">
                  <InputGroup
                    className={classnames({
                      'input-group-focus': state.nameFocus,
                      'has-danger': error.email,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email Address"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={(e) => setState({ ...state, nameFocus: true })}
                      onBlur={(e) => setState({ ...state, nameFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      'input-group-focus': state.nameFocus,
                      'has-danger': error.username,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={(e) => setState({ ...state, nameFocus: true })}
                      onBlur={(e) => setState({ ...state, nameFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      'input-group-focus': state.nameFocus,
                      'has-danger': error.pass,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="off"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      'input-group-focus': state.nameFocus,
                      'has-danger': error.confirmPass,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="off"
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </InputGroup>
                  <Label style={{margin: "20px 5px 20px 20px"}}>
                    <span className="form-check-sign">We will use information you provided for management and administration purposes, and for keeping you informed by mail, telephone, email and SMS of other products and services from us and our partners. You can proactively manage your preferences or opt-out of communications with us at any time using Privacy Centre. You have the right to access your data held by us or to request your data to be deleted. For full details please see <a href="https://agromonitoring.com/privacy-policy" target="_blank">Privacy Policy.</a></span>
                    </Label>
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input 
                      type="checkbox" 
                      onChange={(e) => setCheckAge(!checkAge)}
                      checked={checkAge}
                      />
                      <span className="form-check-sign" />I am 16 years or over
                    </Label>
                  </FormGroup>
                  <FormGroup check className="text-left">
               
                    <Label check>
                      <Input
                      type="checkbox" 
                       //className={error.checkTerms ? 'danger-border' : ''}
                       onChange={(e) => setCheckTerms(!checkTerms)}
                       checked={checkTerms}
                       />
                      <span className="form-check-sign" />I agree with{' '}
                      <a
                        href="https://agromonitoring.com/privacy-policy"
                        target="_blank"
                      >
                        {' '}
                        Privacy Policy
                      </a>
                      ,{' '}
                      <a
                        href="https://agromonitoring.com/storage/app/media/Terms/ExtremeElectronics_terms_and_conditions_of_sale.pdf"
                        target="_blank"
                      >
                        {' '}
                        Terms and conditions of sale
                      </a>{' '}
                      and{' '}
                      <a
                        href="https://agromonitoring.com/storage/app/media/Terms/ExtremeElectronics_website_terms_and_conditions_of_use.pdf"
                        target="_blank"
                      >
                        {' '}
                        Website&#39;s terms and conditions of use
                      </a>
                    </Label>
                  </FormGroup>
                </Form>
                <hr />
                <Form className="form">
                <Label style={{margin: "10px 5px 10px 20px"}}>
                    <span className="form-check-sign">I consent to receive communications from Extreme Electronics Ltd. and their partners:</span>
                    </Label>
                  <FormGroup check className="text-left">
                    <Label check className="mr-3">
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          handleCheckBoxClick('news', e.target.checked)
                        }}
                      />
                      <span className="form-check-sign" />
                      Corporate news (our life, the launch of a new service,
                      etc)
                    </Label>
                  </FormGroup>
                  <FormGroup check className="text-left">
                  <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          handleCheckBoxClick('product', e.target.checked)
                        }}
                      />
                      <span className="form-check-sign" />
                      Product news (change to price, new product features, etc)
                    </Label>
                  </FormGroup>
                  <FormGroup check className="text-left">
                  <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          handleCheckBoxClick('system', e.target.checked)
                        }}
                      />
                      <span className="form-check-sign" />
                      System news (API usage alert, system update, temporary
                      system shutdown, etc)
                    </Label>
                
                  </FormGroup>

                  <FormGroup className="text-left">
                    <Label>
                      <ReCAPTCHA
                        style={{ marginLeft: '15px', marginTop: '35px' }}
                        sitekey="6Ler3aocAAAAADwkBRcUEZYnjE7KEJChWn1P_Hu4"
                        onChange={onChange}
                      />
                    </Label>
                    {/* Secret Key: 6Ler3aocAAAAABa_3uUTRkSIfyiJrxd9MYiXshEU */}
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter className="text-right">
                <Button
                  className="btn-round"
                  color="primary"
                  onClick={createUser}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RegisterForm
