import { useEffect,useState } from "react"
const Snackbar = ({message, close , timeOut , open ,position , funcss , animation , duration}) => {
const [state, setstate] = useState(true)

// useEffect(() => {
// if(open){
// if(timeOut > 0){
// setTimeout(() => {
// setstate(false)
// }, timeOut);
// }

// }
// })
if(open){
return ( 
<div>
<div className={`snackbar ${position} ${funcss}`} style={{animation:` ${duration}s ${animation}`}}>
<div className="snackbar-content">
<div className="snackbar-body">
{message}
</div>
<div>
<span className="close-snackbar">
<span>{close}</span>
</span>
</div>

</div>
</div>
</div>
);
}else{
    <div></div>
}
}

export default Snackbar;