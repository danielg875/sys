import { Meteor } from 'meteor/meteor';

import { Companies } from '../imports/api/companies.js';
import { Positions } from '../imports/api/positions.js';
import { Candidates } from '../imports/api/candidates.js';
import { Results } from '../imports/api/results.js';
import { Email } from 'meteor/email';

import '../imports/api/permissions.js';

import '../imports/api/logos.js';

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 }

 });

Images.allow({
 insert: function(){
 return true;

 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 }
});

Meteor.startup(() => {// code to run on se
  // Cors enable

  //if (Results.find().count() === 0) {
    //Results.insert({hello: 'hey'});
  //};


  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
  //
  // var smtp ={
  //   username: 'docmailforyou@gmail.com',
  //   password: 'beatles12',
  //   server:   'smtp.gmail.com',
  //   port: 587
  // }
  // // SMTP Server configuaration when meteor is started.
  // process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  //
  // process.env.MAIL_URL = 'smtp://postmaster@app1015d4ab22534fd88a65a30e38356a0a.mailgun.org:17a185f002f8b0b746660b908c7a617a@smtp.mailgun.org:587'
  process.env.MAIL_URL = "smtp://postmaster@ezyref.com.au:9fe57406228785e4761b89e3ca303db6@smtp.mailgun.org:587";

});
