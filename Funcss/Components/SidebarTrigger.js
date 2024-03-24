import React , {Component} from "react"
export default class SidebarTrigger extends Component{
render(){
return ( 
<div className={`
sidebar-trigger
${this.props.funcss}
`} 
>
{this.props.children}
</div>
);
}
}