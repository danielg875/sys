import React,{ Component } from 'react'
import DisplayFree from './DisplayFree.jsx'
import DisplayMultiple from './DisplayMultiple.jsx'
import DisplayScale from './DisplayScale.jsx'
import DisplaySingle from './DisplaySingle.jsx'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class QuestionnaireForm extends Component {
  constructor(props){
    super(props)
    this.state={questionnaire:{preface:"",questions:[]},responses:[]}
    this.questionComponents = {free:DisplayFree,multiple:DisplayMultiple,scale:DisplayScale,single:DisplaySingle}
    this.changeResponses = this.changeResponses.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  componentWillMount(){
    console.log(FlowRouter.getParam("id"));
    Meteor.call("getQuestionnaireOfPosition",FlowRouter.getParam("id"),(err,res)=>{
      if(!err){
        console.log(res);
        this.setState({questionnaire:res})
        let responses = this.state.responses
        _.each(res.questions,(question)=>{
          responses.push({question:question.question,answers:null})
        })
        this.setState({responses:responses, userId:res.userId,position:res.position})
      }
    })
  }

  changeResponses(index,value){
    let responses = this.state.responses
    responses[index].answers=value
    this.setState({responses:responses})
  }

  submitForm(e){
    e.preventDefault()
    let referee = FlowRouter.getParam("refereeId")
    Meteor.call("insertResponses",this.state.responses,referee,this.state.userId,this.state.position,(err,res)=>{
      if(!err){
        FlowRouter.go('/thank_you')
      }
      else {
        console.log(err.reason);
      }
    })
  }

  render(){
    let form="",
    i=0
    if(this.state.questionnaire.questions.length>0){
      form = this.state.questionnaire.questions.map((question)=>{
        let Component = this.questionComponents[question.type]
        return <Component key={question._id} question={question} index={i++} changeResponses={this.changeResponses}/>
      })
    }
    return (
      <div className="standard-page">
        <div className="container">
          <h5>{this.state.questionnaire.preface}</h5>
          <form onSubmit={this.submitForm}>
            {form}
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
