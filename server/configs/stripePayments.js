import Stripe from 'stripe'
import CreditDb from '../../imports/api/credit'
const stripe_keys={
  test_publishable:'pk_test_LD0hpm5pfjHkEMKUxeMTRW7w',
  test_secret_key:'sk_test_qfmoEdCcoih1rzWFoJUUBSvi'
}

export class StripePayment {
  constructor(token){
    this._token=token
    this._stripeApi=new Stripe(stripe_keys.test_secret_key)
  }

  chargeAmount(plan){


    if(!Meteor.userId())
      throw new Meteor.Error('customer needed',`could'nt find customerId`)

    plan.source=this._token.id
    console.log(plan)
    let stripeFn=Meteor.wrapAsync(this._stripeApi.charges.create,this._stripeApi.charges);
    let result=stripeFn(plan);

    return result;
  }


}

Meteor.methods({
  purchasePlan:function(token,planData){
    new StripePayment(token).chargeAmount({amount:planData.amount,currency:'usd', description: ''})
    return CreditDb.update({user: Meteor.userId()},{$inc:{point:planData.credit}})
  }
})