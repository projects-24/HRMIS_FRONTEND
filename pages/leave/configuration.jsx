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
export default function LeaveType() {
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

  useEffect(() => {
 if(!docs && token){
  GetRequest("/leavetype")
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

const OpenModal = () => {
 setadd_data_modal(true)
}
const Close_Modal = () => {
 setadd_data_modal(false)
}

const Submit = () => {
  const leave_type_name = FunGet.val("#leave_type_name")
  const leave_description = FunGet.val("#leave_description")
  const maximum_number_days = FunGet.val("#maximum_number_days")

  const doc = {
    leaveTypeName:leave_type_name , 
    leaveDescription:leave_description,
    maximumNumberOfDays:maximum_number_days ,
    addedBy:user.email
}


  setadd_data_modal(false)
  if(leave_type_name && leave_description && maximum_number_days){
    setloading(true)

    if(update_doc){
      PatchRequest( "/leavetype" , update_doc.id , doc)
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
    Axios.post(endPoint + "/leavetype" , doc)
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
       {
        add_data_modal ?
        <MyModal
        close={
          <CloseModal onClick={Close_Modal} />
        }
        title={<>
        <Text text={update_doc ? update_doc.title : 'Add/Modify Leave Type'} light heading='h4' block/>
        </>}
        sub_title={ <Text text='Add and modify leave types' emp/>}
        body={
        <div>
         <IconicInput 
    funcss="section" 
    leftIcon={ <PiCheck />}
    input={<Input type="text" id='leave_type_name' label="Leave Name" funcss="full-width" defaultValue={update_doc ? update_doc.leaveTypeName : ''}  />}
     />
   <Input multiline rows={2}  id='leave_description' label="Description" funcss="full-width" defaultValue={update_doc ? update_doc.leaveDescription : ''}  />
         <IconicInput 
    funcss="section" 
    leftIcon={ <PiCheck />}
    input={<Input type="number" id='maximum_number_days' label="Max Days" funcss="full-width" defaultValue={update_doc ? update_doc.maximumNumberDays : ''}  />}
     />
        </div>
        }
        footer={<RowFlex justify='flex-end'>
             <Button
     text='Submit Data'
     startIcon={<PiPaperPlane />}
     bg='primary800'
     raised
     rounded
     onClick={Submit}
     />
        </RowFlex>}
        />
        :''
       }

        <Header sub_dir={"Configurations" } sub_dir_route={"/configurations"} title={ "Leave Type"} sub_title={"Add and manage leave types"}/>

        <div className='_card'>
       <div className="section">
       <RowFlex justify='space-between' gap={1} responsiveSmall>
        <IconicInput 
    funcss="section width-500-max fit" 
    leftIcon={ <PiMagnifyingGlass />}
    input={<Input type="text" label="Leave Name..." funcss="full-width"  onChange={(e) => setfilter(e.target.value)}  />}
     />

     <Button 
   fillAnimation 
   onClick={() => {
    setupdate_doc("")
    OpenModal()
   }}
   outlined 
   disabled
   outlineSize={0.1}
   fillTextColor='dark900' 
    bg="primary" 
    text="New Leave"
    startIcon={<PiPlus />}
    />
        </RowFlex>
       </div>
       <Table 
       stripped
       funcss='text-small'
       hoverable
       head={<>
         <TableData>Name</TableData>
         <TableData>Maximum Days</TableData>
         <TableData>Added By</TableData>
         <TableData>Created</TableData>
         <TableData>Updated</TableData>
         <TableData>Modify</TableData>
         <TableData>Delete</TableData>
       </>}
       body={
           <>
             {
              docs &&
              docs
              .filter(res => {
                if(filter){
                    if(filter.toString().trim().toLowerCase().includes(res.leaveTypeName.slice(0, filter.trim().length).toString().trim().toLowerCase())){
                        return res
                    }
                }else{
                    return docs
                }
              }).map(res => (
                <TableRow key={res.id}>
                <TableData>{res.leaveTypeName}</TableData>
                <TableData>{res.maximumNumberDays}</TableData>
                <TableData>{FormatEmail(res.addedEmail)}</TableData>
                <TableData>{FormatDate(res.createdAt).date}</TableData>
                <TableData>{FormatDate(res.updatedAt).date}</TableData>
                <TableData>
                <ToolTip>
                 <span  onClick={() => {
              new Promise((resolve, reject) => {
               setupdate_doc({title:res.leaveTypeName, leaveTypeName:res.leaveTypeName , id:res.id , maximumNumberDays:res.maximumNumberDays ,leaveDescription:res.leaveDescription })
               resolve()
              })
              .then(() => setadd_data_modal(true))
               
                } }> 
                <Circle size={2} funcss='raised' bg='success'>
                   <PiPen />
                 </Circle>
                 </span>
       <Tip funcss='z-index-5' tip="right"  animation="ScaleUp" duration={0.2} content="Edit Object"/>
       </ToolTip>
             
                </TableData>
                <TableData>
                <ToolTip>
                <span onClick={() => setdeleteId(res.id) }>
                <Circle size={2} funcss='raised' bg='error'>
                   <PiTrash />
                 </Circle>
                </span>
       <Tip funcss='z-index-5' tip="left"  animation="ScaleUp" duration={0.2} content="Delete Object"/>
       </ToolTip>
             
                </TableData>
              </TableRow>
              ))
             }
          

           </>
       }
       />
       </div>
      </div>
    </div>
  )
}
