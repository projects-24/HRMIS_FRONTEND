import React from 'react'
import Link  from 'next/link';
const Anchor = ({children ,funcss , href , text}) => {
return ( 
<Link href={href}>
<a className={`navbar-link ${funcss}`}>
{children} {text}
</a>
</Link>
);
}
export default Anchor;