import React from 'react'
import {composeWithTracker} from 'react-komposer'
import Credit from './creditUI'
import CreditDb from '../api/credit'
const notVerifiedUserRoute={home:true}

function composer(props, onData) {
  let user= props.user || Meteor.userId()
   let handle= Meteor.subscribe('getCredit', user)

    if(handle.ready())
      onData(null,{subscribed:handle.ready(),creditData:CreditDb.findOne({user:user})})


}

export default composeWithTracker(composer)(Credit);