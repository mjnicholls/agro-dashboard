import React from 'react';
import classNames from "classnames";

import {
  Button,
  ButtonGroup,
} from "reactstrap";

const Toggler = ({isActive, setIsActive, labelOne, labelTwo}) => (

  <ButtonGroup
    className="btn-group-toggle float-right"
    data-toggle="buttons"
  >
    <Button
      color="info"
      id="0"
      size="sm"
      tag="label"
      className={classNames("btn-simple", {
        active: isActive,
      })}
      onClick={() => setIsActive(true)}
    >
      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
        {labelOne}
      </span>
      <span className="d-block d-sm-none">
        <i className="tim-icons icon-single-02" />
      </span>
    </Button>
    <Button
      color="info"
      id="1"
      size="sm"
      tag="label"
      className={classNames("btn-simple", {
        active: !isActive,
      })}
      onClick={() => setIsActive(false)}
    >
      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
        {labelTwo}
      </span>
      <span className="d-block d-sm-none">
        <i className="tim-icons icon-gift-2" />
      </span>
    </Button>
  </ButtonGroup>
)

export default Toggler;