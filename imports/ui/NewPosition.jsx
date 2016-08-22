import React, { Component } from 'react'
import Candidate from './Candidate.jsx'
import NewPositionIntroduction from './NewPositionIntroduction.jsx'
import Page2 from './Page2.jsx'
import Page3 from './Page3.jsx'
import Stripe from './Stripe.jsx'
import Paypal from './Paypal.jsx'
import PositionPreview from './PositionPreview.jsx'
import { FlowRouter } from 'meteor/kadira:flow-router'
export default class NewPosition extends Component {
  constructor(props){
    super(props)
    this.state = {allPositions:[],position:{name:'',department:''},candidates:[{name:"",email:"",id:""}],preface:'',questions:[],activeComponentIndex:0}
    this.components=[NewPositionIntroduction,Page2,Page3,PositionPreview,Paypal,Stripe]
    this.addCandidate = this.addCandidate.bind(this)
    this.editCandidate = this.editCandidate.bind(this)
    this.deleteCandidate = this.deleteCandidate.bind(this)
    this.decreaseIndex  = this.decreaseIndex.bind(this)
    this.increaseIndex  =this.increaseIndex.bind(this)
    this.questionObjects={
      free:{question:'',max:40,min:10,isSkippable:true,type:'free',title:"Free Response question"},
      scale:{question:'',length:5,lowText:'minimum',highText:'maximum',isSkippable:true,type:'scale',title:"On a scale of ... question"},
      multiple:{question:'',options:[''],isSkippable:true,type:'multiple',title:"Multiselect question"},
      single:{question:'',options:[''],isSkippable:true,type:'single',title:"Single-select question"}
    }
    this.addQuestion = this.addQuestion.bind(this)
    this.editQuestion = this.editQuestion.bind(this)
    this.addOption = this.addOption.bind(this)
    this.editOption = this.editOption.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
    this.submitPosition = this.submitPosition.bind(this)
    this.changePosition = this.changePosition.bind(this)
    this.changePreface  =this.changePreface.bind(this)
    this.changeQuestionnaire = this.changeQuestionnaire.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.increaseIndexBy2 = this.increaseIndexBy2.bind(this)
    this.decreaseIndexBy2 = this.decreaseIndexBy2.bind(this)
  }
  componentWillMount(){
    let positionId=FlowRouter.getParam("id")
    if(positionId){
      Meteor.call("getAllInfoOfPosition",positionId,(err,res)=>{
        if(!err){
          this.setState(res)
        }
      })
    }
    else {
      Meteor.call("getAllPositionsOfUser",(err,res)=>{
        this.setState({allPositions:res})
      })
    }
  }
  showBalanceModal(){
    $("#balance_modal").modal("show")
  }
  addCandidate(event){
    let candidates = this.state.candidates,
    newCandidate = {name:"",email:"",id:""}
    candidates.push(newCandidate)
    this.setState({candidates:candidates})
  }
  editCandidate(value,property,index){
    let candidates = this.state.candidates
    candidates[index-1][property]=value
    this.setState({candidates:candidates})
  }
  deleteCandidate(index){
    let candidates = this.state.candidates
    candidates.splice(index-1,1)
    this.setState({candidates:candidates})
  }
  decreaseIndex(){
    let index=this.state.activeComponentIndex
    this.setState({activeComponentIndex:index-1})
  }
  increaseIndex(){
    let index=this.state.activeComponentIndex
    this.setState({activeComponentIndex:index+1})
  }
  decreaseIndexBy2(){
    let index=this.state.activeComponentIndex
    this.setState({activeComponentIndex:index-2})
  }
  increaseIndexBy2(){
    let index=this.state.activeComponentIndex
    this.setState({activeComponentIndex:index+2})
  }
  addQuestion(type){
    let questions = this.state.questions
    questions.push(Object.assign({},this.questionObjects[type]))
    this.setState({questions:questions})
  }
  editQuestion(value,property,index){
    let questions=this.state.questions
    questions[index-1][property]=value
    this.setState({questions:questions})
  }
  deleteQuestion(index){
    let questions=this.state.questions
    questions.splice(index-1,1)
    this.setState({questions:questions})
  }
  addOption(index){
    let questions=this.state.questions
    questions[index-1].options.push('')
    this.setState({questions:questions})
  }
  editOption(questionIndex,index,value){
    let questions=this.state.questions
    questions[questionIndex-1].options[index-1]=value
    this.setState({questions:questions})
  }
  deleteOption(questionIndex,index){
    let questions=this.state.questions
    questions[questionIndex-1].options.splice(index-1,1)
    this.setState({questions:questions})
  }
  changePosition(value,property){
    let position = this.state.position
    position[property]=value
    this.setState({position:position})
  }
  changePreface(value){
    this.setState({preface:value})
  }
  changeQuestionnaire(index){
    let newQuestionnaire = this.state.allPositions[index].questions
    this.setState({questions:newQuestionnaire})
  }
  submitPosition(){
    let position={position:this.state.position,candidates:this.state.candidates,questionnaire:{preface:this.state.preface,questions:this.state.questions}},
    self=this,
    positionId = FlowRouter.getParam("id")
    if(positionId){
      Meteor.call("updatePosition",position,positionId,(err,res)=>{
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
            message:"Position is successfully updated",
            type:"success"
          })
          FlowRouter.go("/dashboard")
        }
      })
    }
    else {
      Meteor.call("insertPosition",position,function(err,res){
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
            message:"Position is successfully created",
            type:"success"
          })
          FlowRouter.go("/dashboard")
        }
      })
    }
  }
  render(){
    let activeComponentIndex=this.state.activeComponentIndex,
    ActiveComponent=this.components[activeComponentIndex],
    buttonsArray= ['',
    <div>
     <button type='button' className="proto-button" onClick={this.decreaseIndex}>Back</button>
     <button type='button' className="proto-button" style={{marginLeft:"10px"}} onClick={this.increaseIndex}>Next Page</button>
     </div>,
      <div>
      <button type='button' className="proto-button" onClick={this.decreaseIndex}>Back</button>
      <button type='button' className="proto-button" style={{marginLeft:"10px"}} onClick={this.increaseIndex}>Confirm</button>
      </div>,
      <div>
      <button type='button' className="proto-button" onClick={this.decreaseIndex}>Back</button>
      <button type='button' className="proto-button" style={{marginLeft:"10px"}} onClick={this.increaseIndex}>PayPal</button>
      <button type='button' className="proto-button" style={{marginLeft:"10px"}} onClick={this.increaseIndexBy2}>Stripe</button>
      </div>,
      <div>
      <button type='button' className="proto-button" onClick={this.decreaseIndex}>Back</button>
      <button type='button' className="proto-button" style={{marginLeft:"10px"}} onClick={this.submitPosition}>Confirm</button>
      </div>,
      <div>
      <button type='button' className="proto-button" onClick={this.decreaseIndexBy2}>Back</button>
      <button type='button' className="proto-button" style={{marginLeft:"10px"}} onClick={this.submitPosition}>Confirm</button>
      </div>
    ],
    buttons = buttonsArray[activeComponentIndex],
    renderingComponent=null,
    isUpdating = FlowRouter.getParam("id")
    if(!isUpdating && this.props.subscribed && this.props.creditData.point<=0){
      renderingComponent = <div className="col-md-6 col-md-offset-3 text-center">
        <h3 className="text-center" style={{color:'#a94442'}}> Please add credit to your account </h3>
        <p>
          <button type="button" className="btn btn-lg  btn-primary" onClick={this.showBalanceModal}> Refill Your Account</button>
        </p>
      </div>
    }
    else if (!isUpdating && !this.props.subscribed) {
      renderingComponent = <span className="text-center">Loading...</span>
    }
    else {
      renderingComponent = <div><ActiveComponent allPositions={this.state.allPositions} changeQuestionnaire={this.changeQuestionnaire} position={this.state.position} changePosition={this.changePosition} preface={this.state.preface} changePreface={this.changePreface} candidates={this.state.candidates} editCandidate={this.editCandidate} deleteCandidate={this.deleteCandidate} addCandidate={this.addCandidate}
      questions={this.state.questions} deleteQuestion={this.deleteQuestion} addQuestion={this.addQuestion} editQuestion={this.editQuestion} addOption={this.addOption}
      deleteOption={this.deleteOption} editOption={this.editOption} increaseIndex={this.increaseIndex}/>
      <br/><hr/><br/>
      {buttons}</div>
    }
    return (
        <div>
          <form className="standard-page">
            <div className="container">
              {renderingComponent}
            </div>
          </form>
        </div>
    )
  }
}
