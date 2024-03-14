import Link from 'next/link'
import Nav from './../../components/Nav';
import { useState , useEffect} from 'react';
import regions from '../../data/regions';
import Loader from '../../components/loader';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
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
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
import DataTable from './../../components/DataTable';

export default function Reports() {
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
    const [current, setcurrent] = useState(null)
    const [currentId, setcurrentId] = useState("")
    const [userStatus, setuserStatus] = useState("")
    const [docs, setdocs] = useState(null)
const [dropdown, setdropdown] = useState(0)
const [exportTrigger, setexportTrigger] = useState(false)
const [report, setreport] = useState("all")
const [startDate, setstartDate] = useState("")
const [endDate, setendDate] = useState("")
    const handleClose = () => {
      setOpen(false);
    };
  
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
    const handlePrint = ()=>{
        new Promise((resolve, reject) => {
            setprint(true)
            resolve()
        }).then(()=>{
            setdropdown(0)
            window.print()
            setprint(false)

        })
   
    }

    const filter = ()=>{
        data.filter(docs=>{
            if(search === ""){
                return data;
            }
            else if(
                search.toString().trim().toLowerCase().includes(docs.post.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.directorate.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.section.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.leave.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.onField.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.onPost.toString().trim().toLowerCase().slice(0, search.length))
                ){
                    return docs;
            }
        })
    }

useEffect(() => {
if(!docs && user){
Axios.get(endPoint  + "/staff/showall" , {
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(dataDocs=>{
   const getDocs = dataDocs.data.staff
   setdocs(getDocs.filter(filt=>{
    if(user.position === "Government Statistician (CEO)"
     || user.position === "Deputy Gov Statistician (DGS)"
      || user.department === "Human Resource"
     || user.department.trim() + user.position.trim() === "AdministrationDirector"
      ){
       return getDocs
   }else if(user.position === "Director" || user.position === "Deputy Director" ){
       if(filt.department === user.department){
           return filt
       }
   }else if(user.position === "Sectional Head"){
           if(filt.section === user.section){
             return filt
           }
   }else if(user.position === "Unit Head"){
       if(filt.section === user.unit){
         return filt
       }
   }else{
    getDocs.filter(filt =>{
           if(filt.staffId === user.staffId){
               setdocs(filt)
           }
       }) 
   }
 }))
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

const exportExcel = ()=>{
new Promise((resolve, reject) => {
  setexportTrigger(true)
  resolve()
}).then(()=>{
  setexportTrigger(false)
  setdropdown(0)
})
}

const TriggerDrop = ()=>{
    if(dropdown === 0){
      setdropdown(300)
    }else{
      setdropdown(0)
    }
  }

  const Columns = [
    {
        id:"d1",
        name:"Directorate"
    },
    {
        id:"d2",
        name:"Section"
    },
    {
        id:"d3",
        name:"Position"
    }
    ,
    {
        id:"d4",
        name:"Grade"
    }
    ,
    {
        id:"d5",
        name:"Employment Status"
    }
    ,
    {
        id:"d6",
        name:"Appointment Date"
    }
    ,
    {
        id:"d7",
        name:"Salary Level"
    }
    ,
    {
        id:"d8",
        name:"Education"
    }
    ,
    {
        id:"d9",
        name:"Retirement"
    }
    ,
    {
        id:"d10",
        name:"Contact"
    }
    ,
    {
        id:"d11",
        name:"Marital Status"
    }
    ,
    {
        id:"d12",
        name:"Status"
    }
    ,
    {
        id:"d13",
        name:"Promotion"
    }
]

if(user){
  return (
    <div className={print ? "" : "content"}>

        <Excel Trigger = {exportTrigger} />
   

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Status for {current ?  current.surname + " " + current.middleName + " " + current.firstName  : ""}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the users status.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            select
            id="name"
            label="Select user status"
            type="email"
            defaultValue={current ? current.status : ""}
            fullWidth
            onChange={(e)=>setuserStatus(e.target.value)}
            variant="outlined"
          >
         <option value="leave">On Leave</option>
                    <option value="field">On Field</option>
                    <option value="post">On Post</option>
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={Edit}>Make Changes</Button>
        </DialogActions>
      </Dialog>
        {
        loading ? 
        <Loader />
        : ""
        }
        {
            !print ?
            <Nav />
            : ""
        } 

        <div className="">
        {
            !print ?
            <div>
                <div className= 'section padding-bottom-30'>
           <div className="white padding round-edge">
         <div className="row-flex">
            <div>
                <img src="/reports.svg" className='width-100' alt="" />
            </div>
            <div>
            <div className="h1">General Staff Reports</div>
         <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Staff Reports</Link>
                </div>
            </div>
         </div>
           </div>
        </div>

                
            </div>
            :""}

          <div className="card" style={{padding:"0"}}>
          <DataTable Docs={docs ? docs : []} Columns={Columns}/>
          </div>
     
        </div>
    </div>
  )
}else{
    return <Nav />
}
}
