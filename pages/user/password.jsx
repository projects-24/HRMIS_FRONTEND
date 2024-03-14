import React from 'react'
import Nav from '../../components/Nav'
import {useEffect, useState} from "react"
import Axios  from 'axios';
import endPoint from '../../components/endPoint';
import Alert from '../../Funcss/Components/Alert';
export default function Password() {
  const [password, setpassword] = useState("")
  const [token, settoken] = useState("")
  const [user, setuser] = useState("")
  const [message, setmessage] = useState("")
  
  useEffect(()=>{
    setTimeout(()=>{
        setmessage(null)
        clearTimeout()
    }, 4000)
},[message])
  useEffect(() => {
    if(localStorage.getItem("token")  && !token ){
        settoken(
            JSON.parse(
                localStorage.getItem("token")
            )
        )
        setuser(
            JSON.parse(
                localStorage.getItem("user")
            )
        )
    }
})

  const Change = ()=>{
    if(password){
      Axios.patch(endPoint + "/staff/change-password/", {password:password} ,   {
        headers: {
             authorization: `Bearer ${token}`,
           
          }
           
       }).then(()=>{
        setmessage("password changed successfully")
        window.location.assign('/')
       }).catch(err=>setmessage(err.message))
    }else{
      setmessage("Make sure to enter your new password")
    }
  }
  if(user){
    return (
      <div>
          <Nav />
          <div className="content">
          <div className="width-600-max center">
         <div className="row-flex">
          <div>
            <img src="/password.svg" className='width-100-max fit' alt="" />
          </div>
          <div>
           <div className="h1">Change your password</div>
      <div className="text-bold minSection">
      Enter a valid password to change your password
      </div>
           </div>
         </div>
           <div className="padding-top-40 width-400-max center">
           <div className="text-bold">For {user.firstname} {user.middleName} {user.lastName}</div>
            <div className="section">
            <input type="password" className="input card white" placeholder='Enter your new password' onChange={(e)=>setpassword(e.target.value)}/>
              </div>
              { 
                message ?
                <Alert type="info" message={message}/>
                :""
              }
            <button className="btn primaryBtn section full-width" onClick={Change}> Change password </button>
            </div>
          </div>
          </div>
      </div>
    )
  }else{
    return ""
  }
  
}
