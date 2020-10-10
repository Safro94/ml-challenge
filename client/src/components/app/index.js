import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './index.module.scss';

export default () => {
	useStyles(styles);

	return (
		<div>
			<div className={styles.hello}>Welcome to Razzle.</div>
		</div>
	);
};
