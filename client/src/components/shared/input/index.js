import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ type = 'text', placeholder, value, onChange, ...rest }) => {
	useStyles(classes);

	return (
		<input
			className={classes.input}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...rest}
		/>
	);
};
