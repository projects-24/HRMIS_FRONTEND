
import React , {Component} from "react"
export default class Panelfront extends Component{
render(){
return ( 
<div className={`slide-panel-image ${this.props.funcss}`}>
{this.props.children}
</div>     
);
}
}