import { Link } from '@mui/material'
import React from 'react'
import Nav from '../components/Nav'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import endPoint from '../components/endPoint';
export default function Messages() {
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")
    const [docs, setdocs] = useState(null)
    const [notNumber, setnotNumber] = useState(0)
    const [message, setmessage] = useState("")
    const [showLeaveplaningMessages, setshowLeaveplaningMessages] = useState(false)
        
    useEffect(() => {
    if(user && !showLeaveplaningMessages){
      if(user.position === "Deputy Director" ||
        user.position === "Government Statistician (CEO)"
        || user.position === "Deputy Gov Statistician (DGS)" ||
        user.position === "Director" ||
        user.position === "Deputy Director" ||
        user.position === "Sectional Head"
        ){
        setshowLeaveplaningMessages(true)
      }
    }
    })
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
    useEffect(() => {
        if(!docs){
       setTimeout(() => {
        Axios.get(endPoint  + "/notification/showall" , {
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then(dataDocs=>{
           const getDocs = dataDocs.data.notification
          if(getDocs.length > 0){
            setdocs(getDocs)
            clearTimeout()
            setnotNumber(
                notNumber +
                getDocs.filter((filt)=>{
                    if(filt.receiver === user._id ){
                    return filt
                    }
                }).length
            )
            if(showLeaveplaningMessages){
                setnotNumber(
                    notNumber +
                    getDocs.filter((filt)=>{
                        if(filt.receiver === "leaveplaning" ){
                        return filt
                        }
                    }).length
                )
            }
          }
        }).catch(err=>{
          clearTimeout()
          setmessage(err.message) 
        })
       }, 4000);
        }
        })

    const handleAction = (deleteDoc)=>{
    Axios.delete(endPoint + "/notification/delete/" + deleteDoc._id, {
    headers:{
    authorization:`Bearer ${token}`
    }
    } 
    ).then(()=>{
    window.location.assign(deleteDoc.link)
    })
    }
  return (
    <div>
        <Nav notNumber={notNumber} />
        <div className="content">
        <div className="row-flex fit white round-edge padding section">
            <img src="/leave.svg" className='width-100-max fit' alt="" />
            <div>
            <div className="h1">
                Notifications
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Notifications</Link>
                </div>
            </div>
        </div>

        <div className="m-section">
            {
                <div>
                         { // all user messages
                    docs ?
                    docs.filter((filt)=>{
                        if(filt.receiver === user._id ){
                       return filt
                       }
                        })
                    .map((doc)=>(
                        <div className="card section" key={doc._id}>
                        <div className="row-flex">
                         <div>
                             <img src="/favicon.png" className='width-100' alt="" />
                         </div>
                         <div>
                         <div className="h4 padding">Leave plan</div>
                         <div className=" padding width-600-max">
                             {doc.message}
                         </div>
                        <div className="row-flex">
                        <div onClick={()=>handleAction(doc)}>
                                <span className="p-text button text-bold">
                                    Check approval
                                </span>
                         </div>
                         <div className="text-bold">
                            <span>Date:</span> <span className="p-text">{doc.date}</span>
                         </div>
                        </div>
                         
                         </div>
                        </div>
                     </div>
                    ))
                    :""
                 }
                </div>
            }
            {
                showLeaveplaningMessages ?
                <div>
                         { // leave planing messages
                    docs ?
                    docs.filter((filt)=>{
                        if(filt.receiver === "leaveplaning"){
                            return filt
                        }
                    })
                    .map((doc)=>(
                        <div className="card section" key={doc._id}>
                        <div className="row-flex">
                         <div>
                             <img src="/favicon.png" className='width-100' alt="" />
                         </div>
                         <div>
                         <div className="h4 padding">Leave plan</div>
                         <div className=" padding width-600-max">
                             {doc.message}
                         </div>
                        <div className="row-flex">
                        <div onClick={()=>handleAction(doc)}>
                                <span className="p-text button text-bold">
                                    Verify/disapprove plan
                                </span>
                         </div>
                         <div className="text-bold">
                            <span>Date:</span> <span className="p-text">{doc.date}</span>
                         </div>
                        </div>
                         
                         </div>
                        </div>
                     </div>
                    ))
                    :""
                    
                 }
                </div>
                 :""
            }
            {
                notNumber < 1 ?
                <div className="card central text-bold">
                      No notification
                    </div>
                    :""
            }
        </div>


        </div>
    </div>
  )
}
