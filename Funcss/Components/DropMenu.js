import React from 'react'
export default function DropMenu({children , funcss  , hoverable , duration , animation}) {
  return (
   <div className={`drop-menu ${funcss} item-${hoverable}`} style={{animation:` ${duration}s ${animation}`}}>
       {children}
   </div>
  )
}
