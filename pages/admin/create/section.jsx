'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import Header from '../../../components/Header'
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
import MyModal from '../../../components/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import {FunGet} from "funuicss/js/Fun"
import Loader from '../../../components/loader'
import DeleteModal from '../../../components/modal/Delete'
import Axios from 'axios'
import endPoint from '../../../components/endPoint'
import Success from '../../../components/default/success'
import Alert from 'funuicss/ui/alert/Alert'
import { GetRequest, GetToken, PatchRequest } from '../../../components/Functions'
export default function Section() {
   const [loading, setloading] = useState(false)
  const [add_data_modal, setadd_data_modal] = useState(false)
  const [update_doc, setupdate_doc] = useState("")
  const [delete_doc, setdelete_doc] = useState("")
  const [success, setsuccess] = useState("")
  const [message, setmessage] = useState("")
  const [deleteId, setdeleteId] = useState("")

  const [docs, setdocs] = useState("")
  const [directorates, setdirectorates] = useState("")

  useEffect(() => {
    GetToken()
        .then(res => {
           if(res.user.position_id != 2){
            window.location.assign("/401")
           }
        })
}, [])

  useEffect(() => {
 if(!docs){
  GetRequest("/section")
  .then( res => setdocs(res))
  .catch(err => console.log(err))
 }
  })
  useEffect(() => {
 if(!directorates){
  GetRequest("/directorate")
  .then( res => setdirectorates(res))
  .catch(err => console.log(err))
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
  const val = FunGet.val("#input_val")
  const val_directorate = FunGet.val("#input_directorate")
  setadd_data_modal(false)
  if(val){
    setloading(true)
    if(update_doc && val){
      PatchRequest( "/section" , update_doc.id , {
        section:val,
        directorate_id:val_directorate
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
    Axios.post(endPoint + "/section" , {
      section:val ,
      directorate_id:val_directorate
    })
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
        <DeleteModal route={"/section"} id={deleteId}/>
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
        <Text text={update_doc ? update_doc.title : 'Add/Modify section'} light heading='h4' block/>
        </>}
        sub_title={ <Text text='Add and modify section' emp/>}
        body={
        <div>
         <IconicInput 
    funcss="section" 
    leftIcon={ <PiCheck />}
    input={<Input type="text" id='input_val' label="section" funcss="full-width" defaultValue={update_doc ? update_doc.section : ''}  />}
     />
       <select  id='input_directorate' className="full-width input" defaultValue={update_doc ? update_doc.directorate : ''}  >
        <option value={""}>Directorate</option>
        {
          directorates && 
          directorates.map(res => (
            <option value={res.id} key={res.id}>{res.directorate}</option>
          ))
        }
        </select>
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

<Header sub_dir={"Configurations" } sub_dir_route={"/configurations"} title={ "Add Section"} sub_title={"Add and manage sections"}/>

        <div className='_card'>
       <div className="section">
       <RowFlex justify='space-between' gap={1} responsiveSmall>
        <IconicInput 
    funcss="section width-500-max fit" 
    leftIcon={ <PiMagnifyingGlass />}
    input={<Input type="text" label="section" funcss="full-width" />}
     />

     <Button 
   fillAnimation 
   onClick={() => {
    setupdate_doc("")
    OpenModal()
   }}
   outlined 
   outlineSize={0.1}
   fillTextColor='dark900' 
    bg="primary" 
    text="New section"
    startIcon={<PiPlus />}
    />
        </RowFlex>
       </div>
       <Table 
       stripped
       funcss='text-small'
       hoverable
       head={<>
         <TableData>Id</TableData>
         <TableData>Section</TableData>
         <TableData>Directorate</TableData>
         <TableData>Modify</TableData>
         <TableData>Delete</TableData>
       </>}
       body={
           <>
             {
              docs &&
              docs.map(res => (
                <TableRow key={res.id}>
                <TableData>{res.id}</TableData>
                <TableData>{res.section}</TableData>
                <TableData>{res.directorate}</TableData>
                <TableData>
                <ToolTip>
                 <span  onClick={() => {
              new Promise((resolve, reject) => {
               setupdate_doc({title:res.section, section:res.section , id:res.id , directorate:res.directorateID})
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
