import React,{ Component } from 'react'
import PDFgenerator from './../../client/lib/z.pdfgenerator'
export default class CandidatesTable extends Component {
  constructor(props) {
    super(props)
    this.sendEmail=this.sendEmail.bind(this)
    this.showDetails=this.showDetails.bind(this)
  }

  sendEmail(){
    this.props.sendEmailToCandidate(this.props.candidate)
  }

  showDetails(){
    this.props.showDetails(this.props.candidate)
  }

  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  downloadPdf(e){
    let candidateId = this.props.candidate._id
    console.log(candidateId)
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
    return(
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.candidate.name}</td>
        <td>{this.props.candidate.email}</td>
        <td>{this.props.candidate.id}</td>
        <td>
        <button className="btn btn-xs btn-default" onClick={this.sendEmail}><a href="#"><i className="glyphicon glyphicon-envelope"  data-toggle="tooltip" data-placement="left" title="Send the candidate an email"></i></a></button>
        <button className="btn btn-xs btn-default" onClick={this.showDetails}><a href="#"><i className="glyphicon glyphicon-eye-open"  data-toggle="tooltip" data-placement="left" title="View the candidate"></i></a></button>
        <button data-candidateId={this.props.candidate._id} className="btn btn-xs btn-default" onClick={this.downloadPdf.bind(this)}><a href="#"><i className="glyphicon glyphicon-download"  data-toggle="tooltip" data-placement="left" title="Download the PDF"></i></a></button>
        </td>
      </tr>
    )
  }
}
