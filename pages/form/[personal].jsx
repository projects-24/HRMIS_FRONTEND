import React, { useRef } from 'react'
import Nav from '../../components/Nav';
import { useState } from 'react';
import Axios  from 'axios';
import endPoint from '../../components/endPoint';
import Loader from '../../components/loader';
import { useEffect } from 'react';
import departments from '../../data/departments';
import sections from "../../data/sections"
import regions from '../../data/regions';
import jobTitles from "../../data/jobTitles"
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import grades from "../../data/grades"
import Alert from 'funuicss/ui/alert/Alert';
import Typography from 'funuicss/component/Typography';
import Input from 'funuicss/ui/input/Input';
import Button from 'funuicss/ui/button/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Header from '../../components/Header';
import Text from 'funuicss/ui/text/Text';
import { PiPlus } from 'react-icons/pi';
import { GetRequest, GetToken } from '../../components/Functions';
import Modal from 'funuicss/ui/modal/Modal'
import RowFlex from 'funuicss/ui/specials/RowFlex';
import Success from '../../components/default/success';

export default function Personal() {
    const [crime, setcrime] = useState(false)
    const [dismissed, setdismissed] = useState(false)
    const [loader, setloader] = useState(false)
    const [token, settoken] = useState("")
    const [marital, setmarital] = useState("")
    const [availableChildren, setavailableChildren] = useState(null)
    const [crimereason, setcrimereason] = useState("")
    const [servicereason, setservicereason] = useState("")
    const [user, setuser] = useState(null)
    const [selectedGrade, setselectedGrade] = useState("")
    const [childNumber, setchildNumber] = useState(0)
    const [childrens, setchildrens] = useState([])    
    const [childrenDocs, setchildrenDocs] = useState(null)
    const [getChildrens, setgetChildrens] = useState(true)
    const [Department, setDepartment] = useState("")
    const [schools, setschools] = useState([])
    const [getSchools, setgetSchools] = useState(true)
    const [schoolDocs, setschoolDocs] = useState([])
    const [myschools, setmyschools] = useState([])
    const [message, setmessage] = useState("")
    const [fatherContact, setfatherContact] = useState("")
    const [motherContact, setmotherContact] = useState("")
    const [father, setfather] = useState(false)
    const [mother, setmother] = useState(false)
    const [open, setOpen] = useState(false);
    const [preview, setpreview] = useState([])
    const [selectedSalary, setselectedSalary] = useState("")
    const [no_of_leave_days, setno_of_leave_days] = useState(0)
    const [success, setsuccess] = useState(false)
    const [haveProfCert, sethaveProfCert] = useState(false)
    const [certificates, setcertificates] = useState([])
    const [certDocs, setcertDocs] = useState(null)
    const [getCert, setgetCert] = useState(false)
    const [ghaValid, setghaValid] = useState(null)
    const [ssnitValid, setssnitValid] = useState(null)
    const [regions, setregions] = useState('')
    const [sections, setsections] = useState('')
    const [directorates, setdirectorates] = useState('')
    const [positions, setpositions] = useState('')
    const [jobs, setjobs] = useState('')

    useEffect(() => {
     if(!token){
        GetToken()
        .then(res => {
         setuser(res.user)
         settoken(res.token)
        })
     }
       })

    useEffect(() => {
        if(!regions){
         GetRequest("/region")
         .then( res => setregions(res))
         .catch(err => console.log(err))
        }
         })
         
    useEffect(() => {
        if(!directorates && regions){
         GetRequest("/directorate")
         .then( res => setdirectorates(res))
         .catch(err => console.log(err))
        }
         })
    useEffect(() => {
        if(!sections && directorates){
         GetRequest("/section")
         .then( res => setsections(res))
         .catch(err => console.log(err))
        }
         })
         
    useEffect(() => {
        if(!jobs){
         GetRequest("/job")
         .then( res => setjobs(res))
         .catch(err => console.log(err))
        }
         })
    useEffect(() => {
        if(!positions){
         GetRequest("/position")
         .then( res => setpositions(res))
         .catch(err => console.log(err))
        }
         })
         
    const handleClose = () => {
        setOpen(false);
        setloader(false)
      };
    useEffect(()=>{
        setTimeout(()=>{
            setmessage(null)
        }, 4000)
    },[message])

    useEffect(() => {
        if(getChildrens){
            setchildrenDocs(
              childrens
            )
            setgetChildrens(false)
        }
    })
    useEffect(() => {
        if(getCert){
            setcertDocs(
              certificates
            )
            setgetCert(false)
        }
    })

    useEffect(() => {
        if(getSchools){
            setschoolDocs(
             schools
            )
            setgetSchools(false)
        }
    })


    const router = useRouter()
    const {personal } = router.query
    const form = useRef(null)


    const submitData = (e)=>{

        if(parseInt(selectedSalary) >= 23){
            setno_of_leave_days(36)
        }else if(parseInt(selectedSalary) >= 15 && parseInt(selectedSalary) <= 22){
            setno_of_leave_days(36)
        }else if(parseInt(selectedSalary) < 15){
            setno_of_leave_days(36)
        }
        e.preventDefault()
        const current = form.current
        const id = current["id"].value

        const email = current["email"].value

        const ghanaCard = current["ghanaCard"].value
        const firstName = current["firstName"].value
        const lastName = current["lastName"].value
        const user_password = current["password"].value
        const hometown = current["hometown"].value
  
        const gender = current["gender"].value
        const address = current["address"].value
        const nationality = current["nationality"].value
        const tel = current["tel"].value
        const contact_number2 = current["contact_number2"].value
        const dob = current["dob"].value

        const title = current["title"].value
        const ssnitNumber = current["ssnitNumber"].value
        

        // marital status
        const maritalStatus = current["maritalStatus"].value
        const spouse = current["spouse"].value
        const availableChildren = current["availableChildren"].value
        const nextKin = current["nextKin"].value
        const nextKin_Relation = current["nextKinRelation"].value
        const nextKin_Tel = current["nextKinTel"].value
        const nextKin_Address = current["nextKinAddress"].value
        const numberChildren = current["numberChildren"].value
        //department
        const department = current["department"].value
        const section = current["section"].value
        const region = current["region"].value


        //job Info
        const jobTitle = current["job"].value
        const employmentStatus = current["employmentStatus"].value
        const appointDate = current["appointDate"].value
        const position = current["position"].value


        //other
        const crime = current["crime"].value
        // const crimereason = current["crimereason"].value
        const service = current["service"].value
        // const servicereason = current["servicereason"].value

        //father
        const father = current["father"].value
        const fatheroccupation = current["fatheroccupation"].value
        const fathernationality = current["fathernationality"].value
        const fatherdob = current["fatherdob"].value
        const father_hometown = current["father_hometown"].value

        //mother
        const mother = current["mother"].value
        const motheroccupation = current["motheroccupation"].value
        const mothernationality = current["mothernationality"].value
        const motherdob = current["motherdob"].value

        const profCert = current["prof_certificate"] ? current["prof_certificate"].value : ""
        const profCertNum = current["certificate_number"] ? current["certificate_number"].value : ""

        setmarital(maritalStatus)
        setchildrens(availableChildren)

        const getYearOfBirth = dob.slice(0,4)
     
          const data = {
  staff_id: id,
  email: email,
  user_password: user_password,  
  first_name: firstName,
  last_name: lastName,
  title: title,
  ghana_post_gps: address,
  hometown: hometown,
  gender: gender,
  date_of_birth: dob,
  marital_status: maritalStatus,
  spouse_name: spouse,
  nationality: nationality,
  ghana_card_number: ghanaCard,
  ssnit_number: ssnitNumber,
  contact_number: tel,
  contact_number2: contact_number2,
  num_children: numberChildren,
  next_of_kin: "",
  next_of_kin_name: nextKin,
  next_of_kin_relation: nextKin_Relation,
  next_of_kin_address: nextKin_Address,
  father_name: father,
  father_occupation: fatheroccupation,
  father_nationality: fathernationality,
  father_date_of_birth: fatherdob,
  father_hometown: father_hometown,
  mother_name: mother,
  mother_occupation: motheroccupation,
  mother_nationality: mothernationality,
  mother_date_of_birth: motherdob,
  criminal_record: crime,
  crime_dismiss: service,
  date_of_appointment: appointDate,
  region_id: region,
  job_id:jobTitle,
  directorate_id: department,
  position_id: position,
  section_id: section,
  employment_status: employmentStatus ,
  education:schools
}
        

        if( email &&
            id &&
            firstName &&
            lastName &&
            nationality &&
            tel &&
            department &&
            jobTitle &&
            maritalStatus &&
            department &&
            gender &&
            dob &&
            department &&
            region &&
            jobTitle &&
            position 

            ){
                setpreview(data)
                setOpen(true)
                console.log(data)
            }else{
                setloader(false)
                setmessage("Make sure to enter all compulsory fields before you can submit data")
            }
 
    }

    const postData = ()=>{
        setOpen(false)
        console.log(preview)
     if(ghaValid && ssnitValid){
        setloader(true)
        Axios.post(endPoint + "/staff",
        preview,
        {
         headers: {
              authorization: `Bearer ${token}`,
            
           }
            
        }
        ).then(()=>{
       setloader(false)
       setsuccess(true)
       setsuccess(true)
       setTimeout(() => {
       window.location.reload()
       }, 4000);
       }).catch(err=>{
 
       if(err.message === "Request failed with status code 422"){
        setmessage("Email or staffId Exist")
        setloader(false)
       }else{
        setmessage(err.message)
        setloader(false)
       }

       })
     }else{
        setmessage("Enter a valid Ghana card and snnit number")
     }
        
    }

    const handleChild = (e)=>{
        e.preventDefault()
        const current = form.current
        const child = current["child"].value
        const childDate = current["childDate"].value
        if( childrens.length < childNumber){
            if(child && childDate){
                new Promise((resolve , reject)=>{
                    childrens.push({id:childrens.length + 1,child:child, dob:childDate})
                    resolve()
                }).then(()=>{
                    // sessionStorage.setItem("childrens" , JSON.stringify(childrens))
                    document.querySelector("#child").value = ""
                    document.querySelector("#childDob").value = ""
                    setgetChildrens(true)
                })
        
               }else{
                setmessage("Make sure to enter child name and date of birth")
               }
        }else{
            setmessage("You can not add more than your children number")
        }
 
    }
    const handleProfCert = (e)=>{
        e.preventDefault()
        const current = form.current
        const certificate = current["prof_certificate"].value
        const certId = current["cert_number"].value
        if( certificates.length < 3){
            if(certificate && certId){
                new Promise((resolve , reject)=>{
                    certificates.push({id:certificates.length + 1,cert:certificate, id:certId})
                    resolve()
                }).then(()=>{
                    document.querySelector("#profCert").value = ""
                    document.querySelector("#certId").value = ""
                    setgetCert(true)
                })
        
               }else{
                setmessage("Make sure to enter certifcate and ID")
               }
        }else{
            setmessage("You can not add more than 3 certificates")
        }
 
    }

    const handleSchool = (e)=>{
        e.preventDefault()
        const current = form.current
        const school = current["school"].value
        const from = current["from"].value
        const to = current["to"].value
        const program = current["program"].value
        const certificate = current["certificate"].value
        const certificate_number = current["certificate_number"].value
        const certificate_name = current["certificate_name"].value
        const doc = {
            institution_name:school, 
            certificate_type:certificate , 
            certificate_name : certificate_name,
            certificate_number : certificate_number ,
            program_of_study :program,
            start_year :from,
            end_year :to , 
       
        }
        if(school && from && to && certificate && program && certificate_number){
            new Promise((resolve , reject)=>{
                schools.push(doc)
                resolve()
            }).then(()=>{
             document.querySelector("#school").value = ""
             document.querySelector("#to").value = ""
             document.querySelector("#from").value = ""
             document.querySelector("#certificate").value = ""
             document.querySelector("#program").value = ""
                setgetSchools(true)
            })
        }else{
            setmessage("Make sure to enter all your school details")
        }
    }
    return (
        <div className="container">
              <div className="message">
         {
            message ?
            <Alert 
            type="warning" message={<Text text={message} size='small' />} fixed='top-right'  />
            :""
         }
         {
            success &&
            <Success />
         }
         </div>
            <div className="padding-top-80"></div>
            <Header sub_dir={"Profiling" } sub_dir_route={"/staff/profiling"} title={"Add New Staff"} sub_title={"Create a new staff."}/>
            <div className=''>
            <Nav noSideBar={true}/>
            {
                loader ?
                <Loader />
                :""
            }
            <form ref={form} className="">
                <div>
                 
            <div className="">
                <div className="row" style={{alignItems:"flex-start"}}>
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="row _card">
                    <div className="col sm-12 md-12 lg-12 section padding">
                    <div className="h4"><img src="/hand/person.svg" className="height-30"/> Personal Details</div>
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
                <Input type='number' name='id' fullWidth label='Staff ID' />
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
                <Input  name='email' fullWidth label='Email' />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <Input name='password' type='password' fullWidth label='Password' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input name='firstName' fullWidth label='First Name' />
                </div>
              
                <div className="col sm-12 md-6 lg-6 padding">
                <Input name='lastName' fullWidth label='Last Name' />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <select className='input full-width' name='title' >
                    <option value="">Title</option>
                    <option value="Prof">Prof</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Miss">Miss</option>
                    <option value="Rev(Mrs)">Rev(Mrs)</option>
                    <option value="Rev(Mr)">Rev(Mr)</option>
                
                </select>      
             
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                <Input multiline rows={2} name='address' fullWidth label='Residence GPS' />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <Input  name='hometown' fullWidth label='Home Town' />
                </div>
                    </div>
                    </div> 
                    <div className="col sm-12 md-6 lg-6 div">

                    <div className="row _card formSection">
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/underline.svg" className="width-50"/> Marital Details</div>
                </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                <select className='input full-width' name="maritalStatus"  onChange={(e)=>setmarital(e.target.value)}>
                    <option value="">Marital Status</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                    <option value="divorced">Divorced</option>
                    <option value="widow">Widow</option>
                    <option value="widower">Widower</option>
                </select>
                </div>
            
                <div className="col sm-12 md-12 lg-12 padding">
               {
                marital === "married" || marital === "widow" || marital === "Co-Habition" ?
                <Input  type="text" name='spouse' fullWidth label='Name Of Spouse' />
                :
              <div style={{opacity:0}}>
                  <Input  disabled type="text" name='spouse' fullWidth label='Name Of Spouse' />
                  </div>
               }
                {/* disable is divoced or single */}
                </div>
                    </div>
                    <div className="row _card formSection">
                    <div className="col sm-12 md-12 lg-12 padding">
                <Input status={ghaValid === null ?
                        ""
                        :
                        ghaValid ? "success" : 'danger'}  type="text" onChange={(e)=>{
                    const getVal = e.target.value
                    if(
                        getVal.slice(0, 4) ===  "GHA-" &&
                        getVal.length === 15 &&
                        getVal.slice(getVal.length - 2, getVal.length - 1) === "-"
                        ){
                        setghaValid(true)
                    }else{
                        setghaValid(false)
                    }
                }} name='ghanaCard' fullWidth label='Ghana Card Number' />
        
                </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                <select className='input full-width' name='nationality'>
                    <option value="">Nationality</option> 
                    <option value="Ghanaian">Ghanaian</option> 
                    {/* <option value="Non-Ghanaian">Non-Ghanaian</option>  */}
                </select>
                </div>
               
                <div className="col sm-12 md-6 lg-6 padding">
                <Input status={ssnitValid === null ?
                         ""
                         :ssnitValid ? "success" 
                        : "danger"
                        }  type="text" name='ssnitNumber' fullWidth label='SSNIT Number'
                onChange={(e)=>{
                    const getVal = e.target.value
                    if(
                        getVal.length === 13
                        ){
                        setssnitValid(true)
                    }else{
                        setssnitValid(false)
                    }
                }} />
               
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input name='tel' fullWidth label='First Contact' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input name='contact_number2' fullWidth label='Second Contact' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Text text='Gender' size='small' emp/>
                <select className='input full-width'  name="gender" id="" >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                  <Text text='Date of birth' size='small' emp/>
                <Input required  fullWidth type="date" name='dob'  />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="_card row formSection">
                        
                        <div className="col sm-12 md-12 lg-12 padding">
                            <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/undraw_check.svg" className="height-30"/> Directorate Details</div>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <select className='input full-width' name='department'  onChange={(e)=>setDepartment(e.target.value)}>
                           <option value="">Directorate</option>
                            {  directorates &&
                                directorates.map(docs=>( 
                                    <option value={docs.id} key={docs.id}>{docs.directorate}</option>
                                ))
                            }
                    </select>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <select className='input full-width'  name='section'>
                            <option value="">Section</option>
                            { sections &&
                                sections.filter(docs=>{
                                    if(Department.toString().trim().toLowerCase() === docs.directorateID.toString().trim().toLowerCase()){
                                        return docs
                                    }
                                }).map(docs=>(
                                    <option value={`${docs.id}`} key={docs.id}> {docs.section}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                        <select className='input full-width' name="region" id="region">
                            <option value="">Region</option>
                                    {   regions &&
                                        regions.map(docs=>(
                                            <option value={docs.id} key={docs.id}> {docs.region} </option>
                                        ))
                                    }
                                </select>
                        </div>
                   
                            </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="row _card formSection">
                            
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/undraw_note.svg" className="height-30"/> Job Infomation</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <select className='input full-width'  label="Job Title" name='job' >
                        <option value="">Job Title</option>
                    {   jobs &&
                        jobs.map(docs=>(
                            <option value={`${docs.id}`} key={docs.id}> {docs.job} {`(${docs.salaryLevel})`}</option>
                        ))
                    }
                    </select>
                </div>
           
                <div className="col sm-12 md-6 lg-6 padding">
            <select className='input full-width' name='position' >
                <option value="">Position</option>
                    { positions &&
                        positions.map(docs=>(
                            <option value={`${docs.id}`} key={docs.id}> {docs.position}</option>
                        ))
                    }
                    </select>
            </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
                    <Text text='Date of appointment' size='small' emp/>
                <Input  type="date" name='appointDate' fullWidth />
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
                <Text text='Employment Status' size='small' emp/>
                <select className='input full-width' name='employmentStatus' >
                <option value="permanent">Permanent</option>
                <option value="Contract">Contract</option>
                </select>
                </div>
           
                        </div>
                    </div>
       
                    <div className="col sm-12 md-12 lg-12 div">
                        <div className=" _card formSection row">
                        <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/underline.svg" className="width-50"/> Dependancy</div>
                </div>
                        
                <div className="col sm-12 md-6 lg-6 padding">
                <select className='input full-width' name='availableChildren'   onChange={(e)=>setavailableChildren(e.target.value)}>
               <option value="">Available Children</option>
                <option value={true}> Yes </option>
                <option value={''}> No </option>
                </select>
    
                </div>
        
                <div className="col sm-6 md-6 lg-6 padding">
                    {
                        availableChildren ?
                <Input  type="number" name="numberChildren"  fullWidth label='Number Of Children'  onChange={(e)=>setchildNumber(parseInt(e.target.value))}/>
                : <Input  disabled type="number"  name="numberChildren" value={0} fullWidth label='Number Of Children'  onChange={(e)=>setchildNumber(parseInt(e.target.value))}/>
                    }
                </div>
    
        
                    <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='nextKin' fullWidth label='Next of kin' />
                </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='nextKinRelation' fullWidth label='Relation with next of kin' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='nextKinTel' fullWidth label='Next of kin contact' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='nextKinAddress' fullWidth label='Next of kin address' />
                </div>
        
                        </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="row _card formSection">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/person.svg" className="height-30"/> Father</div>
                </div>
        
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='father' fullWidth label='Full Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='fatheroccupation' fullWidth label='Occupation' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Text text='Nationality' size='small' emp/>
                <select className='input full-width' name='fathernationality' >
                <option value="Ghanaian">Ghanaian</option> 
                <option value="Non-Ghanaian">Non-Ghanaian</option> 
                </select>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Text text='Date of Birth' size='small' emp/>
                <Input  type="date" name='fatherdob' fullWidth />
                </div>
        
                {
                    father ?
                    <div className="col sm-12 md-12 lg-12 padding">
                <Input   type="tel" fullWidth label='Contact' onChange={(e)=>setfatherContact(e.target.value)} />
                </div>
                :""
                }     <div className="col sm-12 md-12 lg-12 padding">
                <Input  type="text" name='father_hometown' fullWidth label='Home Town' />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="_card row formSection">
                            
                    <div className="col sm-12 md-12 lg-12 ">
                    <div className="h4 padding"><img src="/hand/person.svg" className="height-30"/> Mother</div>
                </div>
              
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='mother' fullWidth label='Full Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='motheroccupation' fullWidth label='Occupation' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Text text='Nationality' size='small' emp/>
                <select className='input full-width' name='mothernationality'>
                <option value="">Nationality</option> 
                <option value="Ghanaian">Ghanaian</option> 
                    <option value="Non-Ghanaian">Non-Ghanaian</option> 
                </select>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Text text='Date Of Birth' size='small' emp/>
                <Input  type="date" name='motherdob' fullWidth />
                </div>
               
                        </div>
                    </div>
                    <div className="col sm-12 md-12 lg-12 div">
                        <div className="formSection row _card" style={{justifyContent:"normal"}}>
                        <div className="col sm-12 md-12 lg-12 ">
                    <div className="h4 padding">
                        <img src="/hand/undraw_exclamation-point.svg" className="height-30"/> Criminal Details
                        </div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <select className='input full-width' name="crime" onChange={(e)=>{
                    if(e.target.value === "yes"){
                        setcrime(true)
                    }else if (!e.target.value){
                        setcrime(false)
                    }
                }}>
                    <option value="">Convicted Of A Crime</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
          
                </div>
          
                          <div className="col sm-12 md-6 lg-6 padding">
                <select className='input full-width' name="service" id=""  onChange={(e)=>{
                    if(e.target.value === "yes"){
                        setdismissed(true)
                    }else if (!e.target.value){
                        setdismissed(false)
                    }
                }}>
                    <option value=''>Ever dismissed from a public service</option>
                    <option value='no'>No</option>
                    <option value={"yes"}>Yes</option>
                </select>
           
                </div>
              
                        </div>
                    </div>
       
                 <div className="col sm-12 md-12 lg-12 div _card">
                        <div className="container">
                        <div className="formSection  row">
                            <div className="col sm-12 md-12 lg-12 padding">
                            <div className="row">
                    <div className="col sm-12 md-6 lg-6 padding">
                    <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/undraw_check.svg" className="height-30"/>Education</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <Input  type="text" name='school'  id='school' fullWidth label='School' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='certificate_name' id='certificate_name' fullWidth label='Certificate Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='certificate_number' id='certificate_number' fullWidth label='Certificate Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='program' id='program' fullWidth label='program of study' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <select className='input full-width' name='certificate' id='certificate'  >
                    <option value=""> Type of certificate </option>
                    <option value="PhD"> PhD </option>
                    <option value="Mphil"> Mphil </option>
                    <option value="MA/Msc"> MA/Msc </option>
                    <option value="Bsc/BA/BCOM"> Bsc/BA/BCOM </option>
                    <option value="HND"> HND </option>
                    <option value="WASSCE"> WASSCE </option>
                    <option value="Other"> Other </option>
                    </select> 
                </div>
 
                <div className="col sm-12 md-4 lg-4 padding">
                <Input  type="number"  min="1900" max="2022" step="1"  name='from' id='from' fullWidth label='From' />
                </div>
                <div className="col sm-12 md-4 lg-4 padding">
                <Input  type="number"  min="1900" max="2022" step="1" name='to'  id='to' fullWidth label='To' />
                </div>
      
                <div className="col sm-12 md-4 lg-4 padding">
                    <Button small onClick={handleSchool} startIcon={<PiPlus />} raised fullWidth bg='primary'>Add School</Button>
                </div>
               

          
                    </div>
                            </div>
                
                    {
                    schoolDocs ?
                    <div className="col sm-12 md-12 lg-12">
                    <div className="">
                         
            <div className="padding">
              <table className='table section border text-small' >
                <thead>
                    <th>Inst Name</th>
                    <th>certificate Name</th>
                    <th>certificate Number</th>
                    <th>certificate Type</th>
                    <th>program</th>
                    <th>From</th>
                    <th>To</th>
                    <th className='text-error600'>Delete</th>
                </thead>
                <tbody>
                {
                    schoolDocs ?
                    schoolDocs.map(docs=>(
                        <tr className="" key={docs.certificate_number}>
                            <td className="padding">{docs.institution_name}</td>
                            <td className="padding">{docs.certificate_name}</td>
                            <td className="padding">{docs.certificate_number}</td>
                            <td className="padding">{docs.certificate_type}</td>
                            <td className="padding">{docs.program_of_study}</td>
                            <td className="padding">{docs.start_year}</td>
                            <td className="padding">{docs.end_year}</td>
                            <td className="padding pointer hover-text-red" onClick={()=>{
                            new Promise((resolve , reject)=>{
                               setschools( schools.filter(filt=>{
                                if(filt.certificate_number != docs.certificate_number){
                                    return filt
                                }
                            }))
                                resolve()
                                    
                                }).then(()=>setgetSchools(true))
                            }}><i className="lni lni-trash-can"></i> </td>
                        </tr>
                    ))
                    :""
                }
                </tbody>
              </table>
              
                </div>

                    </div>
                </div>
                :""
                   }
                        </div>

                        </div>
                    </div>  
                    
                    {/* <div className="col sm-12 md-12 lg-12 div _card margin-top-40">
                        <div className="container ">

                        <div className="  row">
                        <div className="row">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h5 row-flex gap" style={{gap:'1rem'}}><img src="/hand/undraw_check.svg" className="height-30"/>Professional Certificates</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <Input select fullWidth type="text" onChange={(e)=>sethaveProfCert(e.target.value)} id='certificate' label="Do you have a professional certificate" >
                    <option value={true}> Yes </option>
                    <option value={false}> No </option>
                    </Input> 
                </div>
                {
                    haveProfCert ?
                    <div className="col sm-12 md-12 lg-12">
                        <div className="row">
                        <div className="col sm-12 md-6 lg-6 padding">
                <Input type="text" id='profCert' name='prof_certificate' fullWidth label='Certificate' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" id='certId' name='cert_number'  fullWidth label='Certificate Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
               <button className="button info text-white" onClick={handleProfCert}>Add certificate</button>
                </div>
                {
                    certDocs ?
                    <div className="col sm-12 md-12 lg-12 padding">
                    <table className='table section'>
                      <thead>
                          <th>Certificate</th>
                          <th>Certificate Number</th>
                          <th className='text-red'>Delete</th>
                      </thead>
                      <tbody>
                      {
                          certDocs ?
                          certDocs.map(docs=>(
                              <tr className="" key={docs.id}>
                                  <td className="padding">{docs.cert}</td>
                                  <td className="padding">{docs.id}</td>
                                  <td className="padding pointer hover-text-red" onClick={()=>{
                                  new Promise((resolve , reject)=>{
                                     setcertificates( certDocs.filter(filt=>{
                                      if(filt.id != docs.id){
                                          return filt
                                      }
                                  }))
                                      resolve()
                                          
                                      }).then(()=>setgetCert(true))
                                  }}><i className="lni lni-trash-can"></i> Delete</td>
                              </tr>
                          ))
                          :""
                      }
                      </tbody>
                    </table>
                      </div>
                      :""  
                }
                        </div>
                    </div>
                    :""
                }

                
             
          
                    </div>
                        </div>
                        </div>

                    </div>  */}
       
                   
                
                    <button onClick={submitData} className="button raised gradient text-white width-200-min roundEdge" 
            style={{position:"fixed" , 
            bottom:"10px",
            right:"10px",
            zIndex:5
            }}>
            <i className="lni lni-user"></i> Submit
             </button>
                
           
                {/* <div className="col sm-12 md-12 lg-12  ">
                    <div className="h4 padding"><img src="/hand/undraw_camera.svg" className="height-30"/> Passport Details</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <Input  type="text" name='passport' fullWidth label='Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Passport Date</div>
                <Input  type="date" name='passportdate' fullWidth label='Date' />
                </div>
                <div className="col sm-12 md-12 lg-12  padding">
                <Input  type="text" name='passportplace' fullWidth label='Place Of Issue' />
                </div> */}
    
               
          
    
                </div>
            </div>
                </div>
    
                <div>

                </div>
    
                <div>

                </div>
    
    
                </form>









                {/* Preview */}
                <div id="preview">
                <Modal 
                maxWidth='900px' 
                backdrop
                open={open}
                title={<Text text='Submit Data!' heading='h4'/>}  
                body={
                    <div>
                         <div className='row'>
<div className="col sm-12 h4 lg-12 md-12 padding">
    Personal Details
</div>
<div className="col sm-12 lg-12 md-12 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Email:</div> <div className='text-small'>{preview.email}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>staffId:</div> <div className='text-small'>{preview.staff_id}</div>
</div>
    </div>
</div>

<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>First Name:</div> <div className='text-small'>{preview.first_name}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>last Name:</div> <div className='text-small'>{preview.last_name}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Title:</div> <div className='text-small'>{preview.title}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Address:</div> <div className='text-small'>{preview.ghana_post_gps}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Marital status:</div> <div className='text-small'>{preview.marital_status}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Spouse:</div> <div className='text-small'>{preview.spouse_name}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>staffId:</div> <div className='text-small'>{preview.nationality}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Ghana Card:</div> <div className='text-small'>{preview.ghanaCard}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Snnit Number:</div> <div className='text-small'>{preview.ssnit_number}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Contact:</div> <div className='text-small'>{preview.contact_number}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>2nd Contact:</div> <div className='text-small'>{preview.contact_number2}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Gender:</div> <div className='text-small'>{preview.gender}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of birth:</div> <div className='text-small'>{preview.date_of_birth}</div>
</div>
    </div>
</div>


<div className="col sm-12 h4 lg-12 md-12 padding section">
Job Information
</div>


<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of appointment:</div> <div className='text-small'>{preview.date_of_appointment}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Employment Status:</div> <div className='text-small'>{preview.employment_status}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Dependancy
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Available Children:</div> <div className='text-small'>{preview.num_children > 0 ? "Yes" : ""}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Number of Children:</div> <div className='text-small'>{preview.num_children}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Next of kin:</div> <div className='text-small'>{preview.next_of_kin_name}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Relation with next of kin:</div> <div className='text-small'>{preview.next_of_kin_relation}</div>
</div>
    </div>
</div>

<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Next of kin address:</div> <div className='text-small'>{preview.next_of_kin_address}</div>
</div>
    </div>
</div>


<div className="col sm-12 h4 lg-12 md-12 padding margin-top-20">
Father
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Full Name:</div> <div className='text-small'>{preview.father_name}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Nationality:</div> <div className='text-small'>{preview.father_nationality}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Occupation:</div> <div className='text-small'>{preview.father_occupation}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of Birth:</div> <div className='text-small'>{preview.father_date_of_birth}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding margin-top-20">
Mother
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Full Name:</div> <div className='text-small'>{preview.mother_name}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Nationality:</div> <div className='text-small'>{preview.mother_nationality}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Occupation:</div> <div className='text-small'>{preview.mother_occupation}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of Birth:</div> <div className='text-small'>{preview.mother_date_of_birth}</div>
</div>
    </div>
</div>

<div className="col sm-12 h4 lg-12 md-12 padding  margin-top-20">
Criminal Details
</div>

<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Convicted of a crime:</div> <div className='text-small'>{preview.crimeConvict ? "Yes" : "No"}</div>
</div>
    </div>

</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding border round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Ever dismissed from public service:</div> <div className='text-small'>{preview.dismissedPublicService ? "Yes" : "No"}</div>
</div>
    </div>

</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Education
</div>
<div className="col sm-12 h4 lg-12 md-12 padding">
<div className="" >
<table className='table section border text-smaller' >
                <thead>
                    <th>Inst Name</th>
                    <th>certificate Name</th>
                    <th>certificate Number</th>
                    <th>certificate Type</th>
                    <th>program</th>
                    <th>From</th>
                    <th>To</th>
                </thead>
                <tbody >
                {
                     preview.education ?
                     preview.education.map(docs=>(
                        <tr className="" key={docs.id}>
                            <td >{docs.institution_name}</td>
                            <td >{docs.certificate_name}</td>
                            <td >{docs.certificate_number}</td>
                            <td >{docs.certificate_type}</td>
                            <td >{docs.program_of_study}</td>
                            <td >{docs.start_year}</td>
                            <td >{docs.end_year}</td>
                          
                        </tr>
                    ))
                    :""
                }
                </tbody>
              </table>
</div>

</div>

    </div>

    <div>

    </div>

    <div>

    </div>
                    </div>
                }
                footer={<RowFlex justify='flex-end' gap={1}>
                          <Button  bg="error" raised small onClick={handleClose}>Cancel</Button> 
          <Button  bg='primary' raised small onClick={postData}>Yes, I want to submit</Button>
                </RowFlex>}
                />  
                </div>

        </div>
        
        </div>
      )

}
