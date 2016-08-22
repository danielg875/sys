import React,{ Component } from 'react'

export default class CandidatePage extends Component {
  constructor(props) {
    super(props)
    this.state={error:null,success:null}
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault()
    let referees=[
      {email:$("#email1").val(),name:$("#name1").val()},
      {email:$("#email2").val(),name:$("#name2").val()},
      {email:$("#email3").val(),name:$("#name3").val()}],
    position=FlowRouter.getParam("id"),
    candidate=FlowRouter.getParam("candidateId"),
    self=this
    Meteor.call("insertResults",position,candidate,referees,function(err,res){
      if(err){
        self.setState({error:err.reason})
      }
      else {
        self.setState({success:1})
      }
    })
  }
  render(){
    let successMessage=this.state.success?<div className="alert alert-success animated fadeIn">Form submitted successfully, thanks!</div>:'',
    errorMessage=this.state.error?<div class="alert alert-danger animated fadeIn">{this.state.error}</div>:''
    return(
      <div className="container">
      	<div className="row">
          <div className="col-md-12">
            <h3 className="text-center" style={{marginTop:'50px'}}>You've been selected to use EzyRef!</h3>
            <p style={{margin: '20px 0px'}}>Paragraph explaining the process and why the emails are necessary. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan nibh non mi faucibus commodo. Vivamus at euismod tortor. Phasellus ex leo, euismod nec eros ac, iaculis facilisis lectus. Mauris eget enim erat. Cras tincidunt semper dapibus. Phasellus tristique tincidunt magna molestie consectetur. Nam quam ex, congue id bibendum in, aliquam nec eros. Etiam magna leo, faucibus quis hendrerit ac, pellentesque vitae tellus. Integer aliquet nisi ut nisi sodales, ac tincidunt est aliquam.</p>
          </div>
      		<div className="col-md-12">
            <div style={{margin: "50px auto", maxWidth: "600px"}}>
              <form name="candidateForm"  onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="col-md-6">
                    <label className="control-label">Reference's Email</label>
                    <input className="w-input entry-standard" required type="email" id="email1" placeholder="Reference's email"/>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Refrence's Name</label>
                    <input className="w-input entry-standard"  type="text" id="name1" placeholder="Reference's email"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-6">
                    <label className="control-label">Reference's Email</label>
                    <input className="w-input entry-standard" required type="email" id="email2" placeholder="Reference's email"/>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Refrence's Name</label>
                    <input className="w-input entry-standard"  type="text" id="name2" placeholder="Reference's email"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-6">
                    <label className="control-label">Reference's Email</label>
                    <input className="w-input entry-standard" required type="email" id="email3" placeholder="Reference's email"/>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Refrence's Name</label>
                    <input className="w-input entry-standard"  type="text" id="name3" placeholder="Reference's email"/>
                  </div>
                </div>
                <button className="proto-button" type="submit" style={{width: "100%"}}>Submit</button>
              </form>
              {successMessage}
              {errorMessage}
            </div>

          </div>
          <h6>EzyRef complies with a strict <a href="privacy">privacy policy</a>, and will never disclose submitted emails to third-parties.</h6>
      	</div>
      </div>
    )
  }
}
