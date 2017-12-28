import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../../api/posts.js';
 
class PostCard extends Component {
  constructor(props) {
    super(props);
    this.getUsername = this.getUsername.bind(this)
  }

  render() {
    return (
      <div className="post-card">
        <div className="post-card__header">
          <div className="post-card__header__publisher-image">{this.getUsername()}</div>
          <div className="post-card__header__publisher-name">{this.props.post.publisher}</div>
        </div>
        <div className="post-card__post-image">
          <img src={this.props.post.image}/>
        </div>
        <div className="post-card__footer">
          <div className="post-card__footer__ctrl">
            <span className="post-card__footer__ctrl__like"><i className="icon-heart-outline"></i></span>
          </div>
          <div className="post-card__footer__caption">
            <p>{this.props.post.caption}</p>
          </div>
        </div>
      </div>
    );
  }
  getUsername(){
    return Meteor.users.findOne({_id:this.props.post.publisher}|| {}).username
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  // const self = this
  // console.log(self.props)

  return {
    // username : Meteor.users.findOne({_id:{this.props.post.publisher}}|| {}).username
    // posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    // totalPost: Posts.find().count(),
  };
})(PostCard);