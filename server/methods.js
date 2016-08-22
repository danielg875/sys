import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'findUserById': function(id){
    var user = Meteor.users.find({_id:id}).fetch()[0];
    return user;
  }
})
