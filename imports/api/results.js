import { Mongo } from 'meteor/mongo';
import NotificationDB from '../api/notificationDb'
import PositionDb from '../api/positions'
import CandidateDb from '../api/candidates'
export default Results = new Mongo.Collection('results');


