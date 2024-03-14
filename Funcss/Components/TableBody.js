import React from 'react'
const TableBody = ({children , funcss}) => {
return ( 
<tbody className={`${funcss}`}>
{children}
</tbody>
);
}
export default TableBody;