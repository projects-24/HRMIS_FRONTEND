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

export default function Reuest() {
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
  const [isAdmin, setisAdmin] = useState(false)
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
    }else{
      setcanUserApprove(false)
    }
    if(sessionStorage.getItem("userMode")){
      if(JSON.parse(sessionStorage.getItem("userMode")) === "admin"){
  setisAdmin(true)
      }else{
        setisAdmin(false)
      }
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
const handlePlaning = (e)=>{
e.preventDefault()
const current = form.current
const id = user._id
const start_date = current["startdate"].value
const end_date = current["enddate"].value
const project_name = current["project"].value
const coordinator = current["coordinator"].value

const data = {
  staffDetails_id:id,
  start_date:start_date,
  end_date:end_date,
  projectName:project_name,
  projectCoordinator:coordinator,

}

if(start_date && end_date && project_name && coordinator){
Axios.post(endPoint + "/fieldrequest/register" , data , {
  headers:{
    authorization:`Bearer ${token}`
  }
}).then(()=>{
  setdocs(null)
  setrender("requests")
  setsuccess("Request made successfully")
  document.querySelector("#startDate").value = ""
  document.querySelector("#endDate").value = ""
  document.querySelector("#leaveType").value = ""
  document.querySelector("#project").value = ""
  document.querySelector("#coorodinator").value = ""

}).catch(err=>setmessage(err.message))
}else{
  setmessage("Make sure to enter all compulsory fields")
  clearTimeout()
}
}
useEffect(() => {
  if(!docs){
  Axios.get(endPoint  + "/fieldrequest/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
     const getDocs = dataDocs.data.fieldrequest
     setdocs(getDocs.filter(filt=>{
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
     }else{
      if(filt.staffDetails._id === user._id){
        return filt
      }
     }
   }))

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
    Axios.patch(endPoint + "/fieldrequest/update/" +  userDoc._id , {approval:true , isPending:false} , {
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then(()=>{
      const location = window.location.href
      Axios.post(endPoint + "/notification",{
        sender_id:user._id,
        message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your field request have been approved successfully by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
          status:"field"
        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        } )
        setsuccess("Approved successfully")
        setOpen(false)
        setdocs(null)
      })

    }).catch(err=>{
      setmessage(err.message)
      setOpen(false)
    })
  }
  const disApproved = ()=>{
    Axios.patch(endPoint + "/fieldrequest/update/" +  userDoc._id , {approval:false, isPending:false} , {
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then(()=>{
      const location = window.location.href
      Axios.post(endPoint + "/notification",{
        sender_id:user._id,
        message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your field request have been disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
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
          status:"post"
        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        } )
        setsuccess("disapproved")
        setOpen(false)
        setdocs(null)
      })

    }).catch(err=>{
      setmessage(err.message)
      setOpen(false)
    })
  }

 if(user){
  return (
    <div className='content'>

{
  userDoc ?
  <Dialog open={open} onClose={handleClose}>
  <DialogContent>
    <div className="text-center section">
      <img src="/question.svg" className='width-200' alt="" />
    </div>
    <div className='section text-bold'>
      Do your want to approve request for <span className="p-text"> {userDoc.staffDetails.firstname + " " + userDoc.staffDetails.middleName + " " +  userDoc.staffDetails.lastName}</span>
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
                Field Request
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Field Request</Link>

                </div>
            </div>
        </div>
     </div>
        {
          // !isAdmin ?
        <div className='row-flex fit padding-top-30' style={{justifyContent:"flex-end"}}>
          <button className="button light" onClick={()=>setrender("requests")}>Show all</button>
          <button className="button primary" onClick={()=>setrender("plan")}>Make Request</button>
        </div>
        // :""
        }
        {/* <div className="section padding row-flex">
       <div>
       <div className="minSection text-bold">Select status</div>
          <select name="" id="" className='input _card white' onChange={(e)=>setfilter(e.target.value)}>
            <option value="">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="disapproved">Disapproved</option>
          </select>
       </div>
        </div> */}
        <div className="section" >
          {
            render === "requests" ?
            <div className=' padding'>
            <div className="_card tableContainer">
              <table className="table" >
                <thead>
                <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>project name</th>
                  <th>project coordinator</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  {/* <th>status</th> */}
                  {/* {
                    canUserApprove ? <th>Approve/Declined</th> : ""
                  } */}
                </thead>
                <tbody>
                  {
                    docs ?
                    docs.filter(filt=>{
                    if(filter === ""){
                      return docs
                    }
                    else if(filter === "pending" && filt.isPending){
                      return filt
                    }
                    else if(filter === "approved" && filt.approval){
                      return filt
                    }
                    else if(filter === "disapproved" && !filt.approval){
                      return filt
                    }
                   })
                   .map(doc=>(
                    
                    <tr key={doc._id}>
                      <td>{doc.staffDetails.staffId}</td>
                      <td>{doc.staffDetails.firstname + doc.staffDetails.middleName + doc.staffDetails.lastName}</td>
                      <td>{doc.staffDetails.department}</td>
                      <td>{doc.staffDetails.section}</td>
                      <td>{doc.projectName}</td>
                      <td>{doc.projectCoordinator}</td>
                      <td>{doc.start_date}</td>
                      <td>{doc.end_date}</td>
                      {/* <td>{
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
                        </td> */}
                     {
                    //   canUserApprove && doc.isPending ?
                    //   <td>
                    //   <button className='btn p-text text-small' onClick={()=>{
                    //     setuserDoc(doc)
                    //     setOpen(true)
                    //   }}>
                    //     options
                    //   </button>
                    // </td>
                    // :<td  className='text-center'>-</td>
                     }
                    </tr>
                   ))
                   :""
                  }
                </tbody>
              </table>
            </div>
  </div>
  :       <div className=''>
   
  <form ref={form} className="">
  <div className="row">
      <div className="col sm-6 lg-6 md-6 padding">
      <div className="_card fit">
      <div className="text-bold minSection">Proposed Start Date</div>
      <input type="date" id='startDate' className='input full-width borderedInput' name='startdate' />
  </div>
      </div>
      <div className="col sm-6 lg-6 md-6 padding">
      <div className="_card fit">
      <div className="text-bold minSection">Proposed End Date</div>
      <input type="date" id='endDate' className='input full-width borderedInput' name='enddate' />
  </div>
      </div>
      <div className=" col sm-12 md-12 lg-12 padding">
    <div className="_card">
      <div className="h4 padding">Personal details</div>
      <div className="row">
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Staff ID</div>
          <input type="text" name='staffId' disabled className='input full-width borderedInput' defaultValue={user.staffId} placeholder='Staff ID'/>
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Full Name</div>
          <input type="text" name='fullname' disabled className='input full-width borderedInput' defaultValue={user.firstname + " " + user.middleName + " " + user.lastName} placeholder='Staff ID'/>
        </div>
      </div>
    </div>
      </div>
      <div className=" col sm-12 md-6 lg-6 padding">
    <div className="_card">
      <div className="h4 padding">Department Details</div>
      <div className="row">
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Department</div>
          <input type="text" name='department' disabled className='input full-width borderedInput' defaultValue={user.department}/>
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Section</div>
          <input type="text" name='section' disabled className='input full-width borderedInput' defaultValue={user.section} />
        </div>
      </div>
    </div>
      </div>
      <div className=" col sm-12 md-6 lg-6 padding">
    <div className="_card">
      <div className="h4 padding">Project Details</div>
      <div className="row">
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Project Name</div>
          <input id='project' type="text" name='project' placeholder='Enter project name' className='input full-width borderedInput' />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Project Coordinator</div>
          <input id='coordinator' type="text" name='coordinator' placeholder='Enter project coordinator' className='input full-width borderedInput' />
        </div>
      </div>
    </div>
      </div>
</div>
  </form>

 {/* Submit btn */}
 <button className="button gradient submitNewstaff" onClick={handlePlaning}>
        Submit  <i className="icon-paper-plane"></i>
        </button>
</div>

          }
   



        </div>
    </div>
  )
 }else{
  return <></>
 }
}
