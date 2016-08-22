Meteor.methods({
  getAllUsers:function(userId){
    if(Roles.userIsInRole(userId,'admin')){
      return  Meteor.users.find({}).fetch()
    }
    return Meteor.error("Unauthorized access","You must be admin to access all candidates")
  },
  updateProfileAndEmail:function(profile,email){
    let user = Accounts.findUserByEmail(email)
    if(!user || user._id==this.userId){
      let objectToSet = user?{profile:profile}:{profile:profile,emails:[{address:email,verified:false}]}
      Meteor.users.update({_id:Meteor.userId()},{$set:objectToSet})
      if(!user){
        Accounts.sendVerificationEmail(this.userId)
      }
    }
    else {
      throw new Meteor.Error("Invalid email","This email already has an account")
    }

  },
  updateUserProfile:function(profile,userId){
    Meteor.users.update({_id:userId},{$set:{profile:profile}})
  }
})
