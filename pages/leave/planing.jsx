'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Table from 'funuicss/ui/table/Table'
import {FunGet} from "funuicss/js/Fun"
import Loader from '../../components/loader'
import DeleteModal from '../../components/modal/Delete'
import Axios from 'axios'
import endPoint from '../../components/endPoint'
import Success from '../../components/default/success'
import Alert from 'funuicss/ui/alert/Alert'
import {GetRequest, GetToken, PatchRequest } from '../../components/Functions'
export default function LeavePlaning() {
   const [loading, setloading] = useState(false)
  const [delete_doc, setdelete_doc] = useState("")
  const [success, setsuccess] = useState("")
  const [message, setmessage] = useState("")
  const [deleteId, setdeleteId] = useState("")
  const [docs, setdocs] = useState("")
  const [token, settoken] = useState("")
  const [user, setuser] = useState(null)
  const [leaves, setleaves] = useState("")

  useEffect(() => {
    if(!leaves && token){
     GetRequest("/leavetype")
     .then( res => setleaves(res))
     .catch(err => console.log(err))
    }
     })

  useEffect(() => {
 if(!docs && token){
  GetRequest("/leaveplan")
  .then( res => {
    let data = {
      "data" : res , 
      "titles" : ["Staff" ,'Directorate','Section',   "Leave" ,   "Start" , "Resume" , "Created" , "Updated" ] , 
      "fields" : ["fullname" , 'directorate' , 'section', "leaveTypeName" ,  "proposedStartDate" , "proposedEndDate" , "createdAt" , "updatedAt" ] , 
    }
    setdocs(data)
  console.log(res)
  })
  .catch(err => console.log(err))
 }
  })
  
  useEffect(() => {
    if(!token){
       GetToken()
       .then(res => {
        setuser(res.user)
        settoken(res.token)
       })
    }
      })

  useEffect(()=>{
    setTimeout(()=>{
        setmessage(null)
        setsuccess(false)
    }, 4000)
},[message , success])




  return (
    <div>
      {
        deleteId &&
        <DeleteModal  route={"/leaveplan"} id={deleteId}/>
      }
         {
    message &&  <div>
    <Alert standard fixed='top-right' type='warning' animation='SlideLeft' funcss='raised'  message={message}/>
  </div>
}
      {
        success && <Success />
      }
    
      {
        loading && <Loader />
      }
      { delete_doc &&
      <DeleteModal />
      }

      <Nav active={4}/>
      <div className="content">
        <Header 
        title={ "Leave planings"} 
        sub_title={"Plans for a leave"}
        />

        <div className='_card'>
       {
        docs && 
        <Table data={docs} filterableFields={['leaveTypeName', 'directorate', 'section']}/>
       }
       </div>
      </div>
    </div>
  )
}
