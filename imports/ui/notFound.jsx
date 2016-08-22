import React from 'react'

export default NotFound = () => (
  <div className="alert alert-danger">
    <strong>OOps !</strong> Looks like you haven't verified Your Email please check your Email & verify email
    <a onClick={(evt) =>{
      Meteor.call('sendVerificationLink')
    }}> resend Verification Email </a>
  </div>
)