import { Meteor } from 'meteor/meteor'

  Meteor.methods({
    sendVerificationLink(){
      let userId = Meteor.userId();
      if (userId){
        return Accounts.sendVerificationEmail(userId);
      }
    },
    // Checks user is verified or not
    checkEmailVerification: function(email){
      found_user = Meteor.users.findOne({ 'emails.address' : email })
      if(found_user){
          if(found_user.emails[0].verified == true){
              return "verified";
          }else{
              return "unverified";
          }
      }else{
          return "notfound";
      }
    },
    resendVerification: function(email){
      var user = Meteor.users.findOne({'emails.address': email});
      if (!user){
        return {
          message: 'User with this email doesn\'t exist'
        }
      }
      if (user.emails[0].verified){
        return {
          message: user.emails[0].address + ' is already verified'
        }
      }else{
        Accounts.sendVerificationEmail(user._id);
        return {
          message: 'Verfication link has been sent your email account. Please check'
        }
      }
    }
  })

