import * as React from 'react'

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={37.5}
      viewBox="0 0 27.11 16.939"
      {...props}
    >
      <path
        d="M11.182 4.901c.17 0 .335.015.5.038A4.084 4.084 0 0115.674 0a4.081 4.081 0 014.074 3.903 2.44 2.44 0 011.643-.636 2.45 2.45 0 012.287 3.325 2.859 2.859 0 11.572 5.66H11.18a3.675 3.675 0 110-7.35"
        fill="#3b3c40"
      />
      <path
        d="M4.36 8.218c.202 0 .399.018.593.045A4.84 4.84 0 019.69 2.404a4.84 4.84 0 014.834 4.63 2.893 2.893 0 011.949-.755 2.908 2.908 0 012.713 3.945 3.391 3.391 0 11.678 6.715H4.362a4.36 4.36 0 110-8.721"
        fill="#efefed"
      />
    </svg>
  )
}

export default SvgComponent
