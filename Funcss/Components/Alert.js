import React from 'react'
export default function Alert({message, funcss , type , outline}) {
return (
<div>
{
outline &&
<div className={`alert ${type}-outline`}>
<div className="alert-icon">
{
type === "success" &&
<i className="fa fa-check"></i>
}
{
type === "info" &&
<i className="fa fa-info-circle"></i>
}
{
type === "warning" &&
<i className="fa fa-exclamation-triangle"></i>
}
{
type === "danger" &&
<i className="far fa-times-circle" ></i>
}
</div>
<div className="alert-text">
{message}
</div>
</div>

}

{
!outline &&

<div className={`alert ${type} ${funcss}`}>
<div className="alert-icon">
{
type === "success" &&
<i className="fa fa-check"></i>
}
{
type === "info" &&
<i className="fa fa-info-circle"></i>
}
{
type === "warning" &&
<i className="fa fa-exclamation-triangle"></i>
}
{
type === "danger" &&
<i className="far fa-times-circle" ></i>
}
</div>
<div className="alert-text">
{message}
</div>
</div>
}
</div>


)



}
