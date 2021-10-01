import React from 'react'

import { Button, Col, Row } from 'reactstrap'

const AccumulatedInfo = ({ close }) => (
  <div className="agro-pop-up">
    <Row>
      <Col>
        <p>
          <b>Accumulated temperature</b> is the amount, expressed in degrees, by
          which the actual air temperature rises or falls above the threshold
          level during the selected period. This is an indicator of the
          beginning of the development of plant crops and the vegetation period
          of the growing season, and also serves as a signal for the possible
          reproduction of insects.
        </p>
        <p>
          All species have a biological minimum temperature below which
          development does not occur at all. When the ambient temperature begins
          to exceed this minimum level, it gives rise to growth and
          reproduction.
        </p>
        <p>
          <b>Accumulated precipitation</b> is calculated as the sum of daily
          precipitation during the selected period. Based on this parameter, you
          can determine whether there is enough moisture for the normal
          development of crops. For example, the previous dry season can lead to
          a lack of moisture even in the rainy season, and the harvest will not
          have enough time to ripen. In this case, additional measures will be
          required.
        </p>
        <br />
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="agro-pop-up-footer">
          <Button
            className="btn-neutral"
            color="default"
            type="button"
            onClick={close}
          >
            Close
          </Button>
        </div>
      </Col>
    </Row>
  </div>
)

export default AccumulatedInfo
