import { Link } from '@mui/material'
import React from 'react'
import Nav from '../components/Nav'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import endPoint from '../components/endPoint';
import AnnoucementCard from './../components/annoucementCard';
import Alert from '../Funcss/Components/Alert';

export default function Annoucement() {
  const [token, settoken] = useState("")
  const [user, setuser] = useState("")
  const [docs, setdocs] = useState("")
  const [message, setmessage] = useState("")
  
  useEffect(()=>{
    setTimeout(()=>{
        setmessage(null)
    }, 4000)
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
  Axios.get(endPoint  + "/annoucement/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
     const getDocs = dataDocs.data.annoucement
    if(getDocs.length > 0){
      setdocs(getDocs)
    //   .filter((filt)=>{
    //     if(filt.target_type === "all" ){
    //     return getDocs
    //     }else if(filt.target_type === "department" && filt.target === user.department){
    //       return filt
    //     }else if(filt.target_type === "section" && filt.target === user.department){
    //       return filt
    //     }
    // })
    }
  }).catch(err=>{
    console.log(err.message) 
  })
  }
  })
// 
  return (
    <div>
            {
            message ?
           <div className="message">
             <Alert type="danger"  message={message}/>
           </div>
            :""
         }
        <Nav />
        <div className="content">

        <div className="row-flex fit white round-edge padding section">
            <img src="/annoucement.svg" className='width-200-max fit' alt="" />
            <div>
            <div className="h1">
                Annoucements
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Annoucements</Link>
                </div>
            </div>
        </div>

<div className="m-section">
  { // all annoucements
docs &&
docs
.filter(dfilt=>{
if(dfilt.target_type === "all"){
return dfilt
}

}).map((doc)=>(
<AnnoucementCard key={doc._id} doc={doc}/>
))

}
  { // department
docs &&
docs
.filter(dfilt=>{
if(dfilt.target_type === "department" && dfilt.target === user.department){
return dfilt
}

}).map((doc)=>(
<AnnoucementCard key={doc._id} doc={doc}/>
))

}
  { // section
docs &&
docs
.filter(dfilt=>{
if(dfilt.target_type === "section" && dfilt.target === user.section){
return dfilt
}

}).map((doc)=>(
<AnnoucementCard key={doc._id} doc={doc}/>
))

}

</div>
</div>
</div>
)
}
