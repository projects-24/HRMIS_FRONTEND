import React from 'react'
export default function Roller({funcss , width , height}) {
  return (
    <div className="roller" style={{width:`${width}px` , height:`${height}px`}}>
        <div className={`${funcss}`}></div>
        <div className={`${funcss}`}></div>
        <div className={`${funcss}`}></div>
    </div>
  )
}
