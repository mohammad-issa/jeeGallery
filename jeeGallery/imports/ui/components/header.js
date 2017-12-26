import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import AddPost from './addPost';

export default class Header extends Component {

	constructor(props){
		super(props);
		this.state = {
			postPopup : false
		}
		this.logout = this.logout.bind(this) 
		this.addPostPopup = this.addPostPopup.bind(this) 
		this.closePostPopup = this.closePostPopup.bind(this) 
		this.signOutBtn = this.signOutBtn.bind(this) 
	}

  	render() {
		return(
			<div className="app-header">
				<div className="container">
					<header>
						<div className="left-menu">
							<a href="/home">
								<img src="https://dummyimage.com/90x40/000/fff"/>
							</a>

						</div>
						{this.signOutBtn()}
					</header>
				</div>
				{this.state.postPopup && <AddPost close={this.closePostPopup}/>}
			</div>
		)
	}
	logout(){
		Meteor.logout();
		setTimeout(function() {
			FlowRouter.redirect('/');
		},100)
	}
	addPostPopup(){
		this.setState({
			postPopup : true
		})
	}
	closePostPopup(){
		this.setState({
			postPopup : false
		})
	}
	signOutBtn(){
		if(Meteor.userId()){
			return (
				<div className="right-menu">
					<div className="add-post">
						<span onClick={this.addPostPopup}><i className="icon-plus" title="add post"></i></span>
					</div>
					<div className="logout">
						<span onClick={this.logout}><i className="icon-log-out" title="logout"></i></span>
					</div>
				</div>
			)
		}
	}
}
