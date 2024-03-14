import React from 'react'
export default function Color({color ,children}) {
  return (
    <span className={`text-${color}`}>{children}</span>
  )
}
