import React from 'react'
export default function Avatar({funcss ,children , width, height , bg}) {
  return (
    <div className={` circle central padding ${funcss} ${bg}`} style={{
        width:`${width}px`,
        height:`${height}px`,
        borderRadius:"50%",
    }}>
        {children}
    </div>
  )
}
