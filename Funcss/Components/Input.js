
import React , {Component} from "react"
export default class Input extends Component{
render(){
if(this.props.bordered){
return ( 
<input className={`
input
${this.props.funcss}
bordered
`} 
onChange={this.props.onChange}
defaultValue = {this.props.defaultValue}
type={this.props.type}
placeholder={this.props.label}
name={this.props.name}
/>

);   
}else if (this.props.bordereless){
return ( 
<input className={`
input
${this.props.funcss}
borderless
`} 
onChange={this.props.onChange}
defaultValue = {this.props.defaultValue}
type={this.props.type}
placeholder={this.props.label}
name={this.props.name}
/>

);
}else{
return ( 
<input className={`
input
${this.props.funcss}
`} 
onChange={this.props.onChange}
defaultValue = {this.props.defaultValue}
type={this.props.type}
placeholder={this.props.label}
name={this.props.name}
/>

);
}
}
}