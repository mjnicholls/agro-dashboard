import React, { useRef, useState } from 'react'

import {
  faKey,
  faMapMarkerAlt,
  faSatellite,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap'

import { createNewUser } from '../../api/auth'
import cardPrimary from '../../assets/img/card-primary.png'
import {
  errors,
  passwordLength,
  RECAPTCHA_SITE_KEY,
} from '../../config'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'


const RegisterForm = () => {
  const [state, setState] = React.useState({})
  const [error, setError] = useState({})
  const [mailSettings, setMailSettings] = useState({
    news: false,
    product: false,
    system: false,
  })
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    confirmPass: ''
  })
  const [isAge, setIsAge] = useState(false)
  const [isTerms, setIsTerms] = useState(false)
  const dispatch = useDispatch()

  const recaptchaRef = useRef()

  const signUp = () => {
    setError({})
    const newError = {}
    const requiredFields = ["username", "email", "password", "confirmPass"]
    for (let i=0; i < requiredFields.length; i+=1) {
      if (!user[requiredFields[i]]) {
        newError[requiredFields[i]] = errors.noBlank
      }
    }
    if (user.password.length < passwordLength) {
      newError.password = errors.passwordLength
    }
    if (user.confirmPass.length < passwordLength) {
      newError.confirmPass = errors.passwordLength
    }
    if (user.password !== user.confirmPass) {
      newError.password = errors.passwordMissMatch
      newError.confirmPass = errors.passwordMissMatch
    }
    if (!isAge) {
      newError.isAge = 'Please confirm you are 16 years old or older'
    }
    if (!isTerms) {
      newError.isTerms = 'Please agree to the privacy policy'
    }

    if (!recaptchaRef.current.getValue()) {
      newError.recaptcha = "reCAPTCHA verification failed, please try again."
    }

    console.log("newError", newError)
    if (Object.keys(newError).length) {
      setError(newError)
      return
    }

    const data = {
      user: {
        ...user,
        password_confirmation: user.confirmPass,
      },
      agreement: {
        is_age_confirmed: isAge ? '1' : '0',
        is_accepted: isTerms ? '1' : '0',
      },
      mailing: {
        system: mailSettings.system ? '1' : '0',
        product: mailSettings.product ? '1' : '0',
        news: mailSettings.news ? '1' : '0',
      },
      advertising: {
        campaign_id: null,
        entrance_date: null,
      },
    }

    createNewUser(data)
      .then(() => {
        dispatch(notifySuccess('Registration complete'))
      })
      .catch((err) => {
        console.log(err)
        dispatch(
          notifyError(`Error signing up: ${err.message}. Please try again.`),
        )
      })
  }

  const handleCheckBoxClick = (key, value) => {
    const newObj = { ...mailSettings }
    newObj[key] = value
    setMailSettings(newObj)
  }

  const updateUser = (key, value) => {
    const newObj = { ...user }
    newObj[key] = value
    setUser(newObj)
  }

  return (
    <div className="content">
      <Container>
        <Row>
          <Col className="ml-auto" md="5">
            <div className="info-area info-horizontal mt-5">
              <div className="icon icon-primary">
                <FontAwesomeIcon icon={faSatellite} />
              </div>
              <div className="description">
                <h3 className="info-title">
                  Satellite imagery archive and wide range of vegetation indices{' '}
                </h3>
                <p className="description">
                  NDVI, EVI, DSWI, NDWI, NRI and other vegetation indices let you identify anomalies
                  in your fields and plan further actions, and with historical
                  NDVI chart you can analyze the changes in the level of
                  vegetation in your field through the seasons
                </p>
              </div>
            </div>
            <div className="info-area info-horizontal">
              <div className="icon icon-primary">
                <FontAwesomeIcon icon={faTemperatureLow} />
              </div>
              <div className="description">
                <h3 className="info-title">
                  Accurate and generous weather data
                </h3>
                <p className="description">
                  Weather data for your fields, including the current state of
                  weather, soil, weather alerts; weather forecasts with hourly
                  and daily granulation; recent temperature, precipitation, soil
                  temperature and moisture; accumulated temperature and
                  precipitation
                </p>
              </div>
            </div>
            <div className="info-area info-horizontal">
              <div className="icon icon-primary">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="description">
                <h3 className="info-title">Advanced crop recognition </h3>
                <p className="description">
                  Based on Machine Learning technology, it will help you get
                  information on the state of fields, their crops and NDVI
                  statistics through the years.
                </p>
              </div>
            </div>
            <div className="info-area info-horizontal">
              <div className="icon icon-primary">
                <FontAwesomeIcon icon={faKey} />
              </div>
              <div className="description">
                <h3 className="info-title">Agro API access</h3>
                <p className="description">
                  Easy-to-use Agro API will help you build your own
                  agricultural dashboard or app. Simply sign up and get your API
                  key to start working on a new project.
                </p>
              </div>
            </div>
          </Col>
          <Col className="mr-auto" md="7">
            <Card className="card-register card-white">
              <CardHeader>
                <CardImg alt="..." src={cardPrimary} style={{ top: '-70px' }} />
                <CardTitle tag="h4">Register</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form p-3">
                  <InputGroup
                    className={classnames('mb-0 mt-2 ', {
                      'input-group-focus': state.emailFocus,
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
                      value={user.email}
                      onChange={(e) => updateUser('email', e.target.value)}
                      onFocus={() => setState({ ...state, emailFocus: true })}
                      onBlur={() => setState({ ...state, emailFocus: false })}
                    />
                  </InputGroup>
                  <div
                      className={classnames(
                        'invalid-feedback ',
                        error.email ? 'd-block' : '',
                      )}
                    >
                      {error.email}
                    </div>
                  <InputGroup
                    className={classnames('mb-0 mt-2 ', {
                      'input-group-focus': state.usernameFocus,
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
                      value={user.username}
                      onChange={(e) => updateUser('username', e.target.value)}
                      onFocus={() =>
                        setState({ ...state, usernameFocus: true })
                      }
                      onBlur={() =>
                        setState({ ...state, usernameFocus: false })
                      }
                    />
                  </InputGroup>
                  <div
                      className={classnames(
                        'invalid-feedback ',
                        error.username ? 'd-block' : '',
                      )}
                    >
                      {error.username}
                    </div>
                  <InputGroup
                    className={classnames('mb-0 mt-2 ', {
                      'input-group-focus': state.passFocus,
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
                      value={user.password}
                      autoComplete="off"
                      onChange={(e) => updateUser('password', e.target.value)}
                      onFocus={() => setState({ ...state, passFocus: true })}
                      onBlur={() => setState({ ...state, passFocus: false })}
                    />
                  </InputGroup>
                  <div
                      className={classnames(
                        'invalid-feedback ',
                        error.password ? 'd-block' : '',
                      )}
                    >
                      {error.password}
                    </div>
                  <InputGroup
                    className={classnames('mb-0 mt-2 ', {
                      'input-group-focus': state.confirmPassFocus,
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
                      value={user.confirmPass}
                      onChange={(e) => updateUser('confirmPass', e.target.value)}
                      onFocus={() =>
                        setState({ ...state, confirmPassFocus: true })
                      }
                      onBlur={() =>
                        setState({ ...state, confirmPassFocus: false })
                      }
                    />
                  </InputGroup>
                  <div
                      className={classnames(
                        'invalid-feedback ',
                        error.confirmPass ? 'd-block' : '',
                      )}
                    >
                      {error.confirmPass}
                    </div>
                  <div className="my-3">
                    <span className="form-check-sign">
                      We will use information you provided for management and
                      administration purposes, and for keeping you informed by
                      mail, telephone, email and SMS of other products and
                      services from us and our partners. You can proactively
                      manage your preferences or opt-out of communications with
                      us at any time using Privacy Centre. You have the right to
                      access your data held by us or to request your data to be
                      deleted. For full details please see{' '}
                      <a
                        href="https://agromonitoring.com/privacy-policy"
                        target="_blank"
                      >
                        Privacy Policy.
                      </a>
                    </span>
                  </div>

                  <FormGroup check className="text-left">
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={() => setIsAge(!isAge)}
                        checked={isAge}
                      />
                      <span className="form-check-sign" />I am 16 years old or older
                    </Label>
                    <div
                      className={classnames(
                        'invalid-feedback mt-0 ',
                        error.isAge ? 'd-block' : '',
                      )}
                    >
                      {error.isAge}
                    </div>
                  </FormGroup>
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={() => setIsTerms(!isTerms)}
                        checked={isTerms}
                      />
                      <span className="form-check-sign" />I agree to the{' '}
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
                    <div
                      className={classnames(
                        'invalid-feedback mt-0 ',
                        error.isTerms ? 'd-block' : '',
                      )}
                    >
                      {error.isTerms}
                    </div>
                  </FormGroup>
                <hr />
                <div className="my-3">
                  <span className="form-check-sign">
                    I consent to receive communications from Extreme
                    Electronics Ltd. and their partners:
                  </span>
                </div>
                  <FormGroup check>
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
                  <FormGroup check>
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
                  <FormGroup check>
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
                  <FormGroup className="my-5">
                    <Label>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                      />
                      <div
                      className={classnames(
                        'invalid-feedback ',
                        error.recaptcha ? 'd-block' : '',
                      )}
                    >
                      {error.recaptcha}
                    </div>
                    </Label>

                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter className="d-flex justify-content-between align-items-center">
                <h6>
                  <NavLink to="/auth/login" className="link footer-link">
                    Back to sign in
                  </NavLink>
                </h6>
                <Button
                  className="btn-round"
                  color="primary"
                  onClick={signUp}
                  size="lg"
                >
                  Sign up
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
