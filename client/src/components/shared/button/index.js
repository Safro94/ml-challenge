import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({
	type = 'submit',
	onClick,
	children,
	customClasses,
	...rest
}) => {
	useStyles(classes);

	return (
		<button
			className={
				customClasses ? `${classes.button} ${customClasses}` : classes.button
			}
			type={type}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
};
