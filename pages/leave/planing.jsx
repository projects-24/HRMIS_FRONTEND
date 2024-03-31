'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Card from 'funuicss/ui/card/Card'
import Table from 'funuicss/ui/table/Table'
import TableData from 'funuicss/ui/table/Data'
import TableRow from 'funuicss/ui/table/Row'
import Circle from 'funuicss/ui/specials/Circle'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiCheck, PiMagnifyingGlass, PiPaperPlane, PiPen, PiPlus, PiTrash, PiX } from 'react-icons/pi'
import ToolTip from 'funuicss/ui/tooltip/ToolTip'
import Tip from 'funuicss/ui/tooltip/Tip'
import Input from 'funuicss/ui/input/Input'
import IconicInput from 'funuicss/ui/input/Iconic'
import Button from 'funuicss/ui/button/Button'
import Modal from 'funuicss/ui/modal/Modal'
import Text from 'funuicss/ui/text/Text'
import MyModal from '../../components/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import {FunGet} from "funuicss/js/Fun"
import Loader from '../../components/loader'
import DeleteModal from '../../components/modal/Delete'
import Axios from 'axios'
import endPoint from '../../components/endPoint'
import Success from '../../components/default/success'
import Alert from 'funuicss/ui/alert/Alert'
import { FormatDate, GetRequest, GetToken, PatchRequest } from '../../components/Functions'
export default function LeavePlaning() {
   const [loading, setloading] = useState(false)
  const [add_data_modal, setadd_data_modal] = useState(false)
  const [update_doc, setupdate_doc] = useState("")
  const [delete_doc, setdelete_doc] = useState("")
  const [success, setsuccess] = useState("")
  const [message, setmessage] = useState("")
  const [deleteId, setdeleteId] = useState("")
  const [filter, setfilter] = useState("")
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
      "titles" : ["Staff" , "Leave" ,   "Start" , "Resume" , "Created" , "Updated" ] , 
      "fields" : ["addedEmail"  , "leaveTypeName" ,  "proposedStartDate" , "proposedEndDate" , "createdAt" , "updatedAt" ] , 
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


const Close_Modal = () => {
 setadd_data_modal(false)
}

const Submit = () => {
  const proposed_start_date = FunGet.val("#proposed_start_date")
  const proposed_end_date = FunGet.val("#proposed_end_date")
  const leave_type_id = FunGet.val("#leave_type_id")


  const doc = 
    {
        "proposedStartDate": proposed_start_date,
        "proposedEndDate": proposed_end_date,
        "leaveTypeId": leave_type_id,
        "addedEmail": user.email
    }
  setadd_data_modal(false)
  if(proposed_start_date && proposed_end_date && leave_type_id){
    setloading(true)
    if(update_doc){
      PatchRequest( "/leaveplan" , update_doc.id , {
        leaveplan:val
      })
      .then( (res) => {
       if(res){
        setsuccess(true)
        setdocs("")
        setloading(false)
       }
      })
      .catch(err => {
        setmessage(JSON.stringify(err.message))
        setloading(false)
      })

    }else{
    Axios.post(endPoint + "/leaveplan" , doc)
    .then( (res) => {
           setloading(false)
           console.log(res)
     if(res.data){
      setdocs("")
      setsuccess(true)
     }
    })
    .catch(err => {
      setmessage(JSON.stringify(err.message))
      setloading(false)
    })
    }
  }else{
    setmessage("Enter all valid fields")
  }

}

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
        <Table data={docs} />
       }
       </div>
      </div>
    </div>
  )
}
