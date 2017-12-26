import React, { Component } from 'react';

export default class AddPost extends Component {
  constructor(props) {
    super(props);
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
                <input className="basic-input" type="text" placeholder="Image Url"/>
                <textarea className="basic-input" placeholder="Caption"/>
                <input className="basic-input" type="text" placeholder="Location"/>
              </form>
            </div>
            <div className="popup-footer">
                <button className="basic-input basic-input--submit">add post</button>
            </div>
        </div>
    </div>
    );
  }
}
