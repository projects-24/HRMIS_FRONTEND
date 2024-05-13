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
import { PiEye, PiTrash, PiUserPlus } from 'react-icons/pi';
import Circle from "funuicss/ui/specials/Circle"
import DeleteModal from '../../components/modal/Delete';
import ToolTip from 'funuicss/ui/tooltip/ToolTip';
import Tip from 'funuicss/ui/tooltip/Tip';

export default function Profiling() {
  const [loading, setloading] = useState(false)
  const [token, settoken] = useState("")
  const [user, setuser] = useState("")
  const [docs, setdocs] = useState(null)
  const [deleteId, setdeleteId] = useState('')

  useEffect(() => {
    GetToken()
      .then(res => {
        setuser(res.user)
        settoken(res.token)
      })
  }, [])


  useEffect(() => {
    if (!docs && token) {
      console.log(token)
      Axios.get(endPoint + "/staff", {
        headers: {
          Authorization: `Bearer ${token}`
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
        deleteId &&
        <DeleteModal  route={"/staff"} id={deleteId}/>
      }
     
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

           
            </div>


          </div>


          {
            docs ?
              <div className={"_card"} >

                <Table
                  data={docs}
                  title='Staff Profiling'
                  pageSize={10}
                  right={<>   {
                    user.directorate_id === 2 ?
                    <Link href="/form/personal">
                     <Button text='Create Staff' bold bg='primary' raised startIcon={<PiUserPlus />}/>
                    </Link>
                     :""
                  }</>}
                  filterableFields={['region', 'section', 'directorate', 'position', 'gender']}
                  // customColumns={[
                  //   {
                  //     title: 'Actions',
                  //     render: (data) => (
                  //       <ToolTip>
                  //       <span onClick={() => setdeleteId(data.id) }>
                  //       <Circle size={2} funcss='raised' bg='error'>
                  //          <PiTrash />
                  //        </Circle>
                  //       </span>
                  // <Tip funcss='z-index-5' tip="left"  animation="ScaleUp" duration={0.12} content="Delete"/>
                  // </ToolTip>
                  //     ),
                  //   }
                  // ]}
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
