import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72.234 72.234"
      height={45}
      width={45}
      {...props}
    >
      <path
        d="M72.234 36.117c0 19.947-16.17 36.117-36.117 36.117C16.17 72.234 0 56.064 0 36.117 0 16.17 16.17 0 36.117 0c19.947 0 36.117 16.169 36.117 36.117"
        fill="#efefed"
      />
    </svg>
  )
}

export default SvgComponent
