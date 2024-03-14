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
import DataGridDemo from '../../components/table';
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
import DataTable from './../../components/DataTable';
import Header from '../../components/Header'
import { GetToken } from '../../components/Functions';
import DeleteModal from '../../components/modal/Delete';
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
    const [current, setcurrent] = useState(null)
    const [currentId, setcurrentId] = useState("")
    const [userStatus, setuserStatus] = useState("")
    const [docs, setdocs] = useState(null)
const [dropdown, setdropdown] = useState(0)
const [exportTrigger, setexportTrigger] = useState(false)
const [report, setreport] = useState("all")
    
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
   GetToken()
   .then(res => {
    setuser(res.user)
    settoken(res.token)
   })
  },[])
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
if(!docs){
Axios.get(endPoint  + "/staff" , {
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(dataDocs=>{
   const getDocs = dataDocs.data
   console.log(getDocs)
   setdocs(getDocs)
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

  // const columns = [
  //   // { field: '_id', headerName: 'ID', width: 90 },
  
  //   {
  //     field: 'staffId',
  //     headerName: 'Staff Id',
  //     width: 150,
      
  //   },
  //      {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstname || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     width: 150,
      
  //   },
  //   {
  //     field: 'department',
  //     headerName: 'Department',
  //     width: 150,
      
  //   },
  //   {
  //     field: 'position',
  //     headerName: 'Position',
  //     width: 150,
      
  //   },
  //   {
  //     field: 'contact',
  //     headerName: 'Contact',
  //     type: 'number',
  //     width: 110,
      
  //   }
 
  // ];

  const columns = [
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
        id:"d10",
        name:"Contact"
    },
    {
        id:"d12",
        name:"Status"
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
            <Nav active={3}/>
            : ""
        }    
        <div className="">
        {
            !print ?
            <div>
                 <Header title={"Staff Profiling"} sub_title={"Create and manage staff records and profiles."}/>
                {
            !print ?
        <div className="row-flex fit space-between m-section">
  
           {
            // user.department === "Human Resource" ?
            <Link href="/form/personal">
            <button className="button raised gradient text-white width-200-min roundEdge" 
            style={{position:"fixed" , 
            bottom:"10px",
            right:"10px",
            zIndex:5
            }}>
            <i className="lni lni-user"></i> New Staff
             </button>
             </Link>
            //  :""
           }
        </div>
        :""
                }
                
            </div>

            :""}
 
           {
            docs ?
            <div className={"_card"} >
  
              <DataTable  hideEmail Docs={docs} Columns={columns}  showColumns={columns} hideInterval action={user.department === "Human Resource" ? {label:"Edit" , action:<button className='button edit'> <i className='bx bx-edit'></i> Edit </button>  } : false}/>
       
           </div>
           : <Loader />
           }
        </div>
    </div>
  )

}else{
  return <Nav />
}
  
}
