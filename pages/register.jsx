import Link from "next/link";
import Nav from "../components/Nav";
import {useRef} from 'react';
import endPoint from "../components/endPoint";
import {useEffect, useState} from "react"
import Axios  from 'axios';
import departments from "../data/departments";
import Loader from './../components/loader';
import sections from "../data/sections"
import grades from "../data/grades"
import jobTitles from "../data/jobTitles"
import Super from "../data/super";
import positions from "../data/positions";
import TextField  from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem"
import Alert from "../Funcss/Components/Alert"
export default function Register() {
    const form = useRef(null)
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    const [loading, setloading] = useState(false)
    const [Department, setDepartment] = useState("")
    const [message, setmessage] = useState("")
    useEffect(()=>{
        setTimeout(()=>{
            setmessage(null)
        }, 4000)
    },[message])
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
const handleLogin = (e) => {
    e.preventDefault()
const current = form.current
const id = current["id"].value
const email = current["email"].value
const title = current["title"].value
const firstName = current["firstName"].value
const surName = current["surname"].value
const middleName = current["middlename"].value
const grade = current["grade"].value
const department = current["department"].value
const section = current["section"].value
const position = current["position"].value
const jobTitle = current["jobtitle"].value
const employmentStatus = current["employmentStatus"].value

const staff = {
    staff_id: "12345",
    email: "example@example.com",
    user_password: "password123",
    first_name: "John",
    last_name: "Doe",
    title: "Mr.",
    ghana_post_gps: "ABC123",
    hometown: "Accra",
    gender: "Male",
    date_of_birth: "1990-01-01",
    marital_status: "Married",
    spouse_name: "Jane Doe",
    nationality: "Ghanaian",
    ghana_card_number: "1234567890",
    ssnit_number: "9876543210",
    contact_number: "123456789",
    contact_number2: "987654321",
    num_children: 2,
    next_of_kin: true,
    next_of_kin_name: "Sarah Doe",
    next_of_kin_relation: "Sibling",
    next_of_kin_address: "123 Main Street, Accra",
    father_name: "John Doe Sr.",
    father_occupation: "Engineer",
    father_nationality: "Ghanaian",
    father_date_of_birth: "1960-01-01",
    father_hometown: "Kumasi",
    mother_name: "Jane Doe Sr.",
    mother_occupation: "Teacher",
    mother_nationality: "Ghanaian",
    mother_date_of_birth: "1965-01-01",
    criminal_record: false,
    crime_dismiss: true,
    date_of_appointment: "2020-01-01",
    region_id: "ABC123",
    job_id: "12345",
    directorate_id: "67890",
    position_id: "54321",
    employment_status: "Full-Time"
  };
  
if(email){
    setloading(true)
Axios.post(endPoint + "/staff/register/" , 
{
email:email,
password:"gss123?",
staffId:id,
title:title,
surname:surName,
middleName:middleName,
firstName:firstName,
position:position,
grade:grade,
gender:"",
address: "",
nationality:"",
ghanaCard:"",
ssnitNumber:"",
contact: "",
dob: "",
maritalStatus:"",
spouse:"",
availableChildren:"",
numberChildren:"",
nextKin:"",
nextKin_Relation:"",
nextKin_Tel: "",
nextKin_Address:"",
department:department,
section:section,
region:"",
jobTitle:jobTitle,
grade:"",
employmentStatus:employmentStatus,
appointDate:"",
salaryLevel: "",
status:"field",
passportNumber:"",
passportIssueDate:"",
placeIssue:"",
crimeConvict: false,
detailReason: "",
dismissedPublicService:false,
publicServiceReason: "" ,
father_fullName:"",
father_occupation: "",
father_nationality:"",
father_placeofBirth:"",
father_alive_or_dead:"",
mother_fullName:"",
mother_occupation:"",
mother_nationality:"",
mother_placeofBirth: "",
mother_alive_or_dead: "",
schoolname: "",
yearFrom: "",
yearTo: "",
type_of_certificate:"",
particulars: "",
editfield:true
}
,   {
    headers: {
         authorization: `Bearer ${token}`,
       
      }
       
   }).then(()=>{
    setloading(false)
    setmessage("account created successfully")
   })
   .catch(err=>{
    setloading(false)
    setmessage(err.message)
   })
}else{
    setmessage("Make sure to enter all details")
    setloading(false)
}
};

    return (
        <div>
        <div className="">
        <div className="message">
         {
            message ?
            <Alert type="info" message={message}/>
            :""
         }
         </div>
            {
                loading ?
                <Loader />
                :""
            }
        <Nav />
        <div className="content">
        <div className="width-700-max ">
        <div className="m-section">
         <div className="padding">
         <div className="h1">Register Account</div>
            <div className="text-bold section">
            Enter a valid email and password to login your account
            </div>
         </div>
        </div>
        <div className="section">
           <form ref={form}>
           <div className="row">
            <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth
                type="text"
                name="id"
                variant="outlined"
                id=""
                label="Staff ID"
                />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth
                type="email"
                name="email"
                variant="outlined"
                id=""
                label="Email"
                />
            </div>
        
            <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth
                type="text"
                name="firstName"
                variant="outlined"
                id=""
                label="First Name"
                />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth
                type="text"
                name="middlename"
                variant="outlined"
                id=""
                label="Middle Name"
                />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth
                type="text"
                name="surname"
                variant="outlined"
                id=""
                label="Last Name"
                />
            </div>
    
            <div className="col sm-12 md-6 lg-6 padding">
            <TextField fullWidth type="text" select label="Title" name='title' variant="outlined" >
                        <MenuItem value="Prof">Prof</MenuItem>
                        <MenuItem value="Dr.">Dr.</MenuItem>
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem value="Miss">Miss</MenuItem>
                    </TextField>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <TextField fullWidth type="text" select name='department' label="Department" variant="outlined" onChange={(e)=>setDepartment(e.target.value)}>
                    {
                        departments.map(docs=>( 
                            <MenuItem value={docs.department} key={docs.department}>{docs.department}</MenuItem>
                        ))
                    }
            </TextField>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <TextField fullWidth type="text" select label="Section" name='section' variant="outlined">
                    {
                        sections.filter(docs=>{
                            if(Department.toString().trim().toLowerCase() === docs.department.toString().trim().toLowerCase()){
                                return docs
                            }
                        }).map(docs=>(
                            <MenuItem value={`${docs.section}`} key={docs.section}> {docs.section}</MenuItem>
                        ))
                    }
                    </TextField>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <TextField fullWidth type="text" select label="Grade" name='grade' variant="outlined">
                    {
                        grades.map(docs=>(
                            <MenuItem value={`${docs.grade}`} key={docs.grade}>{docs.grade}</MenuItem>
                        ))
                    }
                    </TextField>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <TextField fullWidth type="text" select label="Employment Status" name='employmentStatus' variant="outlined">
                        <MenuItem value="permanent">permanent</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                    </TextField>
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <TextField fullWidth type="text" select label="Position" name='position' variant="outlined">
                    {
                        positions.map(docs=>(
                            <MenuItem value={`${docs.position}`} key={docs.position}> {docs.position}</MenuItem>
                        ))
                    }
                    </TextField>
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <TextField fullWidth type="text" select label="Job Title" name='jobtitle' variant="outlined">
                    {
                        jobTitles.map(docs=>(
                            <MenuItem value={`${docs.title}`} key={docs.title}> {docs.title}</MenuItem>
                        ))
                    }
                    </TextField>
            </div>
        
            <div className="col sm-12 md-6 lg-6 padding">
            <button className="primaryBtn btn full-width" onClick={handleLogin}>CREATE ACCOUNT <i className="icon-user-following"></i></button>
            </div>
        
            </div>
           </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        );

}
