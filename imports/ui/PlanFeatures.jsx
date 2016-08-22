import React,{ Component } from 'react'

export default class PlanFeatures extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    let features = this.props.features.map((feature)=>{
      return <li key={feature} className="list-group-item">{feature}</li>
    })
    return (
      <ul className="list-group">
        {features}
      </ul>
    )
  }
}
