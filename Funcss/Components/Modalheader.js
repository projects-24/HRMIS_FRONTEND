import React from 'react'
export default function Modalheader({funcss,children}) {
  return (
    <div className={`${funcss} modal-title`}>{children}</div>
  )
}
