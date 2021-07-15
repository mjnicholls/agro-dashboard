import React from 'react';
import classnames from "classnames";

import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";


const MapSearch = () => {

  const [addressFocus, setaddressFocus] = React.useState(false);
  const [location, setLocation] = React.useState("");

  const submitSearch = () => {
    if (location.length) {
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&viewbox=${bbox}`;
    }
  }

  return (
    <InputGroup
      className={classnames({
        "input-group-focus": addressFocus,
      })}
    >
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="tim-icons icon-square-pin" />
        </InputGroupText>
      </InputGroupAddon>
      <Input
        name="address"
        placeholder="Address"
        type="text"
        onFocus={(e) => setaddressFocus(true)}
        onBlur={(e) => setaddressFocus(false)}
        onChange={setLocation}
        onKeyDown={submitSearch}
      />
    </InputGroup>
  )
}