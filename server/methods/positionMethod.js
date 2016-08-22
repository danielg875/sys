import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import Positions from '../../imports/api/positions'
import Questions from "../../imports/api/questions"
import CandidateModel from '../../imports/models/candidateModel'
import CandidatesDb from '../../imports/api/candidates'
import EmailSystem from '../EmailSystem'
import CreditDb from '../../imports/api/credit'


Meteor.methods({
  insertPosition:function(object){
      const host=this.connection.httpHeaders.host
    let position = {
      name:object.position.name,
      department: object.position.department,
      candidates:[],
      questions:[],
      createdBy:Meteor.userId(),
      questionPreface:object.questionnaire.preface
    }

    let emailCandidate=[]

    _.each(object.candidates, (candidate)=>{
      const candidateId= CandidatesDb.insert(candidate)
      position.candidates.push(candidateId)
      emailCandidate.push({email:candidate.email, name: candidate.name, candidateId:candidateId})
    })

    _.each(object.questionnaire.questions, (question) => {
      const questionId = Questions.insert(question)
      position.questions.push(questionId)
    })

    let positionId= Positions.insert(position)
    CreditDb.update({user: Meteor.userId()},{$inc:{point:-1*object.candidates.length}})


      _.each(emailCandidate,(emailData)=>{
        new EmailSystem().sendCandidateEmail({
          name:emailData.name,
          email: emailData.email,
          candidateId: emailData.candidateId,
          job: position.name,
          positionId: positionId,
          host: host
        })
      })

    return positionId

  },

  updatePosition:(object,positionId)=>{
    let position = {
      name:object.position.name,
      department: object.position.department,
      candidates:[],
      questions:[],
      questionPreface:object.questionnaire.preface
    },
    currentPositionInDb=Positions.findOne({_id:positionId})
    _.each(object.candidates,(candidate)=>{
      let id=null
      if(candidate._id){
        id=candidate._id
        delete candidate._id
        CandidatesDb.update({_id:id},{$set:candidate})
      }
      else {
        id=CandidatesDb.insert(candidate)
      }
      position.candidates.push(id)
    })
    _.each(object.questionnaire.questions,(question)=>{
      let id=null
      if(question._id){
        id=question._id
        delete question._id
        Questions.update({_id:id},{$set:question})
      }
      else {
        id=Questions.insert(question)
      }
      position.questions.push(id)
    })
    Positions.update({_id:positionId},{$set:position})
    let deletedCandidates=_.difference(currentPositionInDb.candidates,position.candidates),
    deletedQuestions=_.difference(currentPositionInDb.questions,position.questions)
    CandidatesDb.remove({_id:{$in:deletedCandidates}},{multi:true})
    Questions.remove({_id:{$in:deletedQuestions}},{multi:true})
  },

  getAllCandidates:(user)=>{
    return new CandidateModel().getAllCandidates(user)
  }
});
