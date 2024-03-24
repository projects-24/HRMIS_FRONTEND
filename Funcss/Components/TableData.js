import React from 'react'
const TableData = ({children , funcss}) => {
return ( 
<td className={`${funcss}`}>
{children}
</td>
);
}
export default TableData;