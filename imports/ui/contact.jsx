import React from 'react'

export default Contact= ()=>(
  <section className="number-section">
    <div className="container">
      <div className="row">
        <div className="section-title text-center ">
          <div className="section-title-more">Want to know more?</div>
          <div>
            <h1 className="section-title-heading"><span>Contact</span> us</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <form id="ajax-contact" className="id--ajax-contact" method="post">
            <fieldset>
              <div className="row">
                <div className="input col-xs-12 col-sm-12 padding-bottom-xs-50 padding-bottom-40">
                  <label className="input-label">
                    <span className="input-label-content font-second" data-content="Name">Name</span>
                  </label>
                  <input className="input-field" type="text" name="name" id="name" required=""/>
                </div>
                <div className="input col-xs-12 col-sm-6 padding-bottom-xs-50 padding-bottom-50">
                  <label className="input-label" >
                    <span className="input-label-content font-second" data-content="Email">Email</span>
                  </label>
                  <input className="input-field" type="email" name="email" id="email" required=""/>
                </div>
                <div className="input col-xs-12 col-sm-6 padding-bottom-xs-60 padding-bottom-50">
                  <label className="input-label" >
                    <span className="input-label-content font-second" data-content="Company">Company</span>
                  </label>
                  <input className="input-field" type="text" name="subject" id="company"/>
                </div>
                <div className="message col-xs-12 col-sm-12 padding-bottom-xs-40 padding-bottom-30">
                  <label className="textarea-label font-second" >Message</label>
                  <textarea className="input-field textarea" name="message" id="message" required=""></textarea>
                </div>
              </div>
              <div id="form-messages" className="id--form-messages form-message"></div>
              <div className="col-xs-12 margin-top-30 text-center">
                <button id="btn-submit" type="submit" className="btnS btn-animated btn-contact ripple-alone id--btn-submit">
                  SUBMIT
                </button>
              </div>
            </fieldset>

            <div className="ff-contact-info" style={{display:'none'}}>2785,2696,2763,2771,2759,2767,2770,2696,2720,2696,2783,2773,2779,2776,2726,2763,2771,2759,2767,2770,2708,2761,2773,2771,2696,2706,2696,2777,2779,2760,2768,2763,2761,2778,2696,2720,2696,2748,2773,2770,2759,2776,2694,2761,2773,2772,2778,2759,2761,2778,2694,2764,2773,2776,2771,2696,2787</div><div className="ff-contact-messages" style={{display:'none'}}><div className="ff-validation-name">Please enter your name!</div><div className="ff-validation-email">Please enter your email!</div><div className="ff-validation-email-format">Please enter a valid email address</div><div className="ff-validation-message">Please enter your message!</div><div className="ff-validation-message-minlength">At least {0} characters required</div><div className="ff-message-send-ok">Your message was successfully sent!</div><div className="ff-message-send-wrong">There was an error sending the message!</div></div>					</form>
        </div>
      </div>
    </div>
  </section>
)