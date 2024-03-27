import React, { PureComponent } from 'react';
import Nav from './../components/Nav';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
import dynamic from 'next/dynamic'
import { GetRequest, GetToken } from '../components/Functions';
import Text from 'funuicss/ui/text/Text';
import Header from '../components/Header';
const _Bar = dynamic(() => import("./../components/Chart/_Bar"), { ssr: false })
export default function Dashboard() {
  const [user, setuser] = useState("")
  const [data, setdata] = useState("")

  useEffect(() => {
    if (!user) {
      GetToken()
        .then((res) => {
          setuser(res.user)
        })
    }
  })

  useEffect(() => {
    if (!data) {
      GetRequest("/dashboard")
        .then(res => setdata(res))
        .catch(err => console.log(err))
    }
  })



  if (user) {
    return (
      <div className="">
        <div className='content'>
          <Nav active={1} />

          <div className="">
            <div className="margin-bottom-30">
              <Header title={"Dashboard And Analytics"} sub_title={<>
                Welcome  <span className="text-bold ">{user.title} {user.first_name}   {user.middle_name} {user.last_name} </span>
              </>} />
            </div>

            <div>
              {
                user.position != "Officer" ?
                  <>
                    <div className="row m-section central">

                      <div className="col sm-12 md-3 lg-3 padding">
                        <div className="_card">
                          <div className="text-small" style={{ color: "#909090" }}>
                            All staffs
                          </div>
                          <div className="h2">
                            {data && data[0].number}
                          </div>
                        </div>
                      </div>

                      <div className="col sm-12 md-3 lg-3 padding">
                        <div className="_card">
                          <div className="text-small" style={{ color: "#909090" }}>
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
                          <div className="text-small" style={{ color: "#909090" }}>
                            On leave
                          </div>
                          <div className="h2">
                            {data && data[2].number}
                          </div>
                        </div>
                      </div>

                      <div className="col sm-12 md-3 lg-3 padding">
                        <div className="_card">

                          <div className="text-small" style={{ color: "#909090" }}>
                            On Field
                          </div>
                          <div className="h2">
                            {data && data[3].number}
                          </div>
                        </div>
                      </div>
                      <div className="m-section">
                        <div className="_card dark200" style={{ overflowX: "auto" }}>
                          <div className="margin-bottom-20">
                            <Text text='Staff' />
                            <Text text='Status' heading='h3' block />
                          </div>
                          {
                            data && <_Bar data={[
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
                      </div>

                    </div>
                  </>
                  : ""
              }

            </div>

          </div>
        </div>
      </div>
    )
  } else {
    return <Loader />
  }
}
