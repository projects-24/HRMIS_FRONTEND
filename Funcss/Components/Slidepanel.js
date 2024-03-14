
import React , {Component} from "react"
export default class Slidepanel extends Component{
render(){
return ( 
<div className={`slide-panel slide-${this.props.slide} ${this.props.funcss}`}>
{this.props.children}
</div>     
);
}
}