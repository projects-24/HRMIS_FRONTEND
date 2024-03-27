import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from './loader';
import endPoint from "./endPoint";
import Axios from 'axios';

import Button from 'funuicss/ui/button/Button'
import AppBar from 'funuicss/ui/appbar/AppBar'
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiBriefcase, PiCards, PiCaretDown, PiGear, PiGearLight, PiGraph, PiKey, PiLeaf, PiSignOut, PiUser, PiUserCircle, PiUsers } from "react-icons/pi";
import { GetToken, SignOut } from "./Functions"

import Hr from 'funuicss/ui/specials/Hr'
import DropDown from 'funuicss/ui/drop/Down'
import DropItem from 'funuicss/ui/drop/Item'
import DropMenu from 'funuicss/ui/drop/Menu'

const Nav = ({ noSideBar, active }) => {
  const [dropdown, setdropdown] = useState(false)
  const [user, setuser] = useState("")
  const [dropDown, setdropDown] = useState(false)
  const [token, settoken] = useState("")

  const [drop1, setdrop1] = useState(false);

  useEffect(() => {
    const drop = document.querySelector(".myBtn")
    window.addEventListener("click", (e) => {
      if (e.target != drop) {
        setdrop1(false)
      } else {
        setdrop1(!drop1)
      }
    })
  }, [])



  useEffect(() => {
    if (!user) {
      GetToken()
        .then((res) => {
          setuser(res.user)
          settoken(res.token)
        })
    }
  })





  const LogOut = () => {
    Axios.patch(endPoint + "/logout", {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    ).then(() => {
      new Promise((resolve, reject) => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        resolve()
      }).then(() => {
        window.location.assign("/")

        // Axios.post(endPoint + "/logout",   {
        //   headers: {
        //        authorization: `Bearer ${token}`,

        //     }

        //  }).then(()=>{
        //  }).catch(err=>alert(err.message))
      })
    }).catch(err => console.log(err.message))

  }


  if (user) {
    return (
      <div>
        <AppBar
          fixedTop
          funcss="height-70  "
          left={
            <img src="/logo.png" className="height-40-max" />
          }
          right={
            <div className="">
              <DropDown side="right">
                <Button funcss={"myBtn"} text={`${user.first_name} ${user.last_name}`} startIcon={
                  <div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiUser /></div>} endIcon={<PiCaretDown />} />
                <DropMenu
                  animation="ScaleUp"
                  width="180px"
                  hoverable="hoverable"
                  duration={0.2}>

                  <Button
                    text="Account"
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"><PiUser /></div>}
                  />
                  <Button
                    text=" Password"
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiKey /> </div>}
                  />

                  <Hr />
                  <Button
                    onClick={() => SignOut()}
                    text="Sign Out"
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiSignOut /> </div>}
                  />
                </DropMenu>
              </DropDown>

            </div>
          }

        />




        {
          !noSideBar ?
            <div className="leaveSidebar padding">

              <div className="">

                <Link href="/dashboard"> 
                  <Button
                    funcss={`text-left flex-start padding-5 text-minified ${active == '1' ? 'dark200 ' : ''}`}
                    text="Dashboard"
                    rounded
                    fullWidth
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"><PiGraph /> </div>}
                  />
                </Link>

                <Link href="/configurations">
                  <Button
                    style={{ marginTop: '1rem' }}
                    funcss={`text-left flex-start padding-5 text-minified ${active == '2' ? 'dark200 ' : ''}`}
                    text="Org Settings"
                    rounded
                    fullWidth
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiGear /> </div>}
                  />
                </Link>
                <Link href="/staff/profiling">
                  <Button
                    style={{ marginTop: '1rem' }}
                    funcss={`text-left flex-start padding-5 text-minified ${active == '3' ? 'dark200 ' : ''}`}
                    text="Staff Profiling"
                    rounded
                    fullWidth
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiUsers /> </div>}
                  />
                </Link>
                <DropDown funcss="no-padding">
                  <Button
                    style={{ marginTop: '1rem' }}
                    funcss={`text-left flex-start padding-5 text-minified ${active == '4' ? 'dark200 ' : ''}`}
                    text="Leave Mng"
                    rounded
                    fullWidth
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiLeaf /> </div>}
                    onClick={() => {
                      setdropdown(!dropdown)
                    }}
                  />
                  <DropMenu
                  width="200px"
                    animation="ScaleUp"
                    hoverable="hoverable"
                    duration={0.2}>
                    <DropItem>
                      <Link href="/leave/planing">
                        <Button
                          funcss={`text-left flex-start padding-5 text-minified`}
                          text="Leave Planing"
                          rounded
                          fullWidth
                          startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiCards /> </div>}
                        />
                      </Link>
                    </DropItem>
                    <DropItem>
                      <Link href="/leave/request">
                        <Button
                          funcss={`text-left flex-start padding-5 text-minified`}
                          text="Leave Request"
                          rounded
                          fullWidth
                          startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiBriefcase /> </div>}
                        />
                      </Link>
                    </DropItem>
                    <DropItem>
                      <Link href="/leave/configuration">
                        <Button
                          funcss={`text-left flex-start padding-5 text-minified`}
                          text="Configuration"
                          rounded
                          fullWidth
                          startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiGearLight /> </div>}
                        />
                      </Link>
                    </DropItem>



                  </DropMenu>
                </DropDown>




                <div className="margin-top-100 padding-top-20 ">
                  <Button
                    style={{ marginTop: '1rem' }}
                    funcss={`text-left flex-start padding-5 text-minified _card`}
                    bold
                    color="dark400"
                    text="Sign Out"
                    fullWidth
                    startIcon={<div className="dark200 width-30 height-30 padding-5 roundEdgeSmall central"> <PiSignOut /> </div>}
                    onClick={() => SignOut()}
                  />
                </div>




              </div>
            </div>
            : ""
        }

      </div>
    );
  } else {
    return <Loader />
  }
}

export default Nav;