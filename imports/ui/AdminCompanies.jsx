import React,{ Component } from 'react'
import AdminHeader from './AdminHeader.jsx'

export default class AdminCompanies extends Component {
  constructor(props) {
    super(props)
    this.state={companies:[],currentCompany:{}}
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitCompany = this.submitCompany.bind(this)
    this.deleteCompany = this.deleteCompany.bind(this)
  }
  componentWillMount(){
    let self=this
    Meteor.call('getAllCompanies',Meteor.userId(),function(err,res){
      if(!err){
        self.setState({companies:res})
      }
    })
  }

  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  handleClick(e){
    let index = $(e.target).closest("td").attr("data-index"),
    companies = this.state.companies,
    currentCompany = Object.assign({},companies[index])
    currentCompany.index = index
    this.setState({currentCompany:currentCompany})
    $("#company_edit_modal").modal("show")
  }

  handleChange(e){
    let value = e.target.value,
    property = $(e.target).attr("data-property"),
    currentCompany = this.state.currentCompany
    currentCompany[property] = value
    this.setState({currentCompany:currentCompany})
  }

  deleteCompany(e){
    let companyId = $(e.target).closest("button").attr("data-companyId"),
    index = $(e.target).closest("td").attr("data-index"),
    self = this
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this company!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: true,
      html: false
    }, function(){
      Meteor.call('deleteCompany',companyId,(err,res)=>{
        if(!err){
          Bert.alert({
            title:"Success",
            message:"Company successfully deleted",
            type:"success"
          })
          let companies = self.state.companies
          companies.splice(index,1)
          self.setState({companies:companies})
        }
        else {
          Bert.alert({
            title:"Error",
            message:err.reason,
            type:"danger"
          })
        }
      })

      })
  }

  submitCompany(e){
    e.preventDefault()
    let currentCompany = this.state.currentCompany,
    index = currentCompany.index
    delete currentCompany.index
    console.log(currentCompany)
    Meteor.call("updateCompany",currentCompany,(err,res)=>{
      if(!err){
        Bert.alert({
          title:"Success",
          message:"Company succcessfully updated",
          type:"success"
        })
        let companies = this.state.companies
        companies[index] = currentCompany
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
    let i=0
    let rows=this.state.companies.map((company)=>{
      return <tr key={company._id}>
                <td>{i+1}</td>
                <td>{company.company}</td>
                <td>{company.createdBy}</td>
                <td>{company.username}</td>
                <td data-index={i++}>
                 <button className="btn btn-xs btn-default" href="#"  onClick={this.handleClick}>
                    <i className="glyphicon glyphicon-edit" data-toggle="tooltip" data-placement="left" title="Edit the company"></i>
                 </button>
                 <button className="btn btn-xs btn-default" data-companyId={company._id} href="#"  onClick={this.deleteCompany}>
                    <i className="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="Delete the company"></i>
                 </button>
                </td>
              </tr>
    })
    return (
      <div className="standard-page">
        <div className="container">
        <AdminHeader/>
        <div className="row" style={{marginTop:'20px'}}>
          <h5>Candidate Lists</h5>
          <table className="table">
                <thead>
                    <tr>
                        <th>SN.</th>
                        <th>Company Name</th>
                        <th>UserID</th>
                        <th>UserName</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        </div>
        <div className="modal fade" id="company_edit_modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className='modal-header'>
              <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-heading">Company Details</h5>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.submitCompany}>
                <label className="control-label">Company Name</label>
                <input type="text" data-property="company" id="candidate_name" className="form-control" value={this.state.currentCompany.company} onChange={this.handleChange}/>
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
