import React from 'react'
export default NotificationUI = (props) =>{
  console.log(props)
  const badge= props.unSeen>0? <span className="badge badge-notify">{props.unSeen}</span>: ''
  return (
    <a href="/notification" className="side-nav-link sign-up-link"><i className="glyphicon glyphicon-bell"></i> {badge} </a>
  )
}