import Head from 'next/head'
import {useState, useEffect} from "react"
import  Axios  from 'axios';
import endPoint from "../components/endPoint"
import Loader from '../components/loader';
import Alert from 'funuicss/ui/alert/Alert';
import Success from '../components/default/success';
import Input from 'funuicss/ui/input/Input'
import Button from 'funuicss/ui/button/Button'
import IconicInput from 'funuicss/ui/input/Iconic'
import {PiArrowRight, PiKey , PiPaperPlaneRight} from 'react-icons/pi'
import { FunGet } from 'funuicss/js/Fun';
import {SaveToken} from "../components/Functions"
import Text from 'funuicss/ui/text/Text';

export default function Home() {

    const [loader, setloader] = useState(false)
    const [message, setmessage] = useState("")
    const [success, setsuccess] = useState(false)

    useEffect(()=>{
      setTimeout(()=>{
          setmessage(null)
      }, 4000)
  },[message])


  const handleLogin = ()=>{

    const email = FunGet.val("#email")
    const password = FunGet.val("#password")
 
    if(email && password){
      setloader(true)
      Axios.post(endPoint + "/login" , {email : email , password:password})
      .then(doc=>{
        setloader(false)
        SaveToken(doc.data.staff , doc.data.token)
        .then(()=>{
          setsuccess(true)
          setTimeout(() => {
          window.location.assign("/dashboard")
          }, 2000);
        })
      }).catch(err=>{
        if(err.message === "Request failed with status code 422"){
          setmessage("Wrong credentials")
          setloader(false)
        }else{
        setmessage(err.message)
        setloader(false)
        }
      
      })
    }else{
      setmessage("Make sure to enter your email and password")
      setloader(false)
     }
  }

  
      return (
        <div className='central' style={{
          minHeight:'100vh' ,
          minWidth:"100vw"
        }}>
          <Head>
            <title>HR Management</title>
            <meta name="GSS HRMIS" content="Ghana Statistical Service Human Resource Management Information System" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
          </Head>
          {
            loader ?
            <Loader />
            :""
          }

             {
              success ?
              <Success message="Login successfully" />
              :""
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
            <div className='margin-top-40'>
            <IconicInput
        funcss="section full-width"
        leftIcon={ <PiPaperPlaneRight />}
        input={<Input rounded id='email' type="email" label="Email" funcss="full-width" bordered />}
        />
        <p />
        <IconicInput
        funcss="section full-width"
        leftIcon={ <PiKey />}
        input={<Input rounded id='password' type="password" label="Password" funcss="full-width" bordered />}
        />
            </div>
           {
            message &&  <div>
            <Alert type='warning'   fixed='top-right' message={message}/>
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
