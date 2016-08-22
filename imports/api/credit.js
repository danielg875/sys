let CreditDb= new Mongo.Collection("credit")

Meteor.methods({
  addCredit:function(point,userId){
   try{
    const credit = parseInt(point)
     let userCredit= CreditDb.findOne({user:userId})
      if(!userCredit)
        return CreditDb.insert({user:userId,point:(credit)})

     return CreditDb.update({user: userId},{$inc:{point:credit}})
   }catch (e){
     console.log(e)
     throw new Meteor.Error('invalid credit','Invalid Credit Number')
   }
  }
});

export default CreditDb
