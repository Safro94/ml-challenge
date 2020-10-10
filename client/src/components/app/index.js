import React from 'react';

import Routes from 'routes';

import Header from 'components/header';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';
import globalStyles from '../../index.scss';

export default () => {
	useStyles(classes, globalStyles);

	return (
		<div>
			<Header />

			<div>
				<Routes />
			</div>
		</div>
	);
};
