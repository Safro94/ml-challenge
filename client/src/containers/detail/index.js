import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Detail from 'components/detail';
import Loading from 'components/shared/loading';

import { useApplication } from 'hooks/application';

import axios from 'utils/axios';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ itemId }) => {
	useStyles(classes);
	const handleError = useErrorHandler();
	const { items: item, setResult } = useApplication();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getItem = () => {
			axios(`/items/${itemId}`).then(res => {
				const result = {
					items: res.data?.item,
					categories: res.data?.categories,
				};
				setResult(result);
				setLoading(false);
			}, handleError);
		};

		if (itemId) {
			setLoading(true);
			getItem();
		}
	}, [itemId]);

	if (loading) return <Loading />;

	return (
		<>
			{item ? (
				<div className={classes.container}>
					<Detail item={item} />
				</div>
			) : (
				<h1 className={classes.error}>No se ha encontrado el item</h1>
			)}
		</>
	);
};
