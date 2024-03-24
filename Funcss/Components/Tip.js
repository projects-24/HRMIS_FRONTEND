import React from 'react'

export default function Tip({tip , funcss, children , content , animation , duration }) {
  return (
    <span className={`tip-${tip} tip ${funcss}`}  style={{animation:` ${duration}s ${animation}`}}>{children} {content}</span>
  )
}
