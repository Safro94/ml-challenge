import React from 'react';

import Routes from 'routes';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './index.module.scss';
import global from '../../index.scss';

export default () => {
	useStyles(styles, global);

	return (
		<div>
			<Routes />
		</div>
	);
};
