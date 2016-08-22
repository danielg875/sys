import EmailSystem from '../EmailSystem'
import CandidateDb from '../../imports/api/candidates'
import ResultDb from '../../imports/api/results'

SyncedCron.add({
  name: 'Auto Reminder For referee & Candidates',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 2 days');
  },
  job: function() {
    let resultsData= _.pluck(ResultDb.find({}).fetch(),'refree'),
      candidatesData = _.pluck(CandidateDb.find({}).fetch(),'email')

      _.each(_.union(resultsData,candidatesData), function(emails){

          new EmailSystem().sendEmail({to:emails, text:'This is sample Reminder'})
      })

  }
});

Meteor.startup(function(){
  SyncedCron.start();
});