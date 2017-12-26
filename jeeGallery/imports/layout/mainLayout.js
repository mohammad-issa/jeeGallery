import React from 'react';

import Header from '../ui/components/header';

export const MainLayout = ({content}) =>(
	<div>
		<div>
			<Header/>
			{content}
		</div>
	</div>
)