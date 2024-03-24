import React from 'react'
export default function DropAction({children , funcss}) {
  return (
   <div className={`drop-button ${funcss}`}>
       {children}
   </div>
  )
}
