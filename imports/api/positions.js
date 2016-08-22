import { Mongo } from 'meteor/mongo';
import PositionModel from '../models/positionModel'
export default Positions = new Mongo.Collection('positions');

Meteor.methods({
  getPosition:()=>{
    return new PositionModel().getPostionByUser()
  },
  getAllPositions:(user)=>{
    return new PositionModel().getAllPositions(user)
  },
  getAllInfoOfPosition:(positionId)=>{
    return new PositionModel().getAllInfoOfPosition(positionId)
  },
  getAllPositionsOfUser:()=>{
    return new PositionModel().getAllPositionsOfUser()
  },
  getQuestionnaireOfPosition:(positionId)=>{
    return new PositionModel().getQuestionnaireOfPosition(positionId)
  },
  deletePosition:(positionId)=>{
    return new PositionModel().deletePosition(positionId)
  }
})
