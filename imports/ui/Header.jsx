import React,{ Component } from 'react'
import NotificationUI from '../Containers/notificationContainer'
export default class Header extends Component{
  constructor(props) {
    super(props)
  }
  showModal(e){
    e.preventDefault()
    $($(e.target).attr("data-modal")).modal("show")
  }

  createMenus(){

    const userLinks= this.props.user? <li>
      <a href="/dashboard" className="side-nav-link sign-up-link">Dashboard </a>
        <NotificationUI />
    </li>:
                                      <li>
                                        <a href="#" data-modal="#login_modal" data-toggle="modal" className="side-nav-link sign-up-link" onClick={this.showModal} >Log In</a>
                                         <a href="#" data-modal="#register_modal" data-toggle="modal" className="side-nav-link sign-up-link" onClick={this.showModal}>Sign Up</a>
                                      </li>

    const adminPannel=Roles.userIsInRole(this.props.user,'admin')? <li>
                      <a href="/admin-panel/positions" className="side-nav-link sign-up-link">Admin Panel </a>
                      </li> : ''

    const normalLinks=[

      {link:'#', text:'Stories'},
      {link:'#', text:'Pricing'},
      {link:'#', text:'About'},
      {link:'#', text:'Contact'}

    ]
    let navLinks=''

    if(FlowRouter.getRouteName()=="home"){

      navLinks = normalLinks.map((links)=>{
       console.log(links)
        return <li key={links.text}> <a href={links.link} className="w-nav-link nav-link">{links.text}</a>  </li>
      })

    }

    return (
      <ul className="nav navbar-nav navbar-right" style={{marginTop:'1.2%'}}>
        {navLinks}
        {adminPannel}
        {userLinks}

      </ul>
    )
  }

  renderDropdown(){
    return (
      <ul className="nav navbar-nav navbar-right" style={{margin:'1.2%'}}>
        <div className="dropdown" style={{marginTop:'0%'}}>
          <a  href="#" className="dropdownlink dropdown-toggle" type="button" data-toggle="dropdown">{this.props.user.emails[0].address}
            <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="/profile"><i className="glyphicon glyphicon-user"></i> Profile</a></li>
            <li><a href="#" onClick={(e)=> Meteor.logout()}><i className="glyphicon glyphicon-log-out"></i> Logout</a></li>
            <li data-modal="#balance_modal" onClick={this.showModal}><a href="#" data-modal="#balance_modal"><i data-modal="#balance_modal" className="glyphicon glyphicon-plus"></i> Add Credit</a></li>
          </ul>
        </div>
      </ul>
    )
  }

  render(){

    const linksUI= this.createMenus()
    const DropDown= this.props.user? this.renderDropdown(): ''
    return (
      <div className="header" style={{background:"url('/img/hero-background-compressed.jpg')"}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <a href="/" className="navbar-brand">
            <img src="/img/ezyref-web-logo-white.png" alt="Home" className="logo"/>
          </a>
        </div>
        {DropDown}
        {linksUI}

      </div>

      </div>
    )
  }
}
