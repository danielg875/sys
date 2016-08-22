import React,{ Component } from 'react'
import {composeWithTracker} from 'react-komposer'
import NewPosition from '../ui/NewPosition.jsx'
import CreditDb from '../api/credit'

function composer(props, onData) {
  let user = Meteor.userId()
  handle = Meteor.subscribe('getCredit', user)
   if(handle.ready())
     onData(null,{subscribed:handle.ready(),creditData:CreditDb.findOne({user:user})})
}

export default composeWithTracker(composer)(NewPosition);
