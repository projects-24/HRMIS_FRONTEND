import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Nav from '../../components/Nav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DataGridDemo from './../../components/table';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import dynamic from "next/dynamic"
import DataTable from '../../components/DataTable';
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
export default function Management() {
const [user, setuser] = useState("")
const [docs, setdocs] = useState(null)
const [token, settoken] = useState("")
const [exportTrigger, setexportTrigger] = useState(false)
useEffect(() => {
  if(localStorage.getItem("token") && !user ){
    setuser(
      JSON.parse(
          localStorage.getItem("user")
      )
)
settoken(
  JSON.parse(
      localStorage.getItem("token")
  )
)
      }

})
useEffect(() => {
  if(!docs){
  Axios.get(endPoint  + "/staff/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
     const getDocs = dataDocs.data.staff
     setdocs(
      getDocs.filter(filt=>{
        if(user.position === "Government Statistician (CEO)"
         || user.position === "Deputy Gov Statistician (DGS)"
          || user.department === "Human Resource"
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
     })
      
      )
  }).catch(err=>console.log(err.message))
  }
  })

// const columns = [
//   // { field: '_id', headerName: 'ID', width: 90 },

//   {
//     field: 'staffId',
//     headerName: 'Staff Id',
//     width: 150,
    
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
//     field: 'retirementAge',
//     headerName: 'Retirement Age',
//     type: 'number',
//     width: 110,
    
//   }
//   // {
//   //   field: 'fullName',
//   //   headerName: 'Full name',
//   //   description: 'This column has a value getter and is not sortable.',
//   //   sortable: false,
//   //   width: 160,
//   //   valueGetter: (params) =>
//   //     `${params.row.firstname || ''} ${params.row.lastName || ''}`,
//   // },
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
  },
  {
      id:"d10",
      name:"Contact"
  },
  {
      id:"d9",
      name:"Retirement"
  }
 
]

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
    <div>
            <Excel Trigger = {exportTrigger} />
        <Nav />
        <div className="content">
        <div className="exportBtnContainer">
      {/* <button className='exportBtn' onClick={exportExcel}><i className="lni lni-add-files"></i> Export Excel</button> */}
      </div>
        <div className="row-flex fit white round-edge padding section">
            <img src="/leave.svg" className='width-100-max fit' alt="" />
            <div>
            <div className="h1">
                Retirement Management
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Retirement Management</Link>
                </div>
            </div>
        </div>

        <div className="m-section"></div>
   {
    docs ?
    // <DataGridDemo columns={columns} rows={docs ? docs : []} className="card" />
  <div className="card" style={{padding:0}}>
    <DataTable Docs={docs} Columns={columns}  showColumns={columns} hideInterval hideEmail/>
  </div>
    :""
   }
        </div>
    </div>
  )
 }else{
  return <Nav />
 }
}
