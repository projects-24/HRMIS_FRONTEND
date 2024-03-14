import React from 'react'
export default function Bg({bg , children, funcss}) {
  return (
    <span className={`${bg} ${funcss}`}>{children}</span>
  )
}
