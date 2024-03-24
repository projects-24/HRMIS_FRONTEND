import Link from "next/link";
import { useEffect ,useState} from "react";
import Loader from './loader';
import endPoint from "./endPoint";
import  Axios  from 'axios';
import Icon from 'funuicss/component/Icon'

import Button from 'funuicss/ui/button/Button'
import AppBar from 'funuicss/ui/appbar/AppBar'
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiBriefcase, PiCards, PiCaretDown, PiGear, PiGearLight, PiGraph, PiKey, PiLeaf, PiSignOut, PiUser, PiUserCircle, PiUsers } from "react-icons/pi";
import { List, ListItem } from "@mui/material";
import {GetToken, SignOut} from "./Functions"

import DropUp from 'funuicss/ui/drop/Up'
import Hr from 'funuicss/ui/specials/Hr'
import DropDown from 'funuicss/ui/drop/Down'
import DropItem from 'funuicss/ui/drop/Item'
import DropMenu from 'funuicss/ui/drop/Menu'

const Nav = ({noSideBar, active}) => {
  const [dropdown, setdropdown] = useState(false)
  const [user, setuser] = useState("")  
  const [dropDown, setdropDown] = useState(false)
  const [token, settoken] = useState("")

const [drop1, setdrop1] = useState(false);

            useEffect(() => {
             const drop = document.querySelector(".myBtn")
             window.addEventListener("click" ,(e)=>{
                if(e.target != drop){
                  setdrop1(false)
                }else{
                   setdrop1(!drop1)
                }
             })
            },[])


  
  useEffect(() => {
    if(!user ){
      GetToken()
      .then((res) => {
        setuser(res.user)
        settoken(res.token)
      })
        }
  })

  



const LogOut = ()=>{
  Axios.patch(endPoint + "/logout" , {
    headers:{
      authorization:`Bearer ${token}`
    }
  }
   ).then(()=>{
    new Promise((resolve, reject) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      resolve()
    }).then(()=>{
      window.location.assign("/")
  
      // Axios.post(endPoint + "/logout",   {
      //   headers: {
      //        authorization: `Bearer ${token}`,
           
      //     }
           
      //  }).then(()=>{
      //  }).catch(err=>alert(err.message))
    })
   }).catch(err=>console.log(err.message))
  
}


if(user){
  return ( 
    <div>
<AppBar
fixedTop
funcss="height-70  "
left = {
<img src="/logo.png" className="height-40-max" />
}
right={
<div className="">
<DropDown side="right">
<Button funcss={"myBtn"}  text={`${user.first_name} ${user.last_name}`} startIcon={<PiUser />} endIcon={<PiCaretDown />} />
<DropMenu 
animation="ScaleUp" 
width="180px"
hoverable="hoverable" 
duration={0.2}>

<Button
text="Account"
startIcon={<PiUser />}
/>
<Button
text=" Password"
startIcon={<PiKey />}
/>

    <Hr />
    <DropItem>
  <Button
  onClick={() => SignOut()}
text="Sign Out"
startIcon={<PiSignOut />}
/></DropItem>
</DropMenu>
</DropDown>

</div>
}

/>



 
 {
  !noSideBar ?
  <div className="leaveSidebar">

  <div className="">

  <Link href="/dashboard">
    <Button
    funcss={`text-left flex-start ${active == '1' ? 'card' : ''}`}
    text="Dashboard"
    rounded
    fullWidth
    startIcon={<PiGraph />}
    />
    </Link>

  <Link href="/configurations">
    <Button
  style={{marginTop:'1rem'}}
    funcss={`text-left flex-start ${active == '2' ? 'card' : ''}`}
    text="Org Settings"
    rounded
    fullWidth
    startIcon={<PiGear />}
    />
    </Link>
  <Link href="/staff/profiling">
    <Button
  style={{marginTop:'1rem'}}
    funcss={`text-left flex-start ${active == '3' ? 'card' : ''}`}
    text="Staff Profiling"
    rounded
    fullWidth
    startIcon={<PiUsers />}
    />
    </Link>
    <Button
  style={{marginTop:'1rem'}}
    funcss={`text-left flex-start ${active == '4' ? 'card' : ''}`}
    text="Leave Management"
    rounded
    fullWidth
    startIcon={<PiLeaf />}
    onClick={() => {
      setdropdown(!dropdown)
    } }
    />

{
  dropdown &&
  <div>
  <div className="dark700 round-edge padding text-dark100">
   <Link href="/leave/request">
   <Button
 style={{marginTop:'1rem'}}
   funcss={`text-left flex-start`}
   text="Leave Request"
   rounded
   fullWidth
   startIcon={<PiBriefcase />}
   />
   </Link>
   <Link href="/leave/planing">
   <Button
 style={{marginTop:'1rem'}}
   funcss={`text-left flex-start`}
   text="Leave Planing"
   rounded
   fullWidth
   startIcon={<PiCards />}
   />
   </Link>
   <Link href="/leave/configuration">
   <Button
 style={{marginTop:'1rem'}}
   funcss={`text-left flex-start`}
   text="Configuration"
   rounded
   fullWidth
   startIcon={<PiGearLight />}
   />
   </Link>
   </div>
  </div>
}
 
 <div className="margin-top-100 padding-top-20 ">
 <Button
  style={{marginTop:'1rem'}}
  raised
    bg="error"
    text="Sign Out"
    rounded
    fullWidth
    startIcon={<PiSignOut />}
    onClick={() => SignOut()}
    />
 </div>

{
// isAdmin ?
<>

  {/* <Link href="/staff/profiling">
      <div className="button section">
      <i className="lni lni-users"></i> Staff Profiling
      </div>
    </Link>
  
          <div className="dropDown">
    <div className='lighter padding pointer hover-up  trigger' style={{margin:'1.5rem 0' , borderRadius:"5rem"}} onClick={TriggerDrop}>
      <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
      </div>
      <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
   <Link href="/leave/planing">
   <div className="button section">
      <i className="icon-check"></i> Leave Planner
      </div>
   </Link>
    <Link href="/leave/requests">
      <div className="button section">
      <i className="lni lni-bolt"></i>  Leave Requests
      </div>
    </Link>
      </div>
    </div>
    <Link href="/field/request">
    <div className="button section">
    <i className="lni lni-infinite"></i> Field Request
    </div>
  </Link>
  <Link href="/retirement/management">
      <div className="button section">
      <i className="icon-clock"></i> Retirement Mgt
      </div>
    </Link>
    <Link href="/staff/promotion">
      <div className="button section">
      <i className="lni lni-plus"></i> Promotion
      </div>
    </Link>
    <Link href="/staff/reports">
      <div className="button section">
      <i className="lni lni-notepad"></i> Reports
      </div>
    </Link>

   
    <Link href="/field/request">
    <div className="button section">
    <i className="lni lni-infinite"></i> Field Activity
    </div>
  </Link> */}
</>
}


  </div>
</div>
:""
 }
  
    </div>
 );
}else{
  return <Loader />
}
}
 
export default Nav;