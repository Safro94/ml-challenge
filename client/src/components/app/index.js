import React from 'react';

import Routes from 'routes';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './index.module.scss';

export default () => {
	useStyles(styles);

	return (
		<div>
			<Routes />
		</div>
	);
};
