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
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
import Departments from "../../data/departments"
import { TextField, MenuItem } from '@mui/material';
import Loader from '../../components/loader';
import Header from '../../components/Header';
import  Button  from 'funuicss/ui/button/Button';
import Text from 'funuicss/ui/text/Text';
import Input from 'funuicss/ui/input/Input';

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
  const [remaining, setremaining] = useState(0)
  const [referred, setreferred] = useState(0)
  const [days, setdays] = useState(0)
  const [loading, setloading] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [directorDocs, setdirectorDocs] = useState(null)
  const [isCeo, setisCeo] = useState(false)
  const [isDirector, setisDirector] = useState(false)
  const [type, settype] = useState("officers")
  useEffect(() => {
    // const remaining = document.querySelector("#remaining")
    // remaining.value = parseInt(days) + parseInt(referred)
    setremaining(parseInt(days) + parseInt(referred))
},[referred , days])

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
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
e.preventDefault()
const current = form.current
const id = user._id
const number_of_days = current["days"].value
const leave_address = current["leaveaddress"].value
const home_address = current["homeaddress"].value
const date_of_leave = current["dateofleave"].value
const days_referred_on_leave = current["daysreferredonleave"].value
const days_remaining = current["daysremaining"].value 
const days_requested = current["daysrequested"].value
const officer_taking_over = current["officertakingover"].value
const resumption_date = current["resumedate"].value

