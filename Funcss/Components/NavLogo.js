import React , {Component} from "react"
export default class NavLogo extends Component{
render(){
return ( 
<div className={`
nav-logo
${this.props.bg} 
${this.props.funcss}
`} 
>
{this.props.children}
</div>
);
}
}