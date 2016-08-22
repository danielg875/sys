import React, { Component } from 'react'
import { Link } from 'react-router'
export default class NewPositionIntroduction extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="standard-page">
      <div className="container">
    		<p>EzyRef works by sending emails to candidates. Candidates are then directed to a guest-section of our site, and are asked to enter their reference's emails. References are then sent to our page, and then answer the questions you want to ask them.</p>
        <div style={{display:'table-cell',verticalAlign:'middle', textAlign:'center'}}>
          <img src="/img/edit_position_info.png" style={{width: '79%',margin: '10px 0 10px 0'}} className="img-responsive" />
        </div>

    		<a href="#">More information on the process can be found here, including information on our secure handling of email addresses, compliance to spam policies and examples of emails sent.</a>
    		<br/>
    		<hr/>
    		<br/>
    		<button className="proto-button" type='button' onClick={this.props.increaseIndex}>Let's get started!</button>
        </div>
        </div>
    )
  }
}
