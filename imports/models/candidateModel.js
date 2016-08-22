import CandidateDb from '../api/candidates'

export default class CandidateModel {
  constructor(){

  }

  getAllCandidates(user){
    if(Roles.userIsInRole(user,'admin')){
      return CandidateDb.find({}).fetch()
    }
    return Meteor.error("Unauthorized access","You must be admin to access all candidates")
  }
}
