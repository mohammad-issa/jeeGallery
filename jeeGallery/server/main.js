import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  import '../imports/api/tasks.js';
  import '../imports/api/posts.js';
  import '../imports/api/comments.js';

});