import React from 'react'
import { PropagateLoader } from 'react-spinners'

const LoaderDots = () =>
  <div style={{minHeight: "150px"}} className="d-flex justify-content-center align-items-center">
    <PropagateLoader color="#f2f2f2" size={15} />
  </div>

export default LoaderDots