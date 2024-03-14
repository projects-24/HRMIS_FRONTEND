import React from 'react'
const TableRow = ({children , funcss}) => {
return ( 
<tr className={`${funcss}`}>
{children}
</tr>
);
}
export default TableRow;