import React from 'react'
export default class PaymentForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      error: false,
      plans:null
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const cardData={
      name: 'Buster Bluth',
      number: '4032033198863628',
      type: 'visa',
      cvv2: '123',
      expire_year: '2021',
      expire_month: '09'
    }
    Meteor.Paypal.authorize(cardData, {total: '100.50', currency: 'USD'}, function(err, results){
      if (err) console.error(err);
      else console.log(results);
    });
  }
  
  render(){
    return (
      <div className="container">
        <div className='row' style={{marginTop:40}}>
          <div className='col-md-4'></div>
          <div className='col-md-4 well well-lg '>
            <div className="">
              <form onSubmit={this.handleSubmit} className="require-validation">
                <div className='form-row'>
                  <div className='col-xs-12 form-group required'>
                    <label className='control-label'>Name on Card</label>
                    <input className='form-control' size='4' type='text' />
                  </div>
                </div>
                <div className='form-row'>
                  <div className='col-xs-12 form-group card required'>
                    <label className='control-label'>Card Number</label>
                    <input autoComplete='off' className='form-control card-number' size='20' type='text' />
                  </div>
                </div>
                <div className='form-row'>
                  <div className='col-xs-4 form-group cvc required'>
                    <label className='control-label'>CVC</label>
                    <input autoComplete='off' className='form-control card-cvc' placeholder='ex. 311' size='4' type='text' />
                  </div>
                  <div className='col-xs-4 form-group expiration required'>
                    <label className='control-label'>Expiration</label>
                    <input className='form-control card-expiry-month' placeholder='MM' size='2' type='text' />
                  </div>
                  <div className='col-xs-4 form-group expiration required'>
                    <label className='control-label'> </label>
                    <input className='form-control card-expiry-year' placeholder='YYYY' size='4' type='text' />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='col-md-12 form-group'>
                    <button className='form-control btn btn-primary submit-button' type='submit'>Pay »</button>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='col-md-12 error form-group hide'>
                    <div className='alert-danger alert'>
                      Please correct the errors and try again.
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    )
  }
  
}