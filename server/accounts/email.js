Accounts.urls.verifyEmail = function(token){
  return Meteor.absoluteUrl("verify/" + token);
};

Accounts.emailTemplates.siteName = "EzyRefG";
Accounts.emailTemplates.from     = "EzyRefG <admin@ezyref.com.au>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[EzyRef] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '#/' ),
        supportEmail   = "support@ezyref.com.au",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};

Accounts.config({
  sendVerificationEmail: true
})
