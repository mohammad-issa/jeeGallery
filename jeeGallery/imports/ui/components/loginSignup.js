import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import AccountsUIWrapper from './accountsUIWapper.js';

export default class LoginSignup extends Component {
	constructor(props){
		super(props)
    this.toggleRender = this.toggleRender.bind(this);
    this.state = {
      loginCom : true 
    }
	}
  render() {
    return (
      <div>
        { this.state.loginCom ? <LoginBlock render={this.toggleRender}/> : <SignupBlock render={this.toggleRender}/> }
      </div>
    );
  }
  toggleRender(){
    this.setState({
      loginCom : !this.state.loginCom
    })
  }

}

class LoginBlock extends Component {
  constructor(props){
    super(props)
    this.checkIsUser = this.checkIsUser.bind(this);
  }
  render() {
    return (
      <div className="login-box">
        <div className="row">
          <div className="col-md-4 col-md-push-4">
            <div className="login-box__cont">
              <h1 className="login-box__cont__heading">Login</h1>
              <form onSubmit={this.checkIsUser}>
                <input className="basic-input" ref="username" type='username' placeholder="Username or Email"/>
                <input className="basic-input" ref="password" type='password' placeholder="Password"/>
                <input className="basic-input basic-input--submit" type='submit' value='log in'/>
              </form>
              <div className="login-box__cont__switch-to">
                <p>Have an account? <a href="javascript:void(0)" onClick={this.props.render}>Sign up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  checkIsUser(e){
    e.preventDefault()
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    Meteor.loginWithPassword(username, password, function(err) {
        if (!err) {
          FlowRouter.go('/home');
        } else {
          console.log(err);
          alert(err.reason)
        }
    });
  }
}

class SignupBlock extends Component {
  constructor(props){
    super(props)
    this.createUser = this.createUser.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }
  render() {
    return (
      <div className="login-box">
        <div className="row">
          <div className="col-md-4 col-md-push-4">
            <div className="login-box__cont">
              <h1 className="login-box__cont__heading">Signup</h1>
              <form onSubmit={this.createUser}>
                <input onKeyDown={this.toggleClass} className="basic-input" ref="email" type='email' placeholder="Email" />
                <input onKeyDown={this.toggleClass} className="basic-input" ref="fullName" type='text' placeholder="Full Name" />
                <input onKeyDown={this.toggleClass} className="basic-input" ref="username" type='username' placeholder="Username" />
                <input onKeyDown={this.toggleClass} className="basic-input" ref="password" type='password' placeholder="Password"/>
                <input className="basic-input basic-input--submit" type='submit' value='sign up'/>
              </form>
              <div className="login-box__cont__switch-to">
                <p>Don't have an account? <a href="javascript:void(0)" onClick={this.props.render}>Log in</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  toggleClass(event){
    event.target.className = "basic-input"
  }
  createUser(e){
    e.preventDefault()
    let user = {
      email : this.refs.email.value,
      fullName : this.refs.fullName.value,
      username : this.refs.username.value,
      password : this.refs.password.value
    }
    if(user.email.trim() == ''){
      this.refs.email.className = this.refs.email.className + " basic-input--error";
    }
    if(user.fullName.trim() == ''){
      this.refs.fullName.className = this.refs.fullName.className + " basic-input--error";
    }
    if(user.username.trim() == ''){
      this.refs.username.className = this.refs.username.className + " basic-input--error";
    }
    if(user.password.trim() == ''){
      this.refs.password.className = this.refs.password.className + " basic-input--error";
    }
    if(user.email.trim() == '' ||  user.fullName.trim() == '' || user.username.trim() == ''  || user.password.trim() == ''){
      return
    }
    else{
      Accounts.createUser(user,function(err){
        if(err){
            console.log(err)              

        } else {
          console.log("success")
          FlowRouter.redirect('/home')
          }
      });
    }

  }
}