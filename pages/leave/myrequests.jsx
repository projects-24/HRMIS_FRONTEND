'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Card from 'funuicss/ui/card/Card'
import Table from 'funuicss/ui/table/Table'
import Circle from 'funuicss/ui/specials/Circle'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiCheck, PiChecks, PiEye, PiMagnifyingGlass, PiPaperPlane, PiPen, PiPlus, PiSpinner, PiTrash, PiX } from 'react-icons/pi'
import ToolTip from 'funuicss/ui/tooltip/ToolTip'
import Tip from 'funuicss/ui/tooltip/Tip'
import Input from 'funuicss/ui/input/Input'
import Button from 'funuicss/ui/button/Button'
import Modal from 'funuicss/ui/modal/Modal'
import Text from 'funuicss/ui/text/Text'
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
import Grid from "funuicss/ui/grid/Grid"
import Col from "funuicss/ui/grid/Col"
import Section from "funuicss/ui/specials/Section"
export default function MyLeaveRquest() {
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
  GetRequest("/myleaverequest/" + user.staff_id)
  .then( res => {
    let data = {
      "data" : res , 
      "titles" : ["Staff" ,  "Leave" , "Effective" , "Resume","Section" , "HR" , "Director","GS"  , "View" , "Delete"  ] , 
      "fields" : ["staffId"  , "leaveTypeName" ,  "dateEffective" , "resumptionDate" ] , 
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


const Submit = () => {
  const requested_days = FunGet.val("#requested_days")
  const leave_address = FunGet.val("#leave_address")
  const resumption_date = FunGet.val("#resumption_date")
  const date_effective = FunGet.val("#date_effective")
  const number_of_days_remaining = FunGet.val("#number_of_days_remaining")
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
      setmessage(JSON.stringify(err.response.data.message))
      setloading(false)
    })
    }
  }else{
    setmessage("Enter all valid fields")
  }

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
<Text heading='h5' bold text={selected_data.addedEmail} block/>
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
    <Modal 
    open={viewModal}
    maxWidth='1000px'
    animation='SlideDown'
    flat
    close={<PiX className='pointer hover-text-error' onClick={()=>setviewModal(false)} />}
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
<div />
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
<div />
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
<div />
<Text text={"Approval by the Sectional Head"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>

</StepContainer>
<Section gap={2} funcss='bb'/>
<div>
  <Grid>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Staff Id" block/>
      <Text size='minified'  text={selected_data.staffId} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Email" block/>
      <Text size='minified'  text={selected_data.addedEmail} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Leave Address" block/>
      <Text size='minified'  text={selected_data.leaveAddress} block/>
    </Col>
    </Grid>
    <Section gap={1} funcss='bb'/>
    <Grid>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Max number of Days" block/>
      <Text size='minified'  text={selected_data.maximumNumberDays} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Days Remaining" block/>
      <Text size='minified'  text={selected_data.numberOfDaysRemaining} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Requested days" block/>
      <Text size='minified'  text={selected_data.requestedDays} block/>
    </Col>
  </Grid>
</div>
    </>}
    />
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
      { delete_doc &&
      <DeleteModal />
      }

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
    

        <Header title={ "My Request"} sub_title={"Request for a leave"}/>
 
        <div className='_card no-padding'>
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
      data.gsApproval ? <PiChecks className='text-success' size={15} /> : <PiSpinner size={15} className='' />
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
      <ToolTip>
      <span onClick={() => setdeleteId(data.leaveRequestId) }>
      <Circle size={2} funcss='raised' bg='error'>
         <PiTrash />
       </Circle>
      </span>
<Tip funcss='z-index-5' tip="left"  animation="ScaleUp" duration={0.12} content="Delete"/>
</ToolTip>
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
