import React from 'react'
export default function LoadSpan({funcss , width , height , bg}) {
  return (
  <div className="loadRing" style={{width:`${width}px` , height:`${height}px` ,border: ` 8px solid ${bg}` ,
    borderColor: `${bg} transparent transparent transparent` }}>
        <div className={`${funcss}`}></div>
        <div className={`${funcss}`}></div>
        <div className={`${funcss}`}></div>
    </div>
  )
}
