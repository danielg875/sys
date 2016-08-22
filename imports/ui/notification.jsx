import React from 'react'

export default class Notification extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loaded:false,
      notificationData:null
    }
  }

  componentWillMount(){

    Meteor.call('getAllNotification', Meteor.userId(),(err,res)=>{
      if(err){
        console.log(err)
      }else{
        console.log(res)
        this.setState({loaded:true, notificationData:res})
      }

    })
  }

  render(){
    let {loaded, notificationData} =this.state
    if(!loaded)
      return <h3 className="text-center text-info"> Loading.......</h3>

    if(notificationData.length<1)
      return <h4 className="text-center text-info"> You Have No Notification To Display</h4>

    const notificationUI= notificationData.map((notification) =>{
            return (
              <a href="#" className="list-group-item">
                <h5 className="list-group-item-heading">{notification.text}</h5>
                <p className="list-group-item-text">{new Date(notification.date).toDateString()}</p>
              </a>
            )
      })

    return (
     <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="list-group" style={{marginTop:20}}>
          {notificationUI}
        </div>
      </div>

     </div>

    )

  }
}