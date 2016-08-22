import Responses from './../../imports/api/responses'
import Results from '../../imports/api/results'
import PositionDb from '../../imports/api/positions'
import CandidateDb from '../../imports/api/candidates'
import NotificationDB from '../../imports/api/notificationDb'
import  EmailSystem from '../EmailSystem'
Meteor.methods({
  insertResponses:(responses,referee,userId,position)=>{
    Responses.insert({responses:responses,referee:referee})
    const userData= Meteor.users.findOne({_id:userId})
    const RefreeInfo = Results.findOne({_id:referee})
    const CandidateData=CandidateDb.findOne({_id:RefreeInfo.candidate})

    const contentRefree=`
    Thanks for your valuable time and the info you shared it will surely help ${CandidateData.name} towards his future
    Please ignore this email. If you feel something is wrong, please contact our support team:support@ezyref.com.au.
    Thanks
    EzyRef Support Team
`
    new EmailSystem().sendEmail(
      {
        to:RefreeInfo.refree,
        name: RefreeInfo.name,
        content:contentRefree,
        subject:'Thanks For Filling...'
      })

    const userContent=`
Congrats, referee of ${CandidateData.name}  for the position of ${position}  have been filled your Questionnaire
So you are only 1 step behind to complete the process so please login to your account and download the report and you will be done

Please ignore this email. If you feel something is wrong, please contact our support team:support@ezyref.com.au.
Thanks
EzyRef Support Team
`
    new EmailSystem().sendEmail(
      {
        to:userData.emails[0].address,
        name: userData.profile.name,
        content:userContent,
        subject:'Referee Filled The Form'
      })

  }
})


Meteor.methods({
  insertResults:function(position,candidate,referees){
    const positionData=PositionDb.findOne({_id:position})
    if(!positionData)
      return

    const candidateData = CandidateDb.findOne({_id: candidate})

    if(!candidateData)
      return

    _.each(referees,(referee)=>{
      let id = Results.insert({refree:referee.email,name:referee.name,position:position,candidate:candidate})
      const url=`http://${this.connection.httpHeaders.host}/questions/${position}/${id}`
      const content=`
      ${candidateData.name} add you as his referenced for the position ${positionData.name} please go through the below link to give your reference for ${candidateData.name} and wish him good luck ahead
        \n ${url} \n
        Please ignore this email. If you feel something is wrong, please contact our support team:support@ezyref.com.au.
        Thanks
        EzyRef Support Team
      `

      let option={
        to:referee.email,
        content:content,
        name:referee.name
      }
      new EmailSystem().sendRefreeEmail(option)
    })




    const notification={
      userId: positionData.createdBy,
      text:`Candidate ${candidateData.name}<${candidateData.email}>  has Accepted your request for position & added the referees `,
      isSeen: false,
      date: new Date()
    }


    return NotificationDB.insert(notification)
  }
})
