import React, { Component } from 'react';
import Home from './Home.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import Signup from './Register.jsx'
import Forgot from './Forgot.jsx'
import BalanceModal from './BalanceModal.jsx'
export default class App extends Component {
  constructor(props){
    super(props)
  }

  render() {

     /* if(this.props.isLoggingIn)
        return <div className="text-center"><h2> Logging In....</h2></div>*/

      const RenderContent= this.props.currentUser ? this.props.renderComponent : <Home/>
      const balance_modal = this.props.currentUser ? <BalanceModal/>:''

    return (
      <div>
        <Login />
        <Signup />
        <Forgot />
        <Header user={this.props.currentUser} />
        <div className="bodyContent">
          {RenderContent}
          {balance_modal}
        </div>
        <Footer />
      </div>

    );
  }
}
