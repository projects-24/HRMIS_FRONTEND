import React , {Component} from "react"
export default class NavBar extends Component{
render(){
return ( 
<div className={`
navigation-bar
${this.props.bg} 
${this.props.funcss}
`} 
>
{this.props.children}
</div>
);
}
}