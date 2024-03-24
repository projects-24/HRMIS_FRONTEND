import React from 'react'

export default function Grid({children , funcss}) {
  return (
    <div className={`row ${funcss}`}>
        {children}
    </div>
  )
}
