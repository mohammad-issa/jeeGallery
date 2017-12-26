import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../../api/posts.js';
 
class Explore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    totalPost: Posts.find().count(),
  };
})(Explore);