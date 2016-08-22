import React,{ Component } from 'react'

export default class Free extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
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

  render(){
    return (
      <div data-index={this.props.index}>
        <div className="row">
          <div className="col col-md-12">
            <label>Free response question <i onClick={this.deleteQuestion} className="glyphicon glyphicon-trash"></i></label>
            <input className="w-input entry-standard" data-property="question" value={this.props.question.question} placeholder="Question" type="text" onChange={this.handleChange}/>
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='col col-md-4'>
            <label>Wordcount minimum (leave for none)</label>
            <input className="w-input entry-standard" data-property="min" value={this.props.question.min} type="text" onChange={this.handleChange}/>
          </div>
          <div className='col col-md-4'>
            <label>Wordcount maximum (leave for none)</label>
            <input className="w-input entry-standard" data-property="max" value={this.props.question.max} type="text" onChange={this.handleChange}/>
          </div>
          <div className='col col-md-4'>
            <label>Skippable question?</label>
            <input type="checkbox" data-property="isSkippable" checked={this.props.question.isSkippable} onChange={(e)=>{ this.handleChange(e,$(e.target).is(":checked")) }}/>
          </div>
        </div>
        <br/><br/><br/>
        </div>
    )
  }
}
