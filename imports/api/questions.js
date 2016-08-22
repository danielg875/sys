import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const questions = new Mongo.Collection("questions")

export default questions