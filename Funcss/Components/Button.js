import React from 'react'

export default function Button({color , bg, funcss , size, onChange , onClick, startIcon, endIcon , children, text}) {
return (
<button className={`button
text-${color}
${bg} 
${funcss}
${size}
`} 
onClick={onClick}
onChange={onChange}
>
{startIcon} &nbsp;
{text}
{children} &nbsp;
{endIcon}
</button>
)
}


