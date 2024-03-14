import Link from 'next/link'
import Nav from './../../components/Nav';
import { useState , useEffect} from 'react';
import regions from '../../data/regions';
import Loader from '../../components/loader';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Departments from "../../data/departments"
import Sections from "../../data/sections"
import TextField  from '@mui/material/TextField';
import  MenuItem  from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Annual from './annual';
import Header from './../../components/Header';
import Text from 'funuicss/ui/text/Text';
import { GetToken } from '../../components/Functions';
export default function Profiling() {
    const [search, setsearch] = useState("")
    const [inputData, setinputData] = useState("")
    const [print, setprint] = useState(false)
    const [leave, setleave] = useState(false)
    const [loading, setloading] = useState(false)
    const [directorate, setdirectorate] = useState("")
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    const [department, setdepartment] = useState("")
    const [section, setsection] = useState("")
    const [status, setstatus] = useState("")
    const [employment, setemployment] = useState("")
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [current, setcurrent] = useState(null)
    const [currentId, setcurrentId] = useState("")
    const [userStatus, setuserStatus] = useState("")
    const [docs, setdocs] = useState(null)
    const [leaveType, setleaveType] = useState("")

    const handleClose = () => {
      setOpen(false);
      setOpen2(false);
    };
  
    useEffect(() => {
      if(!token){
         GetToken()
         .then(res => {
          setuser(res.user)
          settoken(res.token)
         })
      }
        })
    const handlePrint = ()=>{
        new Promise((resolve, reject) => {
            setprint(true)
            resolve()
        }).then(()=>{
            window.print()
            setprint(false)
        })
   
    }


useEffect(() => {
if(!docs){
Axios.get(endPoint  + "/annualleave/showall" , {
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(dataDocs=>{
   const getDocs = dataDocs.data.annualleave
   setdocs(getDocs)
   console.log(getDocs)
}).catch(err=>console.log(err.message))
}
})
    
const handleSearch = ()=>{
    setsearch(inputData)
}


const handleStatus = (doc)=>{
    setcurrent(doc)
    setcurrentId(doc._id)
    setOpen(true);
}

const Edit = ()=>{
    Axios.patch(endPoint + "/staff/updatestaff/" + currentId,
    {status:userStatus},
    {
     headers: {
          authorization: `Bearer ${token}`,
        
       }
        
    }
    ).then(()=>{
       alert("successfully updated")
       setOpen(false)
       setdocs(null)
   }).catch(err=>{
       alert(err.message)
       setOpen(false)

   })
}

const divHead = (doc)=>{
  setloading(true)
  Axios.patch(endPoint + "/annualleave/update/" + doc._id , {divisionalheadApproval: true},
  {
    headers:{
      authorization:`Bearer ${token}`
    }
  }
  )
.then(()=>{
alert("Success")
setloading(false)
setdocs(null)

}).catch(err=>{
  alert(err.message)
  setloading(false)  
})
}
const handleLeave = (e)=>{
  const val =  e.target.value
  setleaveType(val)
//  switch (val) {
//   case "annual":
//     window.location.assign("/leave/annual")
//     break;
 
//   case "maternity":
//     window.location.assign("/leave/maternity")
//     break;
 
//   case "study":
//     window.location.assign("/leave/study")
//     break;
 
//   case "casual":
//     window.location.assign("/leave/casual")
//     break;
 
//   default:
//     break;
//  }
}
  if(user){
    return (
      <div className={"content"}>
        <Nav active={4}/>
       <div>
       <Header title={"Leave Requests"} sub_title={"Create and manage leave requests."}/>
       </div>
        <div className="m-section">
        <div className=" padding">
              <Text text=' Select your leave Request type' />
        </div>
          <div className="row">
            <div className="col sm-6 md-3 lg-3 padding">
           <Link href="/leave/annual">
           <div className="_card hover-up">
             <div className="row-flex space-between">
              <div>
                <Text
                  text='Request'
                  block
                  />
                  <Text
                  text='Annual'
                  heading='h4'
                  lighter
                  color='dark300'
                  />
              </div>
              <div>
              <i className="lni lni-chevron-right p-text"></i>
              </div>
             </div>
              </div>
           </Link>
            </div>
            <div className="col sm-6 md-3 lg-3 padding">
           <Link href="/leave/annual">
           <div className="_card hover-up">
             <div className="row-flex space-between">
              <div>
         
                <Text
                  text='Request'
                  block
                  />
                  <Text
                  text='Casual'
                  heading='h4'
                  lighter
                  color='dark300'
                  />
              </div>
              <div>
              <i className="lni lni-chevron-right p-text"></i>
              </div>
             </div>
              </div>
           </Link>
            </div>
            <div className="col sm-6 md-3 lg-3 padding">
           <Link href="/leave/annual">
           <div className="_card hover-up">
             <div className="row-flex space-between">
              <div>
            
                <Text
                  text='Request'
                  block
                  />
                  <Text
                  text='Maternity'
                  heading='h4'
                  lighter
                  color='dark300'
                  />
              </div>
              <div>
              <i className="lni lni-chevron-right p-text"></i>
              </div>
             </div>
              </div>
           </Link>
            </div>
            <div className="col sm-6 md-3 lg-3 padding">
           <Link href="/leave/annual">
           <div className="_card hover-up">
             <div className="row-flex space-between">
              <div>
              <Text
                  text='Request'
                  block
                  />
                  <Text
                  text='Study'
                  heading='h4'
                  lighter
                  color='dark300'
                  />
              </div>
              <div>
              <i className="lni lni-chevron-right p-text"></i>
              </div>
             </div>
              </div>
           </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }else{

    return <Nav />
  }
}
