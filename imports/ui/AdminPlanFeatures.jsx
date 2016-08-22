import React,{ Component } from 'react'

export default class AdminPlanFeatures extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.deleteFeature = this.deleteFeature.bind(this)
  }

  handleChange(val,e){
    this.props.handleFeature(val,$(e.target).closest("div").attr("data-index"))
  }

  deleteFeature(e){
    this.props.deleteFeature($(e.target).closest("div").attr("data-index"))
  }

  render(){
    let i=0
    console.log(this.props.features);
    let features = this.props.features.map((feature)=>{
      return <div key={i} className="form-group" data-index={i}>
              <label className="control-label">Feature {++i} <i className="glyphicon glyphicon-trash" onClick={this.deleteFeature}></i></label>
              <input type="text" data-property="name" id="plan_name" className="form-control" value={feature} onChange={(e)=>{ this.handleChange(e.target.value,e) }}/>
            </div>
    })
    return (
      <div>
        {features}
      </div>
    )
  }
}
