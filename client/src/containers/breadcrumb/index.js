import React from 'react';

import Breadcrumb from 'components/breadcrumb';

import { useApplication } from 'hooks/application';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default () => {
	useStyles(classes);
	const { categories } = useApplication();

	return (
		<ul className={classes.container}>
			{categories?.map((category, index) => (
				<Breadcrumb
					key={category}
					category={category}
					isLast={index === categories.length - 1}
				/>
			))}
		</ul>
	);
};
