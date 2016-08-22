import React, { Component } from 'react';
import Login from './Login.jsx'
import Register from './Register.jsx'
import PlanFeatures from './PlanFeatures.jsx'
import {CountUp} from 'meteor/buildateam:countup'
console.log(CountUp)
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {plans:[]}
  }
  scrollTo(){
    console.log("scroll")
    $('html, body').animate({
      scrollTop: $("#homeScroll").offset().top
    }, 1000);
  }

  showModal(){
    console.log("clicked");
    $("#register_modal").modal("show")
  }

  componentWillMount(){
    Meteor.call('getPlans',(err,res)=>{
      if(!err){
        this.setState({plans:res})
      }
    })
  }

  componentDidMount(){
    $('.counter').counterUp()
  }

  render() {
    let plans = this.state.plans.map((plan)=>{
      return(
        <div key={plan._id} className="col-md-4">
          <div className="well shadowed-box">
            <h2 className="text-center" style={{fontSize:"36px"}}>{plan.name}</h2>
            <h1 className="text-center" style={{fontSize:"72px"}}>$ {plan.price}</h1>
            <PlanFeatures features={plan.features}/>
            <br/>
          </div>
        </div>
      )
    })
    let signUpOrDashboardButton = Meteor.userId()?<a type="button" className="btn btn-lg btn-success" href="/dashboard">Dashboard</a>:<button type="button" className="btn btn-lg btn-success" onClick={this.showModal}>SignUp</button>
    return (
      <div>
      <section className="hero-section">
        <div className="container">
          <div style={{height: '40vh'}}>
          </div>
          <div className="hero-text">
            <h1>Less is More – Spend less time on reference checks, spend more time on.. “what is important to you and your business”</h1>
          </div>
        </div>
        <div className="scrollDownContainer">
          <div className="scrollDown" onClick={this.scrollTo}>
            
          </div>
        </div>
      </section>
      <section className="small-section" id="homeScroll">
        <div className="container">
          <div className="row">
                  <div className="col-sm-6" style={{textAlign: 'center'}}>
                      <div className="section-title">
                          <div className=" section-title-more">
                              first you should know
                          </div>
                          <div>
                              <h2 className="section-title-heading"><span>what </span>we do</h2>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-6 margin-bottom-xs-40">
                      <p className="section-text">Utterly unhappy about how much time reference checks can take everyone, we have decided to employ the best programmes to do them for you.</p>
                  </div>
              </div>
        </div>
      </section>
      <section className="grey-section">
        <div className="container step-section">
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <center>
                <h2 className="section-title-heading" style={{marginBottom: '60px'}}><span>how </span>it works</h2>
                <div style={{display:'table-cell',verticalAlign:'middle', textAlign:'center'}}>
                  <img src="/img/icons/ezy_ref.png" style={{height:200}} className="img-responsive" />
                </div>
                <p>Simply tell us who are the candidates and their (working) emails.</p>
                <div className="step-arrow">
                  
                </div>
                <p>EzyRef will liaise with these candidates, get to the referees, and give you the reference reports.</p>
                <div className="step-arrow">
                  
                </div>
                <p>You are happy that you don’t need to chase the candidates and referees!</p>
              </center>
            </div>
          </div>
        </div>
      </section>
      <section className="small-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-6" style={{textAlign: 'center'}}>
                      <div className="section-title">
                          <div>
                              <h2 className="section-title-heading"><span>getting </span>started</h2>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-6 margin-bottom-xs-40">
                      <p className="section-text">Simply sign up, and you are ready to go!  The EzyRef app will guide you through each step. We have a FAQ section and our customer champions can help you as well.</p>
                  </div>
              </div>
        </div>
      </section>
      <section className="number-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="fact-number font-second">
                      <p><span id="count_hrs" className="counter" data-counterup-time="1500" data-counterup-delay="30">7.2</span> hrs</p>
                  </div>
                  <div className="fact-text">
                      <p>saved every recruitment</p>
                  </div>
            </div>
            <div className="col-sm-4">
              <div className="fact-number font-second">
                      <p>$<span id="count_savings" className="counter" data-counterup-time="1500" data-counterup-delay="30">400</span></p>
                  </div>
                  <div className="fact-text">
                      <p>Avg. savings per recruitment</p>
                  </div>
            </div>
            <div className="col-sm-4">
              <div className="fact-number font-second">
                      <p><span id="count_seconds" className="counter" data-counterup-time="1500" data-counterup-delay="30">1000</span>'s</p>
                  </div>
                  <div className="fact-text">
                      <p>of clients who love EzyRef</p>
                  </div>
            </div>
          </div>
        </div>
      </section>
      <section className="number-section" style={{background:"url('/img/hero-background-compressed.jpg')"}}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
            </div>
            <div className="col-sm-4">
              <div className="fact-number font-second">
                {signUpOrDashboardButton}
              </div>
            </div>
            <div className="col-sm-4">
            </div>
          </div>
        </div>
      </section>
      <section className="grey-section">
        <div className="container step-section">
          <div className="row">
            {plans}
          </div>
        </div>
      </section>
      </div>

    );
  }
}
