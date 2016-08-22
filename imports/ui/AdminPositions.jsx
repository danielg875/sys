import React,{ Component } from 'react'
import AdminHeader from './AdminHeader.jsx'

export default class AdminPositions extends Component {
  constructor(props) {
    super(props)
    this.state={positions:[]}
    this.deletePosition = this.deletePosition.bind(this)
  }
  componentWillMount(){
    let self=this
    Meteor.call('getAllPositions',Meteor.userId(),function(err,res){
      if(!err){
        self.setState({positions:res})
      }
    })
  }
  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  deletePosition(e){
    let positionId = $(e.target).closest("button").attr("data-positionId"),
    index = $(e.target).closest("td").attr("data-index"),
    self = this
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this position!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: true,
      html: false
    }, function(){
      Meteor.call('deletePosition',positionId,(err,res)=>{
        if(!err){
          Bert.alert({
            title:"Success",
            message:"Position successfully deleted",
            type:"success"
          })
          let positions = self.state.positions
          positions.splice(index,1)
          self.setState({positions:positions})
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

  render(){
    let i=0
    let rows=this.state.positions.map((position)=>{
      let linkToPosition = '/position/'+position._id
      return <tr key={position._id}>
              <td>{i+1}</td>
              <td>{position.name}</td>
              <td>{position.createdBy}</td>
              <td>{position.department}</td>
              <td data-index={i++} >
               <a className="btn btn-xs btn-default"  href={linkToPosition}><i data-toggle="tooltip" data-placement="left" title="Edit the position" className="glyphicon glyphicon-edit"></i></a>
               <button className="btn btn-xs btn-default" onClick={this.deletePosition} data-positionId={position._id} href="#"><i data-toggle="tooltip" data-placement="left" title="Delete the position"  className="glyphicon glyphicon-trash"></i></button>
              </td>
            </tr>
    })
    return (
      <div className="standard-page">
        <div className="container">
        <AdminHeader/>
        <div className="row" style={{marginTop:'20px'}}>
          <h5>Position Lists</h5>
          <table className="table">
                <thead>
                    <tr>
                        <th>SN.</th>
                        <th>Position Name</th>
                        <th>Added By</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        </div>
      </div>

    )
  }
}
