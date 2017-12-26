import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class Header extends Component {

	constructor(props){
		super(props);
		this.logout = this.logout.bind(this) 
		this.signOutBtn = this.signOutBtn.bind(this) 
	}

  	render() {
		return(
			<div>
				<header>
					<h1>header</h1>
					<img src="https://dummyimage.com/50x25/000/fff"/>
					{this.signOutBtn()}
				</header>
			</div>
		)
	}
	logout(){
		Meteor.logout();
		setTimeout(function() {
			FlowRouter.redirect('/');
		},100)
	}
	signOutBtn(){
		if(Meteor.userId()){
			return <button onClick={this.logout}>signout</button>
		}
	}
}
