import React from 'react';
import { useParams } from 'react-router-dom';

import DetailContainer from 'containers/detail';
import BreadcrumbContainer from 'containers/breadcrumb';

import { useServerSideData } from 'hooks/serverData';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ staticContext }) => {
	useStyles(classes);
	const { id } = useParams();
	const data = useServerSideData(staticContext);

	return (
		<div className={classes.container}>
			<BreadcrumbContainer categories={data?.categories} />
			<DetailContainer data={data} itemId={id} />
		</div>
	);
};
