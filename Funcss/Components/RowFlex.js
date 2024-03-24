import React from 'react'
const RowFlex = ({children ,funcss , content , justify}) => {
return ( 
<div className={`row-flex ${funcss} ${justify}`}>
{children} {content}
</div>
);
}
export default RowFlex;