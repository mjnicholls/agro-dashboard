import React from 'react'

import { faListUl } from '@fortawesome/free-solid-svg-icons/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

const AllPolygonsButton = () => (
  <NavLink to="/dashboard/polygons" className="nav-link text-primary p-0">
    <Button
      color="github"
      id="0"
      size="sm"
      tag="label"
      className="btn-simple"
      style={{ padding: '5px 10px' }}
    >
      <span>
        <FontAwesomeIcon icon={faListUl} />
      </span>
    </Button>
  </NavLink>
)

export default AllPolygonsButton
