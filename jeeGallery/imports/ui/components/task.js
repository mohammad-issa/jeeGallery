import React, { Component } from 'react';
 
export default class Task extends Component {
	constructor(props){
		super(props);
		this.removeRow =  this.removeRow.bind(this);
	}
  render() {
    return (
      <li>
      	<button onClick={this.removeRow}>&times;</button>
      	{this.props.task.text}
      </li>
    );
  }
  removeRow(){
  	alert('delete')
  }
}