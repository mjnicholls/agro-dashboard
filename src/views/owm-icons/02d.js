import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={38}
      viewBox="0 0 25.221 16.625"
      {...props}
    >
      <path
        d="M-170.117-69.822a9.556 9.556 0 11-9.556-9.556 9.556 9.556 0 019.556 9.556"
        fill="#3b3c40"
      />
      <path
        d="M25.22 6.797a6.797 6.797 0 11-13.593 0 6.797 6.797 0 0113.594 0"
        fill="#f15d46"
      />
      <path
        d="M4.36 7.904c.202 0 .399.019.593.045A4.845 4.845 0 019.69 2.09a4.84 4.84 0 014.834 4.63 2.894 2.894 0 011.949-.754 2.908 2.908 0 012.713 3.944 3.391 3.391 0 11.678 6.715H4.36a4.36 4.36 0 010-8.72"
        fill="#efefed"
      />
    </svg>
  )
}

export default SvgComponent
