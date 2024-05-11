import Link from 'next/link'
import Nav from './../../components/Nav';
import { useState, useEffect } from 'react';
import Loader from '../../components/loader';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import * as React from 'react';
import Header from '../../components/Header'
import { GetToken } from '../../components/Functions';
import Button from "funuicss/ui/button/Button"
import Table from 'funuicss/ui/table/Table';
import { PiEye } from 'react-icons/pi';
import Circle from "funuicss/ui/specials/Circle"
export default function Profiling() {
  const [loading, setloading] = useState(false)
  const [token, settoken] = useState("")
  const [user, setuser] = useState("")
  const [docs, setdocs] = useState(null)


  useEffect(() => {
    GetToken()
      .then(res => {
        setuser(res.user)
        settoken(res.token)
      })
  }, [])


  useEffect(() => {
    if (!docs) {
      Axios.get(endPoint + "/staff", {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(dataDocs => {
        const getDocs = dataDocs.data
        console.log(getDocs)
        let data = {
          "data": getDocs,
          "titles": ["Staff", "Firstname", "Lastname", "Directorate", "position", "Section", "Region", 'Gender'],
          "fields": ["id", "firstName", "lastName", "directorate", "position", "section", "region", 'gender'],
        }
        setdocs(data)
      }).catch(err => console.log(err.message))
    }
  })







  if (user) {
    return (
      <div className={ "content"}>


     
        {
          loading ?
            <Loader />
            : ""
        }

        <Nav active={3} />

        <div className="">

          <div>
            <Header title={"Staff Profiling"} sub_title={"Create and manage staff records and profiles."} />

            <div className="row-flex fit space-between m-section">

              {
                user.directorate_id === 2 ?
                <Link href="/form/personal">
                  <button className="button raised primary text-bold text-white width-200-min roundEdge"
                    style={{
                      position: "fixed",
                      bottom: "10px",
                      right: "10px",
                      zIndex: 5
                    }}>
                    <i className="lni lni-user"></i> New Staff
                  </button>
                </Link>
                 :""
              }
            </div>


          </div>


          {
            docs ?
              <div className={"_card"} >

                <Table
                  data={docs}
                  pageSize={10}
                  filterableFields={['region', 'section', 'directorate', 'position', 'gender']}
                />

              </div>
              : <Loader />
          }
        </div>
      </div>
    )

  } else {
    return <Nav />
  }

}
