import React , {Component} from "react"
export default class LinkWrapper extends Component{
render(){
return ( 
<div className={`
link-wrapper
${this.props.bg} 
${this.props.funcss}
`} 
>
{this.props.children}
</div>
);
}
}