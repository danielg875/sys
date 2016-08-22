import { Meteor } from 'meteor/meteor';
import { Candidates } from '../imports/api/candidates.js';
import { Positions } from '../imports/api/positions.js';

Meteor.publish('getPositionList', function(){
  var positions = Positions.find({},{sort: {createdAt: -1}});
  return positions;
});
Meteor.publish('getCandidateList', function(){
  var candidates = Candidates.find({},{sort: {createdAt: -1}});
  return candidates;
});
