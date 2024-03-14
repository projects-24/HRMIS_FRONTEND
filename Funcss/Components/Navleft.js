import React , {Component} from "react"
export default class Navleft extends Component{
render(){
return ( 
<div className={`
${this.props.bg} 
${this.props.funcss}
`} 
>
{this.props.children}
</div>
);
}
}