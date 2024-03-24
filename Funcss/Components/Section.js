import React from 'react'
const Section = ({children , funcss}) => {
return ( 
<div className={funcss} style={{paddingTop:"5px" , paddingBottom:"5px"}}>
{children}
</div>
);
}
export default Section;