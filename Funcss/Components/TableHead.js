import React from 'react'
const TableHead = ({children , funcss}) => {
return ( 
<thead className={`${funcss}`}>
{children}
</thead>
);
}
export default TableHead;