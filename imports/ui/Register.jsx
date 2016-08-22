import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state={error:null}
    this.register = this.register.bind(this)
  }
  register(e){
    e.preventDefault()
    const user = {email: e.target.email_block.value.trim(), password: e.target.password_block.value.trim()}
    Accounts.createUser(user,(err)=>{
      if(err){
        this.setState({error:err.reason})
      }
      else {
        FlowRouter.go('/profile')
        $(".close").click()
      }
    })
  }
  render() {
    let errorDom = this.state.error? <div className="alert alert-danger animated fadeIn">{this.state.error}</div> : ''
    return (
      <div className="modal fade" id="register_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

                <div className="modal-header">
                  <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
                  <h3 className="modal-heading">SIGN UP TO EZYREF</h3>
                </div>
                <div className="modal-body">
                  {errorDom}
                  <form onSubmit={this.register}>
                    <div>
                      <input required id="email_block" type="email" name="email" placeholder="Your email address" className="w-input entry-standard"/>
                      <div className='text-danger'>
                        <span>Please enter a valid email.</span>
                        <span>Please fill out this field.</span>
                      </div>
                    </div>
                    <div>
                      <input required id="password_block" name="password" type="password"
                      placeholder="Password" className="w-input entry-standard"/>
                      <div className='text-danger'>
                        <span>Please fill out this field.</span>
                        <span>Your password must be six characters or longer.</span>
                        <span>Your password must be twenty characters or shorter.</span>
                      </div>
                    </div>
                    <div className="button_register">
                      <button type="submit" className="w-button  login-button btn btn-info" style={{width:100+'%'}}>SIGN UP
                        <span className='button-loader'>
                        </span>
                      </button>
                      <center style={{marginTop:'20px',cursor:'pointer'}}><a className='alreadyMember'>Already a member? Login</a></center>
                    </div>
                    </form>
              </div>

          </div>
        </div>
      </div>
    );
  }
}
