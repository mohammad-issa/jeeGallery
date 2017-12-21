import React from 'react';
import {mount} from 'react-mounter';

import { MainLayout } from './../imports/layouts/mainLayout.js';

import App from './../imports/ui/components/app.js';
import TestPage from './../imports/ui/components/testPage.js';


FlowRouter.route('/',{
	action(){
		mount(MainLayout,{
			content:(<App />)
		})
	}
});

FlowRouter.route('/test',{
	action(){
		mount(MainLayout,{
			content:(<TestPage />)
		})
	}
});