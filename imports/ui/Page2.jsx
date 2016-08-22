import React,{ Component } from 'react'
import Candidate from './Candidate.jsx'
export default class Page2 extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let value=e.target.value,
    property=$(e.target).attr("data-property")
    this.props.changePosition(value,property)
  }
  render(){
    let i=0,
    candidates = this.props.candidates.map((candidate)=>{
      return <Candidate candidate={candidate} index={++i} key={i} editCandidate={this.props.editCandidate} deleteCandidate={this.props.deleteCandidate}/>
    })
    return (
      <div>
      <h3>Tell us about the job and your candidates</h3>
      <p>EzyRef categorises references and candidates by positions they're applying for.</p>

      <input className='w-input entry-standard' data-property="name" value={this.props.position.name} placeholder="Position name" type="text" onChange={this.handleChange}/>
      <input className="w-input entry-standard" data-property="department" value={this.props.position.department} type="text" placeholder="Position department (optional)" onChange={this.handleChange}/>
      <br/>
      <br/>
      <h5>Add candidates to your position</h5>
      {candidates}
      <br/><br/>
      <button type='button' className="proto-button proto-smaller" onClick={this.props.addCandidate}>Add Candidate</button>
      </div>
    )
  }
}
