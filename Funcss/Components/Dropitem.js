import React from 'react'
export default function DropItem({children , funcss}) {
  return (
   <div className={`${funcss} drop-item`}>
       {children}
   </div>
  )
}
