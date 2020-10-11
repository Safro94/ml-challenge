import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Item from 'components/items/item';
import Loading from 'components/shared/loading';

import { useApplication } from 'hooks/application';

import axios from 'utils/axios';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default () => {
	useStyles(classes);
	const { term, items, setItems } = useApplication();
	const handleError = useErrorHandler();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getItems = () => {
			const limit = 4;
			axios(`/items?q=${term}&limit=${limit}`).then(res => {
				setItems(res.data?.items), setLoading(false);
			}, handleError);
		};

		if (!items && term) {
			setLoading(true);
			getItems();
		}
	}, [term, items, setItems]);

	if (loading) return <Loading />;

	return (
		<div className={classes.container}>
			{items ? (
				items.map(item => <Item key={item.id} item={item} />)
			) : (
				<h1>No se han encontrado resultados para tu busqueda</h1>
			)}
		</div>
	);
};
