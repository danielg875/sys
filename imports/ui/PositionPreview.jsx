import React,{ Component } from 'react'

export default class PositionPreview extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
    		<h3>These are the questions you're asking:</h3>
    		<p>{JSON.stringify(this.props.questions)}</p>
    		<br/><br/><br/>
    		<h3>And these are the people you're inviting:</h3>
    		<p>{JSON.stringify(this.props.candidates)}</p>
    		<br/><hr/><br/>

    		<h3>The total cost for this position is:</h3>
        <p>{this.props.candidates.length} credits</p>
    		<h5>Choose a payment method</h5>
    		<br/><hr/><br/>
        </div>
    )
  }
}
