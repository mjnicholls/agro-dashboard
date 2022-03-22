import React from 'react'

import { PropagateLoader } from 'react-spinners'

const LoaderDots = ({ style }) => (
  <div
    style={{ minHeight: '150px', ...style }}
    className="d-flex justify-content-center align-items-center"
  >
    <PropagateLoader color="#f2f2f2" size={15} />
  </div>
)

export default LoaderDots
