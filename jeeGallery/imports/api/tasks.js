import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	
	Meteor.publish('tasks', function tasksPublication() {
    	return Tasks.find();
	});

	Meteor.methods({
		'tasks.insert'(text) {
			if(!Meteor.userId()){throw new Meteor.Error(403,"Not logged in")};
			check(text, String);
			console.log(`User ${this.userId} add a new task`);
			if (! this.userId ) {
				throw new Meteor.Error('not-authorized');
			}

			Tasks.insert({
				text,
				createdAt: new Date(),
				user : Meteor.users.findOne(this.userId).username,
				userId : this.userId,
			});
		},
		'task.remove'(id,userId){
			if(!Meteor.userId()){throw new Meteor.Error(403,"Not logged in")};
			Tasks.remove(id);
			console.log(`Remove Task has id ${id} by user ${userId}`);
		},
		'task.checked'(id,setChecked){
			if(!Meteor.userId()){throw new Meteor.Error(403,"Not logged in")};
			console.log("id", id);
			Tasks.update(id,{$set:{checked:setChecked}});
		},

		'tasks.setPrivate'(taskId, setToPrivate) {
			check(taskId, String);
			check(setToPrivate, Boolean);

			const task = Tasks.findOne(taskId);
			if (task.owner !== this.userId) {
				throw new Meteor.Error('not-authorized');
			}
			
			Tasks.update(taskId, { $set: { private: setToPrivate } });
		},
	});
}