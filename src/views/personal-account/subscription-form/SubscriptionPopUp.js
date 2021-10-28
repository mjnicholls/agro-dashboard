import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Label, Row } from 'reactstrap'

import { getAccountInfo } from '../../../api/personalAccountAPI'
import {
  updateBillingDetails,
  validateVat,
  createBillingDetails,
  subscribe
} from '../../../api/billingAPI'

import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'

import Step1 from './Step1'
import Step2 from './Step2'
import { noBlank } from '../../../config'
import {validatePhoneNumber} from "../../../utils/validation";
import classnames from "classnames";
import {loadStripe} from '@stripe/stripe-js';

const SubscriptionPopUp = ({plan}) => {
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  // const [isNew, setIsNew] = useState(true)
  const [step, setStep] = useState(1)

  const [invoiceSettings, setInvoiceSettings] = useState({
    type: 'individual',
    organisation: '',
    title: '',
    first_name: '',
    last_name: '',
    country: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postal_code: '',
    state: '',
    phone: '',
    vat_id: '',
  })
  const [user, setUser] = useState({})

  useEffect(() => {
    getAccountInfo().then((res) => {
      if (Object.keys(res.invoice_info).length) {
        setInvoiceSettings(res.invoice_info)
        // setIsNew(false)
      }
      // else {
      //   setIsNew(true)
      // }
      setUser(res.user)
    })
  }, [])


  const confirmSubscription = () => {
    const invoiceDetails = {...invoiceSettings}
    if (invoiceDetails.type === "individual") {
      delete invoiceDetails.organisation
      delete invoiceDetails.vat_id
    } else {
      delete invoiceDetails.title
      delete invoiceDetails.first_name
      delete invoiceDetails.last_name
    }
    invoiceDetails.legal_form = invoiceDetails.type
    delete invoiceDetails.type

    const data = {
      service_key: "agri",
      plan_key: plan,
      user: {
        email: user.email
      },
      invoice_form: invoiceDetails
    }
    subscribe(data)
      .then((res) => {
        console.log(res)
        dispatch(notifySuccess("Successfully subscribed. You will be redirected to stripe page"))
        loadStripe(res.stripe_publishable_key)
          .then(stripe => {
            stripe.redirectToCheckout({
              sessionId: res.stripe_session_id
            })
          })
      })
      .catch(err => {notifyError(`Error: ${err.message}`)})

  }


  // const billingInfoCreate = () => {
  //   createBillingDetails(invoiceSettings)
  //     .then(() => {
  //       dispatch(notifySuccess('Billing details saved'))
  //     })
  //     .catch((err) => {
  //       dispatch(notifyError(`Error saving billing details ${err.message}`))
  //     })
  // }
  //
  // const billingInfoUpdate = () => {
  //   updateBillingDetails(invoiceSettings)
  //     .then(() => {
  //       dispatch(notifySuccess('Billing details updated'))
  //     })
  //     .catch((err) => {
  //       dispatch(notifyError(`Error saving billing details ${err.message}`))
  //     })
  // }

  const decrementStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const incrementStep = () => {
    setError({})
    const newError = {}
    let mandatoryFields
    if (step === 1) {
      mandatoryFields = invoiceSettings.type === 'individual' ? ["first_name", "last_name", 'phone'] : ["organisation", 'phone']
      if (invoiceSettings.phone) {
        const phoneValidation = validatePhoneNumber(invoiceSettings.phone)
        if (phoneValidation) {
          newError.phone = phoneValidation
        }
      }
    } else {
      mandatoryFields = ['country', 'address_line_1', 'city', 'postal_code']
    }

    for (let i=0; i<mandatoryFields.length; i+=1) {
      if (!invoiceSettings[mandatoryFields[i]]) {
        newError[mandatoryFields[i]] = noBlank
      }
    }

    if (step === 2 && invoiceSettings.type === "organisation" && invoiceSettings.country) {
      validateVat(invoiceSettings.vat_id, invoiceSettings.country)
        .then(() => {})
        .catch(() => {newError.vat_id = 'VAT ID is not valid'})
        .finally(() => {
          if (Object.keys(newError).length) {
            setError(newError)
            return
          }
          confirmSubscription()
        })
    } else {
      if (Object.keys(newError).length) {
        setError(newError)
        return
      }
      if (step === 1 ) {
        setStep(2)
      } else {
        confirmSubscription()
      }
    }
  }

  return (
    <div>
      {step === 1 ? (
        <Step1
          invoiceSettings={invoiceSettings}
          setInvoiceSettings={setInvoiceSettings}
          user={user}
          error={error}
        />
      ) : (
        <Step2
          invoiceSettings={invoiceSettings}
          setInvoiceSettings={setInvoiceSettings}
          error={error}
        />
      )}

      <Form className="form-horizontal">
        <Row>
          <Label/>
          <Col
           className={classnames(
              'd-flex ',
              step ===  1 ? 'justify-content-end' : 'justify-content-between'
            )}>
            {step === 2 && (
              <Button
                className='btn-neutral '
                color="default"
                type="button"
                onClick={decrementStep}
              >
                Back
              </Button>
            )}

            <Button
              className="btn-fill"
              color="primary"
              type="button"
              onClick={incrementStep}
              style={{
                float: 'right',
              }}
            >
              {step === 1 ? "Next" : "Subscribe"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SubscriptionPopUp