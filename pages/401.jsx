import React from 'react'
import UnAuthorized from 'funuicss/ui/page/UnAuthorized'
import Button from 'funuicss/ui/button/Button'
import { PiArrowRight } from 'react-icons/pi'
export default function Unauthorized() {
  return (
    <UnAuthorized action={<Button endIcon={<PiArrowRight />} text='Back to Profile' bold bg='primary' raised onClick={() => window.location.assign("/user/account")}/>}/>
  )
}
