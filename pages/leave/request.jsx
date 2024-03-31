'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Table from 'funuicss/ui/table/Table'
import Circle from 'funuicss/ui/specials/Circle'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiCheck, PiChecks, PiEye, PiMagnifyingGlass, PiPaperPlane, PiPen, PiPlus, PiSpinner, PiTrash, PiX } from 'react-icons/pi'
import Button from 'funuicss/ui/button/Button'
import Modal from 'funuicss/ui/modal/Modal'
import Text from 'funuicss/ui/text/Text'
import {FunGet} from "funuicss/js/Fun"
import Loader from '../../components/loader'
import DeleteModal from '../../components/modal/Delete'
import Axios from 'axios'
import endPoint from '../../components/endPoint'
import Success from '../../components/default/success'
import Alert from 'funuicss/ui/alert/Alert'
import { FormatDate, FormatEmail, GetRequest, GetToken, PatchRequest } from '../../components/Functions'

import ViewRequest from '../../components/modal/ViewRequest'
export default function LeaveRquest() {
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
  const [viewModal, setviewModal] = useState(false)
  const [selected_data, setselected_data] = useState("")
  const [approval_modal, setapproval_modal] = useState(false)

  const [table_data, settable_data] = useState("")
  useEffect(() => {
    if(!leaves && token){
     GetRequest("/leavetype")
     .then( res => setleaves(res))
     .catch(err => console.log(err))
    }
     })

  useEffect(() => {
 if(!table_data && token){
  setloading(true)
  GetRequest("/leaverequest")
  .then( res => {
    console.log(res)
    let data = {
      "data" : res , 
      "titles" : ["Full Name" ,"Staff" ,  "Leave" , "Effective" , "Resume","Section" , "HR" , user.position_id === 1 || user.position_id === 2 || user.position_id === 3 ? "GS" : "" , "Director"  , "Status" , "View" , "Approve" ] , 
      "fields" : ["fullName" , "staffId"  , "leaveTypeName" ,  "dateEffective" , "resumptionDate" ] , 
    }
    settable_data(data)
    setloading(false)
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




const Approve = (_id) => {
  console.log(_id)
  setloading(true)
  setapproval_modal(false)
  Axios.patch(endPoint + "/leaveapproval/" + _id, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    setdocs("")
    setsuccess(true)
    setloading(false) 
  }).catch(err => {
    setmessage(JSON.stringify(err.response.data.message))
    setloading(false)
  })
}


  return (
    <div>
      <Nav active={4}/>
  <Modal 
   open={approval_modal}
   maxWidth='500px'
   animation='SlideDown'
   flat
   close={<PiX className='pointer hover-text-error' onClick={()=>setapproval_modal(false)} />}
   title={
<>
<Text heading='h5' bold text={selected_data.fullName} block/>
 <Text bold text={selected_data.leaveTypeName} size='small' color="primary"/>
</>
 }

body={
<Text text='Do you want to approve the leave for the above staff ☝' />
}
footer={
  <RowFlex gap={1} justify='flex-end'>
<Button 
text='No'
bg='dark300'
endIcon={<PiX />}
bold 
onClick={()=>setapproval_modal(false)}
/>
<Button 
text='Yes'
bg='primary'
endIcon={<PiCheck />}
bold 
onClick={() => Approve(selected_data.leaveRequestId)}
/>
  </RowFlex>
}
/>
{/* view request modal */}
{
  user && 
  <ViewRequest
  current_user={user}
   open={viewModal} 
   selected_data={selected_data} 
   close={<PiX className='pointer hover-text-error' onClick={()=>setviewModal(false)} />}
   />
}

      {
        deleteId &&
        <DeleteModal  route={"/leavetype"} id={deleteId}/>
      }
         {
    message &&  <div>
    <Alert fixed='top-right' animation='SlideLeft' type='warning' standard funcss='raised'  message={message}/>
  </div>
}
      {
        success && <Success />
      }
    
      {
        loading && <Loader />
      }


      <div className="content">
   

        <Header sub_dir={"Configurations" } sub_dir_route={"/configurations"} title={ "All Requests"} sub_title={"All request for leave by staffs"}/>
 
        <div className='_card no-padding'>
       {

table_data  && 
<div >
<Table
data={table_data}
pageSize={10}
customColumns={[
  {
    title: 'Actions',
    render: (data) => (
   <div>
    {
      data.sectionalHeadApproval ? <PiChecks className='text-success' size={15} /> : <PiSpinner size={15} className='' />
    }
   </div>
    ),
  },
  {
    title: 'Actions',
    render: (data) => (
   <div>
    {
      data.hrApproval ? <PiChecks className='text-success' size={15} /> : <PiSpinner size={15} className='' />
    }
   </div>
    ),
  },
  {
    title: 'Actions',
    render: (data) => (
      user.position_id === 1 || user.position_id === 2 || user.position_id === 3 ?
   <div>
    {
      data.gsApproval ? <PiChecks className='text-success' size={15} /> : <PiSpinner size={15} className='' />
    }
   </div>
   : <></>
    ),
  },
  {
    title: 'Actions',
    render: (data) => (
   <div>
    {
      data.directorApproval ? <PiChecks className='text-success' size={15} /> : <PiSpinner size={15} className='' />
    }
   </div>
    ),
  },
  {
    title: 'Actions',
    render: (data) => (
   <div>
    {
      data.leaveStatus ? <PiChecks className='success' size={15} /> : <PiX size={15} className='error' />
    }
   </div>
    ),
  },
  {
    title: 'Actions',
    render: (data) => (
      <Circle bg='dark' size={1.5} onClick={() => {
        setselected_data(data)
        setviewModal(true)
      }}>
      <PiEye />
      </Circle>
    ),
  },
  {
    title: 'Actions',
    render: (data) => (
      <Circle bg='primary' size={1.5} onClick={() => {
        setselected_data(data)
        setapproval_modal(true)
      }}>
      <PiCheck />
      </Circle>
    ),
  }
]}
/>
     </div>
}
    
       </div>
      </div>
    </div>
  )
}
