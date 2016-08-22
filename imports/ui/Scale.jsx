import React,{ Component } from 'react'

export default class Scale extends Component {
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
            <label>On a scale of ... question <i onClick={this.deleteQuestion} className="glyphicon glyphicon-trash"></i></label>
            <input className="w-input entry-standard" data-property="question" value={this.props.question.question} placeholder="Question" type="text" onChange={this.handleChange}/>
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='col col-md-2'>
            <label>Scale Length</label>
            <input className="w-input entry-standard" data-property="length" value={this.props.question.length} type="number" onChange={this.handleChange}/>
          </div>
          <div className='col col-md-4'>
            <label>Bottom Scale Text</label>
            <input className="w-input entry-standard" data-property="lowText" value={this.props.question.lowText} type="text" onChange={this.handleChange}/>
          </div>
          <div className='col col-md-4'>
            <label>Top Scale Text</label>
            <input className="w-input entry-standard" data-property="highText" value={this.props.question.highText} type="text" onChange={this.handleChange}/>
          </div>
          <div className='col col-md-2'>
            <label>Skippable question?</label>
            <input type="checkbox" data-property="isSkippable" checked={this.props.question.isSkippable} onChange={(e)=>{ this.handleChange(e,$(e.target).is(":checked")) }}/>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    )
  }
}
