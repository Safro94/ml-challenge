import React from 'react';
import { useParams } from 'react-router-dom';

import DetailContainer from 'containers/detail';
import BreadcrumbContainer from 'containers/breadcrumb';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default () => {
	useStyles(classes);

	const { id } = useParams();

	return (
		<div className={classes.container}>
			<BreadcrumbContainer />
			<DetailContainer itemId={id} />
		</div>
	);
};
