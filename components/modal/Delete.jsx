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
                 authorization: `Bearer ${token}`,
               
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
    open={loading ? false : true}
    maxWidth='400px'
    
    body={
        <RowFlex gap={1}>
        <Circle size={2} bg='error'>
            <PiTrash />
        </Circle>
        <div>
        <Text text='Delete Object' heading='h4' />
        <Text  text='This will delete the object completely from the database' block/>
        </div>
    
        </RowFlex>
    }
    footer={
        <RowFlex gap={1} justify='flex-end'>
            <Button
            text='Cancel'
            small
            raised
            bg='primary'
            onClick={() => window.location.reload()}
            />
            <Button
            text='Delete'
            small
            raised
            startIcon={<PiTrash />}
            bg='error'
            onClick={Submit}
            />

    </RowFlex>
    }
    />
   </div>
  )
}
