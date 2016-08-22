import React,{ Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
export default class ResetPassword extends Component {
  constructor(props){
    super(props)
  }

  resetPassword(e){
    e.preventDefault()
    let newPassword = $("#reset-new-password").val(),
    confirmPassword = $("#reset-confirm-password").val()
    if(newPassword!=confirmPassword){
      Bert.alert({
        title:"Error",
        message:"New Password and Confirm Password donot match",
        type:"danger"
      })
      return
    }
    Accounts.resetPassword(FlowRouter.getParam("token"),newPassword,(err)=>{
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
          message:"Welcome back!!Password successfully changed",
          type:"success"
        })
        FlowRouter.go("/profile")
      }
    })
  }

  render(){
    return (
      <div className="standard-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <form onSubmit={this.resetPassword}>
              <div className="form-group">
                <label className="control-label">New Password</label>
                <input type="password" id="reset-new-password" className="form-control" placeholder="New Password"/>
              </div>
              <div className="form-group">
                <label className="control-label">Confirm Password</label>
                <input type="password" id="reset-confirm-password" className="form-control" placeholder="Confirm Password"/>
              </div>
              <button type="submit" className="form-control">Reset</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
