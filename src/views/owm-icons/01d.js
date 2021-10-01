import * as React from 'react'

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      viewBox="0 0 19.112 19.112"
      {...props}
    >
      <path
        d="M19.112 9.556A9.556 9.556 0 110 9.556a9.556 9.556 0 0119.112 0"
        fill="#f15d46"
      />
    </svg>
  )
}

export default SvgComponent
