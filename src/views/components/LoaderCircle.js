import React from 'react'

import { css } from '@emotion/react'
import DotLoader from 'react-spinners/DotLoader'

const override = css`
  align-self: center;
`

const LoaderCircle = ({ style }) => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={style}
  >
    <DotLoader size="60px" color="#e14eca" css={override} />
  </div>
)

export default LoaderCircle
