import EmailSystem from '../EmailSystem'
import Candidates from './../../imports/api/candidates'
import PositionDb from './../../imports/api/positions'
import ResultsDb from './../../imports/api/results'
import ResponsesDb from './../../imports/api/responses'
Meteor.methods({
  sendEmailToCandidate:function(candidate,position){
    console.log(candidate)
    new EmailSystem().sendCandidateEmail({

      name:candidate.name,
      email: candidate.email,
      candidateId: candidate._id,
      job: position.name,
      positionId: position._id,
      host: this.connection.httpHeaders.host
    })
  },
  updateCandidate:function(candidate){
    let id=candidate._id
    delete candidate._id
    return Candidates.update({_id:id},{$set:candidate})
  },
  deleteCandidate:function(candidateId){
    Candidates.remove({_id:candidateId})
    PositionDb.update({},{$pull:{candidates:[candidateId]}})
  },
  downloadPdf:function(candidateId){

    let candidate = Candidates.findOne({_id:candidateId}),
    position = PositionDb.findOne({candidates:candidateId}),
    refrees = ResultsDb.find({candidate:candidateId}).fetch(),

    refree=[]

    _.each(refrees,(refreeData)=>{
      let email=refreeData.refree,
        responseData=ResponsesDb.findOne({referee:refreeData._id})
        console.log(responseData)

      if(responseData && responseData.responses){
            refree.push({email:email,responses:responseData.responses})
      }

    })

    console.log(candidateId)

    let downloadObject = {
      candidate:{name:candidate.name,email:candidate.email},
      position:position.name,
      refree:refree
    }
    return downloadObject
  }
})
