let PlansDb= new Mongo.Collection("plans")
Meteor.methods({
  getPlans:function(){
    return PlansDb.find({}).fetch()
  },
  updatePlan:function(plan){
    let planId = plan._id
    delete plan._id
    delete plan.index
    return PlansDb.update({_id:planId},{$set:plan})
  }
})
export default PlansDb
