import React, { useState, useEffect } from 'react';

import Breadcrumb from 'components/breadcrumb';

import { useApplication } from 'hooks/application';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ categories: propsCategories }) => {
	useStyles(classes);
	const { categories: contextCategories } = useApplication();

	const [categories, setCategories] = useState(
		propsCategories ? propsCategories : contextCategories
	);

	useEffect(() => {
		setCategories(contextCategories ?? propsCategories);
	}, [contextCategories]);

	return (
		<div className={classes.container}>
			<ul>
				{categories?.map((category, index) => (
					<Breadcrumb
						key={category}
						category={category}
						isLast={index === categories.length - 1}
					/>
				))}
			</ul>
		</div>
	);
};
