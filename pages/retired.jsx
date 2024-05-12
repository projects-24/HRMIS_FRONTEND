'use client'
import React, { useEffect, useState } from 'react'
import UnAuthorized from 'funuicss/ui/page/UnAuthorized'
import Button from 'funuicss/ui/button/Button'
import { PiArrowRight } from 'react-icons/pi'
import Text from 'funuicss/ui/text/Text'
import { GetToken, SignOut } from '../components/Functions'

export default function Unauthorized() {
  const [user, setuser] = useState("")
  const [email, setemail] = useState("")
  useEffect(() => {
      GetToken()
          .then(res => {
              setuser(res.user)
              setemail(res.user.email)
              console.log(res.user)
          })
  }, [])
 if(user){
  return (
    <UnAuthorized 
    code={<>
    <Text heading='h3' bold color="dark400" text={`${user.title}. ${user.first_name} ${user.last_name}`}/>
    <Text size='small' bold color="dark500" text={`${user.email}`}/>
    </>} header={<Text size='big' bold text='👏 Happy Pension'/>} 
    content={<>
    <Text block article text='Congratulations on your outstanding work at Ghana Health Service! Your dedication is truly commendable and makes a real difference' />
  
    <Text funcss='margin-top-20' capitalize block color='error' bold article text={`
    Your account  has been deactivated
    `} />
  
    </>}
    action={<Button endIcon={<PiArrowRight />} text='Log Out Account' bold bg='dark' raised onClick={() => SignOut()}/>}
    />

  )
 }else{
  return ""
 }
}
