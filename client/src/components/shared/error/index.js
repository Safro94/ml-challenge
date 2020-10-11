import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default () => {
	useStyles(classes);

	return (
		<div className={classes.container} role='alert'>
			<img className={classes.image} src='/assets/error.png' alt='Error' />
			<h2>Ooops, ha habido un error, por favor volvé a intentarlo mas tarde</h2>
		</div>
	);
};
