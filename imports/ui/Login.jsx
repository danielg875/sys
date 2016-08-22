import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={error: null}
    this.login =this.login.bind(this)
  }

  login(e){
      e.preventDefault()
      const user= {email: e.target.email_block.value.trim(), password: e.target.password_block.value.trim()}

      Meteor.loginWithPassword(user.email, user.password, (err, res)=>{
        if(err)
          this.setState({error: err.reason})
        else {
          FlowRouter.go('/profile')
          $('.close').click()
        }
    })
  }

  forgotPassword(){
    $('.close').click()
    $("#forgot_modal").modal("show")
  }

  render() {
    let errorDom = this.state.error? <div className="alert alert-danger animated fadeIn">{this.state.error}</div> : ''
    return (
      <div className="modal fade" id="login_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <div className='modal-header'>
            <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>

            <h3 className="modal-heading">WELCOME BACK!</h3>
          </div>
          <div className='modal-body'>
            <form onSubmit={this.login}>
              {errorDom}
              <div>
              <input required id="email_block" type="email" name="email" placeholder="Your email" className="w-input entry-standard"/>
            </div>
            <div>
            <input required id="password_block" name="password" type="password" placeholder="Password" className="w-input entry-standard"/>
          </div>
          <button type="submit" className="w-button btn btn-info login-button" style={{width: 100+'%'}}>
            LOGIN
            <span className='button-loader'>
            </span>
          </button>
          <div className="w-clearfix helper-login">
            <div className="w-checkbox w-clearfix checkbox-cont">
              <input type="checkbox" name="uRemember" className="w-checkbox-input"/>


              <label  className="w-form-label login-label">Remember me</label>
            </div>
            <center><a className="forgotten-password" onClick={this.forgotPassword}>Forgot your password?</a></center>
          </div>
          </form>
          </div>

          </div>
        </div>
      </div>
    );
  }
}
