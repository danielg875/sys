import React,{ Component } from 'react'
import AdminHeader from './AdminHeader.jsx'
import AdminPlanFeatures from './AdminPlanFeatures'
export default class AdminPlans extends Component {
  constructor(props){
    super(props)
    this.state = {plans:[],selectedPlan:{name:"",price:0,credit:0,features:[]}}
    this.handleClick = this.handleClick.bind(this)
    this.handleFeature = this.handleFeature.bind(this)
    this.deleteFeature = this.deleteFeature.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addFeature = this.addFeature.bind(this)
    this.submitPlan = this.submitPlan.bind(this)
  }

  componentWillMount(){
    Meteor.call('getPlans',(err,res)=>{
      if(!err){
        console.log(res);
        this.setState({plans:res})
      }
    })
  }

  handleClick(e){
    let index = $(e.target).closest("td").attr("data-index"),
    plans = this.state.plans,
    selectedPlan = Object.assign({},plans[index])
    selectedPlan.index = index
    this.setState({selectedPlan:selectedPlan})
    $("#plan_edit_modal").modal("show")
  }

  handleChange(val,prop){
    let selectedPlan = this.state.selectedPlan
    selectedPlan[prop] = val
    this.setState({selectedPlan:selectedPlan})
  }

  handleFeature(val,index){
    let selectedPlan = this.state.selectedPlan
    selectedPlan.features[index]=val
    this.setState({selectedPlan:selectedPlan})
  }

  deleteFeature(index){
    let selectedPlan = this.state.selectedPlan
    selectedPlan.features.splice(index,1)
    this.setState({selectedPlan:selectedPlan})
  }

  addFeature(){
    let selectedPlan = this.state.selectedPlan
    selectedPlan.features.push("")
    this.setState({selectedPlan:selectedPlan})
  }

  submitPlan(e){
    e.preventDefault()
    Meteor.call('updatePlan',this.state.selectedPlan,(err,res)=>{
      if(!err){
        Bert.alert({
          title:"Success",
          message:"Plan updated successfully",
          type:"success"
        })
        let plans=this.state.plans,
        selectedPlan=this.state.selectedPlan,
        index=selectedPlan.index
        delete selectedPlan.index
        plans[index] = selectedPlan
        this.setState({plans:plans})
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
    let rows = this.state.plans.map((plan)=>{
      return <tr key={plan._id}>
              <td>{i+1}</td>
              <td>{plan.name}</td>
              <td>{plan.price}</td>
              <td>{plan.credit}</td>
              <td data-index={i++} >
               <button className="btn btn-xs btn-default"  href="#" onClick={this.handleClick}>
                <i data-toggle="tooltip" data-placement="left" title="Edit the plan" className="glyphicon glyphicon-edit"></i>
                </button>
              </td>
            </tr>
    })
    return(
      <div className="standard-page">
        <div className="container">
          <AdminHeader />
          <div className="row" style={{marginTop:'20px'}}>
            <h5>Plan Lists</h5>
            <table className="table">
                  <thead>
                      <tr>
                          <th>SN.</th>
                          <th>Plan Name</th>
                          <th>Price</th>
                          <th>Credit</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {rows}
                  </tbody>
              </table>
          </div>
        </div>
        <div className="modal fade" id="plan_edit_modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className='modal-header'>
              <button type="button" className='close' data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-heading">Plan Details</h5>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.submitPlan}>
                <label className="control-label">Plan Name</label>
                <input type="text" data-property="name" id="plan_name" className="form-control" value={this.state.selectedPlan.name} onChange={(e)=>{ this.handleChange(e.target.value,'name') }}/>
                <label className="control-label">price</label>
                <input type="text" data-property="email" id="plan_price" className="form-control" value={this.state.selectedPlan.price}  onChange={(e)=>{ this.handleChange(e.target.value,'price') }}/>
                <label className="control-label">credit</label>
                <input type="text" data-property="id" id="plan_credit" className="form-control" value={this.state.selectedPlan.credit}  onChange={(e)=>{ this.handleChange(e.target.value,'credit') }}/>
                <AdminPlanFeatures handleFeature={this.handleFeature} deleteFeature={this.deleteFeature} features={this.state.selectedPlan.features}/>
                <button type="button" className="btn btn-default" onClick={this.addFeature}><i className="glyphicon glyphicon-plus"></i></button>
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
