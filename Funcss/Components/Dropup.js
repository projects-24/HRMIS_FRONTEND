import React from "react"
const Dropup = ({funcss, children})=>{
    return(
        <div className={`dropup-hover ${funcss}`}>
            {children}
        </div>
    )
}
export default Dropup