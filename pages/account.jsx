import React from 'react'
import Nav from '../components/Nav'
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Account() {
   const [user, setuser] = useState(null)
   

   useEffect(() => {
       if(!user){
           if(localStorage.getItem("user")){
               setuser(
                   JSON.parse(
                       localStorage.getItem("user")
                   )
               )
           }
       }
   })
if(user){
   return (
      <div>
          <Nav />
     <div className="content">
     <div className="row">
              <div className="col sm-12 md-3 lg-3 padding">
                  <img src="/avatar.svg" className='width-200-max' alt="" />
                  <div className="section">
                  <div class="upload-btn-wrapper">
                  <button class="btnUpload"><i class="lni lni-upload"></i> Upload Profile</button>
                  <input type="file" name="myfile" />
                  </div>
                  </div>
              </div>
              <div className="col sm-12 md-9 lg-9 padding">
               <div className="card">
               <div className="padding">
                  <div className="row-flex space-between">
                  <div className="h4">
            {user.firstname} {user.middleName} {user.lastName}
            </div>
            <div>
               active service until <span className="text-bold p-text"> {user.retirementAge}</span>
            </div>
                  </div>
               <div className="section positionText">{user.grade}</div>
            </div>
               <div className="row">
   
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Department:</span> {user.department}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Section:</span> {user.section}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Employment status:</span> {user.employmentStatus}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Grade:</span> {user.grade}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Position:</span> {user.position}
                  </div>
         
           
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Address:</span> {user.address}
                  </div>
         
           
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Email:</span> {user.email}
                  </div>
           
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Staff Id:</span> {user.staffId}
                  </div>
         
           
               </div>
               </div>
              </div>
          </div>
     </div>
      </div>
    )
}else{return <Nav />}
}
