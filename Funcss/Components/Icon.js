import React from 'react'
export default function Icon({funcss,icon,color,size, onClick}) {
  return (
    <i className={`icon ${icon} ${funcss} text-${color} size-${size} `} onClick={onClick}></i>
  )
}
