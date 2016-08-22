import React from 'react'
import {composeWithTracker} from 'react-komposer'
import NotificationUI from './notificationContainerUI.jsx'
import NotificationDB from '../api/notificationDb'
const notVerifiedUserRoute={home:true}

function composer(props, onData) {
  let user= props.user || Meteor.userId()
  let handle= Meteor.subscribe('userNotification', user)
  const notificationCount=NotificationDB.find({userId:user,isSeen:false}).count()
  console.log(notificationCount)

  onData(null,{unSeen:notificationCount})


}

export default composeWithTracker(composer)(NotificationUI);