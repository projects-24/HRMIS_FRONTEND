
import React , {Component} from "react"
export default class Panelcontent extends Component{
render(){
return ( 
<div className={`slide-panel-content ${this.props.funcss}`}>
{this.props.children}
</div>     
);
}
}