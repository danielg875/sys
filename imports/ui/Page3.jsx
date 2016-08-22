import React,{ Component } from 'react'
import Free from './Free.jsx'
import Scale from './Scale.jsx'
import Multiple from './Multiple.jsx'
import Single from './Single.jsx'
export default class Page3 extends Component{
  constructor(props) {
    super(props)
    this.questionComponents={free:Free,scale:Scale,multiple:Multiple,single:Multiple}
    this.addQuestion = this.addQuestion.bind(this)
    this.changeQuestionnaire = this.changeQuestionnaire.bind(this)
  }
  addQuestion(e){
    let type = $(e.target).attr("data-question-type")
    this.props.addQuestion(type)
  }
  changeQuestionnaire(e){
    let index = e.target.value
    console.log(index);
    this.props.changeQuestionnaire(index)
  }
  render(){
    let i=0,
    questions = this.props.questions.map((question)=>{
      let Question = this.questionComponents[question.type]
      return <Question deleteQuestion={this.props.deleteQuestion} question={question} index={++i} key={i} editQuestion={this.props.editQuestion} addOption={this.props.addOption} editOption={this.props.editOption} deleteOption={this.props.deleteOption}/>
    }),
    dropdown=<option></option>
    if(this.props.allPositions.length>0){
      let i=0
      dropdown = this.props.allPositions.map((indvPosition)=>{
        return <option key={indvPosition._id} value={i++}>{indvPosition.name}</option>
      })
    }
    return (
      <div>
    		<h3>Create your questionaire</h3>
    		<br/>
    		<hr/>
    		<br/>
        <label>Use Previous Questionnaires</label>
        <select onChange={this.changeQuestionnaire} >
        <option>Select position..</option>
        {dropdown}
        </select>
        <br/>
    		<hr/>
    		<br/>
    		<label className="survey-label">Survey Preface (optional) (?):</label>
    		<textarea value={this.props.preface} placeholder="Up to 500 words of text to display at the beginning of your questionaires." onChange={(e)=>{ this.props.changePreface(e.target.value) }}></textarea>
    		<br/>
    		<hr/>
    		<br/>
    		<div>
          {questions}
    		</div>
    		<br/>
    		<hr/>
    		<br/>
    		<div>
    			<h5>Add Question:</h5>
    			<button type='button' className="proto-button" data-question-type="free" onClick={this.addQuestion}>Free response question</button>
    			<button type='button' className="proto-button" data-question-type="scale" onClick={this.addQuestion}>On a scale of ... question</button>
    			<button type='button' className="proto-button" data-question-type="multiple" onClick={this.addQuestion}>Multiselect question</button>
    			<button type='button' className="proto-button" data-question-type="single" onClick={this.addQuestion}>Single-select question</button>
    			<a href="#">What are these?</a>
    			<br/>
    		</div>
    		<hr/><br/>
    	</div>
    )
  }
}
