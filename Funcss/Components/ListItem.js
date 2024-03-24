import React from 'react'
const ListItem = ({children ,funcss , content}) => {
return ( 
<li className={`list ${funcss}`}>
{children} {content}
</li>
);
}
export default ListItem;