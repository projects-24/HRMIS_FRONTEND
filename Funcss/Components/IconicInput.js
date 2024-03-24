import React from 'react'
export default function IconicInput({funcss , children , position}) {
  return (
    <div className={`icon-container ${funcss} ${position}`}>
        {children}
    </div>
  )
}
