import React, { useEffect, useState } from 'react'
import Modal from 'funuicss/ui/modal/Modal'
import Text from 'funuicss/ui/text/Text'
import Circle from 'funuicss/ui/specials/Circle'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiTrash } from 'react-icons/pi'
import Button from 'funuicss/ui/button/Button'
import Loader from "../loader"
import Axios from 'axios'
import EndPoint from '../endPoint'
import { GetToken } from '../Functions'
export default function DeleteModal({route , id}) {
    const [loading, setloading] = useState(false)
    const [user, setuser] = useState('')
    const [token, settoken] = useState('')
    useEffect(() => {
        if(!token){
           GetToken()
           .then(res => {
            setuser(res.user)
            settoken(res.token)
           })
        }
          })
    const Submit = () => {
        setloading(true)
        Axios.delete(EndPoint + route + "/" + id ,  {
            headers: {
                 Authorization: `Bearer ${token}`,
               
              }
               
           })
        .then(() => window.location.reload() )
        .catch(err => {
            window.location.reload()
        })
    }
  return (
   <div>
    {
        loading &&  <Loader />
    }
     <Modal
     flat 
     position='left'
     animation='SlideRight'
    open={loading ? false : true}
    maxWidth='600px'
    body={
        <RowFlex gap={1}>
        <Circle size={2.5} bg='error'>
            <PiTrash />
        </Circle>
        <div className='bl padding'>
        <Text text='Delete Object' heading='h4' bold color='dark300' />
        <Text size='minified' color="dark200" text='This will delete the object completely from the database' block/>
        </div>
    
        </RowFlex>
    }
    footer={
        <RowFlex gap={1} justify='flex-end' >
            <Button
            text='Cancel'
            small
            raised
            bg='primary'
            onClick={() => window.location.reload()}
            bold
            />
            <Button
            text='Delete'
            small
            raised
            startIcon={<PiTrash />}
            bg='error'
            onClick={Submit}
            bold
            />

    </RowFlex>
    }
    />
   </div>
  )
}
