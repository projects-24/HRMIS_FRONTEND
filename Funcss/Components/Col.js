import React from 'react'

export default function Col({sm,md,lg,children , funcss}) {
  return (
    <div className={`col sm-${sm} md-${md} lg-${lg} ${funcss}`}>
      {children}
    </div>
  )
}
