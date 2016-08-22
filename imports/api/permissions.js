import { Meteor } from 'meteor/meteor';
 
import { Positions } from '../api/positions.js';
import { Companies } from '../api/companies.js';
import { Candidates } from '../api/candidates.js';
import { Results } from '../api/results.js';


if (Meteor.isServer) {
	Meteor.publish('positions', function(){
		return Positions.find()
	});

	Meteor.publish('results', function(){
		return Results.find()
	});

	Meteor.publish('companies', function(){
		return Companies.find({createdBy: this.userId})
	});

	Meteor.publish('candidates', function(){
		return Candidates.find({addedBy: this.userId})
	});
};

