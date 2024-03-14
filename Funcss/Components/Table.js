import React from 'react'
const Table = ({children , funcss , bordered , stripped , hoverable , showTotal , total}) => {
return ( 
<table className={`table ${funcss}  ${bordered}  ${stripped}  ${hoverable}`}>
{children}
{
    showTotal &&
<tr className="borderless">
<td className="padding borderless text-bold">  Total  {total} </td>
</tr>
}
</table>
);
}
export default Table;