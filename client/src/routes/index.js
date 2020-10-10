import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

export default () => (
	<Switch>
		{routes.map(route => (
			<Route key={route.path} {...route} />
		))}
	</Switch>
);
