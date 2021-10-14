import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Label, Row } from 'reactstrap'

import {
  getAccountInfo,
  updateBillingDetails,
  confirmVatNumber,
  createBillingDetails,
} from '../../api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

import Step1 from './subscription-form/Step1'
import Step2 from './subscription-form/Step2'

const InvoiceSettings = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const [isNew, setIsNew] = useState(true)
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

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    getAccountInfo().then((res) => {
      if (Object.keys(res.invoice_info).length) {
        setInvoiceSettings(res.invoice_info)
        setIsNew(false)
      } else {
        setIsNew(true)
      }
    })
  }

  const billingInfoCreate = () => {
    createBillingDetails(invoiceSettings)
      .then(() => {
        dispatch(notifySuccess('Billing details saved'))
        refreshData()
      })
      // eslint-disable-next-line
      .catch((error) => {
        dispatch(notifyError(`Error saving billing details + ${error.message}`))
      })
  }

  const billingInfoUpdate = () => {
    updateBillingDetails(invoiceSettings)
      .then(() => {
        dispatch(notifySuccess('Billing details updated'))
      })
      // eslint-disable-next-line
      .catch((error) => {
        dispatch(notifyError(`Error saving billing details + ${error.message}`))
      })
  }

  const confirmInvoice = () => {
    setError({})
    const newError = {
      country: !invoiceSettings.country.length,
      address_line_1: !invoiceSettings.address_line_1.length,
      address_line_2: !invoiceSettings.address_line_2.length,
      city: !invoiceSettings.address_line_2.length,
      postal_code: !invoiceSettings.postal_code.length,
      phone: !invoiceSettings.phone.length,
    }

    setError(newError)

    if (Object.values(newError).filter(Boolean).length) {
      dispatch(notifyError('Please fill in required fields'))
      return
    }

    if (
      invoiceSettings.type === 'organisation' &&
      invoiceSettings.vat_id.length
    ) {
      confirmVatNumber(invoiceSettings.vat_id)
        .then(() => {
          // eslint-disable-next-line
          isNew ? billingInfoCreate() : billingInfoUpdate()
        })
        .catch(() => {
          dispatch(notifyError('Incorrect VAT number'))
        })
    } else {
      // eslint-disable-next-line
      isNew ? billingInfoCreate() : billingInfoUpdate()
    }
  }

  const decrementStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const incrementStep = () => {
    setError({})
    if (step === 1) {
      const newError = {}
      if (invoiceSettings.type === 'individual') {
        if (
          !invoiceSettings.first_name.length ||
          !invoiceSettings.last_name.length
        ) {
          newError.first_name = !invoiceSettings.first_name.length
          newError.last_name = !invoiceSettings.last_name.length
        }
      } else {
        // eslint-disable-next-line
        if (!invoiceSettings.organisation.length) {
          newError.organisation = true
        }
      }
      console.log('newError', newError)
      setError(newError)
      if (Object.keys(newError).length) {
        // eslint-disable-next-line
        return
        // eslint-disable-next-line
      } else {
        setStep(2)
      }
    }
  }

  return (
    <div>
      <h2>Subscribe</h2>
      {step === 1 ? (
        <Step1
          invoiceSettings={invoiceSettings}
          setInvoiceSettings={setInvoiceSettings}
          isNew={isNew}
          error={error}
        />
      ) : (
        <Step2
          invoiceSettings={invoiceSettings}
          setInvoiceSettings={setInvoiceSettings}
          isNew={isNew}
          error={error}
        />
      )}

      <Form className="form-horizontal">
        <Row>
          <Label md="3" />
          <Col md="12" className="text-right">
            {step === 1 ? (
              <Button
                className="btn-fill"
                color="primary"
                type="button"
                onClick={incrementStep}
                style={{
                  float: 'right',
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                className="btn-fill"
                color="primary"
                type="button"
                onClick={confirmInvoice}
                style={{
                  float: 'right',
                }}
              >
                Subscribe
              </Button>
            )}

            {step === 2 && (
              <Button
                className="btn-neutral"
                color="default"
                type="button"
                onClick={decrementStep}
              >
                Back
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default InvoiceSettings
