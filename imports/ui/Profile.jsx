import React,{ Component } from 'react'
import CreditContainer from '../Containers/creditContainers'
export default class Profile extends Component {
  constructor(props){
    super(props)
    let profile = Meteor.user().profile || {}
    this.state={
      changePasswordError:false,
      companies:[],selectedCompany:{company:""},
      profile:{
        firstName:profile.firstName,
        lastName:profile.lastName,
        address:profile.address
      },
      email:Meteor.user().emails[0].address
    }
    this.submitProfile = this.submitProfile.bind(this)
    this.addNewCompany = this.addNewCompany.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitCompany = this.submitCompany.bind(this)
    this.editCompany = this.editCompany.bind(this)
  }

  componentWillMount(){
    Meteor.call("getAllCompaniesOfUser",(err,res)=>{
      if(!err && res.length>0){
        this.setState({companies:res})
      }
    })
  }

  changePassword(e){
    e.preventDefault();
    const oldPassword=$('#oldPass').val().trim(),
      newPassword=$('#newPass').val().trim(),
      confirmPass=$('#confirmPass').val().trim()

    if(newPassword != confirmPass){
      Bert.alert({
        title:"Error",
        message:"New Password & Confirm Password must be same",
        type:"danger"
      })

      return
    }

    Accounts.changePassword(oldPassword,newPassword,(err,res)=>{
      if(err){
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }else{
        $('#passForm')[0].reset()
        Bert.alert({
          title:"Success",
          message:"Password Changed",
          type:"success"
        })
      }
    })

  }

  addNewCompany(){
    this.setState({selectedCompany:{company:""}})
    $("#company_edit_modal").modal("show")
  }

  editCompany(e){
    let index = $(e.target).closest("a").attr("data-index"),
    companies = this.state.companies,
    selectedCompany = companies[index]
    selectedCompany.index = index
    this.setState({selectedCompany:selectedCompany})
    $("#company_edit_modal").modal("show")
  }

  handleChange(e){
    let company = this.state.selectedCompany,
    value = e.target.value
    company.company = value
    this.setState({selectedCompany:company})
  }

  submitProfile(e){
    e.preventDefault()
    let profile = {firstName:$("#firstName").val(),lastName:$("#lastName").val(),address:$("#address").val()},
    email = $("#email").val()
    Meteor.call("updateProfileAndEmail",profile,email,(err,res)=>{
      if(!err){
        Bert.alert({
          title:"Success",
          message:"Profile succcessfully updated",
          type:"success"
        })
        this.setState({profile:profile})
        this.setState({email:email})
      }
      else {
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }
    })
  }

  showBalanceModal(){
    $("#balance_modal").modal("show")
  }

  submitCompany(e){
    e.preventDefault()
    Meteor.call("insertCompany",this.state.selectedCompany,(err,res)=>{
      if(!err){
        Bert.alert({
          title:"Success",
          message:"Company succcessfully added/updated",
          type:"success"
        })
        let selectedCompany = this.state.selectedCompany,
        companies = this.state.companies
        if(selectedCompany._id){
          companies[selectedCompany.index] = selectedCompany
        }
        else {
          selectedCompany._id = res
          companies.push(selectedCompany)
        }
        this.setState({companies:companies})
        $(".close").click()
      }
      else {
        Bert.alert({
          title:"Error",
          message:err.reason,
          type:"danger"
        })
      }
    })
  }

  render(){
    let currentUser = Meteor.user()
    let passwordError=''
    const {changePasswordError,companies}=this.state

    if(changePasswordError){
      passwordError= <label className="text-center text-danger">{changePasswordError}</label>
  }


      if(!currentUser.profile){
      currentUser.profile = {}
    }
      let i=0
      let company = companies.map((indvCompany)=>{
          return <li className="list-group-item" key={indvCompany.company+i}>{indvCompany.company} <a href="#" data-index={i++} onClick={this.editCompany} className="pull-right"><span className="text-warning" style={{textDecoration:"underline",fontStyle:"italic"}}>Change</span></a></li>
      })
    return (
      <div className="standard-page">
        <div className="container">
        <div className="row">
          <div className="col-md-4">
          <span><strong>Email : </strong>{this.state.email}</span><br/><br/>
          <span><strong>Created At : </strong>{new Date(currentUser.createdAt).toDateString()}</span><br/><br/>
          <span><strong>Name : </strong>{this.state.profile.firstName} {this.state.profile.lastName}</span><br/><br/>
          <span><strong>Address : </strong>{this.state.profile.address}</span><br/><br/>
          <span>
            <strong>Credit : </strong>
            <CreditContainer user={Meteor.userId()}/>
            <a href="#" className="text-warning btn btn-sm btn-default" style={{textDecoration:"underlined"}} onClick={this.showBalanceModal}>Add</a>
          </span>
          <br/><br/>
          <div>

          </div>
          </div>
          <div className="col-md-8">
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
                <li role="presentation"><a href="#companies" aria-controls="companies" role="tab" data-toggle="tab">Companies</a></li>
                <li role="presentation"><a href="#changePassword" aria-controls="password" role="tab" data-toggle="tab">Change Password</a></li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane" id="companies">
                  <div className="container" style={{padding:"10px"}}>
                    <h4>Your Companies</h4>
                    <ul className="list-group" style={{width:"70%"}}>
                      {company}
                    </ul>
                      <button type="button" className="btn btn-primary" onClick={this.addNewCompany}>Add New Company</button>
                    </div>
                  </div>
                <div role="tabpanel" className="tab-pane active" id="profile">
                  <div className="container" style={{padding:"10px"}}>
                  <form onSubmit={this.submitProfile}>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">First Name</label>
                      <input type="text" id="firstName" className="form-control" defaultValue={currentUser.profile.firstName}/>
                    </div>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">Last Name</label>
                      <input type="text" id="lastName" className="form-control" defaultValue={currentUser.profile.lastName}/>
                    </div>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">Address</label>
                      <input type="text" id="address" className="form-control" defaultValue={currentUser.profile.address}/>
                    </div>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">Email</label>
                      <input type="text" id="email" className="form-control" defaultValue={this.state.email}/>
                    </div>

                  <br/>
                  <button type="submit" className="btn btn-success">Submit</button>
                  </form>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="changePassword">
                  <div className="container" style={{padding:"10px"}}>
                  <form onSubmit={this.changePassword.bind(this)} id="passForm">
                    <div className="form-group">
                      {passwordError}
                    </div>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">Old Password</label>
                      <input type="password" id="oldPass" className="form-control" />
                    </div>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">New Password</label>
                      <input type="password" id="newPass" className="form-control" />
                    </div>
                    <div className="form-group" style={{width:"70%"}}>
                      <label className="control-label">Confirm Password</label>
                      <input type="password" id="confirmPass" className="form-control"/>
                    </div>
                  <button type="submit" className="btn btn-info">Change Password</button>
                  </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="company_edit_modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className='modal-header'>
              <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-heading">User Profile</h5>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.submitCompany}>
                <label className="control-label">Company Name</label>
                <input type="text"  className="form-control" value={this.state.selectedCompany.company} onChange={this.handleChange}/>
                <button type="submit" className="btn btn-success">Save & Update</button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
