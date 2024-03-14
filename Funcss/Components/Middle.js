import React from 'react'

export default function Middle({children , funcss}) {
  return (
    <div className={`content-middle ${funcss}`}>
      {children}
    </div>
  )
}
