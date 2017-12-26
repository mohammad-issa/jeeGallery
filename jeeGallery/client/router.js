import { Meteor } from 'meteor/meteor';
import React from 'react';
import {mount} from 'react-mounter';

import {LoginLayout} from '../imports/layout/loginLayout';
import {MainLayout} from '../imports/layout/mainLayout';

import LoginSignup from '../imports/ui/components/loginSignup';
import App from '../imports/ui/components/app';
import Test from '../imports/ui/components/test';
import NotFound from '../imports/ui/components/notfound';


FlowRouter.route('/',{
	action(){
		if(Meteor.userId()){
			FlowRouter.redirect('/home')
		}
		else{
			mount(LoginLayout,{
				content:(<LoginSignup/>)
			})
		}
	}
})

FlowRouter.route('/home',{
	action(){
		if(Meteor.userId()){
			mount(MainLayout,{
				content:(<App/>)
			})
		}
		else{
			FlowRouter.redirect('/')
		}
	}
})

FlowRouter.route('/test',{
	action(){
		if(Meteor.userId()){
			mount(MainLayout,{
				content:(<Test/>)
			})
		}
		else{
			FlowRouter.redirect('/')
		}
	}
})

FlowRouter.notFound = {
    action: function() {
		mount(MainLayout,{
			content:(<NotFound/>)
		})
    }
};