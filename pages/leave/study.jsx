import Link from 'next/link';
import React from 'react'
import Nav from './../../components/Nav';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import Alert from './../../Funcss/Components/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
import Departments from "../../data/departments"
import { TextField, MenuItem } from '@mui/material';
import Loader from '../../components/loader';

export default function Planing() {
  const [user, setuser] = useState(null)
  const [token, settoken] = useState("")
  const [message, setmessage] = useState("")
  const [success, setsuccess] = useState("")
  const [docs, setdocs] = useState("")
  const [render, setrender] = useState("requests")
  const [open, setOpen] = useState(false)
  const [userDoc, setuserDoc] = useState("")
  const [filter, setfilter] = useState("")
  const [canUserApprove, setcanUserApprove] = useState(false)
  const [exportTrigger, setexportTrigger] = useState(false)
  const [department, setdepartment] = useState("")
  const [loader, setloader] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)

  const [directorDocs, setdirectorDocs] = useState(null)
  const [isCeo, setisCeo] = useState(false)
  const [isDirector, setisDirector] = useState(false)
  const [type, settype] = useState("officers")

  useEffect(() => {
  if(user && !canUserApprove){
    if(user.department === "Human resource"
      ){
      setcanUserApprove(true)
      setisAdmin(true)
    }
    if(sessionStorage.getItem("userMode")){
      if(JSON.parse(sessionStorage.getItem("userMode")) === "admin"){
  setisAdmin(true)
      }else{
        setisAdmin(false)
      }
    }
    if(user.position === "Government Statistician (CEO)" ){
      setisCeo(true)
    }else if(user.position === "Director" || user.position === 'Deputy Director'){
      setisDirector(true)
    }
  }
  })

  useEffect(()=>{
    setTimeout(()=>{
        setmessage(null)
    }, 4000)
},[message])
  useEffect(()=>{
    setTimeout(()=>{
        setsuccess(null)
    }, 4000)
},[success])
  const form = useRef(null)
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
const handleRequest = (e)=>{
e.preventDefault()
const current = form.current
const id = user._id
const number_of_days = parseInt(current["number_of_days"].value)
const officer_taking_over = current["officer_taking_over"].value
const start_date = current["start_date"].value
const end_date = current["end_date"].value
const resumption_date = current["resumption_date"].value
const institution = current["institution"].value
const memo = current["memo"].value
const program = current["program_of_study"].value

const data = {
  number_of_days:number_of_days,
  officer_taking:officer_taking_over,
  start_date:start_date,
  end_date:end_date,
  resumption_date:resumption_date,
  staffDetails_id:user._id,
  memo:memo,
  program_study:program,
  institution:institution,
  approval:false,
  isPending:false
}
var locale = "en-us";
var today = new Date();
var day = today.getDate();
var fullDay = ("0" + day).slice(-2);
var longMonth = today.toLocaleString(locale, { month: "long" });
var year = today.getFullYear();
const fullDate = longMonth + " " + fullDay + ", " + year

if(number_of_days <= 10){
    if(start_date && end_date &&  resumption_date && officer_taking_over && program && institution){
        setloader(true)
        Axios.post(endPoint + "/studyleave/register" , data , {
          headers:{
            authorization:`Bearer ${token}`
          }
        }).then(()=>{
          const location = window.location.href
          Axios.post(endPoint + "/notification",{
            sender_id:user._id,
            message:`Request made by ${user.firstname} ${user.middleName} ${user.lastName} for a study leave, click on the link below to verify or disapprove request`,
            link:location,
            receiver:"leaverequest",
            date:fullDate
          }, {
            headers:{
              authorization:`Bearer ${token}`
            }
          } 
          ).then(()=>{
            setsuccess("Request made successfully")
            setdocs(null)
            setrender("requests")
        setloader(false)

          })
        }).catch(err=>setmessage(err.message))
        }else{
          setmessage("Make sure to enter all compulsory fields")
          clearTimeout()
        setloader(false)

        }
}else{
    setmessage("Number of days can not be more than 10")
}
}
useEffect(() => {
  if(!docs && user){
  Axios.get(endPoint  + "/studyleave/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
     const getDocs = dataDocs.data.studyleave
     new Promise((resolve, reject) => {
 
      resolve(    getDocs.filter(filt=>{
        if(user.position === "Government Statistician (CEO)"
          || user.position === "Deputy Gov Statistician (DGS)"
          || user.department === "Human resource"
          ){
            return getDocs
            // if(isAdmin){
            //   return getDocs
            // }else if(filt.staffDetails._id === user._id){
            //     return filt
            //   }
       }else if(user.position === "Director" || user.position === "Deputy Director" ){
           if(filt.staffDetails.department === user.department){
               return filt
           }
       }else if(user.position === "Sectional Head"){
               if(filt.staffDetails.section === user.section){
                 return filt
               }
       }else if(user.position === "Unit Head"){
           if(filt.staffDetails.section === user.unit){
             return filt
           }
       }else if(user.position === "Officer"){
        if(filt.staffDetails._id === user._id){
          return filt
        }
       }
      }
      )
      )
         }).then((getdoc)=>{
          setdocs(
            getdoc.filter(doc=> doc.staffDetails.position != "Director" && doc.staffDetails.position != "Deputy Director")
            )
            setdirectorDocs(
              getdoc.filter(doc=>doc.staffDetails.position === "Director" || doc.staffDetails.position === "Deputy Director")
            )
         })
  }).catch(err=>{
    clearTimeout()
    console.log(err.message) 
  })
  }
  })

  const handleClose = ()=>{
    setOpen(false)
  }

  const Approved = ()=>{
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if(userDoc.staffDetails.position === "Director" || userDoc.staffDetails.position === "Deputy Director"){
      Axios.patch(endPoint + "/studyleave/update/" +  userDoc._id , {ceoApproval:true, isPendingCEO:false} , {
        headers:{
          authorization:`Bearer ${token}`
        }
      }).then(()=>{
        Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
          status: "leave"

        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        } 
        ).then(()=>{
          setsuccess("Approved successfully")
            setOpen(false)
            setdocs(null)
        })


  
      })
     
    }else{
    Axios.patch(endPoint + "/studyleave/update/" +  userDoc._id , {approval:true, isPending:false} , {
        headers:{
          authorization:`Bearer ${token}`
        }
      }).then(()=>{
        const location = window.location.href
        Axios.post(endPoint + "/notification",{
          sender_id:user._id,
          message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your study leave request have been approved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
          link:location,
          receiver:userDoc.staffDetails._id,
          date:fullDate
        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        } 
        ).then(()=>{
          Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
            status: "leave"

          }, {
            headers:{
              authorization:`Bearer ${token}`
            }
          } 
          )
          setsuccess("Approved Successfully")
          setOpen(false)
          setdocs(null)
        })
  
      }).catch(err=>{
        setmessage(err.message)
        setOpen(false)
      })
    }

  }
  const disApproved = ()=>{
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if(userDoc.staffDetails.position === "Director" || userDoc.staffDetails.position === "Deputy Director"){
      Axios.patch(endPoint + "/studyleave/update/" +  userDoc._id , {ceoApproval:false, isPendingCEO:false} , {
        headers:{
          authorization:`Bearer ${token}`
        }
      }).then(()=>{
        Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
          status: "leave"

        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        } 
        ).then(()=>{
          setsuccess("Approved successfully")
            setOpen(false)
            setdocs(null)
        })


  
      })
     
    }else{
    Axios.patch(endPoint + "/studyleave/update/" +  userDoc._id , {approval:false, isPending:false} , {
        headers:{
          authorization:`Bearer ${token}`
        }
      }).then(()=>{
        const location = window.location.href
        Axios.post(endPoint + "/notification",{
          sender_id:user._id,
          message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your study leave request have been disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
          link:location,
          receiver:userDoc.staffDetails._id,
          date:fullDate
        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        } 
        ).then(()=>{
          Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
            status: "post"

          }, {
            headers:{
              authorization:`Bearer ${token}`
            }
          } 
          )
          setsuccess("Disapproved successfully")
          setOpen(false)
          setdocs(null)
        })
  
      }).catch(err=>{
        setmessage(err.message)
        setOpen(false)
      })
    }
  
  }

  

  const exportExcel = ()=>{
    new Promise((resolve, reject) => {
      setexportTrigger(true)
      resolve()
    }).then(()=>{
      setexportTrigger(false)
    })
    }

 if(user){
  return (
    <div className='content'>
        {
            loader ?
            <Loader />
            :""
        }
      <Excel Trigger = {exportTrigger} />
      {
        render === "requests" ?
        <div className="exportBtnContainer">
      <button className='exportBtn' onClick={exportExcel}><i className="lni lni-add-files"></i> Export Excel</button>
      </div>
      :""
      }

{
  userDoc ?
  <Dialog open={open} onClose={handleClose}>
  <DialogContent>
    <div className="text-center section">
      <img src="/question.svg" className='width-200' alt="" />
    </div>
    <div className='section text-bold'>
      Do your want to approve leave plan for <span className="p-text"> {userDoc.staffDetails.firstname + " " + userDoc.staffDetails.middleName + " " +  userDoc.staffDetails.lastName}</span>
    </div>
  </DialogContent>
  <DialogActions>
    <Button color='error' onClick={disApproved}>Declined</Button>
    <button className='primaryBtn btn ' onClick={Approved}> Approve <i className="icon-paper-plane"></i></button>

  </DialogActions>
</Dialog>
:""
}
         {
            message ?
           <div className="message">
             <Alert type="danger"  message={message}/>
           </div>
            :""
         }
         {
            success ?
           <div className="message">
             <Alert type="success" message={success}/>
           </div>
            :""
         }
        <Nav/>
        <div className="padding">
        <div className="row-flex fit white round-edge padding section">
            <img src="/leave.svg" className='width-100-max fit' alt="" />
            <div>
            <div className="h1">
                Study Leave
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Study Leave</Link>

                </div>
            </div>
        </div>
        </div>
   
        <div className="section padding space-between row-flex" style={{alignItems:"center"}}>
       <div>
       <div className="minSection text-bold">Select status</div>
          <select name="" id="" className='input white' onChange={(e)=>setfilter(e.target.value)}>
            <option value="">All</option>
            <option value="approved"> Approved</option>
            <option value="pending">Pending</option>
            <option value="disapproved">Disapproved</option>
          </select>
       </div>
       {
        isCeo || isDirector ?
        <div>
       <div className="minSection text-bold">Show Type</div>
          <select name="" id="" className='input white' onChange={(e)=>settype(e.target.value)}>
          <option value="officers">Subordinates</option>
            <option value="directors"> {isCeo ? "Heads" : "personal"} </option>

          </select>
       </div>
       :""
       }
       <div>
       <div className="minSection text-bold">Department</div>
        <select className='input white' placeholder="Department" select name="" id=""  onChange={(e)=>setdepartment(e.target.value)}>
        <option value="">All Departments</option>
        {
        Departments &&
        Departments.map(docs=>(
        <option value={docs.department} key={docs.department}> {docs.department} </option>
        ))
        }
        </select>
       </div>
       {
          !user.auth_level ?
       <div>
       <button className="btn p-text" onClick={()=>setrender("requests")}>Show all</button>
          <button className="btn primaryBtn" onClick={()=>setrender("plan")}>Request Leave</button>
       </div>
       :""
       }
        </div>
        <div className="section" >
          {
            render === "requests" ?
            <div className=' padding'>
              {
                type === "officers" ?
<div className="card tableContainer">
            <table className="table" id='records'>
                <thead>
                <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>program</th>
                  <th>Institution</th>
                  <th>Resumption Date</th>
                  <th>Memo</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>status</th>
              {
                canUserApprove ?
                <th>Approve/Declined</th>
                :""
              }
                </thead>
                <tbody>
                  {
                    docs ?
                    docs.filter(filt=>{
                    if(filter === "" ){
                      return docs
                    }
               
                    else if(filter === "approved" && filt.approval){
                      return filt
                    }
                    else if(filter === "disapproved" && !filt.approval  && !filt.isPending){
                      return filt
                    }
                    else if(filter === "pending" && filt.isPending ){
                        return filt
                      }
                   }).filter(dFilt=>{
                   if(department === ""){
                    return docs
                   }else{
                    if(department === dFilt.staffDetails.department){
                      return dFilt
                    }
                   }
                   })
                   .map(doc=>(
                    
                    <tr key={doc._id}>
                      <td>{doc.staffDetails.staffId}</td>
                      <td>{doc.staffDetails.firstname + doc.staffDetails.middleName + doc.staffDetails.lastName}</td>
                      <td>{doc.staffDetails.department}</td>
                      <td>{doc.staffDetails.section ? doc.staffDetails.section : "-"}</td>
                      <td>{doc.program_study}</td>
                      <td>{doc.institution}</td>
                      <td>{doc.resumption_date}</td>
                      <td>{doc.memo}</td>
                      <td>{doc.start_date}</td>
                      <td>{doc.end_date}</td>
                      <td>{
                      doc.approval ? 
                      <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                        approved</span> 
                        : 
                        !doc.approval && !doc.isPending? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                        Disapproved
                        </span> :
                        doc.isPending ? 
                        <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                        Pending
                        </span>  : ""
                      }

                          
                        </td>
                    {
                      canUserApprove  && doc.isPending  ? 
                      <td>
                      <button className='btn p-text text-small' onClick={()=>{
                        setuserDoc(doc)
                        setOpen(true)
                      }}>
                        options
                      </button>
                    </td>
                    : <td  className='text-center'>-</td>
                    }
                    </tr>
                   ))
                   :""
                  }
                </tbody>
              </table>
            </div>
            :
            <div className="card tableContainer">
            <table className="table" id='records'>
                <thead>
                <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>program</th>
                  <th>Institution</th>
                  <th>Resumption Date</th>
                  <th>Memo</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>status</th>
              {
                isCeo ?
                <th>Approve/Declined</th>
                :""
              }
                </thead>
                <tbody>
                  {
                    directorDocs ?
                    directorDocs.filter(filt=>{
                    if(filter === "" ){
                      return docs
                    }
               
                    else if(filter === "approved" && filt.approval){
                      return filt
                    }
                    else if(filter === "disapproved" && !filt.approval  && !filt.isPending){
                      return filt
                    }
                    else if(filter === "pending" && filt.isPending ){
                        return filt
                      }
                   }).filter(dFilt=>{
                   if(department === ""){
                    return docs
                   }else{
                    if(department === dFilt.staffDetails.department){
                      return dFilt
                    }
                   }
                   })
                   .map(doc=>(
                    
                    <tr key={doc._id}>
                      <td>{doc.staffDetails.staffId}</td>
                      <td>{doc.staffDetails.firstname + doc.staffDetails.middleName + doc.staffDetails.lastName}</td>
                      <td>{doc.staffDetails.department}</td>
                      <td>{doc.staffDetails.section ? doc.staffDetails.section : "-"}</td>
                      <td>{doc.program_study}</td>
                      <td>{doc.institution}</td>
                      <td>{doc.resumption_date.toString().split("-").reverse().join("-")}</td>
                      <td>{doc.memo}</td>
                      <td>{doc.start_date.toString().split("-").reverse().join("-")}</td>
                      <td>{doc.end_date.toString().split("-").reverse().join("-")}</td>
                      <td>{
               doc.ceoApproval   ? 
               <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                 approved
               </span> 
                 : 
                 !doc.ceoApproval && !doc.isPendingCEO ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                 Disapproved
                 </span> :
                 doc.isPendingCEO ? 
                 <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                 Pending
                 </span>  : ""
                      }

                          
                        </td>
                    {
                      isCeo ? 
                      <td>
                      <button className='btn p-text text-small' onClick={()=>{
                        setuserDoc(doc)
                        setOpen(true)
                      }}>
                        options
                      </button>
                    </td>
                    : <td  className='text-center'>-</td>
                    }
                    </tr>
                   ))
                   :""
                  }
                </tbody>
              </table>
            </div>
              }
            
  </div>
  :       <div className=''>
   
  <form ref={form} className="formModal">
    <span className="closeForm"onClick={()=>setrender("requests")}>
      <i className="lni lni-close" ></i>
    </span>
  <div className="row card white">
  <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="number" 
                        label="Number of days required (Max of 10 days)" 
                        fullWidth
                        name='number_of_days'
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' type="text" name='officer_taking_over' label="Officer taking over" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className='text-bold'>Start Date</div>
                        <TextField variant='outlined' name='start_date' type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className='text-bold'>End Date</div>
                        <TextField variant='outlined' name='end_date' type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <div className='text-bold'>Resumption Date</div>
                        <TextField variant='outlined' name='resumption_date' type="date" fullWidth/>
                    </div>
                       
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Institution" 
                        fullWidth
                        name='institution'
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Program of study" 
                        name='program_of_study'
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <TextField name='memo' variant='outlined' type="text" label="memo" multiline rows={3} fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                         {/* Submit btn */}
<button className="btn success full-width text-white" onClick={handleRequest}>
Submit  <i className="icon-paper-plane"></i>
</button>
                    </div>
</div>
  </form>


</div>

          }
   



        </div>
    </div>
  )
 }else{
  return <Nav />
 }
}
