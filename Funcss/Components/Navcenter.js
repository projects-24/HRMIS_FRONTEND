import React , {Component} from "react"
export default class Navcenter extends Component{
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