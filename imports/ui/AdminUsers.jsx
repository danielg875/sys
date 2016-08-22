import React,{ Component } from 'react'
import AdminHeader from './AdminHeader.jsx'
import CreditContainer from '../Containers/creditContainers'
export default class AdminUser extends Component {
  constructor(props) {
    super(props)
    this.state={users:[],currentUserProfile:{}}
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitUser = this.submitUser.bind(this)
  }
  componentWillMount(){
    Meteor.call('getAllUsers',Meteor.userId(),(err,res)=>{
      if(!err){
        console.log(res);
        this.setState({users:res})
      }
      else {
        console.log(err.reason);
      }
    })
  }
  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  handleClick(e){
    let index = $(e.target).closest("td").attr("data-index"),
    users = this.state.users,
    currentUserProfile = Object.assign({},users[index].profile || {})
    currentUserProfile.index = index
    this.setState({currentUserProfile:currentUserProfile})
    $("#user_edit_modal").modal("show")
  }

  handleChange(e){
    let value = e.target.value,
    property = $(e.target).attr("data-property"),
    currentUserProfile = this.state.currentUserProfile
    currentUserProfile[property] = value
    this.setState({currentUserProfile:currentUserProfile})
  }

  addCredit(e){
    const user=e.target.getAttribute('data-user')
    console.log(user)
    bootbox.prompt("Credit?", (result) =>{
      console.log(result)
        if(result==null)
          return

        Meteor.call('addCredit',result,user, (err,res)=>{
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
    })
  }

  submitUser(e){
    e.preventDefault()
    let currentUserProfile = this.state.currentUserProfile,
    index = currentUserProfile.index,
    users = this.state.users,
    userId = users[index]._id
    delete currentUserProfile.index
    console.log(currentUserProfile)
    Meteor.call("updateUserProfile",currentUserProfile,userId,(err,res)=>{
      if(!err){
        Bert.alert({
          title:"Success",
          message:"User succcessfully updated",
          type:"success"
        })
        users[index].profile = currentUserProfile
        this.setState({users:users})
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
    let i=0
    let rows=this.state.users.map((user)=>{
      return <tr key={user._id}>
                <td>{i+1}</td>
                <td>{user.emails[0].address}</td>
                <td>{user.profile?user.profile.firstName:"NA"} {user.profile?user.profile.lastName:"NA"}</td>
                <td>{user.profile?user.profile.address:"NA"}</td>
                <td>{new Date(user.createdAt).toDateString()}</td>
                <td> <CreditContainer user={user._id} /></td>
                <td data-index={i++} >
                 <button className="btn btn-xs btn-default"  href="#"   onClick={this.handleClick} > <i data-toggle="tooltip" data-placement="left" title="Edit the user" className="glyphicon glyphicon-edit"></i></button>
                 <button className="btn btn-xs btn-default"  href="#" data-user={user._id} onClick={this.addCredit} > <i data-user={user._id} data-toggle="tooltip" data-placement="left" title="Add  credit to  user"  className="glyphicon glyphicon-plus"></i></button>
                 <button className="btn btn-xs btn-default"  href="#"><i data-toggle="tooltip" data-placement="left" title="Delete the position"  className="glyphicon glyphicon-trash"></i></button>
                </td>
             </tr>
    })
    return (
      <div className="standard-page">
        <div className="container">
        <AdminHeader/>
        <div className="row" style={{marginTop:'20px'}}>
          <h5>Users List</h5>
          <table className="table">
                <thead>
                    <tr>
                        <th>SN.</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Created At</th>
                        <th>Point</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        </div>
        <div className="modal fade" id="user_edit_modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className='modal-header'>
              <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-heading">User Profile</h5>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.submitUser}>
                <label className="control-label">First Name</label>
                <input type="text" data-property="firstName" id="user_first_name" className="form-control" value={this.state.currentUserProfile.firstName} onChange={this.handleChange}/>
                <label className="control-label">Last Name</label>
                <input type="text" data-property="lastName" id="user_last_name" className="form-control" value={this.state.currentUserProfile.lastName}  onChange={this.handleChange}/>
                <label className="control-label">Address</label>
                <input type="text" data-property="address" id="user_address" className="form-control" value={this.state.currentUserProfile.address}  onChange={this.handleChange}/>
                <button type="submit" className="btn btn-success">Update</button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
