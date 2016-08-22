Accounts.onEmailVerificationLink((token,done)=>{
    Accounts.verifyEmail(token,(error)=>{
      console.log(token)
      if(!err){
        FlowRouter.go('/dashboard')
      }else{
        Bert.alert( error.reason, 'danger', 'fixed-top');
      }

    })
})