const Card = ({
color,
bg , 
width, 
height, 
minHeight ,
minWidth,
margin,
padding,
funcss,
children,
// fab
}) => {
return ( 
<div className={`card text-${color} ${bg} ${funcss}`}
style={{
width:`${width}`, 
height:`${height}`,
minHeight:`${minHeight}`,
minWidth:`${minWidth}`,
margin:`${margin}`,
padding:`${padding}`

}}
>
<div class="relative">
{children}
{/* {
fab.length > 0 &&
<div class="text-large card-fab">{fab}</div>
} */}
</div>
</div>
);
}

export default Card;