import React,{ Component } from 'react'
import Option from './Option.jsx'
export default class Multiple extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.addOption = this.addOption.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }

  deleteQuestion(e){
    let index = $(e.target).closest(".row").parent("div").attr("data-index")
    this.props.deleteQuestion(index)
  }

  handleChange(e,val){
    let value = val
    if(typeof(val)=='undefined'){
      value=e.target.value
    }
    property = $(e.target).attr("data-property"),
    index = $(e.target).closest(".row").parent("div").attr("data-index")
    this.props.editQuestion(value,property,index)
  }
  addOption(e){
    this.props.addOption($(e.target).closest(".row").parent("div").attr("data-index"))
  }
  render(){
    let i=0,
    options = this.props.question.options.map((option)=>{
      return <Option option={option} index={++i} key={i} questionIndex={this.props.index} editOption={this.props.editOption} deleteOption={this.props.deleteOption}/>
    })
    return (
      <div data-index={this.props.index}>
        <div className="row">
          <div className="col col-md-12">
            <label> {this.props.question.title}  <i onClick={this.deleteQuestion} className="glyphicon glyphicon-trash"></i></label>
            <input className="w-input entry-standard" data-property="question" value={this.props.question.question} placeholder="Question" type="text" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="row">
          <div className='col col-md-4'>
            <label>Skippable question?</label>
            <input type="checkbox" data-property="isSkippable" checked={this.props.question.isSkippable} onChange={(e)=>{ this.handleChange(e,$(e.target).is(":checked")) }}/>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <label>Add options</label>
            {options}
            <button type='button' className="proto-button proto-smaller" onClick={this.addOption}>Add Option</button>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    )
  }
}
