import React from "react"
const Dropdown = ({funcss, children})=>{
    return(
        <div className={`dropdown-hover ${funcss}`}>
            {children}
        </div>
    )
}
export default Dropdown