import React, { Component } from 'react';

export default class Forgot extends Component {
  constructor(props){
    super(props)
  }

  submitEmail(e){
    e.preventDefault()
    let email = $("#forgot_email_block").val()
    Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            Bert.alert({
              title:"Error",
              message:"This email does not exist.",
              type:"danger"
            })
          }
          else {
            Bert.alert({
              title:"Error",
              message:err.reason,
              type:"danger"
            })
          }
        }
        else {
          Bert.alert({
            title:"Success",
            message:"Email Sent. Check your mailbox.",
            type:"success"
          })
        }
      })
  }


  render() {
    return (
      <div className="modal fade" id="forgot_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <div className='modal-header'>
            <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>

            <h3 className="modal-heading">FORGOT PASSWORD</h3>
          </div>
          <div className='modal-body'>
            <form onSubmit={this.submitEmail}>
              <div>
              <input required id="forgot_email_block" type="email" name="email" placeholder="Your email" className="w-input entry-standard"/>
            </div>
            <div>
          </div>
          <button type="submit" className="w-button btn btn-info login-button" style={{width: 100+'%'}}>
            Submit
            <span className='button-loader'>
            </span>
          </button>
          </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
