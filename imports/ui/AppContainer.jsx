import React from 'react'
import {composeWithTracker} from 'react-komposer'
import App from './App.jsx'
import NotFound from './notFound.jsx'

const notVerifiedUserRoute={home:true}

function composer(props, onData) {
    let user= Meteor.user()
    let renderComponent=props.content

      if(user && user.emails && !user.emails[0].verified && !notVerifiedUserRoute[FlowRouter.getRouteName()]){
          renderComponent= <NotFound />
      }

    onData(null,{isLoggingIn:Meteor.loggingIn(),currentUser:user,renderComponent:renderComponent});
}

export default composeWithTracker(composer)(App);
