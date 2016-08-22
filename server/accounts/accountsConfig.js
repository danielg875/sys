import CreditDb from '../../imports/api/credit'
Accounts.onCreateUser(function(options, user) {
  CreditDb.insert({user:user._id, point:30})
  if (options.profile)
    user.profile = options.profile;
  return user;
});