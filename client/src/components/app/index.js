import React from 'react';

import Routes from 'routes';

import Header from 'components/header';

import { ApplicationProvider } from 'hooks/application';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';
import globalStyles from '../../index.scss';

export default () => {
	useStyles(classes, globalStyles);

	return (
		<ApplicationProvider>
			<div>
				<Header />

				<div>
					<Routes />
				</div>
			</div>
		</ApplicationProvider>
	);
};
