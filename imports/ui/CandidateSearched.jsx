import React,{ Component } from 'react'
import CandidatesTable from './CandidatesTable.jsx'
export default class CandidateSearched extends Component {
  constructor(props) {
    super(props)
    this.sendEmailToCandidate=this.sendEmailToCandidate.bind(this)
  }

  sendEmailToCandidate(candidate){
    Meteor.call("sendEmailToCandidate",candidate,this.props.position,(err,res)=>{
      if(err){
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }
      else {
        Bert.alert({
          title:"Success",
          message:"Your email has been sent successfully",
          type:"success"
        })
      }
    })
  }

  removePosition(){
    if(!confirm("Are You Sure You want to delete?"))
      return

    Meteor.call('deletePosition', this.props.position._id,(err,res)=>{
        if(!err){
          this.props.removePosition(this.props.position._id)
        }
    })
  }



  render() {
    let panelId='panel'+this.props.position._id,
    i=0;
    collapseId="collapse"+this.props.position._id,
    collapseHref="#collapse"+this.props.position._id,
    editHref="/position/"+this.props.position._id
    let rows = this.props.position.candidates.map((candidate)=>{
      return <CandidatesTable candidate={candidate} showDetails={this.props.showDetails} sendEmailToCandidate={this.sendEmailToCandidate} key={candidate._id} index={++i}/>
    })
    return(
    <div className="panel panel-default" id={panelId}>
        <div className="panel-heading" data-toggle="collapse" data-target={collapseHref} href={collapseHref}>
             <div className="panel-title">
               <div className="row">
                 <div className="col-md-8">
                   <a>

                     <h4>{this.props.position.name}</h4>
                   </a>
                 </div>
                 <div className="col-md-4">
                   <a className="pull-right btn btn-xs btn-danger" href="#" onClick={this.removePosition.bind(this)}   data-toggle="tooltip" data-placement="top" title="Delete Position"><i className="glyphicon glyphicon-trash"></i></a>

                   <a className="pull-right btn btn-xs btn-default" href={editHref} data-toggle="tooltip" data-placement="top" title="Edit the position"><i className="glyphicon glyphicon-edit"></i></a>

                 </div>
               </div>

      </div>

        </div>
        <div id={collapseId} className="panel-collapse collapse ">
          <div className="panel-body">
            <table className="table table-striped">
              <thead>
              <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>ID</th>
              <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </table>
          </div>
        </div>
    </div>
        )
  }
}
