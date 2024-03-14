import React from 'react'

export default function Breadcrumb({type , funcss}) {
  return (
   <span>
       {
           type === "slash" &&
           <span className={`text-bold inline-bloc margin-left-10 margin-right-10 ${funcss}`}> / </span>
       } 
       {
           type === "greater" || type === "right" &&
           <i className={`fas fa-angle-right text-bold inline-bloc margin-left-10 margin-right-10 ${funcss}`}></i>
       } 
       {
           type === "less" || type === "left" &&
           <i className={`fas fa-angle-left text-bold inline-bloc margin-left-10 margin-right-10 ${funcss}`}></i>
       } 
       {
           type === "straight" &&
           <span className={`text-bold inline-bloc margin-left-10 margin-right-10 ${funcss}`}> {`|`} </span>
       } 
   </span>
  )
}
