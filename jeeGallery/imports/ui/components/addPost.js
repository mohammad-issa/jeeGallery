import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../../api/posts.js';

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
  }
  render() {
    return (
    <div className="popup">
        <div className="popup-data">
            <div className="popup-header">
                <h4>Add Post</h4>
                <span onClick={this.props.close}><i className="icon-close"></i></span>
            </div>
            <div className="popup-content">
              <form>
                <input ref="image" className="basic-input" type="text" placeholder="Image Url"/>
                <textarea ref="caption" className="basic-input" placeholder="Caption"/>
                <input ref="location" className="basic-input" type="text" placeholder="Location"/>
              </form>
            </div>
            <div className="popup-footer">
                <button onClick={this.addPost} className="basic-input basic-input--submit">add post</button>
            </div>
        </div>
    </div>
    );
  }
  addPost(){
    const self = this;
    let post = {
      image : this.refs.image.value,
      caption : this.refs.caption.value,
      location : this.refs.location.value
    }
    Meteor.call('addPost',post, function (err, res){
      if(err){
        self.props.close();
        console.log("err", err);

      }
      else{
        self.props.close();
        console.log("Added :D");

      }
    })

  }
}
