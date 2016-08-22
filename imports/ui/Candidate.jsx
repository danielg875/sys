import React, { Component } from 'react'

export default class Candidate extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.deleteCandidate = this.deleteCandidate.bind(this)
  }
  handleChange(e){
    let value= e.target.value,
    property = $(e.target).attr("data-attribute"),
    index = $(e.target).closest(".row").attr("data-index")
    this.props.editCandidate(value,property,index)
  }
  deleteCandidate(e){
    this.props.deleteCandidate($(e.target).closest(".row").attr("data-index"))
  }
  render(){
    return (
      <div className='row' data-index={this.props.index}>
        <div className='col col-md-7'>
          <div className='form-group'>
            <input className="w-input entry-standard" value={this.props.candidate.name} data-attribute="name" placeholder="Enter your candidate's full name" type="text" onChange={this.handleChange}/>
          </div>
        </div>
        <div className='col col-md-5'>
          <div className='form-group'>
            <input className="w-input entry-standard" value={this.props.candidate.email} data-attribute="email" placeholder="Enter your candidate's email" type="email" onChange={this.handleChange}/>
          </div>
        </div>
        <div className='col col-md-3'>
          <div className='form-group'>
            <input className="w-input entry-standard" value={this.props.candidate.id} data-attribute="id" placeholder="Candidate's ID (optional)" type="text" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="col col-md-1">
          <button type='button' style={{marginTop:"10px"}} className="btn btn-sm btn-danger" onClick={this.deleteCandidate}><span className="glyphicon glyphicon-remove"></span></button>
        </div>
      </div>
    )
  }
}