const Doc = {
    number_of_days:number_of_days,
homeAddress:home_address,
leaveAddress:leave_address,
deferredDays:days_referred_on_leave,
numberRequested:days_requested,
date_of_leave: date_of_leave,
number_of_days_on_leave:days_remaining,
officerTakingover:officer_taking_over,
resumptionDate: resumption_date,
staffDetails_id:user._id,
sectionheadApproval:false,
divisionalheadApproval:false,
hrdApproval:false,
isPendingDH:true,
isPendingSH:true,
isPendingHR:true
}
setOpen(false)
if( leave_address && home_address && date_of_leave && days_referred_on_leave && days_requested && officer_taking_over && resumption_date){
setloading(true)
Axios.post(endPoint + "/annualleave/register" , Doc , {
    headers:{ authorization:`Bearer ${token}`}
}).then(()=>{
    setloading(false)
    setsuccess("Request made successfully")
      setdocs(null)
      setrender("requests")
})
}else{
setloading(false)
setmessage("Make sure to enter all details")
setrender("requests")
}

}
useEffect(() => {
  if(!docs && user){
  Axios.get(endPoint  + "/annualleave/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
//      const getDocs = dataDocs.data.annualleave
//    new Promise((resolve, reject) => {
// resolve(getDocs)
//    }).then((getdoc)=>{
//     setdocs(
//       getdoc.filter(doc=> doc.staffDetails.position != "Director" && doc.staffDetails.position != "Deputy Director")
//       )
//       setdirectorDocs(
//         getdoc.filter(doc=>doc.staffDetails.position === "Director" || doc.staffDetails.position === "Deputy Director")
//       )
//    })
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
      Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {ceoApproval:true, isPendingCEO:false} , {
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
        Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {hrdApproval:true, isPendingHR:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{

            Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
              status: userDoc.divisionalheadApproval && userDoc.sectionheadApproval ? "leave" : "post"

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
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
      
    }else if(user.position === "Sectional Head" && userDoc.isPendingSH){
        Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {sectionheadApproval:true, isPendingSH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
              status: userDoc.hrdApproval && userDoc.divisionalheadApproval ? "leave" : "post"

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
      
          }).catch(err=>{
            setmessage(err.message)
            setOpen(false)
          })
    }else if(user.position === "Director" && userDoc.isPendingDH){
        Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {divisionalheadApproval:true, isPendingDH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            Axios.patch(endPoint + "/staff/updatestaff/" + userDoc.staffDetails._id,{
              status: userDoc.hrdApproval && userDoc.sectionheadApproval ? "leave" : "post"

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
    }


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
      Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {ceoApproval:false, isPendingCEO:false} , {
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
        Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {hrdApproval:false, isPendingHR:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your Annual Leave request have been disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
        Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {sectionheadApproval:false, isPendingSH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your Annual Leave request have been Disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
        Axios.patch(endPoint + "/annualleave/update/" +  userDoc._id , {divisionalheadApproval:false, isPendingDH:false} , {
            headers:{
              authorization:`Bearer ${token}`
            }
          }).then(()=>{
            const location = window.location.href
            Axios.post(endPoint + "/notification",{
              sender_id:user._id,
              message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your Annual Leave request have been Disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
        {
            loading ?
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
        <Nav active={4}/>
        <Header sub_dir={"Leave Requests" } sub_dir_route={"/leave/requests"} title={"Annual Leave"} sub_title={"Request and manage your annual leave."}/>
        {/* {
          !isAdmin ? */}
          <div className='row-flex fit padding-top-30' style={{justifyContent:"flex-end"}}>
          <Button bg="primary" raised onClick={()=>{
            setrender("plan")
            setOpen(true)
          }}>Request Leave</Button>
          <Button  raised bg='dark200' onClick={()=>setrender("requests")}>Show all</Button>

        </div>
  
        <div className="section" >
          {
            render === "requests" ?
            <div className=' padding'>
              {
                type === "officers" ?
                <div className="card tableContainer">
                <table className="table text-small" id='records'>
                  <thead>
                  <th className=''>Staff ID</th>
                    <th className=''>Full Name</th>
                    <th className=''>Department</th>
                    <th className=''>Section</th>
                 
                    <th className=''>Leave Address</th>
                    <th className=''>Days Requested</th>
                    <th className=''>Officer Taking Over</th>
                    <th className=''>Resumption Date</th>
                    {
                      user.position != "Government Statistician (CEO)" ?
                      <>
                     <th className=''>Sectional Approval</th>
                    <th className=''>Divisional Approval</th>
                    <th className=''>HR Approval</th>
                      </>
                      :
                     <>
                      {
                        user.position === "Director" || user.position === "Government Statistician (CEO)" ?
                        <th className=''>CEO Approval</th>
                        : ""
                      }  
                     </>
                    }
    
            
                {
                  canUserApprove ?
                  <th className=''>Approve/Declined</th>
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
                      else if(filter === "approved" && filt.hrdApproval && filt.sectionheadApproval && filt.divisionalheadApproval){
                        return filt
                      }
                      else if(filter === "disapproved"  && !filt.hrdApproval && !filt.sectionheadApproval && !filt.divisionalheadApproval){
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
                        {/* <td>{doc.start_date}</td>
                        <td>{doc.end_date}</td> */}
                        <td>{doc.homeAddress}</td>
                        <td>{doc.leaveAddress}</td>
                        <td>{doc.numberRequested}</td>
                        <td>{doc.officerTakingover}</td>
                        <td>{doc.resumptionDate.toString().split("-").reverse().join("-")}</td>
                          {
                            user.position != "Government Statistician (CEO)" ?
                            <>
                                  <td>
                          {
                        doc.sectionheadApproval   ? 
                        <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                          approved
                        </span> 
                          : 
                          !doc.sectionheadApproval && !doc.isPendingSH ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                          Disapproved
                          </span> :
                          doc.isPendingSH ? 
                          <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                          Pending
                          </span>  : ""
                        }</td>
                        <td>{
                        doc.divisionalheadApproval ? 
                        <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                          approved</span> 
                          : 
                          !doc.divisionalheadApproval && !doc.isPendingDH ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                          Disapproved
                          </span> :
                          doc.isPendingDH ? 
                          <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                          Pending
                          </span>  : ""
                        }</td>
                        <td>{
                        doc.hrdApproval ? 
                        <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                          approved</span> 
                          : 
                          !doc.hrdApproval && !doc.isPendingHR ? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                          Disapproved
                          </span> :
                          doc.isPendingHR  || doc.staffDetails.position != "Director" || doc.staffDetails.position != "Deputy Gov Statistician (DGS)" ?  
                          <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                          Pending
                          </span>  : "-"
                        }
                        </td>
                            </>
                            :
                            <>
                            
                            </>
                          }
                      
                      {
                        canUserApprove && isAdmin ?
                        //  && doc.isPendingHR || doc.isPendingDH || doc.isPendingSH ? 
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
              <>
              {
                directorDocs ?
                <div className="card section tableContainer">
       <table className="table text-small" id='records'>
                  <thead>
                  <th className=''>Staff ID</th>
                    <th className=''>Full Name</th>
                    <th className=''>Department</th>
                    <th className=''>Section</th>
                    <th className=''>Leave Address</th>
                    <th className=''>Days Requested</th>
                    <th className=''>Officer Taking Over</th>
                    <th className=''>Resumption Date</th>
                    <th className=''>CEO Approval</th>
                  <th className=''>Approve/Declined</th>
                  </thead>
                  <tbody>
                    {
                      directorDocs ?
                      directorDocs.filter(dFilt=>{
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
                        {/* <td>{doc.start_date}</td>
                        <td>{doc.end_date}</td> */}
                        <td>{doc.homeAddress}</td>
                        <td>{doc.leaveAddress}</td>
                        <td>{doc.numberRequested}</td>
                        <td>{doc.officerTakingover}</td>
                        <td>{doc.resumptionDate.toString().split("-").reverse().join("-")}</td>
                       
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
                        //  && doc.isPendingHR || doc.isPendingDH || doc.isPendingSH ? 
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
                :<></>
              }
              </>
              }
      
  </div>
  :  <div>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
           <Text text='Annual Leave' light />
           <Text text='Make sure to enter all details correctly' size='small' block  />
            
            </DialogTitle>
        <DialogContent>
 
            <div className="">
           <form ref={form}>
           <div className="row">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <Input fullWidth type="text" name='days' defaultValue={36} disabled onChange={(e)=>setdays(e.target.value)} variant="outlined" label='Number Of Days' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <Input fullWidth type="text" name='leaveaddress' variant="outlined" label='Leave Address' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <Input fullWidth type="text" name='homeaddress' variant="outlined" label='Home Address' />
                    </div>
                 
                    <div className="col sm-12 md-6 lg-6 padding">
                        <Input fullWidth type="text" name='daysreferredonleave' onChange={(e)=>setreferred(e.target.value)} variant="outlined" label='Days referred On Last Year' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <Text text='Date Of Leave' size='small' italic bold/>
                        <Input autoFocus fullWidth type="date" name='dateofleave' variant="standard" />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <Text text='Number Of days Remaining' size='small' italic bold/>
                        <Input fullWidth type="number"
                         value={parseInt(user.no_of_leave_days)} disabled autoFocus id='remaining' name='daysremaining' variant="outlined"  />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <Input fullWidth type="text" name='daysrequested' variant="outlined" label='Number Of days Requested' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <Input fullWidth type="text" name='officertakingover' variant="outlined" label='Officer Taking Over' />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <Text text='Resumption date' size='small' italic bold/>
                        <Input fullWidth type="date" name='resumedate' />
                    </div>
                </div>
           </form>
            </div>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={()=>setrender("requests")}>Cancel</Button>
          <Button bg='primary' raised small rounded onClick={handleRequest}> Submit Request</Button>

        </DialogActions>
      </Dialog>

  </div>

          }
   
   

        </div>
    </div>
  )
 }else{
  return <Nav />
 }
}
