import React,{ Component } from 'react'
import AdminHeader from './AdminHeader.jsx'
import PDFgenerator from '../../client/lib/z.pdfgenerator'

export default class AdminCandidates extends Component {
  constructor(props) {
    super(props)
    this.state={candidates:[],currentCandidate:{}}
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitCandidate = this.submitCandidate.bind(this)
    this.deleteCandidate = this.deleteCandidate.bind(this)
  }
  componentWillMount(){
    let self=this
    Meteor.call('getAllCandidates',Meteor.userId(),function(err,res){
      if(!err){
        self.setState({candidates:res})
      }
    })
  }

  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  handleClick(e){
    let index = $(e.target).closest("td").attr("data-index"),
    candidates = this.state.candidates,
    currentCandidate = Object.assign({},candidates[index])
    currentCandidate.index = index
    this.setState({currentCandidate:currentCandidate})
    $("#candidate_edit_modal").modal("show")
  }

  handleChange(e){
    let value = e.target.value,
    property = $(e.target).attr("data-property"),
    currentCandidate = this.state.currentCandidate
    currentCandidate[property] = value
    this.setState({currentCandidate:currentCandidate})
  }

  deleteCandidate(e){
    let candidateId = $(e.target).closest("button").attr("data-candidateId"),
    index = $(e.target).closest("td").attr("data-index"),
    self = this
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: true,
      html: false
    }, function(){
      Meteor.call('deleteCandidate',candidateId,(err,res)=>{
        if(!err){
          Bert.alert({
            title:"Success",
            message:"Candidate successfully deleted",
            type:"success"
          })
          let candidates = self.state.candidates
          candidates.splice(index,1)
          self.setState({candidates:candidates})
        }
        else {
          Bert.alert({
            title:"Error",
            message:err.reason,
            type:"danger"
          })
        }
      })

      })
  }

  submitCandidate(e){
    e.preventDefault()
    let currentCandidate = this.state.currentCandidate,
    index = currentCandidate.index
    delete currentCandidate.index
    console.log(currentCandidate)
    Meteor.call("updateCandidate",currentCandidate,(err,res)=>{
      if(!err){
        Bert.alert({
          title:"Success",
          message:"Candidate succcessfully updated",
          type:"success"
        })
        let candidates = this.state.candidates
        candidates[index] = currentCandidate
        this.setState({candidates:candidates})
        $(".close").click()
      }
      else {
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }
    })
  }

  downloadPdf(e){
    let candidateId = $(e.target).closest("button").attr("data-candidateId")
    Meteor.call("downloadPdf",candidateId,function(err,res){
      if(err){
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }
      else {
        new PDFgenerator().generate(res)
      }
    })
  }

  render(){
    let i=0
    let rows=this.state.candidates.map((candidate)=>{
      return <tr key={candidate._id}>
                <td>{i+1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.createdBy}</td>
                <td>{candidate.email}</td>
                <td>{candidate.id}</td>
                <td data-index={i++} >
                 <button className="btn btn-xs btn-default"  href="#" onClick={this.handleClick}><i data-toggle="tooltip" data-placement="left" title="Edit the candidate" className="glyphicon glyphicon-edit"></i></button>
                 <button className="btn btn-xs btn-default"  href="#" onClick={this.deleteCandidate} data-candidateId={candidate._id}><i data-toggle="tooltip" data-placement="left" title="Delete the candidate"  className="glyphicon glyphicon-trash"></i></button>
                 <button className="btn btn-xs btn-default"  href="#" onClick={this.downloadPdf} data-candidateId={candidate._id}><i data-toggle="tooltip" data-placement="left" title="Download the Pdf"  className="glyphicon glyphicon-download"></i></button>
                </td>
              </tr>
    })
    return (
      <div className="standard-page">
        <div className="container">
        <AdminHeader/>
        <div className="row" style={{marginTop:'20px'}}>
          <h5>Candidate Lists</h5>
          <table className="table">
                <thead>
                    <tr>
                        <th>SN.</th>
                        <th>Candidate Name</th>
                        <th>Added By</th>
                        <th>Email</th>
                        <th>Candidate ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        </div>
        <div className="modal fade" id="candidate_edit_modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className='modal-header'>
              <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-heading">Candidate Details</h5>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.submitCandidate}>
                <label className="control-label">Candidate Name</label>
                <input type="text" data-property="name" id="candidate_name" className="form-control" value={this.state.currentCandidate.name} onChange={this.handleChange}/>
                <label className="control-label">Candidate Email</label>
                <input type="text" data-property="email" id="candidate_email" className="form-control" value={this.state.currentCandidate.email}  onChange={this.handleChange}/>
                <label className="control-label">Candidate ID</label>
                <input type="text" data-property="id" id="candidate_id" className="form-control" value={this.state.currentCandidate.id}  onChange={this.handleChange}/>
                <button type="submit" className="btn btn-success">Uodate</button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
