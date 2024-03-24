import React from 'react'
export default function ProgressBar({funcss , progress , height , children , content}) {
  return (
    <div className={`progressBar ${funcss}`} style={{width:`${progress}%` , height:`${height}px`}}>
        {children} {content}
    </div>
  )
}
