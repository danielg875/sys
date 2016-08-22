import React,{ Component } from 'react'

export default class CandidateDetailsModal extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let references=<div></div>,
    i=0
    console.log(this.props.candidate);
    if(this.props.candidate.references && this.props.candidate.references.length>0){
      references = this.props.candidate.references.map((ref)=>{
        return <div key={ref._id}><span className="control-label"><strong>Reference : </strong>{ref.refree}</span><br/><br/></div>
      })
    }
    return (
      <div className="modal fade" id="candidate_details_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <div className='modal-header'>
            <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>

            <h5 className="modal-heading">Candidate Details</h5>
          </div>
          <div className='modal-body'>
            <span className="control-label"><strong>Name : </strong>{this.props.candidate.name}</span><br/><br/>
            <span className="control-label"><strong>Email : </strong>{this.props.candidate.email}</span><br/><br/>
            <span className="control-label"><strong>ID : </strong>{this.props.candidate.id?this.props.candidate.id:"NA"}</span><br/><br/>
            {references}
          </div>
          </div>
        </div>
      </div>
    )
  }
}
