import React,{ Component } from 'react'

export default class DisplayMultiple extends Component {
  constructor(props){
    super(props)
    this.answers=[]
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    let value = e.target.value,
    index = this.props.index
    if($(e.target).is(":checked")){
      this.answers.push(value)
    }
    else {
      let answerIndex = _.indexOf(this.answers,value)
      this.answers.splice(answerIndex,1)
    }
    this.props.changeResponses(index,this.answers)
  }

  render(){
    let i=0
    let checkBoxes = this.props.question.options.map((option)=>{
      return <label key={i} className="checkbox-inline"><input type="checkbox" id={i++} onChange={this.handleChange} value={option}/>{option}</label>
    })
    return (
      <div className="form-group">
        <label className="control-label"><strong>{this.props.index+1}. </strong>{this.props.question.question}</label><br/><br/>
        {checkBoxes}
      </div>
    )
  }
}
