import React from 'react'
export default function Typography({size ,bg ,color, children , hoverBg, hoverText , text , heading , funcss}) {
return (
<div className={`
text-${size} 
text-${color}
${bg}
hover-text-${hoverText}
hover-${hoverBg}
${heading}
${funcss}
`}>
{children}
{text}
</div>
)
}

