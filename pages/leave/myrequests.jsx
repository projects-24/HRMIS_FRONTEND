'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Card from 'funuicss/ui/card/Card'
import Table from 'funuicss/ui/table/Table'
import Circle from 'funuicss/ui/specials/Circle'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiArrowRight, PiCheck, PiChecks, PiEye, PiMagnifyingGlass, PiPaperPlane, PiPen, PiPlus, PiSpinner, PiTrash, PiX } from 'react-icons/pi'
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
import ViewRequest from '../../components/modal/ViewRequest'
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
  const [preview_modal, setpreview_modal] = useState(false)

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
      "titles" : ["Staff" ,  "Leave" , "Effective" , "Resume","Section" , "HR" , "Director",  user.position_id === 1 || user.position_id === 2 || user.position_id === 3 ? "GS" : "" , "Status", "View" , "Delete"  ] , 
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


const proceed = () => {
  const requested_days = intervalDays
  const leave_address = FunGet.val("#leave_address")
  const resumption_date = FunGet.val("#resumption_date")
  const date_effective = FunGet.val("#date_effective")
  const leave_type_id = FunGet.val("#leave_type_id")


  const doc = {
        "requestedDays": requested_days,
        "leaveAddress": leave_address,
        "resumptionDate": resumption_date,
        "dateEffective": date_effective,
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
    if(
      requested_days && 
      leave_address && 
      resumption_date && 
      date_effective && 
      leave_type_id){

    setselected_data(doc)
    setadd_data_modal(false)
    setpreview_modal(true)
  }else{
    setmessage("Enter all valid fields")
  }
}

const Submit = () => {
  setpreview_modal(false)
    setloading(true)
    Axios.post((endPoint) + "/leaverequest" , selected_data , {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      }
    })
    .then( (res) => {
           setloading(false)
           console.log(res)
     if(res.data){
      setdocs("")
      setsuccess(true)
     }
    })
    .catch((err) => {
      setmessage(JSON.stringify(err.response.data.message))
      setloading(false)
    })


}

const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [intervalDays, setIntervalDays] = useState(null);

const calculateInterval = () => {
if(startDate && endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let weekdays = 0;

  // Iterate through each day between start and end dates
  for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.getDay();
    // Count only if it's not Saturday (6) or Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      weekdays++;
    }
  }
  setIntervalDays(weekdays)
  return weekdays;

}else{
  return 0
}
};


const validateDate = (selectedDate , input_id) => {
  const dateObject = new Date(selectedDate);
  const dayOfWeek = dateObject.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  // Check if selected date is a weekday (Monday to Friday)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
  } else {
    setmessage('Please select a weekday (Monday to Friday).');
    FunGet.val(input_id, ' ');
  }
};

useEffect(() => {
 calculateInterval()
},[startDate, endDate])


  return (
    <div>
      <Nav active={4}/>
  <Modal 
   open={preview_modal}
   maxWidth='800px'
   animation='SlideDown'
   flat
   close={<PiX className='pointer hover-text-error' onClick={()=>setpreview_modal(false)} />}
   title={
<>
<Text heading='h5' bold text={'Proceed with Request'} block/>
 <Text  text={"proceed with your request"} size='small' color="dark300"/>
</>
 }

body={
<div>
<Grid>
<Col sm={6} md={3} lg={3} funcss='padding'>
      <Text size='small' bold color="primary" text="Effective" block/>
      <Text size='minified'  text={selected_data.dateEffective} block/>
    </Col>
<Col sm={6} md={3} lg={3} funcss='padding'>
      <Text size='small' bold color="primary" text="Resume" block/>
      <Text size='minified'  text={selected_data.resumptionDate} block/>
    </Col>
<Col sm={6} md={3} lg={3} funcss='padding'>
      <Text size='small' bold color="primary" text="Days Requested" block/>
      <Text size='minified'  text={intervalDays} block/>
    </Col>
    <Col sm={6} md={3} lg={3} funcss='padding'>
      <Text size='small' bold color="primary" text="Address" block/>
      <Text size='minified'  text={selected_data.leaveAddress} block/>
    </Col>
    </Grid>
</div>
}
footer={
  <RowFlex gap={1} justify='flex-end'>
<Button 
text='Cancel'
bg='dark300'
endIcon={<PiX />}
bold 
onClick={()=>setpreview_modal(false)}
/>
<Button 
text='Submit'
bg='primary'
endIcon={<PiCheck />}
bold 
onClick={() => Submit()}
/>
  </RowFlex>
}
/>
{
  user && 
<ViewRequest current_user = {user} selected_data={selected_data} open={viewModal} close={<PiX className='pointer hover-text-error' onClick={()=>setviewModal(false)} />}/>

}
      {
        deleteId &&
        <DeleteModal  route={"/leaverequest"} id={deleteId}/>
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
    maxWidth='800px'
    flat
    close={<PiX className='pointer hover-text-error' onClick={()=>setadd_data_modal(false)} />}
    title={<>
        <Text bold text={update_doc ? update_doc.title : '📝 Request Leave'}  heading='h4' color='dark300' block/>
        <Text  text= 'Enter all the details correctly to create a new request'  size='small' color='dark400' />
    </>}

    body={<div>
      <div className="row">

          <div className="col sm-6 lg-6 md-6 padding">
          <Text text='Date Effective' size='small' emp/>
          <Input type="date" id='date_effective'           
          onChange={(e) => {
            validateDate(e.target.value, "#date_effective");
            setStartDate(e.target.value);
          }}
 funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>
          <div className="col sm-6 lg-6 md-6 padding">
          <Text text='Resumption Date' size='small' emp/>
          <Input onChange={(e) => {
            validateDate(e.target.value , "#resumption_date");
            setEndDate(e.target.value);
          }} type="date" id='resumption_date' funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>

          {/* <div className="col sm-6 lg-6 md-6 padding">
          <Input value={intervalDays ? intervalDays : 0} type="number" id='requested_days' label="Requested Days" funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div> */}
          <div className="col sm-6 lg-6 md-6 padding">
          <Text text='Leave Address' size='small' emp/>
          <Input type="text" id='leave_address' funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />
          </div>

          <div className="col sm-12 lg-6 md-6 padding">
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
        text='Proceed'
        endIcon={<PiArrowRight />}
        bg='primary'
        raised
        bold
        onClick={ () => {
          proceed();
        } }
        />
      </div>}
    />
    

        <Header title={ "My Request"} sub_title={"Request for a leave"}/>
 
        <div className='_card no-padding'>
   
       {

table_data  && 
<div >
<Table
right={      <Button 
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
   />}
data={table_data}
filterableFields={['leaveTypeName']}
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
