import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ height = '200px', width = '100%' }) => {
	useStyles(classes);

	return (
		<div className={classes.container} style={{ height, width }}>
			<div className={classes.loader} />
		</div>
	);
};
