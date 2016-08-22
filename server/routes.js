import { Meteor } from 'meteor/meteor';
import { Positions } from '../imports/api/positions.js';

import  paypal from 'paypal-rest-sdk'

import  bodyParser from 'body-parser'
import url from 'url'

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({
  extended: false
}));

paypal.configure({
  "host": "api.sandbox.paypal.com",
  "port": "",
  "client_id": "AZuza7rn25Mm6odNsY5vDF8KTbJ5UrBTa4TOmza0KTq2nFmtUl7Fsig7ILmQ1YGkHpdG2BK1tuOHpgeU",
  "client_secret": "EOL65KkSqmiO0MfYzUuYjSykMbzJiMUbyoKvbgikhX6rr-2u16HpZrMaXqxDnMKXan-GfUfJW4Uzao45"
});

// payment configuration object
var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://yoururl.com/execute",
    "cancel_url": "http://yoururl.com/cancel"
  },
  "transactions": [{
    "amount": {
      "total": "29.00",
      "currency": "USD"
    },
    "description": ""
  }]
}

Picker.route('/paypal', function(params, req, res, next) {

  if (Meteor.isProduction) {
    // Setting url for live domain
  } else {
    payment.redirect_urls.return_url = 'http://localhost:3000/execute';
  }
  payment.transactions[0].description = 'Payment for ' + req.body.name;
  var pay = Async.runSync(function(done) {
    paypal.payment.create(payment, function(err, res) {
      if (err) {
        done(err);
      } else {
        done(null, res);
      }
    });
  });
  if (!pay.error) {
    ServerSession.set('paymentId', pay.result.id);
    ServerSession.set('positionId', req.body.positionId);
    var redirectUrl;
    for (var i in pay.result.links) {
      var link = pay.result.links[i];
      if (link.method === 'REDIRECT') {
        redirectUrl = link.href;
      }
    }
    res.end(redirectUrl);
  } else {

  }

});

Picker.route('/execute', function(params, req, res, next) {
  var paymentId = ServerSession.get('paymentId');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var details = {
    "payer_id": query.PayerID
  };
  var execute = Async.runSync(function(done){
    paypal.payment.execute(paymentId, details, function(error, payment) {
      if (error) {
        done(error);
      } else {
        done(null, payment);
      }
    });
  })
  if (!execute.error){
    Positions.update(ServerSession.get('positionId'),{
      $set: {
        paypal: true
      }
    });
  }
  res.writeHead(302, {
    'Location': '/position/new?paypal=true'
  });
  res.end();
})
