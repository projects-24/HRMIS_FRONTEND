import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from './loader';
import endPoint from "./endPoint";
import Axios from 'axios';

import Button from 'funuicss/ui/button/Button'
import AppBar from 'funuicss/ui/appbar/AppBar'
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiBriefcase, PiCards, PiCaretDown, PiGear, PiGearLight, PiGraph, PiKey, PiLeaf, PiPaperPlane, PiSignOut, PiUser, PiUserCircle, PiUsers } from "react-icons/pi";
import { GetToken, SignOut } from "./Functions"

import Hr from 'funuicss/ui/specials/Hr'
import DropDown from 'funuicss/ui/drop/Down'
import DropItem from 'funuicss/ui/drop/Item'
import DropMenu from 'funuicss/ui/drop/Menu'
import Section from "funuicss/ui/specials/Section";

const Nav = ({ noSideBar, active }) => {
  const [user, setuser] = useState("")
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
          funcss="height-70  z-index-10 card"
          left={
            <img src="/logo.png" className="height-40-max" />
          }
          right={
            <div className="">
              <DropDown side="right">
                <Button funcss={"myBtn"} text={`${user.first_name} ${user.last_name}`} startIcon={
                  <div className="dark800 text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiUser /></div>} endIcon={<PiCaretDown />} />
                <DropMenu
                  animation="ScaleUp"
                  width="180px"
                  hoverable="hoverable"
                  duration={0.2}>
                  <Link href={"/user/account"}>
                    <Button
                      text="Account"
                      startIcon={<div><PiUser /></div>}
                    />
                  </Link>
                  <Button
                    text=" Password"
                    startIcon={<div> <PiKey /> </div>}
                  />

                  <Hr />
                  <Button
                    onClick={() => SignOut()}
                    text="Sign Out"
                    startIcon={<div > <PiSignOut /> </div>}
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

                <Link href="/user/account">
                  <Button
                    funcss={`text-left flex-start padding-5 text-minified ${active == '6' ? 'card' : ''}`}
                    text="Profile"
                    rounded
                    fullWidth
                    startIcon={<div className="dark800 text-dark width-30 height-30 padding-5 roundEdgeSmall central"><PiUser /> </div>}
                  />
                </Link>
                {user.position_id != 5 &&
                  <Link href="/dashboard">
                    <Button
                      style={{ marginTop: '1rem' }}
                      funcss={`text-left flex-start padding-5 text-minified ${active == '1' ? 'card' : ''}`}
                      text="Dashboard"
                      rounded
                      fullWidth
                      startIcon={<div className="dark800 text-dark width-30 height-30 padding-5 roundEdgeSmall central"><PiGraph /> </div>}
                    />
                  </Link>
                }
                {
                  user.directorate_id == 2 &&
                  <Link href="/configurations">
                    <Button
                      style={{ marginTop: '1rem' }}
                      funcss={`text-left flex-start padding-5 text-minified ${active == '2' ? 'card' : ''}`}
                      text="Org Settings"
                      rounded
                      fullWidth
                      startIcon={<div className="dark800 text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiGear /> </div>}
                    />
                  </Link>
                }
                {
                  user.position_id != 5 &&
                  <Link href="/staff/profiling">
                    <Button
                      style={{ marginTop: '1rem' }}
                      funcss={`text-left flex-start padding-5 text-minified ${active == '3' ? 'card' : ''}`}
                      text="Staff Profiling"
                      rounded
                      fullWidth
                      startIcon={<div className="dark800 text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiUsers /> </div>}
                    />
                  </Link>
                }
                <DropDown funcss="no-padding ">
                  <Button
                    style={{ marginTop: '1rem' }}
                    funcss={`text-left flex-start padding-5 text-minified ${active == '4' ? 'card' : ''}`}
                    text="Leave Mgt"
                    rounded
                    fullWidth
                    startIcon={<div className="dark800 text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiLeaf /> </div>}
                  />
                  <DropMenu
                    width="200px"
                    animation="ScaleUp"
                    hoverable="hoverable"
                    funcss="padding"
                    duration={0.2}>
                    <Link href="/leave/myplaning">
                      <Button
                        funcss={`text-left flex-start padding-5 text-minified`}
                        text="My Planing"
                        rounded
                        fullWidth
                        startIcon={<div className="dark900  text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiPaperPlane /> </div>}
                      />
                    </Link>
                    {
                      user.position_id != 5 &&
                      <Link href="/leave/planing">
                        <Button
                          funcss={`text-left flex-start padding-5 text-minified`}
                          text="Leave Planing"
                          rounded
                          fullWidth
                          startIcon={<div className="dark900  text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiCards /> </div>}
                        />
                      </Link>
                    }
                    <Section funcss="bb" />
                    <Link href="/leave/myrequests">
                      <Button
                        funcss={`text-left flex-start padding-5 text-minified`}
                        text="My Requests"
                        rounded
                        fullWidth
                        startIcon={<div className="dark900  text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiUser /> </div>}
                      />
                    </Link>
                    {
                      user.position_id != 5 &&
                      <Link href="/leave/request">
                        <Button
                          funcss={`text-left flex-start padding-5 text-minified`}
                          text="All Requests"
                          rounded
                          fullWidth
                          startIcon={<div className="dark900  text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiBriefcase /> </div>}
                        />
                      </Link>
                    }
                    {
                      user.directorate_id == 2 &&
                      <>
                        <Section funcss="bb" />
                        <Link href="/leave/configuration">
                          <Button
                            funcss={`text-left flex-start padding-5 text-minified`}
                            text="Configuration"
                            rounded
                            fullWidth
                            startIcon={<div className="dark900  text-dark width-30 height-30 padding-5 roundEdgeSmall central"> <PiGearLight /> </div>}
                          />
                        </Link>
                      </>

                    }


                  </DropMenu>
                </DropDown>




                <div className="margin-top-60 ">
                  <Button
                    style={{ marginTop: '1rem' }}
                    funcss={`text-left flex-start padding-5 text-minified _card`}
                    bold
                    color="dark400"
                    text="Sign Out"
                    fullWidth
                    startIcon={<div className="text-error width-30 height-30 padding-5 roundEdgeSmall central"> <PiSignOut /> </div>}
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