import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'
import AppContainer from '../../imports/ui/AppContainer.jsx'
import Dashboard from '../../imports/ui/Dashboard.jsx'
import NewPosition from '../../imports/ui/NewPosition.jsx'
import Home from '../../imports/ui/Home.jsx'
import AdminPositions from './../../imports/ui/AdminPositions.jsx'
import AdminCandidates from './../../imports/ui/AdminCandidates.jsx'
import CandidatePage from './../../imports/ui/CandidatePage.jsx'
import AdminUser from './../../imports/ui/AdminUsers.jsx'
import Verify from '../../imports/ui/verify'
import Profile from '../../imports/ui/Profile.jsx'
import AdminCompanies from '../../imports/ui/AdminCompanies.jsx'
import QuestionnaireForm from '../../imports/ui/QuestionnaireForm.jsx'
import ThankYou from '../../imports/ui/thankyou'
import Notification from '../../imports/ui/notification.jsx'
import PaymentForm from '../../imports/ui/payment/paymentForm.jsx'
import AdminPlans from '../../imports/ui/AdminPlans.jsx'
import PositionContainer from '../../imports/Containers/PositionContainer'
import ResetPassword from '../../imports/ui/ResetPassword.jsx'

FlowRouter.route("/",{
  action:()=>{
    mount(AppContainer,{content: <Home /> })
  },
  name:"home"
})

FlowRouter.route("/dashboard", {
  action: () =>{
    mount(AppContainer,{content: <Dashboard />})
  },
  name:"dashboard"
})
FlowRouter.route("/admin-panel/positions", {
  action: () =>{
    mount(AppContainer,{content: <AdminPositions />})
  },
  name:"AdminPositions"
})
FlowRouter.route("/admin-panel/candidates", {
  action: () =>{
    mount(AppContainer,{content: <AdminCandidates/>})
  },
  name:"AdminCandidates"
})
FlowRouter.route("/admin-panel/users", {
  action: () =>{
    mount(AppContainer,{content: <AdminUser/>})
  },
  name:"AdminUser"
})
FlowRouter.route("/admin-panel/companies", {
  action: () =>{
    mount(AppContainer,{content: <AdminCompanies/>})
  },
  name:"AdminCompanies"
})
FlowRouter.route("/admin-panel/plans", {
  action: () =>{
    mount(AppContainer,{content: <AdminPlans/>})
  },
  name:"AdminCompanies"
})
FlowRouter.route("/candidates/:id/:candidateId", {
  action: (params) =>{
    mount(CandidatePage)
  },
  name:"CandidatePage"
})

FlowRouter.route("/position/new", {
  action: () =>{
    mount(AppContainer,{content: <PositionContainer /> })
  },
  name:"newPosition"
})
FlowRouter.route("/position/:id/", {
  action: (params) =>{
    mount(AppContainer,{content:<NewPosition /> })
  },
  name:"editPosition"
})
FlowRouter.route("/verify/:token", {
  action: () =>{
    mount(Verify)
  },
  name:"verify"
})
FlowRouter.route("/profile", {
  action: () =>{
    mount(AppContainer,{content:<Profile />})
  },
  name:"profile"
})

FlowRouter.route("/notification", {
  action: () =>{
    mount(AppContainer,{content:<Notification />})
  },
  name:"notification"
})

FlowRouter.route("/questions/:id/:refereeId", {
  action: (params) =>{
    mount(QuestionnaireForm)
  },
  name:"QuestionnaireForm"
})

FlowRouter.route("/thank_you", {
  action: (params) =>{
    mount(ThankYou)
  },
  name:"thankPage"
})
FlowRouter.route("/reset/:token",{
  action: (params) =>{
  mount(ResetPassword)
  }
})
