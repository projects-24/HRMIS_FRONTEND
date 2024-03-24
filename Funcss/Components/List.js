import React from 'react'
const List = ({children ,funcss , content}) => {
return ( 
<ul className={`list ${funcss}`}>
{children} {content}
</ul>
);
}
export default List;