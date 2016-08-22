import React,{ Component } from 'react'

export default class DisplaySingle extends Component {
  constructor(props){
    super(props)
  }

  handleChange(e){
    console.log(e.target.value);
  }

  render(){
    let i=0
    let radios = this.props.question.options.map((option)=>{
      return <label className="radio-inline"><input type="radio" name="optradio" id={i++} onChange={this.handleChange}/>{option}</label>
    })
    return (
      <div className="form-group">
        <label className="control-label"><strong>{this.props.index+1}. </strong>{this.props.question.question}</label><br/><br/>
        {radios}
      </div>
    )
  }
}
