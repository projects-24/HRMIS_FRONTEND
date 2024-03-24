import React from 'react'
import { useState, useEffect } from 'react'
import Departments from '../data/departments'
import Sections from '../data/sections'
import dynamic from "next/dynamic"
import Link from "next/link"
import DaysLeft from './daysLeft';
import Button from 'funuicss/ui/button/Button'
import { PiFile, PiMagnifyingGlass, PiPrinter, PiTrash } from 'react-icons/pi'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Text from 'funuicss/ui/text/Text'
import ToolTip from 'funuicss/ui/tooltip/ToolTip'
import Circle from 'funuicss/ui/specials/Circle'
import Tip from 'funuicss/ui/tooltip/Tip'
import DeleteModal from './modal/Delete'
import { FormatEmail } from './Functions'
const Excel = dynamic(()=>import("./Excel") ,{ssr:false})
export default function DataTable({Docs, Columns, showColumns, hideInterval, hideEmail, staffDetails, action , td}) {
    const [columsHide, setcolumsHide] = useState(showColumns ? showColumns : [])
    const [columsRender, setcolumsRender] = useState(true)
    const [openHideModal, setopenHideModal] = useState(false)
    const [department, setdepartment] = useState('')   
    const [section, setsection] = useState('')
    const [startDate, setstartDate] = useState("")
const [endDate, setendDate] = useState("")
const [type, settype] = useState("")
const [search, setsearch] = useState("")
const [getTotal, setgetTotal] = useState(0)
const [getAll, setgetAll] = useState(true)
useEffect(() => {
 if(getAll || getTotal === 0){
  setgetTotal(document.getElementById('records').rows.length - 1)
  setgetAll(!getAll)

 }
})



const handleSelectedhide = (e)=>{
const val = JSON.parse(e.target.value)
// if(columsHide.find(doc=> doc.id === val.id)){

// }
new Promise((resolve, reject) => {
    setcolumsRender(false)
    columsHide.push(val)
    resolve()
    }).then(()=>{
    setcolumsRender(true)
    setgetAll(!getAll)
    })
}

    const handleCloseHide = (doc)=>{
       new Promise((resolve, reject) => {
        setcolumsRender(false)
        resolve()
        setcolumsHide(
            columsHide.filter(filt=> filt.id != doc.id)
        )
       }).then(()=>{
        setcolumsRender(true)
        setgetAll(!getAll)
       })
    }
    const [exportTrigger, setexportTrigger] = useState(false)
    const exportExcel = ()=>{
      new Promise((resolve, reject) => {
        setexportTrigger(true)
        resolve()
      }).then(()=>{
        setexportTrigger(false)
      })
      }
      const [deleteId, setdeleteId] = useState("")

  return (
    <div>
      <Excel Trigger = {exportTrigger} />
      {
        deleteId &&
        <DeleteModal route={"/staff"} id={deleteId}/>
      }
        <div className="">
         <RowFlex responsiveSmall funcss='bb' justify='space-between'  gap={1}>
         <div>
        
            <div className="minSection">
              <div className="">Total Records Gotten</div>
              <div className="h2">   {
               getTotal
              }</div>
            </div>
         </div>
            <div style={{display:"flex", gap:'2rem' , alignItems:"center"}}>
            <Button raised small bg='primary' startIcon={<PiMagnifyingGlass />} onClick={()=>setopenHideModal(true)}>
                Filter 
            </Button>
              <input type="text" className="input" onChange={(e)=>{
                setsearch(e.target.value)
              setgetAll(!getAll)
              }} placeholder='staff Id | Email'/>
         </div>
         
        {
          type ?
          <div className="">
          <div className="secondary-text text-bold">Interval ({type === "dob" ? "Date of birth" : type === "appointment" ? "Appointment" : type === "retirement" ? "Retirement" : type})</div>
          <div className="row-flex">
            <div><div><span className="text-bold">From:</span> {startDate}</div></div>
            <div><div><span className="text-bold">To:</span> {endDate}</div></div>
          </div>
        </div>
        :""
        }
            <div>
            <Button raised bg='violet' startIcon={<PiFile />} onClick={exportExcel}>Export </Button>
         </div>
         </RowFlex>
       
         <div className=''>
        {
          columsHide.length > 0 ?
          <>
           <div className="row hr">
            <div className="col sm-12 md-8 lg-8 padding">
            <Text heading='h5' light>Showing data for</Text>
             <div className="row-flex">
             {
                                columsHide && columsRender ?
                                columsHide.map(doc=>(
                                 <Button bg='primary' smaller rounded raised key={doc.id}  style={{padding:"0.2rem"}}>
                                     {doc.name}
                                 </Button>
                                )):""
                            }
             </div>
            </div>
            <div className="col sm-12 md-4 lg-4 padding">
           
            <div className="row-flex">
            {
              department ?
              <div><div><span className="text-bold text-small secondary-text">Department*:</span> <span className="text-small">{department}</span></div></div>
              :""
            }
            {
              section ?
            <div><div><span className="text-bold text-small secondary-text">Section*:</span> <span className="text-small">{section}</span></div></div>
            :""
            }
          </div>
            </div>
            
                </div>
          </>
          :<></>
        }
         </div>
        </div>
        {
            openHideModal ?
            <div className="filterModal">
            <span className="closeForm" onClick={()=>setopenHideModal(false)}>
          <i className="lni lni-close" ></i>
        </span>
                <div className="h3 padding hr">Filter Data</div>
                <div className=" section">
                    <div className='filterModalContent'>
                        {/* <div className='section h4'>Hide Column</div> */}
                        <div className="row">
                          {
                            !hideInterval ?
                            <div className="row">
                              <div className="col sm-12 md-12 lg-12 padding">
                            <div className="minSection">Set Interval Parameter</div>
                            <select type="date" defaultValue={type} className='input' onChange={(e)=>settype(e.target.value)}>
                              <option value="">Select Type</option>
                              <option value="dob">Date Of Birth</option>
                              <option value="appointment">Date Of Appointment</option>
                              <option value="retirement">Date Of Retirement</option>
                              </select>
                          </div>
                          <div className="col sm-12 md-6 lg-6 pading-5">
                            <div className="minSection">Start Interval</div>
                            <input defaultValue={startDate} type={type === "dob" || type == "appointment" ? "month" : "month"} 
                            className='input' onChange={(e)=>setstartDate(e.target.value)}/>
                          </div>
                          <div className="col sm-12 md-6 lg-6 pading-5">
                            <div className="minSection">End Interval</div>
                            <input defaultValue={endDate} type={type === "dob" || type == "appointment" ? "month" : "month"} 
                            className='input' onChange={(e)=>setendDate(e.target.value)}/>
                          </div>
                            </div>
                            :<div />
                          }
                          <div className="col sm-12 md-6 lg-6 pading-5">
                    <select defaultValue={department} className='input light full-width' placeholder="Department"  onChange={(e)=>{
                      setdepartment(e.target.value)
                      setgetAll(!getAll)
                    }}>
                        <option value="">All Departments</option>
                        {
                            Departments &&
                            Departments.map(docs=>(
                                <option value={docs.department} key={docs.department}> {docs.department} </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col sm-12 md-6 lg-6 pading-5">
                    <select defaultValue={section} className='input light full-width' placeholder="Section"  onChange={(e)=>{
                      setsection(e.target.value)
                      setgetAll(!getAll)
                      }}>
                        <option value="">All Sections</option>
                        {
                                Sections.filter(docs=>{
                                    if(department.toString().trim().toLowerCase() === docs.department.toString().trim().toLowerCase()){
                                        return docs
                                    }
                                }).map(docs=>(
                                    <option value={`${docs.section}`} key={docs.section}> {docs.section}</option>
                                ))
                            }
                    </select>
      
                </div>
                        </div>
                        <div className="padding">
                            <select name="" className='input' id="" onChange={handleSelectedhide}>
                                <option value={JSON.stringify({id:"034", name:"d49"})}>Select columns to show</option>
                                {
                                showColumns ?
                                showColumns.map(doc=>(
                                    <option key={doc.id} value={JSON.stringify(doc)}>
                                        {doc.name}
                                    </option>
                                )):    Columns.map(doc=>(
                                  <option key={doc.id} value={JSON.stringify(doc)}>
                                      {doc.name}
                                  </option>
                              ))
                            }
                            </select>
                        </div>
                        <div className="row">
                            {
                                columsHide && columsRender ?
                                columsHide.map(doc=>(
                                    <div key={doc.id}  className=" col sm-6 md-3 lg-4 padding" onClick={()=>handleCloseHide(doc)}>
                                    <div className='filterTab'>
                                    {doc.name} <i className="icon-close"></i>
                                      </div>    
                                    </div>
                                )):""
                            }
                        </div>
                    </div>
                </div>
            </div>
            :""
        }
        <div className="dTableContainer">
        <table className='dTable stripped' id='records'>
            <thead>
            <tr>
            <td  style={{fontWeight:"bold", width:"200px"}}>Staff ID</td>
          {
            !hideEmail ?
            <td  style={{fontWeight:"bold", width:"200px"}}>Email</td>
            :""
          }
            <td   style={{fontWeight:"bold", width:"200px"}} align="left">Full Name</td>
            {
                      columsHide.find(doc=>doc.id === "d1") ?  
            <td id="d1" style={{fontWeight:"bold", width:"200px"}} align="left">Directorate</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d2") ?
            <td id="d2" style={{fontWeight:"bold", width:"200px"}} align="left">Section</td> 
            :  ""}
            {  columsHide.find(doc=>doc.id === "d4") ?
            <td id="d3" style={{fontWeight:"bold", width:"200px"}} align="left">Grade</td> 
            :  ""}
            {  columsHide.find(doc=>doc.id === "d3") ?
            <td id="d4" style={{fontWeight:"bold", width:"200px"}} align="left">Position</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d5") ?
            <td id="d5" style={{fontWeight:"bold", width:"200px"}} align="left">Employment Status</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d6") ?
            <td id="d6" style={{fontWeight:"bold", width:"200px"}} align="left">Appointment Date</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d7") ?
            <td id="d7" style={{fontWeight:"bold", width:"200px"}} align="left">Salary Level</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d8") ?
            <td id="d8" style={{fontWeight:"bold", width:"200px"}} align="left">Education</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d9") ?
            <td id="d9" style={{fontWeight:"bold", width:"200px"}} align="left">Retirement</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d10") ?
            <td id="d10" style={{fontWeight:"bold", width:"200px"}} align="left">contact_number</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d11") ?
            <td id="d11" style={{fontWeight:"bold", width:"200px"}} align="left">Marital Status</td>
            :  ""}
            {  columsHide.find(doc=>doc.id === "d12") ?
            <td id="d12" style={{fontWeight:"bold", width:"200px"}} align="left">Status</td>
            :""}
            {  columsHide.find(doc=>doc.id === "d13") ?
            <td id="d12" style={{fontWeight:"bold", width:"200px"}} align="left">Promotion</td>
            :""}
            {
              action ?
              <td  style={{fontWeight:"bold", width:"200px"}} align="left">{action.label}</td>
              :""
            }
          </tr>
            </thead>
            <tbody>
              {
                Docs ?
                Docs  .filter(filtdoc=>{
                  if(
                  department  === "" && 
                  section  === ""
                  ){
                      return filtdoc
                  }else if (section || department)
                {
                 // if( department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase() &&
                 // section.toString().trim().toLowerCase() === filtdoc.section.toString().trim().toLowerCase() )
                 //    {
                 //      return filtdoc
                 //    }
                    if ((department?.toString().trim().toLowerCase() === filtdoc?.department?.toString().trim().toLowerCase()) &&
                        (section?.toString().trim().toLowerCase() === filtdoc?.section?.toString().trim().toLowerCase())) {
                        return filtdoc;
                    }
                 else if(department && !section){
                      if(department?.toString().trim().toLowerCase() === filtdoc?.department?.toString().trim().toLowerCase()){
                        return filtdoc
                      }
                    }else if(department && section){
                      if(
                        department?.toString().trim().toLowerCase() === filtdoc.department?.toString().trim().toLowerCase() &&
                        section?.toString().trim().toLowerCase() === filtdoc.department?.toString().trim().toLowerCase()
                        ){
                        return filtdoc
                      }
                    }
                  }
                })
                .filter(filtDoc=>{
                  if(type && startDate && endDate){
                    if(type === "retirement"){
                     if(
                      filtDoc.retirementAge
                      >=
                      parseInt( startDate.slice(0,4)) 
                      &&
                     filtDoc.retirementAge
                     <=
                     parseInt( endDate.slice(0,4)) 
                      ){
                      return filtDoc
                     }
                    }
                    else if (type === "dob"){
                      if(
                        filtDoc.dob.replace(/-/g, "").slice(0,6)
                        >=
                        parseInt(startDate.replace(/-/g, "").slice(0,6)) 
                        &&
                       filtDoc.dob.replace(/-/g, "").slice(0,6)
                       <=
                       parseInt( endDate.replace(/-/g, "").slice(0,6) )
                        ){
                        return filtDoc
                       }
                    }
                    else if (type === "appointment"){
                      if(
                        filtDoc.appointDate.replace(/-/g, "").slice(0,6)
                        >=
                        parseInt(startDate.replace(/-/g, "").slice(0,6)) 
                        &&
                       filtDoc.appointDate.replace(/-/g, "").slice(0,6)
                       <=
                       parseInt( endDate.replace(/-/g, "").slice(0,6) )
                        ){
                        return filtDoc
                       }
                    }
                    else if (filtDoc){
                      return filtDoc
                    }
                  }else{
                    return filtDoc
                  }
                }).filter((filtDoc)=>{
                  if(search){
                    if(
                      search.trim().toLowerCase().includes(filtDoc.id.toString().trim().toLowerCase().slice(0, search.length)) ||
                      search.trim().toLowerCase().includes(filtDoc.email.toString().trim().toLowerCase().slice(0, search.length))
                      ){
                      return filtDoc
                    }
                  }else{
                    return filtDoc
                  }
                })
                .map((row) => (
                    <tr
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <td component="th" scope="row">
                        {!staffDetails ? row.id : ""}
                      </td>
                    {
                      !hideEmail ?
                      <td align="left">{!staffDetails ? FormatEmail(row.email) : FormatEmail(row.email)}</td>
                      :""
                    }
                      <td className='trOccupy' align="left">{!staffDetails ? row.firstName : row.lastName} {row.lastName}</td>
              
                      {
                      columsHide.find(doc=>doc.id === "d1") ?  
                      <td  style={{width:"200px"}} align="left">{!staffDetails ?  row.directorate.slice(0, 10) :  row.directorate.slice(0, 10)}...</td>
                      :  ""}
                      {/*{  columsHide.find(doc=>doc.id === "d2") ?  */}
                      {/*<td style={{ width:"200px"}} align="left">{!staffDetails ? row.section.slice(0, 10) : row.section.slice(0, 10) }...</td> : ""*/}
                      {/*}*/}

                        {/*  Start of inserted*/}
                        {
                            columsHide.find(doc => doc.id === "d2") ?
                                <td style={{ width: "200px" }} align="left">
                                    {!staffDetails ? row.section?.slice(0, 10) : row.section?.slice(0, 10)}...
                                </td>
                                : ""
                        }

                      {/*  End of inserted*/}
                      {  columsHide.find(doc=>doc.id === "d4") ?  
                      <td style={{ width:"200px"}} align="left">{!staffDetails ? row.grade : row.grade }</td> : ""
                      }
                      {
                      columsHide.find(doc=>doc.id === "d3") ?  
                      <td  style={{width:"200px"}} align="left">{!staffDetails ? row.position.slice(0, 10) : row.position.slice(0, 10)}...</td>
                      :  ""}
                      {
                      columsHide.find(doc=>doc.id === "d5") ?  
                      <td style={{ width:"200px"}} align="left">{!staffDetails ? row.employmentStatus : row.employmentStatus}</td>
                      :  ""}
                      {
                      columsHide.find(doc=>doc.id === "d6") ?  
                      <td style={{ width:"200px"}} align="left">{!staffDetails ? row.appointDate.toString().split("-").reverse().join("-") : row.appointDate.toString().split("-").reverse().join("-")}</td>
                      :  ""}{
                        columsHide.find(doc=>doc.id === "d7") ?  
                      <td  style={{width:"200px"}} align="left">{!staffDetails ? row.salaryLevel : row.salaryLevel}</td>
                      :  ""}{
                        columsHide.find(doc=>doc.id === "d8") ?  
                      <td className='trOccupy' style={{ width:"300px"}} align="left">
                        {row.school.map(sDoc=>(
                          <span key={sDoc.id}>
                           <div className="">
                           {sDoc.school} 
                           </div>
                            {/* {sDoc.start_date - sDoc.endDate} */}
                          </span>
                        ))
                        }
        
                      </td>
                      :  ""}{
                        columsHide.find(doc=>doc.id === "d9") ?  
                      <td  style={{width:"200px"}} align="left">
                        <DaysLeft Year = {row.retirementAge} /> Left
                      </td>
                      :  ""}{
                        columsHide.find(doc=>doc.id === "d10") ?  
                      <td style={{ width:"200px"}} align="left">
                        {row.contactNumber ? row.contactNumber.toString() : ''}
                      </td>
                      :  ""}{
                        columsHide.find(doc=>doc.id === "d11") ?  
                      <td  style={{width:"200px"}} align="left">
                        {row.marital_status}
                      </td>
                      :  ""}
                      {
                        columsHide.find(doc=>doc.id === "d12") ?  
                      <td  style={{width:"200px"}} align="left">
                        {row.status}
                      </td>
                      :  ""}
                      {
                        columsHide.find(doc=>doc.id === "d13") ?  
                      <td  style={{width:"200px"}} align="left">
                        {row.promotion_date}
                      </td>
                      :  ""}
                      {
                        action ?
                        <td  style={{width:"200px"}} align="left">
                       <Link href={`/edit/${row.staffDetails ? row._id : row._id}`}>
                       {action.action}
                       </Link>
                      </td>
                      :""
                      }
                      {
                       <td>
                            <ToolTip>
                <span onClick={() => setdeleteId(row.id) }>
                <Circle size={2} funcss='raised' bg='error'>
                   <PiTrash />
                 </Circle>
                </span>
       <Tip funcss='z-index-5' tip="left"  animation="ScaleUp" duration={0.2} content="Delete Object"/>
       </ToolTip>
                       </td>
                      }
                    </tr>
                  ))
                  :""
              }
            </tbody>
        </table>
        </div>
    </div>
  )
}
