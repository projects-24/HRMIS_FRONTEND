import Link from 'next/link'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Nav from './../components/Nav';
import { useState,useEffect } from 'react';
import Loader from '../components/loader';
import Super from '../data/super';
import Account from "./account"
import  Axios from 'axios';
import endPoint from '../components/endPoint';
import DaysLeft from './../components/daysLeft';
import dynamic from 'next/dynamic'
import { GetRequest, GetToken } from '../components/Functions';
import Text from 'funuicss/ui/text/Text';
import Header from '../components/Header';
const _Bar = dynamic(()=>import("./../components/Chart/_Bar") ,{ssr:false})
const _Liquid = dynamic(()=>import("./../components/Chart/_Liquid") ,{ssr:false})
export default function Dashboard() {
    const [user, setuser] = useState("")
    const [data, setdata] = useState("")
  
    useEffect(() => {
      if(!user ){
        GetToken()
        .then((res) => {
          setuser(res.user)
        })
          }
    })  
    
    useEffect(() => {
      if(!data){
       GetRequest("/dashboard")
       .then( res => setdata(res))
       .catch(err => console.log(err))
      }
       })

 

    const [token, settoken] = useState("")
    const [post, setpost] = useState(0)
    const [field, setfield] = useState(0)
    const [leave, setleave] = useState(0)
    const [isAdmin, setisAdmin] = useState(false)
    const [canUserApproveRequest, setcanUserApproveRequest] = useState(null)
  
    console.log(user)
   if(user){
    return (
      <div className="">
        <div className='content'>
          <Nav active={1} />

          <div className="">
            <div className="margin-bottom-30">
            <Header title={"Dashboard And Analytics"} sub_title={  <>
                  Welcome  <span className="text-bold p-text">{user.title} {user.first_name}   {user.middle_name} {user.last_name} </span>
                </>}/>
            </div>
              {/* <div className="_card relative">
              <div className="_dashboard_image_wrapper lighter border">
              <img src="/avatar.svg" className='_dashboard_image' alt="" />
              </div>
              <div className="row-flex">
                <div>
           
                </div>
                <div style={{flex:"80%"}}>
                <div className="section row-flex space-between" style={{padding:"2px 5px"}}>
                  <div>
                
                  </div>
                  <div >
                <span className="secondary-text" > Position:</span> <span className='success text-white text-small round-edge text-bold' style={{padding:"2px 5px"}}> {user.position}</span> 
                </div>
              </div>
                
              <div className="row">
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text" > Directorate:</span> {user.department}
                </div>
              </div>
              
                <div className="row">
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> status:</span> {user.status}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> Accum Leave days:</span> {user.no_of_leave_days}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> Address:</span> {user.address}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> Section:</span> {user.section}
                </div>
                <div  className="col sm-12 md-12 lg-12" style={{padding:"2px 5px"}}>
              <span className="secondary-text"> Active Years Left:</span> <span> <DaysLeft Year={user.retirementAge} funcss="text-bold"/> </span>
              </div>
  
              </div>
             
                </div>
              </div>
              </div> */}

                <div>
                {
              user.position != "Officer" ?
              <>
                    <div className="row m-section central">
         
              <div className="col sm-12 md-3 lg-3 padding">
              <div className="_card">
                  <div className="text-small" style={{color:"#909090"}}>
                      All staffs
                  </div>
                  <div className="h2">
                    {data && data[0].number}
                  </div>
              </div>
          </div>
        
                  <div className="col sm-12 md-3 lg-3 padding">
                      <div className="_card">
                          <div className="text-small" style={{color:"#909090"}}>
                              On post
                          </div>
                          <div className="h2">
                          {data && data[1].number}
                          </div>
                      </div>
                  </div>
                  <div className="col sm-12 md-3 lg-3 padding">
                      <div className="_card">
                          {/* <img src="/leaveImg.png" className='fit' style={{maxWidth:"30px"}} alt="" /> */}
                          <div className="text-small" style={{color:"#909090"}}>
                              On leave
                          </div>
                          <div className="h2">
                          {data && data[2].number}
                          </div>
                      </div>
                  </div>
         
                  <div className="col sm-12 md-3 lg-3 padding">
                      <div className="_card">

                          <div className="text-small" style={{color:"#909090"}}>
                               On Field
                          </div>
                          <div className="h2"> 
                          {data && data[3].number}
                          </div>
                      </div>
                  </div>
                  {/* <div className="m-section">
                <div className="_card dark200" style={{overflowX:"auto"}}>
                   <div className="margin-bottom-20">
                  <Text text='Staff'/>
                  <Text text='Status' heading='h3' block/>
                   </div>
                {
                  data &&   <_Bar data={[
                    {
                        "name": "All Staffs",
                        "number": 9
                    },
                    {
                        "name": "At Post",
                        "number": 9
                    },
                    {
                        "name": "On Leave",
                        "number": 0
                    },
                    {
                        "name": "On Field",
                        "number": 0
                    }
                ]} />
                }
                  </div>
                </div> */}
              
              </div>
              </>
              :""
            }
     
                </div>
           
          </div>
      </div>
      </div>
    )
   }else{
    return <Loader />
   }
          }
