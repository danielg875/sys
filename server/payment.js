import { Meteor } from 'meteor/meteor';
import { Positions } from '../imports/api/positions.js';

Meteor.methods({
  "stripe": function(options, token){
    var stripe = Meteor.npmRequire('stripe')('sk_test_8etfHlIc6y258rcKhgdaqO1l')
    var payment = Async.runSync(function(done) {
      stripe.charges.create({
        amount: 5000,
        currency: "usd",
        source: token,
        description: "Charge for " + options.name
      }, function(err, charge) {
        if (err){
          done(err);
        }else{
          done(null, charge);
        }
      });
    });
    if (payment.error == null){
      Positions.update(options.positionId,{
        $set:{ stripe: true}
      });
    }
    return payment.charge;
  },
  "paypal": function(options){
    if (this.userId){
      payment.transactions[0].description = 'Payment for ' + options.name;
      var pay = Async.runSync(function(done){
        paypal.payment.create(payment, function(err, res){
          console.log(res);
          if (err){
            done(err);
          }
          else{
            done(null, payment);
          }
        });
     });

     if (!pay.error){

     }
    }
  }
})
