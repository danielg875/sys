import PositionDB from '../api/positions'
import ResultsDb from '../api/results'
import CandidateDb from '../api/candidates'
import QuestionDb from '../api/questions'
export default class PositionModel {
  constructor(){

  }

  getPostionByUser(){
    let positionResult =[],
      positionData= PositionDB.find({createdBy: Meteor.userId()}).fetch()

    _.each(positionData, (position) => {
        const positionObj={
          _id:position._id,
          name: position.name,
          department: position.department,
          questionPreface: position.preface
        }
        let candidateResult=[],
        candidatesData=CandidateDb.find({_id:{$in:position.candidates}}).fetch()
        _.each(candidatesData,(candidate)=>{
          candidate.references=ResultsDb.find({candidate:candidate._id}).fetch()
          candidateResult.push(candidate)
        })
        positionObj.candidates=candidateResult
      positionResult.push(positionObj)
    })

    return positionResult
  }

  getAllPositions(user){
    if(Roles.userIsInRole(user,'admin')){
      return PositionDB.find({}).fetch()
    }
    return Meteor.error("Unauthorized access","You must be admin to access all positions")
  }

  getAllInfoOfPosition(positionId){
    let position = PositionDB.findOne({_id:positionId}),
    stateToReturn={position:{name:position.name,department:position.department},preface:position.preface},
    candidates=CandidateDb.find({_id:{$in:position.candidates}}).fetch(),
    questions=QuestionDb.find({_id:{$in:position.questions}}).fetch()
    stateToReturn.candidates=candidates
    stateToReturn.questions=questions
    stateToReturn.activeComponentIndex=1
    return stateToReturn
  }

  getAllPositionsOfUser(){
    let positions = PositionDB.find({createdBy:Meteor.userId()}).fetch()
    _.each(positions,(position,index)=>{
      let questions = QuestionDb.find({_id:{$in:position.questions}}).fetch(),
      newQuestions=[]
      _.each(questions,(question)=>{
        delete question._id
        newQuestions.push(question)
      })
      positions[index].questions = newQuestions
    })
    return positions
  }

  getQuestionnaireOfPosition(positionId){
    let position = PositionDB.findOne({_id:positionId}),
    questions = QuestionDb.find({_id:{$in:position.questions}}).fetch()
    return {preface:position.preface,questions:questions,userId:position.createdBy, position:position.name}
  }

  deletePosition(positionId){
    let position = PositionDB.findOne({_id:positionId})
    PositionDB.remove({_id:positionId})
    QuestionDb.remove({_id:{$in:position.questions}},{multi:true})
    CandidateDb.remove({_id:{$in:position.candidates}},{multi:true})
    ResultsDb.remove({position:positionId},{multi:true})
  }
}
