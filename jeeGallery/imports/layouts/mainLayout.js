import React from 'react';

import Header from './../ui/components/header.js'

export const MainLayout = ({content}) => (
	<div className="app-wrapper">
		<Header/>
		
		<div className="main-layout">
			{content}
		</div>

	</div>
)
