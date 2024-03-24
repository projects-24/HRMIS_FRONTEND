import React from 'react'
const Container = ({children , funcss}) => {
return ( 
<div className={`container ${funcss}`}>
{children}
</div>
);
}
export default Container;