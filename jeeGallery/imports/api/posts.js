import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
	
	Meteor.publish('posts',() => {
    	return Posts.find({});
	});
	Meteor.publish('users', () => {
    	return Meteor.users.find({},{fields: {_id:1,username:1}});
	});

	Meteor.methods({
		'addPost'(post){
			if(!Meteor.userId()){throw new Meteor.Error(403,"Not logged in")};
			console.log(`User ${this.userId} add post`);
			if (! this.userId ) {
				throw new Meteor.Error('not-authorized');
			}

			Posts.insert({
				image : post.image,
				caption : post.caption,
				location : post.location,
				createdAt: new Date(),
				publisher : this.userId,
				likes : 0
			});
		},
	});
}