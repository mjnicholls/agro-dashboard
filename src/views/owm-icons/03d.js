import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 87.897 54.935"
      height={54.935}
      width={87.897}
      {...props}
    >
      <path
        d="M16.482 21.973c.761 0 1.506.07 2.24.171a18.34 18.34 0 01-.41-3.834C18.312 8.198 26.51 0 36.625 0c9.838 0 17.843 7.765 18.27 17.5a10.935 10.935 0 017.366-2.853c6.067 0 10.987 4.922 10.987 10.99 0 1.382-.267 2.7-.735 3.918a13.1 13.1 0 012.565-.256c7.08 0 12.819 5.739 12.819 12.817 0 7.079-5.738 12.82-12.819 12.82H16.482C7.379 54.935 0 47.555 0 38.453c0-9.101 7.379-16.48 16.482-16.48"
        fill="#efefed"
      />
    </svg>
  )
}

export default SvgComponent
