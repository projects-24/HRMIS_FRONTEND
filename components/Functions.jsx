import Axios from "axios"
import endPoint from "./endPoint"


export const SaveToken = (user , token) => {
    return new Promise((resolve, reject) => {
        sessionStorage.setItem("tk" , JSON.stringify(token))
        sessionStorage.setItem("me" , JSON.stringify(user))
        resolve()
    })
}

export const GetToken = () => {
    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem("tk")){
            const tk = JSON.parse(sessionStorage.getItem("tk"))
            const user = JSON.parse(sessionStorage.getItem("me"))
            resolve(
                {
                    user: user ,
                    token: tk
                }
            )
        }else{
            window.location.assign("/")
        }
    })
}


export const SignOut = () => {
    new Promise((resolve, reject) => {
        GetToken()
        .then(() => {
            sessionStorage.removeItem("tk")
            sessionStorage.removeItem("user")
            resolve()
        })
    })
    .then(() => window.location.assign("/"))
}

export const GetRequest = (route) => {
return new Promise((resolve, reject) => {
    GetToken()
    .then(res => {
        Axios.get(endPoint + route ,  {
            headers: {
                 authorization: `Bearer ${res.token}`,
              }
               
           })
        .then( res => {
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
 
})
}
export const PatchRequest = (route, id , data) => {
return new Promise((resolve, reject) => {
    const rt = endPoint + route + "/" + id
    console.log(rt)
    Axios.patch(rt , data )
    .then( res => {
        resolve(res)
    })
    .catch(err => reject(err))
})
}

export const FormatDate = (date) => {
const req = date 
const spl_date = req.slice(0 , req.indexOf("T")).split("-").reverse().join('-')
const sl_date = spl_date

// const sl_time = req.slice(0 , req.indexOf("T"))
return {
    date:sl_date
}
}
export const FormatEmail = (email) => {
return email.slice(0, email.indexOf("@"))
}