import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
	
	Meteor.publish('posts', function tasksPublication() {
    	return Posts.find();
	});

	Meteor.methods({

	});
}