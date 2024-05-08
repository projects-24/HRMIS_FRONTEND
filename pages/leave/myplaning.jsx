'use client'
import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Table from 'funuicss/ui/table/Table'
import Circle from 'funuicss/ui/specials/Circle'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiCheck, PiMagnifyingGlass, PiPaperPlane, PiPen, PiPlus, PiTrash, PiX } from 'react-icons/pi'
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
import { FormatDate, GetRequest, GetToken, PatchRequest } from '../../components/Functions'
export default function MyPlaning() {
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
  const [all_leaves, setall_leaves] = useState("")

  useEffect(() => {
    if(!leaves && token){
     GetRequest("/leavetype")
     .then( res => setall_leaves(res))
     .catch(err => console.log(err))
    }
     })

  useEffect(() => {
    if(!leaves && token){
     GetRequest("/Myleaveplan/" + user.staff_id)
     .then( res => {
        let data = {
            "data" : res , 
            "titles" : ["Staff" , "Leave" ,   "Start" , "Resume" , "Created" , "Updated"  , "Delete"] , 
            "fields" : ["fullname"  , "leaveTypeName" ,  "proposedStartDate" , "proposedEndDate" , "createdAt" , "updatedAt" ] , 
          }
          console.log(res)
        setleaves(data)
    })
     .catch(err => console.log(err))
    }
     })

  useEffect(() => {
 if(!docs && token){
  GetRequest("/leaveplan")
  .then( res => setdocs(res))
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
        "addedEmail": user.email  , 
        "staffId" : user.staff_id 
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
        setloading(false)
        setleaves("")
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
      setleaves("")
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
     
        <Modal
        open={add_data_modal}
        flat 
        maxwidth={"600px"}
        close={
          <CloseModal onClick={() => Close_Modal()} />
        }
        title={<>
        <Text text={update_doc ? update_doc.title : 'Plan Leave'} light heading='h4' block/>
        </>}
        // sub_title={ <Text text='Plan for a leave' emp/>}
        body={
        <div>
        <div className="row">
        <div className="col sm-6 lg-6 md-6 padding">
            <Text text='Start Date' size='small' emp/>
            <Input type="date" id='proposed_start_date' funcss="full-width" defaultValue={update_doc ? update_doc.leaveplanName : ''}  />
            </div>
            <div className="col sm-6 lg-6 md-6 padding">
            <Text text='End Date' size='small' emp/>
            <Input type="date" id='proposed_end_date' funcss="full-width" defaultValue={update_doc ? update_doc.leaveplanName : ''}  />
            </div>
            <div className="col sm-12 lg-12 md-12 padding">
            <Text text='Leave Type' size='small' emp/>
           <select name="" id="leave_type_id" className='input full-width'>
            <option value="">Leave Type</option>
           {
            all_leaves ?
            all_leaves.map(res => (
                <option value={res.id} key={res.id}>{res.leaveTypeName}</option>
            ))
            : <></ >
           }
           </select>
            </div>
        </div>

        </div>
        }
        footer={<RowFlex justify='flex-end'>
             <Button
     text='Submit Data'
     startIcon={<PiPaperPlane />}
     bg='primary'
     raised
     bold
     onClick={Submit}
     />
        </RowFlex>}
        />
   

        <Header 
        title={ "My Leave plans"} 
        sub_title={"Plan for a leave"}
        />

        <div className='_card'>
       <div className="section text-right">
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
    text="New Plan"
    startIcon={<PiPlus />}
    />
       </div>
     {
        leaves && 
        <Table 
        filterableFields={['leaveTypeName']}
        data={leaves}
        pageSize={10}
        customColumns={[
            {
              title: 'Actions',
              render: (data) => (
                <ToolTip>
                <span onClick={() => setdeleteId(data.leaveId) }>
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
     }
       </div>
      </div>
    </div>
  )
}
