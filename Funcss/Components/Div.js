import React from 'react'
const Container = ({children ,funcss , content}) => {
return ( 
<div className={funcss}>
{children} {content}
</div>
);
}
export default Container;