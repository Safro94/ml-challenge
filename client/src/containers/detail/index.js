import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Detail from 'components/detail';
import Description from 'components/detail/description';
import Loading from 'components/shared/loading';

import { useApplication } from 'hooks/application';

import axios from 'utils/axios';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ data, itemId }) => {
	useStyles(classes);
	const handleError = useErrorHandler();
	const { setResult } = useApplication();

	const [loading, setLoading] = useState(true);
	const [item, setItem] = useState(data?.item);

	useEffect(() => {
		const getItem = () => {
			axios(`/items/${itemId}`).then(res => {
				setItem(res.data?.item);
				setLoading(false);
				setResult({ categories: res.data?.categories });
			}, handleError);
		};

		if (!item && itemId) getItem();
	}, [itemId]);

	if (!item && loading) return <Loading />;

	return (
		<>
			{item ? (
				<div data-testid='item' className={classes.container}>
					<Detail item={item} />
					<Description description={item.description} />
				</div>
			) : (
				<h1 className={classes.error}>No se ha encontrado el item</h1>
			)}
		</>
	);
};
