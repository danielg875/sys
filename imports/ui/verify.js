import React, {Component} from 'react'

export default class Verify extends Component{
  constructor(props){
    super(props)
    this.state={error: ''}
  }

  componentWillMount() {
    const token = FlowRouter.getParam('token')
    Accounts.verifyEmail(token, (error)=> {
      if (error) {
        this.setState({error:error.reason})
      }else
        FlowRouter.go('/dashboard')
    })
  }


  render(){
    const {error} = this.state
    let contentDom= <h2 className="text-center"> Verifying Email ........</h2>
    if(error){
      contentDom=  <div className="alert alert-danger">
          <strong>OOps !</strong> {error}
        <a onClick={(evt) =>{ Meteor.call('sendVerificationLink')}}> resend Verification Email </a>
      </div>
    }
    return (
      <div className="text-center">
        {contentDom}
      </div>
      )

  }
}
