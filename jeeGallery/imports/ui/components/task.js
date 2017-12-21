import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'

import { Tasks } from '../../api/tasks.js';
// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskChecked : this.props.task.checked
    }
  }
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    this.setState({
      taskChecked : !this.state.taskChecked
    },() => Meteor.call('task.checked',this.props.task._id,this.state.taskChecked))
  }
 
  deleteThisTask() {
	 Meteor.call('task.remove',this.props.task._id,this.props.task.userId, function (err, res){
    if(err){
        console.log("err", err);
    }
   })
  }
 
  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <span className="text">{this.props.task.text}</span>
        <br/>
    	<span>{this.props.task.user}</span>
      </li>
    );
  }
}