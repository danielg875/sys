import React,{ Component } from 'react'

export default class Single extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
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
      <div>
        <div className="row">
          <div className="col col-md-12">
            <label>Single-select question</label>
            <input className="w-input entry-standard" data-property="question" value={this.props.question.question} placeholder="Question" type="text"/>
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
            <div className="row">
              <div className='col col-md-8'>
                <input className="w-input entry-standard" placeholder="Option text" type="text"/>
              </div>
              <div className="col col-md-4">
                <button type='button' className="proto-button proto-smaller">Remove</button>
              </div>
            </div>
            <button type='button' className="proto-button proto-smaller">Add Option</button>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    )
  }
}
