
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
  const [isAdmin, setisAdmin] = useState(false)
  const [directorDocs, setdirectorDocs] = useState(null)
  const [isCeo, setisCeo] = useState(false)
  const [isDirector, setisDirector] = useState(false)
  const [type, settype] = useState("officers")

  useEffect(() => {
  if(user && !canUserApprove){
    if(user.position === "Deputy Director" ||
      user.position === "Government Statistician (CEO)"
      || user.position === "Deputy Gov Statistician (DGS)" ||
      user.position === "Director" ||
      user.position === "Deputy Director" ||
      user.position === "Sectional Head"
      ){
      setcanUserApprove(true)
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
const date_of_delivery = current["dateofdelivery"].value
const type_of_birth = current["typeofbirth"].value
const officer_taking_over = current["officertakingover"].value
const start_date = current["startdate"].value
const end_date = current["enddate"].value
const memo = current["memo"].value

const data = {
    date_of_delivery:date_of_delivery,
    type_of_birth:type_of_birth,
    officer_taking_over:officer_taking_over,
  start_date:start_date,
  end_date:end_date,
  memo:memo,
  staffDetails_id:user._id,
  section_approval:false,
  divisional_approval:false,
  hrd_approval:false,
  isPendingHR:true,
  isPendingDH:true,
  isPendingSH:true
}
var locale = "en-us";
var today = new Date();
var day = today.getDate();
var fullDay = ("0" + day).slice(-2);
var longMonth = today.toLocaleString(locale, { month: "long" });
var year = today.getFullYear();
const fullDate = longMonth + " " + fullDay + ", " + year

if(start_date && end_date &&  type_of_birth && officer_taking_over && date_of_delivery){
Axios.post(endPoint + "/maternityleave/register" , data , {
  headers:{
    authorization:`Bearer ${token}`
  }
}).then(()=>{
  const location = window.location.href
  Axios.post(endPoint + "/notification",{
    sender_id:user._id,
    message:`Request made by ${user.firstname} ${user.middleName} ${user.lastName} for a Maternity Leave, click on the link below to verify or disapprove request`,
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
  })
}).catch(err=>setmessage(err.message))
}else{
  setmessage("Make sure to enter all compulsory fields")
  clearTimeout()
}
}
useEffect(() => {
  if(!docs && user){
  Axios.get(endPoint  + "/maternityleave/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
     const getDocs = dataDocs.data.results
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
    setOpen(false)
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    if(userDoc.staffDetails.position === "Director" || userDoc.staffDetails.position === "Deputy Director"){
      Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {ceoApproval:true, isPendingCEO:false} , {
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
    if(user.department === "Human resource" && userDoc.isPendingHR){
        Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {hrd_approval:true, isPendingHR:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave request have been approved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
                status: userDoc.divisional_approval && userDoc.sectional_approval ? "leave" : "post"
  
              }, {
                headers:{
                  authorization:`Bearer ${token}`
                }
              } 
              )
              setsuccess("Approved successfully")
              setOpen(false)
              setdocs(null)
            })
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
      
    }else if(user.position === "Sectional Head" && userDoc.isPendingSH){
        Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {section_approval:true, isPendingSH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave request have been approved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
                status: userDoc.hrd_approval && userDoc.divisional_approval ? "leave" : "post"
  
              }, {
                headers:{
                  authorization:`Bearer ${token}`
                }
              } 
              )
              setsuccess("Approved successfully")
              setOpen(false)
              setdocs(null)
            })
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
    }else if(user.position === "Director" && userDoc.isPendingDH){
        Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {divisional_approval:true, isPendingDH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave request have been approved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
                status: userDoc.hrd_approval && userDoc.sectional_approval ? "leave" : "post"
  
              }, {
                headers:{
                  authorization:`Bearer ${token}`
                }
              } 
              )
              setsuccess("Approved successfully")
              setOpen(false)
              setdocs(null)
            })
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
    }
}

  }
  const disApproved = ()=>{
    setOpen(false)
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if(userDoc.staffDetails.position === "Director" || userDoc.staffDetails.position === "Deputy Director"){
      Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {ceoApproval:false, isPendingCEO:false} , {
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
          setsuccess("Disapproved successfully")
            setOpen(false)
            setdocs(null)
        })


  
      })
     
    }else{
    if(user.department === "Human resource" && userDoc.isPendingHR){
        Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {hrd_approval:false, isPendingHR:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave request have been disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
                status:"post",
  
              }, {
                headers:{
                  authorization:`Bearer ${token}`
                }
              } )
              setsuccess("Disapproved successfully")
              setOpen(false)
              setdocs(null)
            })
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
      
    }else if(user.position === "Sectional Head" && userDoc.isPendingSH){
        Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {section_approval:false, isPendingSH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave request have been Disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
                status:"post",
  
              }, {
                headers:{
                  authorization:`Bearer ${token}`
                }
              } )
              setsuccess("Disapproved successfully")
              setOpen(false)
              setdocs(null)
            })
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
    }else if(user.position === "Director" && userDoc.isPendingDH){
        Axios.patch(endPoint + "/maternityleave/update/" +  userDoc._id , {divisional_approval:false, isPendingDH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave request have been Disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
                status:"post",
  
              }, {
                headers:{
                  authorization:`Bearer ${token}`
                }
              } )
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
        <div className="row-flex fit white round-edge padding section">
            <img src="/leave.svg" className='width-100-max fit' alt="" />
            <div>
            <div className="h1">
                Maternity Leave
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Maternity Leave</Link>

                </div>
            </div>
        </div>
        {
       
          // && !isAdmin ?
           user.gender === "female" ?
           <div className='row-flex fit padding-top-30' style={{justifyContent:"flex-end"}}>
           <button className="btn p-text" onClick={()=>setrender("requests")}>Show all</button>
           <button className="btn primaryBtn" onClick={()=>setrender("plan")}>Request Leave</button>
         </div>
        : <Alert type="info" funcss="text-bold section" message="Maternity Leave is for females only" />
        }
        <div className="section padding row-flex">
       {/* <div>
       <div className="minSection text-bold">Select status</div>
          <select name="" id="" className='input white' onChange={(e)=>setfilter(e.target.value)}>
            <option value="">All</option>
            <option value="approved">All Approved</option>
            <option value="pending">Pending</option>
            <option value="disapproved">Disapproved</option>
          </select>
       </div> */}
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
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Memo</th>
                    <th>Sectional Approval</th>
                    <th>Divisional Approval</th>
                    <th>Hr Approval</th>
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
                      else if(filter === "pending" && filt.isPendingHR && filt.isPendingDH && filt.isPendingSH){
                        return filt
                      }
                      else if(filter === "approved" && filt.hrd_approval && filt.sectional_approval && filt.divisional_approval){
                        return filt
                      }
                      else if(filter === "disapproved"  && !filt.hrd_approval && !filt.sectional_approval && !filt.divisional_approval){
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
                        <td>{doc.staffDetails.section}</td>
                        <td>{doc.start_date}</td>
                        <td>{doc.end_date}</td>
                        <td>{doc.memo}</td>
                        <td>
                          {
                        doc.sectional_approval ? 
                        <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                          approved
                        </span> 
                          : 
                          !doc.sectional_approval && !doc.isPendingSH ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                          Disapproved
                          </span> :
                          doc.isPendingSH ? 
                          <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                          Pending
                          </span>  : ""
                        }</td>
                        <td>{
                        doc.divisional_approval ? 
                        <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                          approved</span> 
                          : 
                          !doc.divisional_approval && ! doc.isPendingDH ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                          Disapproved
                          </span> :
                          doc.isPendingDH ? 
                          <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                          Pending
                          </span>  : ""
                        }</td>
                        <td>{
                        doc.hrd_approval ? 
                        <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                          approved</span> 
                          : 
                          !doc.hrd_approval && !doc.isPendingHR ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                          Disapproved
                          </span> :
                          doc.isPendingHR ? 
                          <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                          Pending
                          </span>  : ""
                        }
                        </td>
                    
                         {
                        canUserApprove  && doc.isPendingHR || doc.isPendingDH || doc.isPendingSH ? 
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
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Memo</th>
                  <th>CEO Approval</th>
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
                    else if(filter === "pending" && filt.isPendingHR && filt.isPendingDH && filt.isPendingSH){
                      return filt
                    }
                    else if(filter === "approved" && filt.hrd_approval && filt.sectional_approval && filt.divisional_approval){
                      return filt
                    }
                    else if(filter === "disapproved"  && !filt.hrd_approval && !filt.sectional_approval && !filt.divisional_approval){
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
                      <td>{doc.staffDetails.section}</td>
                      <td>{doc.start_date.toString().split("-").reverse().join("-")}</td>
                      <td>{doc.end_date.toString().split("-").reverse().join("-")}</td>
                      <td>{doc.memo}</td>
                      <td>
                          {
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
                        }</td>
                  
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
  <div className="col sm-12 md-12 lg-12 padding">
<div className='text-bold'>Date of Admission</div>
<TextField variant='outlined' type="date" name="dateofdelivery" fullWidth/>
</div>
<div className="col sm-12 md-6 lg-6 padding">
<TextField variant='outlined' name="typeofbirth" select label="Type of birth" fullWidth>
<MenuItem value="Natural Birth">Natural Birth</MenuItem>
<MenuItem value="Censerian">Censerian</MenuItem>
</TextField>
</div>
<div className="col sm-12 md-6 lg-6 padding">
<TextField variant='outlined' name="officertakingover" type="text" label="Officer taking over" fullWidth/>
</div>
<div className="col sm-12 md-6 lg-6 padding">
<div className='text-bold'>Start Date</div>
<TextField variant='outlined' name="startdate" type="date" fullWidth/>
</div>
<div className="col sm-12 md-6 lg-6 padding">
<div className='text-bold'>End Date</div>
<TextField variant='outlined' name="enddate" type="date" fullWidth/>
</div>
<div className="col sm-12 md-12 lg-12 padding">
<TextField variant='outlined' name="memo" type="text" label="Memo" multiline rows={3} fullWidth/>
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
