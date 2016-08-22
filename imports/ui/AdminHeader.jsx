import React,{ Component } from 'react'

export default class AdminHeader extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <a className="proto-button" href="/admin-panel/positions">Positions</a>
            <a className="proto-button" href="/admin-panel/candidates">Candidates</a>
            <a className="proto-button" href="/admin-panel/users">Users</a>
            <a className="proto-button" href="/admin-panel/companies">Companies</a>
            <a className="proto-button" href="/admin-panel/plans">Plans</a>
          </div>
        </div>
      </div>

    )
  }
}
