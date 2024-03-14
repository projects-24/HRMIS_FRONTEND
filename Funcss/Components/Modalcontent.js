import React from 'react'
export default function Modalcontent({funcss,children}) {
  return (
    <div className={`modal-body ${funcss} `}>{children}</div>
  )
}
