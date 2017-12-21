import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../api/tasks.js';

import Task from './task.js';
import AccountsUIWrapper from './accountsUIWapper.js';

 
class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);

    this.state = {
      hideCheckedTask : false,
      count : 10,
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List (Checked {this.props.totalCount - this.props.uncheckedCount} of {this.props.totalCount})</h1>
          <div>
            <label>Hide Check Tasks</label>
            <input type="checkbox" onChange={this.handleChecked}/>
          </div>

          <AccountsUIWrapper />

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>

        </header>
        {this.props.currentUser ? <ul> {this.renderTasks()} </ul> : ''}
        <a href="/test">Click Me</a>
      </div>
    );
  }
  handleChecked(){
    this.setState({
      hideCheckedTask : !this.state.hideCheckedTask
    });

  }
  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('tasks.insert', text);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  
  renderTasks() {
    if(this.state.hideCheckedTask){
      return this.props.checkedTasks.map((task) => (
        <Task key={task._id} task={task} />
      ));
    }
    else{
      return this.props.tasks.map((task) => (
        <Task key={task._id} task={task} />
      ));
    }
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    checkedTasks: Tasks.find({ checked: { $ne: true } }).fetch(),
    uncheckedCount: Tasks.find({ checked: { $ne: true } }).count(),
    totalCount: Tasks.find().count(),
    currentUser: Meteor.user(),
  };
})(App);