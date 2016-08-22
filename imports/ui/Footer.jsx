import React,{ Component } from 'react'

export default class Footer extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div className="w-section footer">
      <div className="w-container footer-container">
        <div className="footer-left-helper">
          <div className="footer-left-text">© Copyright 2016 EzyRef PTY LTD</div>
          <div className="footer-medium-wrap">
            <a href="#" className="footer-medium-text">Terms of use</a>
            <a href="#" className="footer-medium-text">Privacy policy</a>
            <a href="#" className="footer-medium-text">Cookie policy</a>
          </div>
        </div>
        <div className="w-clearfix footer-social">
          <a href="#" className="w-inline-block footer-social-block social-facebook"></a>
          <a href="#" className="w-inline-block footer-social-block social-twitter"></a>
          <a href="#" className="w-inline-block footer-social-block social-linked"></a>
          <a href="#" className="w-inline-block footer-social-block social-google"></a>
        </div>
      </div>
      </div>

    )
  }
}
