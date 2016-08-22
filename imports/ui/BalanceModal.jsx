import React,{ Component } from 'react'
import PlanFeatures from './PlanFeatures.jsx'
export default class BalanceModal extends Component {
  constructor(props){
    super(props)
    this.planData=null
    this.state = {plans:[]}
    this.stripeConf=StripeCheckout.configure({
      key: 'pk_test_LD0hpm5pfjHkEMKUxeMTRW7w',
      image: 'http://ezyref2.herokuapp.com/img/ezyref-web-logo.png',
      // The callback after checkout is complete
      token: (token)=> {
        // do something here (a Meteor.method, perhaps?)
        console.log(token)
        Meteor.call('purchasePlan',token,this.planData,(err,res)=>{
          if(!err){
            Bert.alert({
              title:"Success",
              message:"Added Credit To User",
              type:"success"
            })
            $('.close').click()
          }else{
            Bert.alert({
              title:"Error",
              message:err.reason,
              type:"danger"
            })
          }
        })
      }
    });
  }
  componentWillMount(){
    Meteor.call('getPlans',(err,res)=>{
      if(!err){
        this.setState({plans:res})
      }
    })
  }

  addCredit(e){
    let credit = $(e.target).attr("data-credit")
    Meteor.call('addCredit',credit,Meteor.userId(), (err,res)=>{
      if(err){
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }else{
        Bert.alert({
          title:"Success",
          message:"Added Credit To User",
          type:"success"
        })
      }
    })
  }
  checkout(e){
      this.planData={credit:parseInt(e.target.getAttribute('data-credit')),amount:parseFloat(e.target.getAttribute('data-price')) * 100}

      let payObj={
        name: e.target.getAttribute('data-plan'),
        description:' ',
        amount: parseFloat(e.target.getAttribute('data-price')) * 100
      }
      this.stripeConf.open(payObj);
  }
  render(){
    let plans = this.state.plans.map((plan)=>{
      return(
        <div key={plan._id} className="col-md-4">
          <div className="well">
            <h2 className="text-center" style={{fontSize:"36px"}}>{plan.name}</h2>
            <h1 className="text-center" style={{fontSize:"72px"}}>$ {plan.price}</h1>
            <PlanFeatures features={plan.features}/>
            <br/>
            <button onClick={this.checkout.bind(this)} className="btn btn-success form-control" data-plan={plan.name} data-price={plan.price}  data-credit={plan.credit}>Select</button>
          </div>
        </div>
      )
    })
    return (
      <div className="modal fade" id="balance_modal" tabIndex="-1" role="dialog" style={{marginLeft:'-400px'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{width:"1000px"}}>
            <div className='modal-header'>
              <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-heading">Balance</h5>
            </div>
            <div className='modal-body'>
              <div className="row">
                {plans}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
