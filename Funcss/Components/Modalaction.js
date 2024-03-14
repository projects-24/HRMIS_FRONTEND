import React from 'react'
export default function Modalaction({funcss,children}) {
  return (
    <div className={`${funcss} modal-action`}>{children}</div>
  )
}
