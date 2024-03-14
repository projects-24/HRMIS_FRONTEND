import React from 'react'
import Alert from "funuicss/ui/alert/Alert"
export default function Success({message}) {
  return (
  <Alert
  type='success'
  message='Submitted successfully'
  fixed='top-right'
  />
  )
}
