import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import UnsubscribeAlert from './subscription/UnsubscribeAlert'

const Unsubscribe = ({ callback }) => {
  const [alert, setAlert] = useState(null)

  return (
    <>
      {alert && <UnsubscribeAlert close={() => setAlert(false)} />}
      <Button
        className="btn-fill"
        color="primary"
        type="submit"
        style={{ width: '180px' }}
        onClick={() => setAlert(true)}
      >
        Unsubscribe
      </Button>
    </>
  )
}

Unsubscribe.propTypes = {
  callback: PropTypes.func,
}

export default Unsubscribe
