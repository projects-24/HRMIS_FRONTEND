import React from 'react'
import {useState , useEffect} from "react"
export default function Modal({children , funcss , animation , duration , open}) {
// useEffect(()=>{
// const modal = document.querySelector(".modal")
// window.addEventListener("click" ,(e)=>{
// if(e.target === modal){
// modal.style.display = "none"
// }
// })
// })
if(open){
return (
<div className={`${funcss} modal`} style={{animation:` ${duration}s ${animation}`}}>
<div className="modal-content">
{children}
</div> 
</div>
)
}{
return (
<div></div>
)
}
}
