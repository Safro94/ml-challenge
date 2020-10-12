import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ description }) => {
	useStyles(classes);

	return (
		<div className={classes.container}>
			<h2 className={classes.title}>Descripción del producto</h2>
			<p dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
};
