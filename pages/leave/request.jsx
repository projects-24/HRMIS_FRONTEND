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
import { FormatDate, FormatEmail, GetRequest, GetToken, PatchRequest } from '../../components/Functions'
import StepContainer from 'funuicss/ui/step/Container'
import Step from 'funuicss/ui/step/Step'
import StepHeader from 'funuicss/ui/step/Header'
import StepLine from 'funuicss/ui/step/Line'

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
  const [approval_modal, setapproval_modal] = useState(false)
  const [selected_data, setselected_data] = useState("")

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
  GetRequest("/leaverequest")
  .then( res => {
    console.log(res)
    let data = {
      "data" : res , 
      "titles" : ["Staff" , "Email" ,  "Leave" , "Effective" , "Resume" , "Approval" ] , 
      "fields" : ["staffId" , "addedEmail" , "leaveTypeName" ,  "dateEffective" , "resumptionDate" ] , 
    }
    settable_data(data)
    // setdocs(data)
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

const OpenModal = () => {
 setadd_data_modal(true)
}
const Close_Modal = () => {
 setadd_data_modal(false)
}

const Submit = () => {
  const requested_days = FunGet.val("#requested_days")
  const leave_address = FunGet.val("#leave_address")
  const resumption_date = FunGet.val("#resumption_date")
  const date_effective = FunGet.val("#date_effective")
  const number_of_days_remaining = FunGet.val("#number_of_days_remaining")
//   const maximum_number_days = FunGet.val("#leave_allocation_id")
  const leave_type_id = FunGet.val("#leave_type_id")


  const doc = 
    {
        "requestedDays": requested_days,
        "leaveAddress": leave_address,
        "resumptionDate": resumption_date,
        "dateEffective": date_effective,
        "numberOfDaysRemaining": number_of_days_remaining,
        "sectionalHeadApproval": false,
        "directorApproval": false,
        "hrApproval": false,
        "leaveStatus": true,
        "staffId": user.staff_id,
        "leaveAllocationId": null,
        "leaveTypeId": leave_type_id,
        "gsApproval": null,
        "addedEmail": user.email
    }
console.log(doc)
  setadd_data_modal(false)
  if(requested_days && leave_address && resumption_date && date_effective && leave_type_id){
    setloading(true)
    if(update_doc){
      PatchRequest( "/leaverequest" , update_doc.id , {
        leavetype:val
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
    Axios.post(endPoint + "/leaverequest" , doc)
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

    <Modal 
    open={approval_modal}
    maxWidth='1000px'
    animation='SlideDown'
    flat
    close={<PiX className='pointer hover-text-error' onClick={()=>setapproval_modal(false)} />}
    title={
<>
<Text heading='h5' bold text={selected_data.addedEmail} block/>
  <Text bold text={selected_data.leaveTypeName} size='small' color="primary"/>
</>
  }
    body={<>
<StepContainer responsiveMedium  >
<Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.gsApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.gsApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"GS Approval"} heading="h5"/>
<br />
<Text text={"Approval by the Gs"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>
<StepLine />
<Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.hrApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.hrApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"Hr Approval"} heading="h5"/>
<br />
<Text text={"Approval by the Human Resource"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>
<StepLine />
<Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.sectionalHeadApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.sectionalHeadApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"Sectional Head Approval"} heading="h5"/>
<br />
<Text text={"Approval by the Sectional Head"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>

</StepContainer>
    </>}
    />
      {
        deleteId &&
        <DeleteModal  route={"/leavetype"} id={deleteId}/>
      }
         {
    message &&  <div>
    <Alert fixed='top-middle' type='warning' funcss='raised'  message={message}/>
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

      <Nav active={2}/>
      <div className="content">
    <Modal
    open={add_data_modal}
    animation='SlideDown'
    flat
    close={<PiX className='pointer hover-text-error' onClick={()=>setadd_data_modal(false)} />}
    title={<>
        <Text text={update_doc ? update_doc.title : 'Request Leave'} light heading='h4' block/>
    </>}

    body={<div>
      <div className="row">
          <div className="col sm-6 lg-6 md-6 padding">
          <Input type="number" id='requested_days' label="Requested Days" funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>
          <div className="col sm-6 lg-6 md-6 padding">
          <Input type="text" id='leave_address' label="Address" funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>
          <div className="col sm-6 lg-6 md-6 padding">
          <Text text='Resumption Date' size='small' emp/>
          <Input type="date" id='resumption_date' funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>
          <div className="col sm-6 lg-6 md-6 padding">
          <Text text='Date Effective' size='small' emp/>
          <Input type="date" id='date_effective' funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>
          <div className="col 12-6 lg-12 md-12 padding">
          <Text text='Days Remaining' size='small' emp/>
          <Input id='number_of_days_remaining' label='Days Remaining' funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>
          <div className="col sm-12 lg-12 md-12 padding">
          <Text text='Leave Type' size='small' emp/>
         <select name="" id="leave_type_id" className='input full-width'>
          <option value="">Leave Type</option>
         {
          leaves &&
          leaves.map(res => (
              <option value={res.id} key={res.id}>{res.leaveTypeName}</option>
          ))
         }
         </select>
          </div>
      </div>

      </div>}
      footer={<div className='text-right'>
      <Button
        text='Submit Data'
        startIcon={<PiPaperPlane />}
        bg='primary800'
        raised
        bold
        onClick={Submit}
        />
      </div>}
    />
    

        <Header sub_dir={"Configurations" } sub_dir_route={"/configurations"} title={ "Leave Request"} sub_title={"Request for a leave"}/>
 
        <div className='_card'>
       <div className="padding text-right">
       <Button 
   fillAnimation 
   onClick={() => {
    setupdate_doc("")
    setadd_data_modal(true)
   }}
   outlined 
   outlineSize={0.1}
   fillTextColor='dark900' 
    bg="primary" 
    text="New Request"
    startIcon={<PiPlus />}
    />
       </div>
       {

table_data  && 
<div style={{overflowX:"auto"}}>
<Table
data={table_data}
pageSize={10}
customColumns={[
  {
    title: 'Actions',
    render: (data) => (
      <Circle bg='primary' size={1.5} onClick={() => {
        setselected_data(data)
        setapproval_modal(true)
      }}>
      <PiPen />
      </Circle>
    ),
  },
]}
/>
     </div>
}
    
       </div>
      </div>
    </div>
  )
}
