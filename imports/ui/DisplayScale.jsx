import React,{ Component } from 'react'

export default class DisplayScale extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    let index = this.props.index,
    value = e.target.value
    console.log(value);
    this.props.changeResponses(index,value)
  }

  render(){
    return (
      <div className="form-group">
        <label className="control-label"><strong>{this.props.index+1}. </strong>{this.props.question.question}</label><br/><br/>
        <input style={{width:"50%"}} type="range" max={this.props.question.length} onChange={this.handleChange}/>
      </div>
    )
  }
}
