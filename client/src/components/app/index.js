import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Routes from 'routes';

import Header from 'components/header';
import Error from 'components/shared/error';

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

				<main>
					<div className={classes.routes}>
						<ErrorBoundary FallbackComponent={Error}>
							<Routes />
						</ErrorBoundary>
					</div>
				</main>
			</div>
		</ApplicationProvider>
	);
};
