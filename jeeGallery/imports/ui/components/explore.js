import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../../api/posts.js';
import { Comments } from '../../api/comments.js';

import PostCard from '../../ui/components/postCard';
 
class Explore extends Component {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this); 
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <div className="post-cards">
              {this.renderCards()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderCards(){
    return this.props.posts.map((post,i) => 
      <PostCard key={i} post={post}/>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('users');
  Meteor.subscribe('comments');
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    totalPost: Posts.find().count(),
    comments : Comments.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(Explore);