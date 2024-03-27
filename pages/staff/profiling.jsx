import Link from 'next/link'
import Nav from './../../components/Nav';
import { useState, useEffect } from 'react';
import Loader from '../../components/loader';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dynamic from "next/dynamic"
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
  const [open, setOpen] = React.useState(false);
  const [current, setcurrent] = useState(null)
  const [currentId, setcurrentId] = useState("")
  const [userStatus, setuserStatus] = useState("")
  const [docs, setdocs] = useState(null)

  const handleClose = () => {
    setOpen(false);
  };

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
          "titles": ["Staff", "Firstname", "Lastname", "Directorate", "position", "Section", "Region", "View"],
          "fields": ["id", "firstName", "lastName", "directorate", "position", "section", "region"],
        }
        setdocs(data)
      }).catch(err => console.log(err.message))
    }
  })



  const Edit = () => {
    Axios.patch(endPoint + "/staff/updatestaff/" + currentId,
      { status: userStatus },
      {
        headers: {
          authorization: `Bearer ${token}`,

        }

      }
    ).then(() => {
      alert("successfully updated")
      setOpen(false)
      setdocs(null)
    }).catch(err => {
      alert(err.message)
      setOpen(false)

    })
  }





  if (user) {
    return (
      <div className={ "content"}>


        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Status for {current ? current.surname + " " + current.middleName + " " + current.firstName : ""}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select the users status.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              select
              id="name"
              label="Select user status"
              type="email"
              defaultValue={current ? current.status : ""}
              fullWidth
              onChange={(e) => setuserStatus(e.target.value)}
              variant="outlined"
            >
              <option value="leave">On Leave</option>
              <option value="field">On Field</option>
              <option value="post">On Post</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={Edit}>Make Changes</Button>
          </DialogActions>
        </Dialog>
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
                // user.department === "Human Resource" ?
                <Link href="/form/personal">
                  <button className="button raised gradient text-white width-200-min roundEdge"
                    style={{
                      position: "fixed",
                      bottom: "10px",
                      right: "10px",
                      zIndex: 5
                    }}>
                    <i className="lni lni-user"></i> New Staff
                  </button>
                </Link>
                //  :""
              }
            </div>


          </div>


          {
            docs ?
              <div className={"_card"} >

                <Table
                  data={docs}
                  pageSize={10}
                  customColumns={[
                    {
                      title: 'Actions',
                      render: (data) => (
                        <Circle bg='primary' size={1.5} onClick={() => {

                        }}>
                          <PiEye />
                        </Circle>
                      ),
                    },
                  ]}
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
