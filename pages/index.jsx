import Head from 'next/head'
import { useState, useEffect } from "react"
import Axios from 'axios';
import endPoint from "../components/endPoint"
import Loader from '../components/loader';
import Alert from 'funuicss/ui/alert/Alert';
import Success from '../components/default/success';
import Input from 'funuicss/ui/input/Input'
import Button from 'funuicss/ui/button/Button'
import IconicInput from 'funuicss/ui/input/Iconic'
import { PiArrowRight, PiCheck, PiKey, PiPaperPlaneRight } from 'react-icons/pi'
import { FunGet } from 'funuicss/js/Fun';
import { SaveToken } from "../components/Functions"
import Text from 'funuicss/ui/text/Text';
import Circle from 'funuicss/ui/specials/Circle'
import FunLoader from "funuicss/ui/loader/Loader"
import RowFlex from 'funuicss/ui/specials/RowFlex';
import Section from "funuicss/ui/specials/Section"
export default function Home() {

  const [loader, setloader] = useState(false)
  const [message, setmessage] = useState("")
  const [success, setsuccess] = useState(false)


  const [api_online, setapi_online] = useState(false)
  useEffect(() => {
    if (!api_online) {
      Axios.get("https://hrmis.onrender.com")
        .then((res) => {
          setapi_online(true)
          console.log(res)
          // if(res.data.status == "ok"){
          // }
        })
        .catch(err => {
          setmessage(err.message)
        })
    }
  })



  useEffect(() => {
    setTimeout(() => {
      setmessage(null)
    }, 4000)
  }, [message])


  const handleLogin = () => {
    if (api_online) {
      const email = FunGet.val("#email")
      const password = FunGet.val("#password")

      if (email && password) {
        setloader(true)
        Axios.post(endPoint + "/login", { email: email, password: password })
          .then(doc => {
            setloader(false)
            SaveToken(doc.data.staff, doc.data.token)
              .then(() => {
                setsuccess(true)
                setTimeout(() => {
                  window.location.assign(doc.data.staff.position_id == 5 ? "/user/account" : "/dashboard")
                }, 2000);
              })
          }).catch(err => {
            if (err.message === "Request failed with status code 422") {
              setmessage("Wrong credentials")
              setloader(false)
            } else {
              setmessage(err.message)
              setloader(false)
            }

          })
      } else {
        setmessage("Make sure to enter your email and password")
        setloader(false)
      }
    } else {
      setmessage("wait for API to finish loading!")
    }
  }


  return (
    <div className='central' style={{
      minHeight: '100vh',
      minWidth: "100vw"
    }}>
      <Head>
        <title>HR Management</title>
        <meta name="GSS HRMIS" content="Ghana Statistical Service Human Resource Management Information System" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {
        loader ?
          <Loader />
          : ""
      }

      {
        success ?
          <Success message="Login successfully" />
          : ""
      }
      <div className="login_container">
        <div className="container_left">

        </div>
        <div className="container_right">
          <div className="form">

            <div className="section">
              <div className="h2">
                <Text funcss="margin-bottom-10" bold block>GSS HRMIS</Text>
              </div>
              <div className="h2">Welcome!</div>
              <Text text='Enter email and password to login' />
              <Section gap={1}>
                <RowFlex gap={1}>
                  <Text text={"API Status"} bold color='dark300' size='small' />
                  {
                    api_online ?
                      <Circle size={1.3} bg='success' >
                        <PiCheck />
                      </Circle>
                      :
                      <Circle size={1.3} bg='dark800 text-dark'>
                        <FunLoader size={20} />
                      </Circle>
                  }

                </RowFlex>
              </Section>
              <div >
                <IconicInput
                  funcss="section full-width"
                  leftIcon={<PiPaperPlaneRight />}
                  input={<Input rounded id='email' type="email" label="Email" funcss="text-minified" fullWidth bordered />}
                />
                <p />
                <IconicInput
                  funcss="section full-width"
                  leftIcon={<PiKey />}
                  input={<Input rounded id='password' type="password" label="Password" funcss="text-minified" fullWidth bordered />}
                />
              </div>
              {
                message && <div>
                  <Alert type='warning' standard fixed='top-right' message={message} />
                </div>
              }

              <div className='margin-top-30'>
                <Button fullWidth raised bg='primary' endIcon={<PiArrowRight />} rounded bold onClick={handleLogin}>Login account</Button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
