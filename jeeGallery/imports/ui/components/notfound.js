import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'


export default class NotFound extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this)
  }
  render() {
    return (
      <div >

        <h1>Page Not Found</h1>
        <button onClick={this.goBack}>BACK</button>

      </div>
    );
  }
  goBack(){
    FlowRouter.go('/home');
  }
}