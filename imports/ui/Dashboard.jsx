import React, { Component } from 'react'
import CandidateSearched from './CandidateSearched.jsx'
import CandidateDetailsModal from './CandidateDetailsModal.jsx'
import CreditContainer from '../Containers/creditContainers'
export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={positions:[],candidateDetails:{}}
    this.showDetails=this.showDetails.bind(this)
  }

  showDetails(candidate){
    this.setState({candidateDetails:candidate})
    $("#candidate_details_modal").modal("show")
  }

  componentWillMount(){
    let self=this
    Meteor.call("getPosition",function(err,res){
      if(!err){
        console.log(res);
        self.setState({positions:res})
      }
    })
  }

  removePosition(id){
    let position=this.state.positions
    const index= _.indexOf( _.pluck(position,'_id'),id)
    position.splice(index,1)
    this.setState({positions:position})
  }
  render() {
    let positions = this.state.positions.map((position)=>{
      return <CandidateSearched removePosition={this.removePosition.bind(this)} position={position} key={position._id}  showDetails={this.showDetails}/>
    })
    return (
      <div className="standard-page">
       <div className="custom-container">
         <div className="space-helper-div"></div>
         <div className="w-clearfix heading-line">
           <h4>Positions</h4>
           <span className="label label-info pull-right" style={{marginRight:10, fontSize: 20}}>
              <CreditContainer user={Meteor.userId()} />
           </span>
           <a href="/position/new" className="add-new-text">Add new </a>
         </div>
         <div className="below-heading-wrap">
           <div className='row form-group'>
             <div className='col col-md-9'>
               <input placeholder="Position and candidate quick search" type="text" className='w-input entry-standard' />
             </div>
             <div className='col col-md-3'>
               <button className='proto-button' style={{width:'100%'}}>Clear Search</button>
             </div>
           </div>
           <div className="full-wrap">
             <div className="position-wrap">
               <div className="panel-group">
                  {positions}
               </div>
             </div>
           </div>
         </div>
       </div>
       <CandidateDetailsModal candidate={this.state.candidateDetails}/>
      </div>
    )
  }
}
