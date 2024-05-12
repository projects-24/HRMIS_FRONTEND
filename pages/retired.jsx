import React from 'react'
import UnAuthorized from 'funuicss/ui/page/UnAuthorized'
import Button from 'funuicss/ui/button/Button'
import { PiArrowRight } from 'react-icons/pi'
import Text from 'funuicss/ui/text/Text'
import { SignOut } from '../components/Functions'
export default function Unauthorized() {
  return (
    <UnAuthorized 
    code={""} header={<Text size='jumbo' bold text='Retired'/>} 
    content={<Text text='Make sure your account is active before you can access the system' />}
    action={<Button endIcon={<PiArrowRight />} text='Log Out Account' bold bg='dark' raised onClick={SignOut}/>}
    />

  )
}
