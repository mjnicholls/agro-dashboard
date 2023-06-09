import * as React from 'react'

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={37.5}
      viewBox="0 0 21.011 13.095"
      {...props}
    >
      <g fill="#3b3c40">
        <path d="M13.7 3.474H1.719a.497.497 0 010-.995h11.983a.497.497 0 110 .995M12.484.995H6.492a.497.497 0 110-.995h5.992a.498.498 0 110 .995M20.513 5.952H6.034a.498.498 0 110-.995h14.48a.498.498 0 110 .995M14.977 13.095H6.034a.498.498 0 010-.995h8.943a.497.497 0 110 .995M14.977 8.333H.497a.497.497 0 110-.995h14.48a.498.498 0 110 .995M18.194 10.714H3.715a.498.498 0 110-.995h14.48a.498.498 0 110 .995" />
      </g>
    </svg>
  )
}

export default SvgComponent
