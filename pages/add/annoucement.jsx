import React from 'react'
import TextField from '@mui/material/TextField';
import Loader from '../../components/loader';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import endPoint from '../../components/endPoint';
import Alert from './../../Funcss/Components/Alert';
import Axios from 'axios';
import departments from "../../data/departments";
import sections from "../../data/sections"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Nav from './../../components/Nav';
import  dynamic from 'next/dynamic';
const QuillEdit = dynamic(()=>import("./../../components/Quill") ,{ssr:false})
export default function Annoucement() {
    const [loading, setloading] = useState(false)
    const [days, setdays] = useState(0)
    const [reffered, setreffered] = useState(0)
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    const form = useRef(null)
    const [message, setmessage] = useState("")
    const [remaining, setremaining] = useState(0)
    const [annoucement, setannoucement] = useState("")
    const [target, settarget] = useState("")
    const handleClose = () => {
        setOpen(false);
      };
    

    useEffect(()=>{
        setTimeout(()=>{
            setmessage(null)
        }, 4000)
    },[message])
    useEffect(() => {
        // const remaining = document.querySelector("#remaining")
        // remaining.value = parseInt(days) + parseInt(reffered)
        setremaining(parseInt(days) + parseInt(reffered))
    },[reffered , days])
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
    const addAnnoucement  = (e)=>{
        
        e.preventDefault()
        const current = form.current
        const startDate = current["startdate"].value
        const endDate = current["enddate"].value
        const target_type = current["targettype"].value
        const target = current["target"].value
        const Doc = {
            start_date:startDate,
            end_date:endDate,
            target_type:target_type,
            target:target,
            message:annoucement
        }
    if(startDate && endDate && target && target_type && annoucement){
        setloading(true)
        Axios.post(endPoint + "/annoucement/register" , Doc , {
            headers:{ authorization:`Bearer ${token}`}
        }).then(()=>{
            setloading(false)
            setmessage("Annoucement made successfully")
           setTimeout(() => {
            window.location.reload()
           }, 3000);
        }).catch(err=>{
            setmessage(err.message)
            setloading(false)
        })
    }else{
        setloading(false)
        setmessage("Make sure to enter all details")
        
    }
    }
  return (
    <div>
        <Nav />
        
        { loading ?
            <Loader />
            :""
        }
        <div className='content'>
         <div className="message">
         {
            message ?
            <Alert type="info" message={message}/>
            :""
         }
         </div>
         <div className="card">
            <div className="row-flex">
                <div>
                    <img src="/annoucement.svg" className='width-100' alt="" />
                </div>
                <div>
                <div className="h1">Annoucement</div>
            <div className="section text-bold">Make an annoucement</div>
                </div>
            </div>
         </div>
            <div className="m-section">
           <form ref={form}>
           <div className="row card">
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="minSection text-bold">Start Date</div>
                       <input type="date" name='startdate' className='input light' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="minSection text-bold">End Date</div>
                       <input type="date" name='enddate' className='input light' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="minSection text-bold">Target Type</div>
                        <select name='targettype' className='input light' onChange={(e)=>settarget(e.target.value)}>
                            <option value="all">All Users</option>
                            <option value="department">Specific Departments</option>
                            <option value="section">Specific Section</option>
                        </select>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="minSection text-bold">Target</div>
                        <select name='target' className='input light' >
                           {
                            target === "all" ?
                            <option value="all">All users</option>
                            : target === "section" ?
                            sections.map(docs=>(
                                <option value={`${docs.section}`} key={docs.section}> {docs.section}</option>
                            ))
                            : target === "department" ?
                             departments.map(docs=>( 
                                <option value={docs.department} key={docs.department}>{docs.department}</option>
                            ))
                            :""
                           }
                        </select>
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="minSection text-bold">Message</div>
                        <QuillEdit Change={setannoucement} plainText placeholder="Enter your annoucement here" className="light" />
                    </div>
            
                </div>
           </form>
            <button className="btn submitNewstaff" onClick={addAnnoucement}>
            Submit  <i className="icon-paper-plane"></i>
            </button>
            </div>
           
        </div>
    </div>
  )
}
