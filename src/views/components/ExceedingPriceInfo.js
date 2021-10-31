import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'

const ExceedingPriceInfo = ({ close }) => (
  <ReactBSAlert
    title="Price for exceeding area limit"
    customClass="agro-alert-dark"
    onConfirm={close}
    onCancel={close}
    showConfirm={false}
    showCloseButton
  >
    <div className="my-3">
      <p>
        If you need a broader territory that exceeds your plan threshold, you
        can still call data without limitation with Starter subscription plan
        and above. In this case, you will be charged according to your
        subscription plan. We send you an invoice for the exceeded amount at the
        very beginning of the next month.
      </p>
    </div>
    <div className="my-3">
      <p>
        Please note that if a polygon was created and then deleted in the same
        payment month, it <b>will be included</b> in the total area of used
        polygons for that particular month, but it <b>will not be included</b>{' '}
        in your next payment month. The total area of used polygons will also
        include those polygons, which have been created before the current
        payment month and that still exist now or have been deleted during the
        current payment month.
      </p>
    </div>
  </ReactBSAlert>
)

ExceedingPriceInfo.propTypes = {
  close: PropTypes.func,
}

export default ExceedingPriceInfo
